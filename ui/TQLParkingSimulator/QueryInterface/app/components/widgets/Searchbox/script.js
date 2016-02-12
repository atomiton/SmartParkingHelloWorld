angular.module('searchapp',['widgetModule','ui.bootstrap'])
.controller('SearchController',['$scope',function($scope){
	$scope.search = '';
	
	$scope.$watch('search',function(newVal,oldVal){
		alert(newVal);
	})
}]);