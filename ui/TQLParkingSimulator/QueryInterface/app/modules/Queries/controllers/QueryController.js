myApp.controller('QueryController', [
		'$rootScope',
		'$scope',
		'$route',
		'$location',
		'TransportFactory',
		'messagesBusService',
		'guid', 
		'usSpinnerService',
		'$timeout',
		function($rootScope, $scope, $route, $location, TransportFactory,
				messagesBusService,guid,usSpinnerService,$timeout) {
			$scope.model = $rootScope.currentTab;
			$scope.queryText = $scope.model.data;
			
			$scope.actions = $scope.model.perspectives[0].actions;
			$scope.result = "";
			$scope.showConfigureModal = false;
			
			$scope.elementId = guid();
			$scope.tabs = $scope.model.perspectives[0].resultPanel;
			var  htmlToPlaintext = function(text) {
				  return String(text).replace(/<[^>]+>/gm, '');
				}
			
			 $scope.editorOptions = {
		             language: 'en'
		            // uiColor: '#000000'
		         };
			 $scope.configured = {
					 type : $scope.model.config.type,
					 url :$scope.model.config.url,
					 method : $scope.model.config.method
			 };//$scope.model.config;
			
			var handlerScope = $scope;
			
			var handler = function(action,scope){
				if(action.event == 'model:save'){
					
				}else if(action.event == 'model:saveas'){
					
				}else if(action.event == 'model:run'){
					
					$scope.run();
					
				}else if(action.event == 'model:execute'){
					$scope.run();
				}else if(action.event == 'model:configure'){
					$scope.showConfigurations();
				}
			}
			var actionEvent = {
					name : 'homeToolClicked-'+$scope.elementId,
					subscriberScope : handlerScope,
					handler: handler
			}
			messagesBusService.register('toolClicked'+$scope.elementId,actionEvent);
			
			
			$scope.execute = function(){
		    	$scope.run();
		    };
		    
		    var isBlank = function(val){
				
				if(angular.isUndefined(val) || val == null || val ==''){
					return true;
				}else {
					for(var key in val){
                        if(key=='method')
                            continue;

						var innerVal = val[key];
						if(angular.isUndefined(innerVal) || innerVal == null || innerVal ==''){
							return true;
						}
					}
					
				}
				return false;
			};
			$scope.run = function(){
		        var data='';
		        try
		        {
		            var find = '&nbsp;';
		            var re = new RegExp(find, 'g');
		            var text='';

		            text= $scope.queryText.replace(re, '');
		            var find = '</br>';
		            var re = new RegExp(find, 'g');
		            text = text.replace(re, '');


		             data = JSON.parse($scope.formatJson(Encoder.htmlDecode(htmlToPlaintext(text)).trim()));
		        }
		        catch(e)
		        {
		            $scope.result= 'Error: '+e.message;
		            console.log(e.stack);
		            return;
		        }

				
				if(isBlank($scope.configured) == true){
					alert("Configurations not complete!");
					return ;
				}
				var config = {
					    type: $scope.configured.type,
					    data:data
					};
				if($scope.configured.type == 'websocket'){
					config.url = $scope.configured.url;
				}else {
		            var urlSlices  = $scope.configured.url.split('/');
		            var endPoint = urlSlices[urlSlices.length-1];
					config.url= "http://mqenginehost.mqidentity.net:8081/"+endPoint;
					config.method = $scope.configured.method;
				}
				usSpinnerService.spin($scope.elementId+ 'result-panel');
				TransportFactory.getInstance(config).executeRequest().then(
			            function(data)
			            {
                            $scope.result=data.data;//JSON.stringify(data.data,null,"    ");
                            usSpinnerService.stop($scope.elementId+ 'result-panel');
			            },
			            function(error)
			            {
                            $scope.result=error;
                            usSpinnerService.stop($scope.elementId+ 'result-panel');
			            }
			        );
				
				
			}
			/*===pop up==*/
			$scope.showConfigurations=function(){
//				alert($scope.elementId);
				$scope.showConfigureModal = true;
//			document.getElementById($scope.elementId+'popupmodal').style.display = "block";
			}
			$scope.popup_hide=function(){
//			document.getElementById($scope.elementId+'popupmodal').style.display = "none";
				$scope.showConfigureModal = false;
			}
			$scope.ok=function(){
//			document.getElementById($scope.elementId+'popupmodal').style.display = "none";
				$scope.showConfigureModal = false;
			}	
			
			
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
	        }


		} ]);