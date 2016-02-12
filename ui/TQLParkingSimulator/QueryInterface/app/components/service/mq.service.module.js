var serviceModule = angular.module('serviceModule',['messageBusModule']);

serviceModule.
    factory('socket', function (socketFactory) {
        return socketFactory();
    });