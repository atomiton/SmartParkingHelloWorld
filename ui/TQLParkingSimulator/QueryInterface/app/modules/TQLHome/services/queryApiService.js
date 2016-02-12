

angular.module('serviceModule').
    service('queryApiService',['messagesBusService','HttpService','$q','guid','$timeout'
        ,function(messagesBusService,HttpService,$q,guid,$timeout){


            //getSchemaData - fetch the complete schema to show in the left hand pane.
            
            var queryURL = TQL.URL.getQueryInterface();

            this.post = function(jsonData)
            {
                var deferred = $q.defer();
                
                	HttpService.post(queryURL, jsonData, {
                	    method: "POST",
                	    headers: {
                	        "content-type": "text/plain"
                	    }
                	}).then(function(response){
//                		alert(data);
                		console.log("postdata received as ");
                		console.log(response);
                		deferred.resolve(JSON.stringify(response/*.Response.Data*/));
                	}, function(error){
                		deferred.reject(error);
                	});
                   
                return deferred.promise;
            }

           
        }]).
    service('queryApiServiceXML',['messagesBusService','HttpService','$q','guid','$timeout'
        ,function(messagesBusService,HttpService,$q,guid,$timeout){


            //getSchemaData - fetch the complete schema to show in the left hand pane.

            var queryURL = TQL.URL.getQueryInterface();

            this.post = function(jsonData)
            {
                var deferred = $q.defer();

                HttpService.post(queryURL, jsonData, {
                    method: "POST",
                    headers: {
                        "content-type": "text/plain"
                    }
                }).then(function(response){
//                		alert(data);
                    console.log("postdata received as ");
                    console.log(response);
                    deferred.resolve(response);
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
            }


        }]);