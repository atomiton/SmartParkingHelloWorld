'use strict';

myApp
		.controller(
				'simulatorController',
				[
						'$scope',
						'$rootScope',
						'schemaService',
						'$http',
						'usSpinnerService',
						'guid','$interval',/* 'navTabs', */
						function(scope, rootScope, schemaService,$http,
								usSpinnerService, guid,interval/* , navTabs */) {

                            scope.orgData = "";
                            scope.uniqueIdForCanvas = guid();
                            schemaService.getOrgData().then(function(data){
                            	console.log("Org: ");
                            	console.log(data);
                            	scope.orgData = data;
                            	if(data.Organization){
                            		scope.data[1].contentTree = [{
                            				type : "score",
                            				roleName : data.Organization.AddressStreetName1.Value,
                            				children :[]
                            		}];
                            	}
                            },function(error){
                            	alert("Error in fetching Org data"+error);
                            });

							scope.tabs = [ {
								title : "Try TQL",
								linkURL : "/home"
							}, {
								title : "TQL Studio",
								linkURL : "/tql_studio"
							}, {
								title : "IoT Simulator",
								linkURL : "/iot_simulator"
							}, {
								title : "Docs",
								linkURL : "/docs"
							}];
                            scope.supportClick = function(){
                                    window.open("http://atomiton.com/contact/","_blank");
                            };
							scope.currentCenterSection = 'modules/IoTSimulator/views/centerSection/SingleFloor.html';

							scope.nodeData = false;
							scope.scorecardPopup=false;
							scope.floorData = [ {
								"name" : "Single Floor",
								"type" : "SingleFloor",
								"icon" : ""

							}, {
								"name" : "All Floors",
								"type" : "AllFloors",
								"icon" : ""
							}, {
								"name" : "3D",
								"type" : "ThreeDimensional",
								"icon" : ""

							} ];

							scope.setCurrentFloor = function(type) {
								scope.view = type;
								scope.currentCenterSection = 'modules/IoTSimulator/views/centerSection/'
										+ type + '.html';
							};
							scope.searchClick = function($event) {
								var elemnt = event.currentTarget;
								$(elemnt).addClass("highlight");
								$(".zoomSlider").addClass("slider");
								$(".icon-ban").removeClass("highlight");
							};
							scope.banClick = function($event) {
								var elemnt = event.currentTarget;
								$(".icon-search").removeClass(
										"highlight slider");
								$(".zoomSlider").removeClass("slider");
								$(elemnt).addClass("highlight");
							};

							scope.treeOptions = {
								nodeChildren : "children",
								dirSelectable : true,
								injectClasses : {
									ul : "a1",
									li : "a2",
									liSelected : "a7",
									iExpanded : "a3",
									iCollapsed : "a4",
									iLeaf : "a5",
									label : "a6",
									labelSelected : "a8"
								}
							}

							scope.resourcesData = [{
								"roleName" : "Case Description",
								"roleId" : "role1"
							}, {
								"roleName" : "Models",
								"roleId" : "role1",
								"collapsed" : true
							}, {
								"roleName" : "APIs",
								"roleId" : "role1",
								"collapsed" : true
							}, {
								"roleName" : "Event Models",
								"roleId" : "role1",
								"collapsed" : true
							}, {
								"roleName" : "Sample App",
								"roleId" : "role1",
								"collapsed" : true
							}

							];
							scope.scorecardData = [];
							scope.data = [ {
								"name" : "RESOURCES",
								"type" : "RESOURCES",
								"icon" : "",
								"isOpen" : true,
								"contentTree" : scope.resourcesData
							}, {
								"name" : "SCORECARD",
								"type" : "SCORECARD",
								"icon" : "",
								"contentTree" : scope.scorecardData
							}

							];
							/* ===summarycollpase starts=== */

							scope.collapseSearch = function() {
								$('#searchSummary').css("display", "block");
								$("body").toggleClass("rightcollapse");

							};
							/* ===summarycollpase ends=== */
							/* ===collapse button starts== */
							scope.collapse = function() {
								$("body").toggleClass("leftcollapse");
							}
							/* ===collapse ends== */
							scope.modeldata={};
							scope.clickedtree = function(node) {
								console.log(node);
								scope.modelData = {};
								scope.roleName = node.roleName;
								if (node.roleName == "Models") {
									scope.nodeData = true;
//									scope.scorecardPopup=false;
									var data = {
										"GetFacetInstance" : {
											"fid" : "ParkingLotDB"
										}
									};

                                    $http.get(TQL.URL.getDataModel(),data)
                                    .success(function(data, status,headers, config) {

                                            //scope.modelData = JSON.stringify(data);
                                            var x2js = new X2JS();
                                            var jsonObj = x2js.xml_str2json( data );
                                            scope.modelData = jsonObj;
                                        }).error(function(data, status,headers, config) {
														alert("There was an error fetching model.");
														scope.modelData = JSON.stringify({
																	data : "Error Fetching Model"
																});
													});
								}
								else if(node.type == "score"){
//                                    scope.nodeData = false;
                                    scope.scorecardPopup=true;
                                    scope.roleName = node.roleName;
                              $http.get(TQL.URL.getScorecard())
                                        .success(  function(data, status, headers, config) {
                                           // alert(data);
                                            console.log( data);
                                            // this callback will be
                                            // called asynchronously
                                            // when the response is
                                            // available
                                            scope.timestampdata=data.Timestamp;
                                            scope.getTime=function(){
                                               var time= scope.timestampdata;
                                               var timestamp=new Date(time);
                                                return timestamp;
                                            };
                                            scope.scoreTime=scope.getTime();
                                            scope.scoreData = data;
                                            // scope.$apply();
                                            console.log("jsonscore"+ scope.scoreData);
                                        })
                                        .error(
                                        function(data, status,
                                                 headers, config) {
                                            // called asynchronously
                                            // if an error occurs
                                            // or server returns
                                            // response with an
                                            // error status.
                                            alert("There was an error fetching scorecard.");
                                            scope.scoreData = JSON
                                                .stringify({
                                                    data : "Error Fetching scorecard"
                                                });
                                        });
                                }
                                else{
                                    scope.nodeData = true;
                                }

							}
							 scope.modeldata=scope.modelData;
							 scope.newWindow=function(roleName){
                            };
							scope.hidePopup = function() {
                                scope.scorecardPopup=false;
                            };
							scope.hideModal = function() {
								scope.nodeData = false;
							};
							 scope.samplecode=function(){
                                window.open("https://github.com/atomiton/SmartParkingHelloWorld");
                            };
                                                     

                            scope.twitter=function(){
                                window.open("http://twitter.com/AtomitonInc");
                            }

                            scope.facebook=function(){
                                window.open("http://www.facebook.com/atomiton");
                            }
                            scope.linkedIn=function(){
                                window.open("http://www.linkedin.com/company/mqidentity-inc-");
                            }
                            scope.mail=function(){
                                window.open("mailto:info@atomiton.com");
                            }
                         /*scope.allOrganization=getAllOrganization();
                         scope.dataModel=getDataModel();*/
//                         scope.allIndividualObjects=getAllObjects();
                        /* scope.allSpecificEntity=getAllSpecificEntity();
                         scope.allSpecificDataModel=getAllSpecificDataModel();*/
						} ]);
