'use strict';

myApp.controller('studioController', ['$rootScope','$scope','$http',
                                    function($rootScope,$scope,$http) {
                                        $scope.tabs = [ {
                                            title : "Try TQL",
                                            linkURL : "/home"
                                        }, {
                                            title : "TQL Studio",
                                            linkURL : "/tql_studio"
                                        }, {
                                            title : "IoT Simulator",
                                            linkURL : "/iot_simulator"
                                        }, {
                                            title : "Docs",
                                            linkURL : "/docs"
                                        }];
                                        $scope.supportClick = function(){
                                                window.open("http://atomiton.com/contact/","_blank");
                                        };

    $scope.username = '';
    $scope.email = '';
    $scope.recvMarketing = 'No';

    $scope.register = function()
    {
        console.log("in here...");

        var payLoad = {
            name : $scope.username,
            email : $scope.email,
            recvMarketing : $scope.recvMarketing
        };

        var data = {
            "AsyncService": {
                "command": "sendEmail",
                "runStatus": "pending",
                "payload": JSON.stringify(payLoad)
            }
        };

        $http.post(TQL.URL.getCreateTask(), data).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                alert("Registered Successfully");
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("There was an error registering.");
            });
    }

                                        $scope.twitter=function(){
                                            window.open("http://twitter.com/AtomitonInc");
                                        }

                                        $scope.facebook=function(){
                                            window.open("http://www.facebook.com/atomiton");
                                        }
                                        $scope.linkedIn=function(){
                                            window.open("http://www.linkedin.com/company/mqidentity-inc-");
                                        }
                                        $scope.mail=function(){
                                            window.open("mailto:info@atomiton.com");
                                        }

}]);

