/**
 * Created by puneettiwari on 11/26/14.
 *
 * constructor object is
 *
 var config = {
    type:'websocket',
    url:'ws://192.241.194.116:8080/fid-pulseprws'

}
 var config = {
    type:'http',
    url:'http://endpoint',
    method:'POST',
    headers:'',
    data:''

}


 */

angular.module('factoryModule').
    service('TransportFactory',['HttpService','websocketService','$q',function(HttpService,websocketService,$q){

        var TransportService = {
            config:''

        };




        TransportService.setRequestType = function(type)
        {
            requestType = type;

        }
        TransportService.getRequestType = function(type)
        {
            return requestType;

        }

        TransportService.setEndPoint = function(url)
        {
            endpoint=url;
        }

        TransportService.executeRequest = function()
        {
            //decide on the type of request
            if(TransportService.config.type=='websocket')
            {
                return executewebSocketRequest();

            }
            else
            {
                return executeHttpRequest();
            }


        }

        var callbacks = {};

        var requestId = 0;

        var getRequestId = function() {
            return requestId++;
        };


        var executeHttpRequest = function()
        {
            console.log(TransportService.config);
               return HttpService.executeRequest(TransportService.config);
            //returns promise

        }

        var executewebSocketRequest =function()
        {

            //make it return promise by wrapping it with $q ;
            var deferred = $q.defer();
            var webSocket= websocketService.setSocketFactory(TransportService.config.url);


            webSocket.on('message', function (data) {

                console.log(data);
                var formattedData=JSON.parse(data.data);
                //messagesBusService.publish('event', { msg: formattedData });
                //TODO: Fetch the message on the basis of request id. Backend implementation to be done.
                var callback = callbacks[0];
                callback.resolve(data);
                webSocket.close();


            })

            webSocket.on('open', function (data) {

             webSocket.onOpen();

                if(webSocket.readyState == 1){
                    //TODO: get the request id from the getrequest id function
                    TransportService.config.data.requestId=0;
                    callbacks[TransportService.config.data.requestId];
                    callbacks[TransportService.config.data.requestId] = deferred;
                    webSocket.send(JSON.stringify(TransportService.config.data));
                }




            });
            return deferred.promise;

            /*then(function(response) {
            request.response = response;
            return response;
        });*/



        }

        //Constructor function which takes in a config object in the above format
      return   {
          getInstance : function(config)
          {
              if(config==undefined)
                 throw 'config is not defined for Transport Service';

              TransportService.config=config;
              return TransportService;


          }

          };

    }])