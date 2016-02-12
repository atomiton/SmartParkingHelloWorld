widgetModule.directive('testDirective',function ( )  {
    return {
      restrict: 'E',
      scope: {
        checkData: '=checkData'
      },
      template : '<div ng-click="showData()">Hi. Click me </div><br><br>',
      link : function(scope, element, attr){
    	  scope.showData = function(){
    		  alert(scope.checkData);
    	  }
      }
    }
});