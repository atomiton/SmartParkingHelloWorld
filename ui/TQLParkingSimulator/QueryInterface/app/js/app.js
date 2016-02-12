'use strict';


// Declare app level module which depends on views, and components


var myApp=angular.module('tqlApp', [
    'ngRoute',
//    'ngModel',
    'ui.bootstrap',
    'widgetModule',
    'serviceModule',
    'factoryModule',
    'messageBusModule',
    'angularSpinner',
    'ngSanitize',
    'ngCkeditor',
    'jsonFormatter'/*
    'factoryModule',
    'serviceModule',
    'mqsocket',*/
]).
    config(['$routeProvider','usSpinnerConfigProvider',/*'schemaService',*/function($routeProvider,usSpinnerConfigProvider/*,schemaService*/) {
    	usSpinnerConfigProvider.setDefaults({position: 'relative',color: '#999'});
        $routeProvider.when('/iot_simulator', 
        		{templateUrl: 'modules/IoTSimulator/views/visualizer.html'/*,
        			resolve : {	
	        			'navTabs':function(schemaService){
	                    	 return schemaService.getNavigationTabs();
	        			}
        			}*/
        		});
    	$routeProvider.when('/home', {templateUrl: 'modules/TQLHome/views/homepage.html'});
    	$routeProvider.when('/tql_studio', {templateUrl: 'modules/TQLStudio/views/tqlStudio.html'});
    	$routeProvider.when('/docs', {templateUrl: 'modules/Docs/views/docs.html'});
    	$routeProvider.when('/forum', {templateUrl: 'modules/Forum/views/forum.html'});
    	//$routeProvider.when('/support', {controller:'supportController'});

        $routeProvider.otherwise({redirectTo: '/home'});

    }]);