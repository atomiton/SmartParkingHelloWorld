widgetModule.directive('tabPanel',['messagesBusService',function(messagesBusService){


    var link =function(scope,element,attrs){

        scope.clearedResults = true;


        /*===collapse button starts==*/
        scope.collapse=function(){
            $( "body" ).toggleClass("leftcollapse" );
        };
        /*===collapse ends==*/
        /*===result window maximise starts==*/
        scope.maximize_result=function($event){
            //alert("max");
            $($event.currentTarget).parents('.multiEditor').addClass("maximize" ).removeClass("minimize restore");
        };
        /*===result window maximise ends==*/
        /*===result window minimise starts==*/
        scope.minimize_result=function($event){
            //alert("min");
            $($event.currentTarget).parents('.multiEditor').addClass("minimize" ).removeClass("maximize restore");
        };
        /*===result window minimise ends==*/
        /*===result window restore starts==*/
        scope.restore_result=function($event){
            //alert("res");
            $($event.currentTarget).parents('.multiEditor').addClass("restore" ).removeClass("minimize maximize");
        };

        /*===result window minimise ends==*/
        /*===clear button starts===*/
        scope.clear=function(){
            //scope.clearedResults = true;
            scope.resultData = "";
        };
        /*===clear button ends==*/
        scope.$watch('resultData',function(newVal,oldVal){
            if(newVal != ""){
			scope.tabContentText=scope.resultData;
                    /* scope.tabContentText=formatJson(scope.resultData);
                    scope.isJsonTree = false; */
            }
            else{
                scope.tabContentText = "";
            }
            /*if(angular.isDefined(scope.activeTab)){

                messagesBusService.publish('format'+scope.uniqueId,{type: scope.activeTab.event});
            }*/
        });
        var repeat= function(s, count) {
            return new Array(count + 1).join(s);
        };

        var formatJson=function(json) {
            var i           = 0,
                il          = 0,
                tab         = "    ",
                newJson     = "",
                indentLevel = 0,
                inString    = false,
                currentChar = null;

            for (i = 0, il = json.length; i < il; i += 1) {
                currentChar = json.charAt(i);

                switch (currentChar) {
                    case '{':
                    case '[':
                        if (!inString) {
                            newJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
                            indentLevel += 1;
                        } else {
                            newJson += currentChar;
                        }
                        break;
                    case '}':
                    case ']':
                        if (!inString) {
                            indentLevel -= 1;
                            newJson += "\n" + repeat(tab, indentLevel) + currentChar;
                        } else {
                            newJson += currentChar;
                        }
                        break;
                    case ',':
                        if (!inString) {
                            newJson += ",\n" + repeat(tab, indentLevel);
                        } else {
                            newJson += currentChar;
                        }
                        break;
                    case ':':
                        if (!inString) {
                            newJson += ": ";
                        } else {
                            newJson += currentChar;
                        }
                        break;
                    case ' ':
                    case "\n":
                    //newJson=newJson.trim();
                    case "\t":
                        if (inString) {
                            newJson += currentChar;
                        }
                        break;
                    case '"':
                        if (i > 0 && json.charAt(i - 1) !== '\\') {
                            inString = !inString;
                        }
                        newJson += currentChar;
                        break;
                    default:
                        newJson += currentChar;
                        break;
                }
            }

            return newJson;
        };
        /*var formatEvent  = {
            name: "formatResult-" + scope.uniqueId,
            handler: function (data) {
                if(data.type == "query:formatRaw"){
                    if(!scope.clearedResults){
                        scope.tabContentText = scope.resultData;
                        scope.isJsonTree = false;
                    }else {
                        scope.tabContentText = "";
                    }
                }else if (data.type == "query:formatTree"){
                    if(!scope.clearedResults){
                        scope.tabContentText = scope.resultData;
                        scope.isJsonTree = true;
                    }else {
                        scope.isJsonTree = false;
                        scope.tabContentText = "";
                    }

                }else if( data.type == "query:formatJson"){
                    if(!scope.clearedResults){
                        scope.tabContentText=formatJson(scope.resultData);
                        scope.isJsonTree = false;}
                    else{
                        scope.tabContentText = "";
                    }
                }

            }
        };*/

        /*messagesBusService.register('format'+scope.uniqueId, formatEvent);*/

        /*if (angular.isDefined(scope.tabs)) {
            scope.activeTab = scope.tabs[0];
        }
        scope.tabClicked = function(tab){
            scope.activeTab = tab;
            messagesBusService.publish('format'+scope.uniqueId,{type : tab.event});
        };*/
        //scope.tabContentText = angular.copy(scope.resultData);
        scope.isJsonTree = false;

        /*console.log("=========================================");
        console.log(scope);
        console.log(element);
        console.log(attrs);
        console.log("=========================================");*/
    };
    return {
        restrict : 'E',
        templateUrl : 'components/widgets/TabPanel/tab-panel.html',
        scope : {
            title : '=',
            resultData : '=',
            tabs : '=',
            uniqueId : "@"
        },
        link : link
    };
}]);