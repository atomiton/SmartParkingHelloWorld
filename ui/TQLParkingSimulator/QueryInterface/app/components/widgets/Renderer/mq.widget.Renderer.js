widgetModule.directive('renderer',['$compile', function ($compile) {
    var getTemplate = function(filter) {
        switch (filter) {
            case 'World': return '<input type="checkbox" ng-model="filterby">';
            default:  return '<input type="text" ng-model="filterby" />';
        }
    }

    return {
        restrict: 'E',
    //   replace: true,
	   transclude:true,
	  template:'<div>{{filterby}}}</div>',
        scope: {
            filterby: "="
        },
        //template:"<div></div>",
        link: function(scope, element, attrs) {
           // var el = $compile(getTemplate(scope.filterby))(scope);
           // element.replaceWith(el);
            console.log(scope.filterby);
            scope.$watch('filterby',function(newVal,oldVal){
                if(newVal != ""){
                    alert(newVal);
                }

            });
//          element.append( "<ng-include src=filterby.templateurl></ng-include>");
            //var el=$compile('<ng-include src="components/widgets/Renderer/template.html"></ng-include>')(scope);
           // element.replaceWith(el);
		   
//		   $compile(element.contents())(scope);
        }
    };
}]);