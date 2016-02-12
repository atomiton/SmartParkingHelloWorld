/**
 * Created by puneettiwari on 11/26/14.
 */

angular.module('serviceModule').
    service('TransportService',['HttpService','websocketService',function($http){


      var requestType = '';
      var endPoint = '';

        this.setRequestType = function(type)
        {
            requestType = type;

        }
        this.getRequestType = function(type)
        {
           return requestType;

        }

        this.setEndPoint = function(url)
        {
              endpoint=url;
        }

        this.executeRequest = function()
        {
            //decide on the type of request
            if(requestType='websocket')
            {
                executeHttpRequest();
            }
            else
            {
                executewebSocketRequest();
            }


        }

        var executeHttpRequest = function()
        {
            //returns promise

        }

        var executewebSocketRequest =function()
        {
                //make it return promise by wrapping
        }

    }])