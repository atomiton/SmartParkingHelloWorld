widgetModule.directive('templateTabPanel',function(){
	
	var link = function (scope, element, attrs) {
//		scope.selectedTabs = [{name : "Query", templateUrl: "tabTestTemplate.html",actions:""}];
		console.log(element);
		scope.tabClose=function(tab){
		  	scope.selectedTabs.splice(scope.selectedTabs.indexOf(tab),1);
		  }
	  };
	  
	return {
		restrict: 'E',
	      scope: {
	    	  selectedTabs: '=selectedTabs'
	      },
	      templateUrl : 'components/widgets/TemplateTabPanel/template-tab-panel.html',
//	      templateUrl : 'template-tab-panel.html',
		  link: link
	}
});