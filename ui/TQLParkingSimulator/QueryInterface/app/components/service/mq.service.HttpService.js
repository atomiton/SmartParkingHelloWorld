/**
 * Created by puneettiwari on 11/21/14.
 */




'use strict';

/**
 * @service - HttpsService
 * @description - The HttpService module is a basic wrapper over $http and
 *              $resource and should be used for all ajax operations.Any
 *              implementation that is applicable for all ajax operation should
 *              be done here.
 * @requires $http, $resource
 */
angular.module('serviceModule').
    service('HttpService',['$http',function($http){

        return {



//		/**
//		 *
//		 * @name - get
//		 * @description - The function wraps the $http.get function and takes
//		 *              the same number of arguments as angular $http get.Any
//		 *              custom operation required can go into the then
//		 *              function.For usage visit
//		 *              http://docs.angularjs.org/api/ng.$http#methods_get
//		 *
//		 */
            get: function (url, config) {
                return $http.get(url).then(function (response) {
                    // The then function here is an opportunity to modify
                    // the response
                    console.log(response);
                    // The return value gets picked up by the then in the
                    // controller.
                    return response.data;
                });

            },


            /**
             *
             * @name - post
             * @description - The function wraps the $http.post function and
             *              takes the same number of arguments as angular
             *              $http post.Any custom operation required can go
             *              into the then function.For usage visit
             *              http://docs.angularjs.org/api/ng.$http#methods_post
             *
             */
            post: function (url, data, config) {
                return $http.post(url, data, config).then(function (response) {
                    // The then function here is an opportunity to modify
                    // the response
                    console.log(response);
                    // The return value gets picked up by the then in the
                    // controller.
                    return response.data;
                });

            },

            /**
             *
             * @name - put
             * @description - The function wraps the $http.put function and
             *              takes the same number of arguments as angular
             *              $http put.Any custom operation required can go
             *              into the then function.For usage visit
             *              http://docs.angularjs.org/api/ng.$http#methods_put
             *
             */
            put: function (url, data, config) {

                return $http.put(url, data, config).then(function (response) {
                    // The then function here is an opportunity to modify
                    // the response
                    console.log(response);
                    // The return value gets picked up by the then in the
                    // controller.
                    return response.data;
                });

            },

            /**
             *
             * @name - _delete
             * @description - The function wraps the $http.get function and
             *              takes the same number of arguments as angular
             *              $http get.Any custom operation required can go
             *              into the then function.For usage visit
             *              http://docs.angularjs.org/api/ng.$http#methods_get
             *
             */
            _delete: function (url, config) {
                return $http.delete(url).then(function (response) {
                    // The then function here is an opportunity to modify
                    // the response
                    console.log(response);
                    // The return value gets picked up by the then in the
                    // controller.
                    return response.data;
                });
                // Return the promise to the controller

            },
            executeRequest:function(config)
            {
                if(config.method==''||config.method==undefined)
                    config.method='GET';

               return $http({
                    method: config.method,
                    url: config.url,
                    //transformRequest: transformRequestAsFormPost,
                    data: config.data,
                    headers:config.headers
                })
            }



        };
    }]
);