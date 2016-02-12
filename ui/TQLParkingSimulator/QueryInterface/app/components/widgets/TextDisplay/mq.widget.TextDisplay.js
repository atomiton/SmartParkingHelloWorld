widgetModule.directive('textDisplay',[function(){
	
	var link = function(scope, element, attr){
		/*scope.$watch('isJsonTree',function(newVal,oldVal){
			if(newVal == true){
				var json = (angular.isString(scope.textToDisplay))?JSON.parse(scope.textToDisplay): scope.textToDisplay;
				scope.jsonData = angular.copy(json);
			}
		});*/
	};
	
	return {
		restrict : 'E',
		templateUrl : 'components/widgets/TextDisplay/text-display.html',
		scope : {
			textToDisplay : '='/*,
			isJsonTree : '='*/
		},
		link : link
	}
}]);