var terminalApp = angular.module('terminalApp',['widgetModule'])
	.controller('terminalController',['$scope',function (scope){
		
//		alert("Controller");
		scope.executeCommand = function(command){
//			alert(command);
			return "response";
		};
	}]);