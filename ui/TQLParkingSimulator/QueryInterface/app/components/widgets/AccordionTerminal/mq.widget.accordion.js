widgetModule.directive('customAccordian',function ( )  {
    return {
      restrict: 'E',
      scope: {
        collection: '=data',
		trees : "=trees",
        ontreeclick:"&"
      },
      template: '<accordion close-others="true"> ' +
					'<accordion-group is-disabled=false ng-repeat = "member in collection"  is-open="member.isOpen" > ' +
					'<accordion-heading><i class="icon-{{member.type}}"></i>{{member.name}}<i class="accordion-icon" ng-class="{\'icon-minus\': member.isOpen, \'icon-plus\': !member.isOpen}"></i>'+
					'</accordion-heading>'+
					/*'<span ng-click="loadpage()" ng-repeat="role in trees">{{role.roleName}}</span>'+*/
						'<treecontrol class="tree-classic"'+
						   'tree-model="member.contentTree"'+
						   'options="treeOptions"'+
						  ' on-selection="showSelected(node)"'+
						   'selected-node="node1">'+
						   '{{node.roleName}}'+
						'</treecontrol>'+
					'</accordion-group></accordion>',
					
	  link: function (scope, element, attrs) {

          scope.showSelected= function(node) {
              scope.ontreeclick({node : node});
          }
	  }
    };
  });