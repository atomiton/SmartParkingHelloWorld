'use strict';

myApp.controller('HomeController', ['$rootScope','$scope','$route','$location','schemaService','messagesBusService','queryApiService','$q','guid','$http','usSpinnerService','queryApiServiceXML'
    ,function($rootScope,$scope, $route ,$location, schemaService, messagesBusService,queryApiService,$q,guid,$http,usSpinnerService,queryApiServiceXML) {


        $scope.shell = {};
        $scope.isHome = true;
        $scope.queryText = "";
        $scope.nextAPICount=1;
        $scope.elementId = "homePage-guid";
        $scope.result = "";
        $scope.set404Text=function(){
            $scope.setNextDisabled(true);
            var congratsText = "\n \n Congratulations! You have finished the TQL Interactive tutorial. Click on 'Tutorial' to start it again.";
            $scope.queryText = congratsText;
            editor.setValue(congratsText);
            $scope.result = "";
        };
        $scope.removeComments=function(data){
        	return stripJsonComments(data);
        };
        $scope.startEditorSpin = function(){
            usSpinnerService.spin('editor');
        };
        $scope.stopEditorSpin = function(){
            usSpinnerService.stop('editor');
        };
        $scope.startResultSpin = function(){
            usSpinnerService.spin('resultkey');
        };
        $scope.stopResultSpin = function(){
            usSpinnerService.stop('resultkey');
        };
        //===========================   Json Format
        var repeat = function(s, count) {
            return new Array(count + 1).join(s);
        };
        $scope.formatJson=function(json) {
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
                        newJson=newJson.trim();
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

        //============================ Json Format end

        var editor = null;
        $scope.aceLoaded = function(_editor) {
            // Options
            // _editor.setReadOnly(true);
            var _session = _editor.getSession();
            _session.setUndoManager(new ace.UndoManager());
            editor = _editor;
        };

        $scope.aceChanged=function(editor) {
            editor[1].env.editor.session.selection.clearSelection();
            editor[1].env.editor.session.setShowPrintMargin(false);
        };
        $scope.runAjax=function(){
            var urlFirstSeg=TQL.URL.getTutorialApi();
            var url=urlFirstSeg+$scope.nextAPICount+".json";
            $scope.result = "";
            $scope.startEditorSpin();
            $http.get(url).
                success(function(data, status, headers, config) {
                   var queryData=data;
                   if($scope.nextAPICount>1){
                       var substr = data.split('-->');
                       var comment = substr[0]+'-->';
                       var dat = substr[1];
                       /*dat= $scope.formatJson(dat);
                       if(dat){
                           dat = $scope.formatJson(dat);
                       }*/
                       queryData= comment + '\n' +dat;
                   }
                   $scope.queryText=queryData;//formatJson(data);
                    editor.setValue(queryData);
                    $scope.stopEditorSpin();
                    $scope.nextAPICount++;
                }).
                error(function(data, status, headers, config) {
                    $scope.set404Text();
                    $scope.stopEditorSpin();
                });
        };
        schemaService.getInteractiveShellData().then(function(data){
            $scope.shell = data;
        });
        $scope.visualizerLaunched = false;
        $scope.showingVisualizer = false;
        $scope.uniqueIdForCanvas = guid();
        $scope.commandToBeWatched = [$scope.visualizerCommand];
        $scope.commandWatchedIndex = -1;
        $scope.enableMinimize = false;
        $scope.errorOccured = false;
        $scope.error = "";

        $scope.shellGreeting = "Welcome to a guided tour of the TQL Interactive shell. \n TQL is a system designed for organizing, accessing and interacting with physical Things, like devices, machines, equipment and passive resources. \nTQL to Things is like SQL to Data. \n Get started with 'help'\n To run the tutorial, type 'tutorial' ";

        var  htmlToPlaintext = function(text) {
            return String(text).replace(/<[^>]+>/gm, '');
        };

        var getJson = function(queryText){

            var find = '&nbsp;';
            var re = new RegExp(find, 'g');
            var text='';

            text= queryText.replace(re, '');
            var find = '</br>';
            var re = new RegExp(find, 'g');
            text = text.replace(re, '');


            return JSON.parse($scope.formatJson(Encoder.htmlDecode(htmlToPlaintext(text)).trim()));

        };

        $scope.setNextDisabled=function(val){
            if($scope.actions!= undefined && $scope.actions.length>0){
                for(var i=0;i<$scope.actions.length;i++){
                    var actionGroup = $scope.actions[i];
                    if(actionGroup !=undefined && actionGroup.length>0){
                        for(var j=0;j<actionGroup.length;j++){
                            if(actionGroup[j].name === 'Next' && actionGroup[j].event === 'next'){
                                actionGroup[j].disabled=val;
                            }
                        }
                    }
                }
            }
        };
        var formatXml =function(xml) {
            var formatted = '';
            var reg = /(>)(<)(\/*)/g;
            xml = xml.replace(reg, '$1\r\n$2$3');
            var pad = 0;
            jQuery.each(xml.split('\r\n'), function(index, node) {
                var indent = 0;
                if (node.match( /.+<\/\w[^>]*>$/ )) {
                    indent = 0;
                } else if (node.match( /^<\/\w/ )) {
                    if (pad != 0) {
                        pad -= 1;
                    }
                } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
                    indent = 1;
                } else {
                    indent = 0;
                }

                var padding = '';
                for (var i = 0; i < pad; i++) {
                    padding += '  ';
                }

                formatted += padding + node + '\r\n';
                pad += indent;
            });

            return formatted;
        };
        $scope.executeCommand = function(action){
            if(action.event == 'tutorial'){
                $scope.queryText="";
                $scope.setNextDisabled(false);
                $scope.nextAPICount=1;
                if(!$scope.showingVisualizer){
                	$scope.showVisualizerPrompt();
                }
                $scope.runAjax();
                try{
	                //$scope.queryText = JSON.stringify(json);
					queryApiService.post($scope.queryText).then(function(data){
                        $scope.result = "";
					},function(error){$scope.result=""; /*$scope.result= "Error : "+error.status*/});
				}catch (e){
					$scope.result = "<b>Error : </b>"+ e.message;
				}
            }
            else if(action.event == 'help'){
            	//var json = {query: {help:{}}};
            	$http.get(TQL.URL.getHelpApi()).
            		success(function(data, status, headers, config) {
            				$scope.queryText = data;
            		}).
            		error(function(data, status, headers, config) {

            		});

            	/*$scope.queryText = JSON.stringify(json);
            	queryApiService.post(TQL.URL.getQueryInterface(),JSON.stringify(json)).then(function(data){
                	$scope.result = data;
                },function(error){ $scope.result= "<b>Error : </b>"+error.status});*/
            }
            else if(action.event == 'next'){
                $scope.runAjax();
            }
            else {
                var queryTxt=$scope.removeComments(editor.getValue());
                var queryresult = queryTxt.split('?>');
                var comment = queryresult[0]+'?>';
                var resultData=queryresult[1];
                /* var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(resultData); */
                $scope.startResultSpin();
                if(queryTxt!= undefined){
                    if(htmlToPlaintext($scope.queryText) != ""){
                        try {
                            queryApiServiceXML.post(resultData).then(function(data){
                                console.log(data);
                                $scope.stopResultSpin();
								var xml_formatted=formatXml(data);
                                $scope.result =xml_formatted;
                            },function(error){
                                $scope.stopResultSpin();
                                $scope.result= "Error : "+error.status;
                            });
                        }
                        catch (e){
                            $scope.stopResultSpin();
                            $scope.error = "Error : "+ e.message;
                            $scope.errorOccured = true;
                        }
                    }
                }
                else{
                    if(htmlToPlaintext($scope.queryText) != ""){
                	try {
                		queryApiService.post(resultData).then(function(data){
                            $scope.stopResultSpin();
                            //var xml_formatted=$scope.formatXml(data);
                            $scope.result =data;
                           // $scope.result = xml_formatted;
                           // $scope.result =$scope.formatXml(data);
                		},function(error){
                            $scope.stopResultSpin();
                            $scope.result= "Error : "+error.status;
                        });
                	}
                    catch (e){
                        $scope.stopResultSpin();
                		$scope.error = "Error : "+ e.message;
                		$scope.errorOccured = true;
    				}

                }
              }

            }
        };
        $scope.showVisualizerPrompt = function(){
            $scope.visualizerLaunched = true;
        };
        $scope.controllerScope = $scope;

        $scope.hideErrorPrompt = function(){
        	$scope.errorOccured = false;
        };
        $scope.launch = function(){
//		console.clear();
            $scope.enableMinimize = true;
            $scope.hideVisualizerPrompt();
            $scope.showingVisualizer = true;
//		$scope.visualizerLaunched = false;
            $('#terminal').addClass("showHalf");
//		$('#expandTerminalButton').addClass('visible-item');
            $('#collapseTerminalButton').addClass("visible-item");
            $('#adjacent-visualizer').addClass('visible-item');
        };
        $scope.handleLaunch = function(){
//		console.clear();
            $('#terminal').addClass("showHalf");
//		$('#expandTerminalButton').addClass('visible-item');
            $('#collapseTerminalButton').addClass("visible-item");
            $('#adjacent-visualizer').addClass('visible-item');
        };
        var visualizerLaunchEvent = {
            name : "launch-visualizer",
            handler : function(){
                $scope.handleLaunch();
            }
        };

        var toolEvent = {
            name : "tool-event",
            handler : function(data){
                $scope.executeCommand(data);
            }
        };
        $scope.hideVisualizerPrompt = function(){
            $scope.visualizerLaunched = false;
        };

        messagesBusService.register("launch", visualizerLaunchEvent);
        messagesBusService.register("toolClicked"+$scope.elementId,toolEvent);
        $rootScope.tabs = [{
            title : "Try TQL",
            linkURL : "/home"
        },{
            title : "TQL Studio",
            linkURL : "/tql_studio"
        },{
            title : "IoT Simulator",
            linkURL : "/iot_simulator"
        },{
            title : "Docs",
            linkURL : "/docs"
        }];
        $scope.supportClick = function(){
                window.open("http://atomiton.com/contact/","_blank");
        };
        $scope.register=function($rootScope){
            $location.url('/tql_studio');
        };
        $scope.dynamicPopover="Register to receive the latest news and information on the release.If you are interested in being selected as a Beta user, please indicate so when you register!";
        $scope.dynamicPopoverTitle="Atomiton TQL 1.0 is coming out soon!";
        $scope.actions = [
            [
                {
                    "name" : "Run",
                    "event" : "run",
                    "icon" : "icon-run",
                    "disabled":false
                },
                {
                    "name" : "Help",
                    "event" : "help",
                    "icon" : "icon-help",
                    "disabled":false
                },
                {
                    "name" : "Tutorial",
                    "event" : "tutorial",
                    "icon" : "icon-configure",
                    "disabled":false
                },
                {
                    "name" : "Next",
                    "event" : "next",
                    "icon" : "icon-forward",
                    "disabled":true
                }
            ]
        ];

        $scope.resultPanel = [/* {
            "type" : "Raw",
            "default" : true,
            "event" : "query:formatRaw"
        }, {
            "type" : "Tree",
            "default" : false,
            "event" : "query:formatTree"
        }, {
            "type" : "Json",
            "default" : true,
            "event" : "query:formatJson"
        }*/ ];

        $scope.twitter=function(){
            window.open("http://twitter.com/AtomitonInc");
        };

        $scope.facebook=function(){
            window.open("http://www.facebook.com/atomiton");
        };
        $scope.linkedIn=function(){
            window.open("http://www.linkedin.com/company/mqidentity-inc-");
        };

        $scope.mail=function(){
            window.open("mailto:info@atomiton.com");
        };

    }]);

