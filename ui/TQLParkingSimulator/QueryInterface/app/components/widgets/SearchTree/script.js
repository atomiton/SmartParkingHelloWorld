var searchTreeApp = angular.module('searchTreeApp',['widgetModule','ui.bootstrap','serviceModule'])
    .controller('Controller', ['$scope', function($scope) {
  
  $scope.searchText ="";
    $scope.data = [
    {
        "name":"Models",
        "type":"model",
        "icon":"",
		"isOpen": true,
        "perspectives":[
            {
                "name":"Repository",
                "type":"repository",
                "templateUrl": "tabs.html",
                "default":true,
                "test" : " Testing Data",
                "actions":[
                    {
                        "type":"Save",
                        "event":"model:save"
                    },
                    {
                        "type":"Save As",
                        "event":"model:saveAs"
                    },
                    {
                        "type":"Run",
                        "event":"model:run"
                    },
                    {
                        "type":"Execute",
                        "event":"model:execute"
                    }
                ],
                "resultPanel":[

                ]
            },
            {
                "name":"Heirarchy",
                "type":"heirarchy",
                "templateUrl": "templates/Models/heirarchyModelTemplate.html",
                "default":"",

                "actions":[
                    {
                        "type":"Save",
                        "event":"model:save"
                    },
                    {
                        "type":"Save As",
                        "event":"model:saveAs"
                    },
                    {
                        "type":"Run",
                        "event":"model:run"
                    },
                    {
                        "type":"Execute",
                        "event":"model:execute"
                    }
                ],
                "resultPanel":[

                ]
            }

        ]
    },
    {
        "name":"Queries",
        "type":"query",
        "icon":"",
        "templateUrl": "templates/Queries/queryTemplate.html",
        "perspectives":[
            {
                "name":"qPerspective1",
                "type":"qPerspective1",
                "templateUrl": "templates/Queries/queryTemplate1.html",
                "default":true,
                "actions":[
                    {
                        "type":"Save",
                        "event":"query:save"
                    },
                    {
                        "type":"Save As",
                        "event":"query:saveAs"
                    },
                    {
                        "type":"Run",
                        "event":"query:run"
                    },
                    {
                        "type":"Execute",
                        "event":"query:execute"
                    }
                ],
                "resultPanel":[
                    {
                        "type":"Raw",

                        "event":"query:formatRaw"
                    },
                    {
                        "type":"Tree",

                        "event":"query:formatTree"
                    },
                    {
                        "type":"Json",

                        "event":"query:formatJson"
                    }
                ]
            }

        ]

    },
    {
        "name":"Policies",
        "type":"policy",
        "icon":"",
        "perspectives":[
            {
                "name":"polPerspective1",
                "type":"polPerspective1",
                "default":true,
                "templateUrl": "templates/Policies/policyTemplate.html",
                "actions": [
                    {
                        "type": "Save",
                        "event": "policy:save"
                    },
                    {
                        "type": "Save As",
                        "event": "policy:saveAs"
                    },
                    {
                        "type": "Run",
                        "event": "policy:run"
                    },
                    {
                        "type": "Execute",
                        "event": "policy:execute"
                    }
                ],
                "resultPanel": [
                    {
                        "type": "Raw",
                        "default":true,
                        "event": "policy:formatRaw"
                    },
                    {
                        "type": "Tree",
                        "default":false,
                        "event": "policy:formatTree"
                    },
                    {
                        "type": "Json",
                        "default":false,
                        "event": "policy:formatJson"
                    }
                ]
            }
        ]

    }

];
	 $scope.trees = [


	                 {
	                     "name":"namespace1",
	                     "type":"query",
	                     "isOpen" : true,
	                     "children":[
	                         {

	                             "name":"sub-namespace1",
	                             "type":"query",
	                             "isOpen" : true,
	                             "children":[

	                                 {
	                                     "id":"789",
	                                     "name":"Traffic",
	                                     "type":"query",
	                                     "children":[],
	                                     "perspective":"qPerspective1",
	                                     "selectedResultPanel":"",
	                                     "active":true,

	                                     "config":{
	                                         "type":"websocket",
	                                         "url":"ws://192.241.194.116:8080/fid-pulseprws",
	                                         "method":"",
	                                         "data":""
	                                     },
	                                     "data":"{\"command\":\"get\",\"target\":\"widgetSettings\"}"
	                                 }
	                             ]
	                         }
	                     ]
	                 },
	                 {
	                     "name":"namespace2",
	                     "type":"policy",
	                     "isOpen" : true,
	                     "children":[
	                         {
	                             "name":"sub-namespace2",
	                             "type":"policy",
	                             "isOpen" : true,
	                             "children":[
	                                 {
	                                     "id":"111",
	                                     "type":"policy",
	                                     "name":"Traffic",
	                                     "perspective":"polPerspective",
	                                     "children":[],
	                                     "selectedResultPanel":"",
	                                     "active":true,

	                                     "config":{
	                                         "type":"websocket",
	                                         "url":"ws://192.241.194.116:8080/fid-pulseprws",
	                                         "method":"",
	                                         "data":""
	                                     },
	                                     "data":"{\"command\":\"get\",\"target\":\"widgetSettings\"}"


	                                 }

	                             ]
	                         }
	                     ]
	                 }
	             ];
	
	
  }]);