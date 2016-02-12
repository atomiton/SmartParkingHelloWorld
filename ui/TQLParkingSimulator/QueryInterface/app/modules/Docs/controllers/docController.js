'use strict';

myApp.controller('docController', ['$rootScope','$location','$scope','$http',
    function($rootScope,$location,scope,$http) {
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
            "roleName" : "TQL Overview",
            "roleId" : "role1"
        }];
        scope.simulatorData = [{
            "roleName" : "IOT Simulator",
            "roleId" : "role1"
        }];
        scope.releasesData = [

            {
                "roleName" : "TQL Interactive",
                "roleId" : "role1",
                "collapsed" : true
            }, {
                "roleName" : "TQL 1.0",
                "roleId" : "role1",
                "collapsed" : true
            } ];
        scope.data = [ {
            "name" : "TQL OVERVIEW",
            "type" : "Tqloverview",
            "icon" : "",
            "isOpen" : true,
            "contentTree" : scope.resourcesData
        }
            , {
                "name" : "RELEASES",
                "type" : "RELEASES",
                "icon" : "",
                "contentTree" : scope.releasesData
            },
            {
                "name" : "IOT SIMULATOR",
                "type" : "IOTSIMULATOR",
                "icon" : "",
                "contentTree" : scope.simulatorData
            }
        ];
        scope.headerName="TQL Overview";
		scope.clickedtree = function(node,$rootScope) {
            scope.headerName = node.roleName;
            if (node.roleName == "Models") {
                var data = {
                    "GetFacetInstance" : {
                        "fid" : "ParkingLotDB"
                    }
                };

                $http.get(TQL.URL.getDataModel(),data)
                    .success(function(data, status,headers, config) {
                        var x2js = new X2JS();
                        var jsonObj = x2js.xml_str2json( data );
                        scope.modelData = jsonObj;

                        // scope.modelData = JSON.stringify(data);
                    }).error(function(data, status,headers, config) {
                        alert("There was an error fetching model.");
                        scope.modelData = JSON.stringify({
                            data : "Error Fetching Model"
                        });
                    });
            }
            else if(node.roleName == "TQL 1.0"){
                $location.url('/tql_studio');
            }
            else{

            }
        }
        scope.datavalue1 = [
            {
                "GetFacetInstance": {
                    "fid": "ParkingLotDB"
                }
            }
        ];
        scope.datavalue2 = [
            {
                "AsyncService": {
                    "command": "sendEmail",
                    "runStatus": "pending",
                    "payload": "{\"Name\": \"Baseer\", \"Email\": \"bkhan@atomiton.com\", \"recvMarketing\":\"No\"}"
                }
            }
        ];
        scope.datavalue3=
            {
                "Type": "ParkingLot.ParkingLotAssets.Organization",
                "Format": "version,timestamp",
                "Key": "Organization",
                "Organization": [
                    {
                        "id": {
                            "Version": 1,
                            "Timestamp": 1422569910389,
                            "Value": "CA-01"
                        },
                        "sid": "JM34MMDWAAAAUAABBENOKZUB"
                    },
                    {
                        "id": {
                            "Version": 1,
                            "Timestamp": 1422748924033,
                            "Value": "Atom-Org-1"
                        },
                        "sid": "JNBHDOEBAAAAUAABBGSQHYM6"
                    },
                    {
                        "id": {
                            "Version": 1,
                            "Timestamp": 1422922437893,
                            "Value": "Atom-Org-2"
                        },
                        "LocLon": {
                            "Version": 1,
                            "Timestamp": 1422922437892,
                            "Value": 88.1212
                        },
                        "Name": {
                            "Version": 1,
                            "Timestamp": 1422922437893,
                            "Value": "Tim's Parking Lot"
                        },
                        "LocLat": {
                            "Version": 1,
                            "Timestamp": 1422922437892,
                            "Value": -122.1212
                        },
                        "Email": {
                            "Version": 1,
                            "Timestamp": 1422922437893,
                            "Value": "parking@atomiton.com"
                        },
                        "sid": "JNGMSVIFAAAAUAABBFW2YCIR"
                    }
                ]
            };


        scope.datavalue4=[
            {
            		"Model": "ParkingMeter",
            		"ParkingMeter": {
            		"sid": "JOKALWE4AAAH6AABAFX4S7S3",
            		"parkignMeterLabel": {
            		"Version": "2",
            		"Value": "4"
            		}
            		}
            }
        ];
     scope.postJson=
         {
             "Model": "ParkingSpot",
             "ParkingMeter": {
                 "sid": "xxxyyyyy",
                 "state": {
                     "Version": "12",
                     "Value": "NewValue"
                 }
             }
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
        scope.allOrganization=getAllOrganization();
        scope.dataModel=getDataModel();
        scope.allIndividualObjects=getAllObjects();
        scope.allSpecificEntity=getAllSpecificEntity();
        scope.allSpecificDataModel=getAllSpecificDataModel();
    }]);
