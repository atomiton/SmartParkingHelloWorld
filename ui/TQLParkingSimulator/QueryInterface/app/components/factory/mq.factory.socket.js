'use strict';

angular.module('mqsocket', []).
provider('socketFactory', function () {

    // when forwarding events, prefix the event name
    var defaultPrefix = 'socket:',
        ioSocket;

    // expose to provider
    this.$get = function ($rootScope, $timeout) {

        var asyncAngularify = function (socket, callback) {
            return callback ? function () {
                var args = arguments;
                $timeout(function () {
                    callback.apply(socket, args);
                }, 0);
            } : angular.noop;
        };

        return function socketFactory(options) {

            if (!window.WebSocket) {
                window.WebSocket = window.MozWebSocket;
            }

            if (!window.WebSocket) {
                console.log("Your browser does not support WebSocket");
                return;
            }
            // Not using currently but can be used to override defaults.
            options = options || {};
            var socket = new WebSocket(WEBSOCKET_URL);
            var prefix = options.prefix || defaultPrefix;
            var defaultScope = options.scope || $rootScope;

            var addListener = function (eventName, callback) {
                socket.addEventListener(eventName, asyncAngularify(socket, callback));
            };

            

            var wrappedSocket = {
                on: addListener,
                addListener: addListener,
                readyState: socket.readyState,

                send: function (data) {
                    socket.send(data);
                },

                close: function () {
                    socket.close();
                    this.readyState = socket.readyState;
                    console.log('After closing socket');
                },

                reconnect: function () {
                    socket = new WebSocket(WEBSOCKET_URL);
                    this.readyState = socket.readyState;
                },
                
                onOpen: function() {
                	this.readyState = socket.readyState;
                },
                
                onClose: function() {
                	this.readyState = socket.readyState;
                },
                
                
                removeListener: function () {
                    return socket.removeEventListener.apply(socket, arguments);
                },
                
                setReadyState : function () {
                	var state = socket.readyState;
                	this.readyState = socket.readyState;
                },

                // when socket.on('someEvent', fn (data) { ... }),
                // call scope.$broadcast('someEvent', data)
                forward: function (events, scope) {
                    if (events instanceof Array === false) {
                        events = [events];
                    }
                    if (!scope) {
                        scope = defaultScope;
                    }
                    events.forEach(function (eventName) {
                        var prefixedEvent = prefix + eventName;
                        var forwardBroadcast = asyncAngularify(socket, function (data) {
                            scope.$broadcast(prefixedEvent, data);
                        });
                        scope.$on('$destroy', function () {
                            socket.removeEventListener(eventName, forwardBroadcast);
                        });
                        socket.on(eventName, forwardBroadcast);
                    });
                }
            };

            return wrappedSocket;
        };
    };
});