'use strict';

myApp.controller('supportController', ['$rootScope','$scope',
    function($rootScope,scope) {
window.open("http://atomiton.com/contact/","_blank");
        scope.twitter=function(){
            window.open("http://twitter.com/AtomitonInc");
        }

        scope.facebook=function(){
            window.open("http://www.facebook.com/atomiton");
        }
        scope.linkedIn=function(){
            window.open("http://www.linkedin.com/company/mqidentity-inc-");
        }
        scope.mail=function(){
            window.open("mailto:info@atomiton.com");
        }
    }]);