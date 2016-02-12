var mqapp = angular.module('mqapp', ['widgetModule','ui.bootstrap'])
  .controller('Controller', ['$scope', function($scope) {
  
  
    $scope.data = [
    {
        "name":"Models",
        "type":"model",
        "icon":""
		
    },
    {
        "name":"Queries",
        "type":"query",
        "icon":""
    },
    {
        "name":"Policies",
        "type":"policy",
        "icon":""
    },
	{
        "name":"Visualizer",
        "type":"visyaliser",
        "icon":"",
		"isOpen": true
    },
	{
        "name":"ScoreCard",
        "type":"scorecard",
        "icon":""
		
    }
	

];
	
	
	
  }]);