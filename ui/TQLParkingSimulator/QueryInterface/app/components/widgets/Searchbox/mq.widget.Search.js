widgetModule.directive("searchbox", function() {
    return {
        restrict: 'E',
        scope : {
        	selected : '=searchText'
        },
        template: 
            '<div class="search_input">' +
            '<input class="form-control" type="text" ng-model="selected" typeahead="val  for val in values | filter:$viewValue" placeholder="Search"> ' +
			'</div>',

        link: function(scope) {
//        	scope.selected = undefined;
//        	scope.values = [{name:'val1', id:'1'}, {name : 'val2', id : '2'}];
        	scope.values = ['Manasi','Tincy'];
        	
        }

    };
});