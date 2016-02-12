widgetModule.directive('toolBar',['messagesBusService','$compile',function(messagesBusService,compile){
	
	var link = function(scope, element, attr){
		scope.handleAction = function(action){
			scope.handleToolAction({action : action})
		}; 
		
	};
	
	return {
		restrict : 'E',
		templateUrl : 'components/widgets/Toolbar/tool-bar.html',
		scope : {
			actionsArray : "=actionsArray",
			handleToolAction : "&actionHandler",
			currentAction : "=currentAction",
			uniqueId : "@"
		},
		link : link
	}
}]);