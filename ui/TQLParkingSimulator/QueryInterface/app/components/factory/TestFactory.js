factoryModule.factory('TestFactory',
    ['messagesBusService', function(messagesBusService) {

        return function Message() {

            var message ='first Message';
            var subscriberEvent = {
                name: 'event-subscriber',
                handler: function (data) {
                    // Store the given data in scope: { msg: 'Hello World!' }
                    message = data.msg;
                    console.log('data is '+ data);
                }
            };

            messagesBusService.register('event', subscriberEvent);

            this.getMessage = function()
            {
                return message;
            }



        }

    }
        ]
)