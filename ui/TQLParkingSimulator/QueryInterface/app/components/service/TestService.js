angular.module('serviceModule').
    service('TestService',['messagesBusService',function(messagesBusService){


        var message ='Nothing recieved yet....';
        var subscriberEvent ='';

        this.subscribe = function(name,callBack)
        {
            subscriberEvent  = {
                name: name,
                handler: function (data) {
                    // Store the given data in scope: { msg: 'Hello World!' }
//                    message = data.msg;
//                    console.log('data is '+ data);
                    callBack(data);
                }
            };
            messagesBusService.register('event', subscriberEvent);
        };



        this.getMessage = function()
        {
            return message;
        }

    }
        ]
)