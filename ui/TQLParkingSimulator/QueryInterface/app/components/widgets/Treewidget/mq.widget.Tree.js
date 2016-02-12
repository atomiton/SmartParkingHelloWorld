//(function ( angular ) {
//    'use strict';
//angular.module("treecontrol",[])
/*	widgetModule.directive('treecontrol',['$compile', function( $compile ){
    function classIfDefined(cssClass, addClassProperty) {
                if (cssClass) {
                    if (addClassProperty)
                        return 'class="' + cssClass + '"';
                    else
                        return cssClass;
                }
                else
                    return "";
            }
            
            function ensureDefault(obj, prop, value) {
                if (!obj.hasOwnProperty(prop))
                    obj[prop] = value;
            }
            
            return {
                restrict: 'EA',
				replace:true,
                require: "treecontrol",
                transclude: true,
                scope: {
                    treeModel: "=",
                    selectedNode: "=?",
                    expandedNodes: "=?",
                    onSelection: "&",
                    onNodeToggle: "&",
                    options: "=?",
                    orderBy: "@",
                    reverseOrder: "@",
                    searchQuery : "="
                },
                controller: ['$scope', function( $scope ) {

//                	alert("controller");
                    function defaultIsLeaf(node) {
                        return !node[$scope.options.nodeChildren] || node[$scope.options.nodeChildren].length === 0;
                    }

                    function defaultEquality(a, b) {
                        if (a === undefined || b === undefined)
                            return false;
                        a = angular.copy(a);
                        a[$scope.options.nodeChildren] = [];
                        b = angular.copy(b);
                        b[$scope.options.nodeChildren] = [];
                        return angular.equals(a, b);
                    }

                    $scope.options = $scope.options || {};
                    ensureDefault($scope.options, "nodeChildren", "children");
                    ensureDefault($scope.options, "dirSelectable", "true");
                    ensureDefault($scope.options, "injectClasses", {});
                    ensureDefault($scope.options.injectClasses, "ul", "");
                    ensureDefault($scope.options.injectClasses, "li", "");
                    ensureDefault($scope.options.injectClasses, "liSelected", "");
                    ensureDefault($scope.options.injectClasses, "iExpanded", "");
                    ensureDefault($scope.options.injectClasses, "iCollapsed", "");
                    ensureDefault($scope.options.injectClasses, "iLeaf", "");
                    ensureDefault($scope.options.injectClasses, "label", "");
                    ensureDefault($scope.options.injectClasses, "labelSelected", "");
                    ensureDefault($scope.options, "equality", defaultEquality);
                    ensureDefault($scope.options, "isLeaf", defaultIsLeaf);

                    $scope.expandedNodes = $scope.expandedNodes || [];
                    $scope.expandedNodesMap = {};
                    for (var i=0; i < $scope.expandedNodes.length; i++) {
                        $scope.expandedNodesMap[""+i] = $scope.expandedNodes[i];
                    }
                    $scope.parentScopeOfTree = $scope.$parent;


                    $scope.headClass = function(node) {
                        var liSelectionClass = classIfDefined($scope.options.injectClasses.liSelected, false);
                        var injectSelectionClass = "";
                        if (liSelectionClass && (this.node == $scope.selectedNode))
                            injectSelectionClass = " " + liSelectionClass;
                        if ($scope.options.isLeaf(node))
                            return "tree-leaf" + injectSelectionClass;
                        if ($scope.expandedNodesMap[this.$id])
                            return "tree-expanded" + injectSelectionClass;
                        else
                            return "tree-collapsed" + injectSelectionClass;
                    };

                    $scope.iBranchClass = function() {
                        if ($scope.expandedNodesMap[this.$id])
                            return classIfDefined($scope.options.injectClasses.iExpanded);
                        else
                            return classIfDefined($scope.options.injectClasses.iCollapsed);
                    };

                    $scope.nodeExpanded = function() {
                        return !!$scope.expandedNodesMap[this.$id];
                    };

                    $scope.selectNodeHead = function() {
                        var expanding = $scope.expandedNodesMap[this.$id] === undefined;
                        $scope.expandedNodesMap[this.$id] = (expanding ? this.node : undefined);
                        if (expanding) {
                            $scope.expandedNodes.push(this.node);
                        }
                        else {
                            var index;
                            for (var i=0; (i < $scope.expandedNodes.length) && !index; i++) {
                                if ($scope.options.equality($scope.expandedNodes[i], this.node)) {
                                    index = i;
                                }
                            }
                            if (index != undefined)
                                $scope.expandedNodes.splice(index, 1);
                        }
                        if ($scope.onNodeToggle)
                            $scope.onNodeToggle({node: this.node, expanded: expanding});
                    };

                    $scope.selectNodeLabel = function( selectedNode ){
                        if (selectedNode[$scope.options.nodeChildren] && selectedNode[$scope.options.nodeChildren].length > 0 &&
                            !$scope.options.dirSelectable) {
                            this.selectNodeHead();
                        }
                        else {
                            if ($scope.selectedNode != selectedNode) {
                                $scope.selectedNode = selectedNode;
                                if ($scope.onSelection)
                                    $scope.onSelection({node: selectedNode});
                            }
                        }
                    };

                    $scope.selectedClass = function() {
                        var labelSelectionClass = classIfDefined($scope.options.injectClasses.labelSelected, false);
                        var injectSelectionClass = "";
                        if (labelSelectionClass && (this.node == $scope.selectedNode))
                            injectSelectionClass = " " + labelSelectionClass;

                        return (this.node == $scope.selectedNode)?"tree-selected" + injectSelectionClass:"";
                    };

                    //tree template
                    var template =
                        '<ul '+classIfDefined($scope.options.injectClasses.ul, true)+'>' +
                            '<li ng-repeat="node in node.' + $scope.options.nodeChildren + '|filter : \''+ $scope.searchQuery +'\' | orderBy:orderBy:reverseOrder" ng-class="headClass(node)" '+classIfDefined($scope.options.injectClasses.li, true)+'>' +
                            '<i class="tree-branch-head" ng-class="iBranchClass()" ng-click="selectNodeHead(node)"></i>' +
                            '<i class="tree-leaf-head '+classIfDefined($scope.options.injectClasses.iLeaf, false)+' icon-{{node.name}}"></i>' +
                            '<div class="tree-label '+classIfDefined($scope.options.injectClasses.label, false)+'" ng-class="selectedClass()" ng-click="selectNodeLabel(node)" tree-transclude></div>' +
                            '<treeitem ng-if="nodeExpanded()"></treeitem>' +
                            '</li>' +
                            '</ul>';

                    return {
                        template: $compile(template)
                    }
                }],
                compile: function(element, attrs, childTranscludeFn) {
                    return function ( scope, element, attrs, treemodelCntr ) {

                        scope.$watch("treeModel", function updateNodeOnRootScope(newValue) {
                            if (angular.isArray(newValue)) {
                                if (angular.isDefined(scope.node) && angular.equals(scope.node[scope.options.nodeChildren], newValue))
                                    return;
                                scope.node = {};
                                scope.node[scope.options.nodeChildren] = newValue;
                            }
                            else {
                                if (angular.equals(scope.node, newValue))
                                    return;
                                scope.node = newValue;
                            }
                        });

                        scope.$watch("searchQuery",function(newVal,oldVal){
//                        	alert("changed");
                        	if(newVal != "" && treemodelCntr.template){
//                        	$compile(element)(scope);
                        		treemodelCntr.template(scope);
                        		
                        	}
                        });
                        scope.$watchCollection('expandedNodes', function(newValue) {
                            var notFoundIds = 0;
                            var newExpandedNodesMap = {};
                            var $liElements = element.find('li');
                            var existingScopes = [];
                            // find all nodes visible on the tree and the scope $id of the scopes including them
                            angular.forEach($liElements, function(liElement) {
                                var $liElement = angular.element(liElement);
                                var liScope = $liElement.scope();
                                existingScopes.push(liScope);
                            });
                            // iterate over the newValue, the new expanded nodes, and for each find it in the existingNodesAndScopes
                            // if found, add the mapping $id -> node into newExpandedNodesMap
                            // if not found, add the mapping num -> node into newExpandedNodesMap
                            angular.forEach(newValue, function(newExNode) {
                                var found = false;
                                for (var i=0; (i < existingScopes.length) && !found; i++) {
                                    var existingScope = existingScopes[i];
                                    if (scope.options.equality(newExNode, existingScope.node)) {
                                        newExpandedNodesMap[existingScope.$id] = existingScope.node;
                                        found = true;
                                    }
                                }
                                if (!found)
                                    newExpandedNodesMap[notFoundIds++] = newExNode;
                            });
                            scope.expandedNodesMap = newExpandedNodesMap;
                        });

//                        scope.$watch('expandedNodesMap', function(newValue) {
//
//                        });

                        //Rendering template for a root node
                        console.log("-----------------------ctrl ---------------------------");
                        console.log(treemodelCntr);
                        if(treemodelCntr.template){
                        	treemodelCntr.template( scope, function(clone) {
                        		element.html('').append( clone );
                        	});
                        }
                        // save the transclude function from compile (which is not bound to a scope as apposed to the one from link)
                        // we can fix this to work with the link transclude function with angular 1.2.6. as for angular 1.2.0 we need
                        // to keep using the compile function
                        scope.$treeTransclude = childTranscludeFn;
                    }
                }
            };
  }])
  .directive("treeitem", function() {
            return {
                restrict: 'E',
				replace:true,
                require: "^treecontrol",
                link: function( scope, element, attrs, treemodelCntr) {
                    // Rendering template for the current node
                    treemodelCntr.template(scope, function(clone) {
                        element.html('').append(clone);
                    });
                }
            }
        })
 .directive("treeTransclude", function() {
            return {
			replace:true,
                link: function(scope, element, attrs, controller) {
                    if (!scope.options.isLeaf(scope.node)) {
                        angular.forEach(scope.expandedNodesMap, function (node, id) {
                            if (scope.options.equality(node, scope.node)) {
                                scope.expandedNodesMap[scope.$id] = scope.node;
                                scope.expandedNodesMap[id] = undefined;
                            }
                        });
                    }
                    if (scope.options.equality(scope.node, scope.selectedNode)) {
                        scope.selectNodeLabel(scope.node);
                    }

                    // create a scope for the transclusion, whos parent is the parent of the tree control
                    scope.transcludeScope = scope.parentScopeOfTree.$new();
                    scope.transcludeScope.node = scope.node;
                    scope.$on('$destroy', function() {
                        scope.transcludeScope.$destroy();
                    });

                    scope.$treeTransclude(scope.transcludeScope, function(clone) {
                        element.empty();
                        element.append(clone);
                    });
                }
            }
        });*/
//		})( angular );



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
												+ ' | filter: searchQuery'
//												+ searchQuery
												+ ' ">'
												+ '<i class="collapsed" data-ng-class="{nopointer: node.'
												+ nodeChildren
												+ '.length==0}"'
												+ 'data-ng-show="{{node.children.length!=0 && !node.isOpen}}" data-ng-click="expandCollapse(node)"></i>'
//												+ treeId
//												+ '.selectNodeHead(node)"></i>'
												+ '<i class="expanded" data-ng-show="{{node.children.length!=0 && node.isOpen}}" data-ng-click="expandCollapse(node)"></i>'
//												+ treeId
//												+ '.selectNodeHead(node)"></i>'
												+ '<i class="normal" data-ng-show="{{node.children.length==0}}"></i> '
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
