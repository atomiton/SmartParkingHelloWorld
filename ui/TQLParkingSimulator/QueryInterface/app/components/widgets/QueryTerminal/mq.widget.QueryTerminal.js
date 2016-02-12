widgetModule.directive('queryTerminal', ['messagesBusService',function (messagesBusService) {
    return {
        restrict: 'E',
        replace: true,
        transclude : true,
        template: '<div ></div>',
        scope : {
        	execute : '&',
        	greeting : "="
        },
        link: function (scope, elem, attrs) {
        	function checkIfCommandWatched(command){
        		for(var i = 0; i< scope.commandsToWatch.length; i++){
        			if(command == scope.commandsToWatch[i].command){
        				scope.commandsToWatch[i].executed = true;
        				return i;
        			}
        		}
        		return -1;
        	};
        	scope.terminalFunction = function (command, term) {
        		console.log(scope);
//        		var val= scope.$parent.executeCommand(command);
//        		var val = scope.execute({command:command});
//        		console.log("promise..");
//        		console.log(val);
//        		term.echo(val);
//        		term.echo(scope.execute({command:command}));
        		
        		
        		scope.execute({command:command}).then(function(data){
        			console.log("echo...");
        			console.log(data);
        			term.echo (data);
        		},function(error){
        			term.echo(error);
        		})
            };
            $(elem).terminal(scope.terminalFunction,{
            	prompt: '$ ',greetings: scope.greeting
            },scope);
        }
    };
}]);