widgetModule
		.directive(
				'customAccordian',
				['messagesBusService',
				function(messagesBusService) {
					return {
						restrict : 'E',
						scope : {
							collection : '=data',
							trees : "=trees",
							uniqueId : "=uniqueId",
							searchText :"=searchText"
						},
						/*template : '<accordion close-others="true"> '
								+ '<accordion-group ng-repeat = "member in collection" is-open="member.isOpen" is-disabled=false>'
								+ '<accordion-heading ng-init="fitaccordion()"><i class="icon-{{member.name}}"></i>{{member.name}}<i class="accordion-icon" ng-class="{\'icon-minus\': member.isOpen, \'icon-plus\': !member.isOpen}"></i>'
								+ '</accordion-heading>'
								+ '<tabset style="\height:100%;"\>'
								+ ' <tab select="alert()" ng-repeat = " tabs in member.perspectives">'
								+ '<tab-heading class="lefttabhead"><i class="icon-{{tabs.name}}"></i> {{tabs.name}}</tab-heading> '
//								+ '<test-directive check-data="tabs.test"></test-directive>'
								+ '<div class="treecontainer" >'
								+ '<treecontrol class="tree-classic" search-query="searchText"'
								+ 'tree-model="trees"'
								+ ' options="treeOptions" on-selection="showSelected(node)" selected-node="node1">'
								+ '{{node.name}}'
								+ '</treecontrol>'
								+ '</div>'
//								+'<ng-include src=tabs.leftTemplateUrl></ng-include>'
								+' </tab>' 
								+ '</tabset>' 
								+'</accordion-group>' + '</accordion>',*/

						template : '<accordion close-others="true"> '
							+ '<accordion-group ng-repeat = "member in collection" is-open="member.isOpen" is-disabled=false>'
							+ '<accordion-heading ng-init="fitaccordion()"><i class="icon-{{member.name}}"></i>{{member.name}}<i class="accordion-icon" ng-class="{\'icon-minus\': member.isOpen, \'icon-plus\': !member.isOpen}"></i>'
							+ '</accordion-heading>'
							+ '<tabset style="\height:100%;"\>'
							+ ' <tab select="alert()" ng-repeat = " tabs in member.perspectives">'
							+ '<tab-heading class="lefttabhead"><i class="icon-{{tabs.name}}"></i> {{tabs.name}}</tab-heading> '
							+ '<div class="treecontainer" >'
							+ '<div data-angular-treeview="true" data-tree-id="{{member.type+ tabs.name+\'mytree\'}}" tree-model="trees"'
						    	+ 'data-node-id="id" data-node-label="name" data-node-children="children" search-query="searchText" on-selection="showSelected(nodeSelected)">'
						    + '</div>'
							+ '</div>'
							+' </tab>' 
							+ '</tabset>' 
							+'</accordion-group>' + '</accordion>',

						link : function(scope, element, attrs) {
						
							scope.showSelected = function(node){
								console.log("============================== node =======================");
								console.log(node);
								if(node.children.length == 0){
									messagesBusService.publish('treeEvent-'+scope.uniqueId,node);
								}
							}
							/*===Tree components===*/
							scope.treeOptions = {
							    nodeChildren: "children",
							    dirSelectable: true,
							    injectClasses: {
							        ul: "a1",
							        li: "a2",
							        liSelected: "a7",
							        iExpanded: "a3",
							        iCollapsed: "a4",
							        iLeaf: "a5",
							        label: "a6",
							        labelSelected: "a8"
							    }
							}
							$(window).resize(function() {
								scope.fitaccordion();
							});
							scope.fitaccordion = function() {
								var tabsHeight = $(
										'.accordion_left .panel-heading')
										.outerHeight()
										* $('.accordion_left .panel-heading').length;
								var height = $('.accordion_left').innerHeight()
										- tabsHeight;

								$('.panel-body').height(height - 10);
							};
						}
					};
				}]);