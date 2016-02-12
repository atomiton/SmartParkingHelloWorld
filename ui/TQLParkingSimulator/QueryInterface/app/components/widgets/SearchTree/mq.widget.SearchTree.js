
			widgetModule.directive(
					'treeModel',
					[
							'$compile',
							function($compile) {
								return {
									restrict : 'A',
									scope : {
										searchQuery : '=',
										treeModel : '=',
										onSelection : '&'
									},
									link : function(scope, element, attrs) {
										var treeId = attrs.treeId;
										var treeModel = scope.treeModel;
										var nodeId = attrs.nodeId;
										var nodeLabel = attrs.nodeLabel;
										var nodeChildren = attrs.nodeChildren;
										var searchQuery = scope.searchQuery;
										var onSelection = scope.onSelection;
//										alert(searchQuery);
										console.log("----tree model ---");
										console.log(treeModel);
										var template = '<ul>'
												+ '<li ng-repeat="node in treeModel'
//												+ treeModel
//												+ ' | filter: {name: searchQuery}: searchQuery '
//												+ searchQuery
												+ ' " ng-show="hasSearchNode(node)">'
												+ '<i class="collapsed" data-ng-class="{nopointer: node.'
												+ nodeChildren
												+ '.length==0}"'
												+ 'data-ng-show="{{node.'+nodeChildren+'.length!=0 && !node.isOpen}}" data-ng-click="expandCollapse(node)"></i>'
//												+ treeId
//												+ '.selectNodeHead(node)"></i>'
												+ '<i class="expanded" data-ng-show="node.'+nodeChildren+'.length!=0 && node.isOpen" data-ng-click="expandCollapse(node)"></i>'
//												+ treeId
//												+ '.selectNodeHead(node)"></i>'
												+ '<i class="normal" data-ng-show="{{node.'+nodeChildren+'.length==0}}"></i> '
												+ '<span title="{{node.'
												+ nodeLabel
												+ '}}" data-ng-class="node.selected" data-ng-click="selectNode(node)">{{node.'
//												+ treeId
//												+ '.selectNode(node)">{{node.'
												+ nodeLabel
												+ '}}</span>'
												+ '<div data-ng-show="{{node.isOpen}}" data-tree-id="'
												+ treeId
												+ '" tree-model="node.'
												+ nodeChildren
												+ '" data-node-id='
												+ nodeId
												+ ' data-node-label='
												+ nodeLabel
												+ ' data-node-children='
												+ nodeChildren
												+ ' search-query="searchQuery" on-selection="shareSelection(nodeSelected)"'
//												+ searchQuery
												+ '></div>'
												+ '</li>' + '</ul>';
										
										scope.expandCollapse= function(node){
//											alert("expand-collapse");
											console.log(node);
											node.isOpen = !node.isOpen;
											element.html('').append(
													$compile(template)(scope));
										};
										scope.hasSearchNode = function(node){
											var toLower = node[nodeLabel].toLowerCase();
											if(toLower.indexOf(scope.searchQuery.toLowerCase())>-1){
												return true;
											}else {
												for(var i=0; i < node[nodeChildren].length; i++){
													if(scope.hasSearchNode(node[nodeChildren][i])){
														return true;
													}
												}
											}
											return false;
										}
										scope.selectNode = function(selectedNode){
											 if (scope.onSelection){
												 scope.onSelection({nodeSelected:selectedNode});
											 }
										}
										scope.shareSelection = function(nodeSelected){
											if (scope.onSelection){
												 scope.onSelection({nodeSelected:nodeSelected});
											 }
										}
										if (/*treeId &&*/ treeModel) {
											/*if (attrs.angularTreeview) {
												scope[treeId] = scope[treeId]
														|| {};
												scope[treeId].selectNodeHead = scope[treeId].selectNodeHead
														|| function(
																selectedNode) {
													alert("select");
															if (selectedNode[nodeChildren] != undefined && selectedNode.children.length !=0) {
																selectedNode.isOpen = !selectedNode.isOpen;
																alert(selectedNode.isOpen);
															}
														};
												scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel
														|| function(
																selectedNode) {
															if (scope[treeId].currentNode
																	&& scope[treeId].currentNode.selected) {
																scope[treeId].currentNode.selected = undefined;
															}
															selectedNode.selected = 'selected';
															scope[treeId].currentNode = selectedNode;
														};
											}*/
											element.html('').append(
													$compile(template)(scope));
										}
									}
								};
							} ]);
