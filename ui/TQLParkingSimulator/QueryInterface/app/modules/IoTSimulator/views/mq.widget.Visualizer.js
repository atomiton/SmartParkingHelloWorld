widgetModule.directive("parkingVisualizer",['schemaService','guid','usSpinnerService','$interval','messagesBusService'
                                            ,function(schemaService,guid,usSpinnerService,interval,messagesBusService){
	return {
		restrict : 'E',
		scope : {
//			parkingData : "="
			uniqueId : "="
		},
		templateUrl : "modules/IoTSimulator/views/visualizer-partial.html",
		link : function(scope,element,attr){

//			alert("Hi");
			
			scope.view = 'SingleFloor';
			scope.activeFloor = null;
			scope.parkingData = null;
			scope.loadedData = false;
			
			 scope.webSocketAlert=false;

            var web_Socket=getWebSocket();

			var colorComboRandom= ["#f5ffff","#fcffe2","#daf8ed","#daeaf4"];
			var parkingMeterRateColor = "#BC3C3C";
			var parkingMeterImageMap = [];
			var digitalSignColor = "#75BA3C";

			var aParkingSpotImageElement = document.getElementById('aparkingspot');
			var areaLightImageElement = document.getElementById('areaLight');
			var aCarImageElement = document.getElementById('car');
            var ws = new WebSocket(web_Socket);
            scope.numberOfEventsProcessed = "";
            scope.numberOfActionsTaken = "";
            scope.floorChangeModel = "manual";
            var currentScope = scope;
            
            
            var eventsProcessed = {
            		name: "events-processed",
            		handler : function(data){
            			data.scope.numberOfEventsProcessed = data.value;
//            			scope.numberOfEventsProcessed = data;
            		}
            }
            
            messagesBusService.register("eventsProcessed",eventsProcessed);
            
            
            var draw3DText = function(ctx,texttowrite,width,height,depth,preferredColor){
            	var cnt;
            	ctx.font ="25px bold";
            	ctx.fillStyle = "grey";
//            	ctx.fillStyle = "yellow";
            	for (cnt = 0; cnt < depth; cnt++){
            		ctx.fillText(texttowrite,width-cnt,height - cnt);
            	}
            	
            	ctx.fillStyle = preferredColor || "#FA5A03";
//            	ctx.fillStyle = "#FA5A03";
            	ctx.shadowColor = "grey";
            	ctx.shadowBlur = 5;
            	ctx.shadowOffsetX = depth+1;
            	ctx.shadowOffsetY = depth +1;
            	ctx.fillText(texttowrite,width-cnt,height - cnt);
            }
            
            ws.onopen = function()
            {
                // Web Socket is connected, send data using send()
            };
            scope.updateProcessedEventsCount = function(count){
            	var element = document.getElementById(scope.uniqueId+'-events-processed');
            	if(element){
            		element.innerHTML = count;
            	}
            }
            scope.updateActionsTakenCount = function(count){
            	var element = document.getElementById(scope.uniqueId+'-actions-taken').innerHTML = count;
            	if(element){
            		element.innerHTML = count;
            	}
            }
            scope.handleMessage = function (evt)
            {
                var received_msg = evt.data;
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json( received_msg );
                var event = {
                        name : 	jsonObj.Set._Name,
                        target : jsonObj.Set._Target,
                        time : jsonObj.Set._Time,
                        value : jsonObj.Set._Value
                    };
                if(event.name != 'UpdateParkingSpot'){
                	
                	console.log(event.name);
                	console.log(event);
                }
                if (jsonObj.Set._Name == 'UpdateParkingSpot')
                {
                    if(event.target == "EventCount"){
                    	scope.updateProcessedEventsCount(event.value);
                    }else if(event.target == "ActionCount"){
                    	scope.updateActionsTakenCount(event.value);
                    }else {
                    	if(scope.parkingData !=null && scope.loadedData == true)
                    	scope.updateParkingSpot(event);
                    }
                }else if (jsonObj.Set._Name == 'UpdateAreaLight'){
                	scope.updateAreaLightIntensity(event);
                }else if(jsonObj.Set._Name == 'UpdateParkingMeter'){
                	scope.updateParkingMeter(event);
                	console.log("parking update");
                	console.log(event);
                }else if (event.name == 'UpdateStallLight'){
                	scope.updateStallLight(event);
                }else if(event.name == 'UpdateParkingFloor'){
                	scope.updateDigitalSignage(event);
                }

            };
            ws.onmessage = scope.handleMessage;
            ws.onclose = function()
            {

                scope.webSocketAlert=true;

            };


			
            scope.allFloorSummary=[];
            usSpinnerService.spin(scope.canvasSpinnerId);
            scope.calculateSummary = function(){
            	scope.allFloorSummary=[];
            	if(scope.parkingData && scope.parkingData.parkingFloors){
            		var floors = scope.parkingData.parkingFloors;
            		for(var i =0; i < floors.length; i++){
            			var floorSummary = {};
            			var areaLightCount = 0, stallLightCount = 0,
            			signageCount = (floors[i].floorInfo.digitalSignLabel1 == 'Available')+(floors[i].floorInfo.digitalSignLabel2 == 'Available'),
            			cameraCount = 0, meterCount=0, parkingMeterInfo = [];
//            			signageCount = Math.ceil(floors[i].parkingSpots.length/15);
            			for(var j = 0; j < floors[i].parkingSpots.length; j++){
            				var spot = floors[i].parkingSpots[j];
            				if(spot.camera != null){
            					cameraCount +=1;
            				}
            				if(spot.areaLightInfo != null){
            					areaLightCount +=1;
            				}
            				if(spot.stallLightInfo != null){
            					stallLightCount +=1;
            				}
            				if(spot.areaLightInfo != null){
            					areaLightCount +=1;
            				}
            				if(spot.parkingMeterInfo != null){
            					meterCount +=1;
            					parkingMeterInfo[Math.ceil((j+1)/30)] = spot.parkingMeterInfo;
//            					parkingMeterInfo.push({rowNumber: Math.ceil(j/30),spotId : spot.id,meterInfo : spot.parkingMeterInfo});
            				}
            			}
            			floorSummary.areaLightCount = areaLightCount;
            			floorSummary.stallLightCount = stallLightCount;
            			floorSummary.cameraCount = cameraCount;
            			floorSummary.meterCount = meterCount;
            			floorSummary.signageCount = signageCount;
            			floorSummary.parkingMeterInfo = parkingMeterInfo;
            			scope.parkingData.parkingFloors[i].summary = floorSummary;
            			scope.allFloorSummary.push(floorSummary);
            		}
            	}
            }
			schemaService.getParkingData().then(function(data) {
				scope.parkingData = data;
				console.log(scope.parkingData);
				scope.calculateSummary();
				if (scope.parkingData.parkingFloors && scope.parkingData.parkingFloors.length > 0) {
					console.log("parking data loaded");
					usSpinnerService.spin(scope.canvasSpinnerId);
					scope.changeFloorPlan(scope.parkingData.parkingFloors[0]);
//					scope.drawFloor(scope.parkingData.parkingFloors[0]);
					scope.loadedData = true;
					usSpinnerService.stop(scope.canvasSpinnerId);
				}
			});
			
			scope.canvasSpinnerId = guid();
			scope.allAssetsCheckboxModel = true;

			scope.areaLightsCheckboxModel = false;
			scope.stallLightsCheckboxModel = false;
			scope.digitalSignagesCheckboxModel = false;
			scope.metersCheckboxModel = false;
			scope.camerasCheckboxModel = false;

			var clearAllAssetsCheckBox = function(newVal, oldVal) {
				if (newVal == false) {
					scope.allAssetsCheckboxModel = false;
				}
				scope.drawFloor(scope.activeFloor);
			};
			/*var count =0;
			var timer = interval(function(){
				count += 1;
				scope.numberOfEventsProcessed = count;
				if(count == 2000){
					interval.cancel(timer);
				}
			},500);*/
//			<Set Name="UpdateParkingSpot" Target="Atom-Org-1.F3.PS26.State" Time="1423096092887" Value="off"/>
			/*var count = 0;
			var timer = interval(function(){
				count += 1;
				var event ={
						name : "UpdateParkingFloor",
						target : "Atom-Org-1.F1.digitalSignageLabel2",
						value : (count % 2==0)? "on" : "off"
				}
				if(scope.parkingData){
					scope.updateDigitalSignage(event);
				}else {
					count =0;
				}
				if(count == 2000){
					interval.cancel(timer);
				}
			},3000);*/
			scope.updateDigitalSignage = function(eventData){
				var targetArray = eventData.target.split(".");
                var floorId = "";
                if(scope.parkingData.organization && scope.parkingData.organization.id == targetArray[0]){
                    floorId = targetArray[0]+"."+targetArray[1];
                }
                var floors = scope.parkingData.parkingFloors;
                for(var i = 0; i < floors.length; i++){
                    if(floors[i].floorInfo.id == floorId){
                    	floors[i].floorInfo[targetArray[2]] = eventData.value;
                    	if(scope.floorChangeModel == "auto" || scope.activeFloor==floors[i]){
                    		usSpinnerService.spin(scope.canvasSpinnerId);
                        	scope.changeFloorPlan(scope.parkingData.parkingFloors[i]);
                        	var floorInfo = floors[i].floorInfo;
                        		var location1 = floorInfo.digitalSignageLabel1Position.split("$");
                        		var location2 = floorInfo.digitalSignageLabel2Position.split("$");
                                		
                        		var canvas = document.getElementById(scope.uniqueId);
                            	if(canvas){
                            		var context = canvas.getContext('2d');
                            		context.save();
                            		context.fillStyle = colorComboRandom[floors[i].floorInfo.floorNumber % 4];
                            		context.fillRect(0,location1[1] - 20, canvas.width, 30);
                            		draw3DText(context, eventData.value, location1[0], location1[1], 2, digitalSignColor);
                            		context.restore();
                            		
                            		var context2 = canvas.getContext('2d');
                            		context2.save();
                            		context2.fillStyle = colorComboRandom[floors[i].floorInfo.floorNumber % 4];
                            		context2.fillRect(0,location2[1] - 20, canvas.width, 30);
                            		draw3DText(context, eventData.value, location2[0], location2[1], 2, digitalSignColor);
                            		context2.restore();
                            	}
                            	usSpinnerService.spin(scope.canvasSpinnerId);
                    	}
                    }
                }
			};
			
			var drawStallLightOnCarEvent = function(spot,context){
				var stallLightInfo = spot.stallLightInfo;
        		// Check whether On or Off light on
        		// spot.
        		var light_location = stallLightInfo.imageAt.split("$");
        		if (stallLightInfo.evenOdd == "even") {
        			var aLotLight = (stallLightInfo != null && stallLightInfo.powerState == "on") ? document
        					.getElementById('lotLightEven'): document.getElementById('lotLightOffEven');
        					context.drawImage(aLotLight,light_location[0],light_location[1], 22, 25);
        		} else {
        			var aLotLight = (stallLightInfo != null && stallLightInfo.powerState == "on") ? document
        					.getElementById('lotLightOdd')	: document.getElementById('lotLightOffOdd');
        					context.drawImage(aLotLight,light_location[0],light_location[1], 22, 25);
        		}
			};
			scope.updateParkingSpot = function(eventData){
				var oscillationCount = 10;
                    var targetArray = eventData.target.split(".");
                    var floorId = "";
                    if(scope.parkingData.organization && scope.parkingData.organization.id == targetArray[0]){
                        floorId = targetArray[0]+"."+targetArray[1];
                    }
                    var floors = scope.parkingData.parkingFloors;
                    for(var i = 0; i < floors.length; i++){
                        if(floors[i].floorInfo.id == floorId){
                            for( var j = 0 ; j < floors[i].parkingSpots.length; j++){
                                if(floorId + "." + targetArray[2] == floors[i].parkingSpots[j].id){
                                    // console.log("Hi");
                                	if(floors[i].parkingSpots[j].state == eventData.value){
                                		return;
                                	}
                                    floors[i].parkingSpots[j].state = eventData.value;
                                    if(scope.floorChangeModel == "auto" || scope.activeFloor==floors[i]){
                                    	usSpinnerService.spin(scope.canvasSpinnerId);
                                    	scope.changeFloorPlan(scope.parkingData.parkingFloors[i]);
                                    	var canvas = document.getElementById(scope.uniqueId);
                                    	if(canvas){
	                                    	var context = canvas.getContext('2d');
	//                                    	context.scale(0.5,0.5);
	                                    	var locationDimensionArray = floors[i].parkingSpots[j].imageAt.split("$");
	                                    		context.drawImage(aParkingSpotImageElement,
	                                    				locationDimensionArray[0],locationDimensionArray[1],
	                                    				locationDimensionArray[2],locationDimensionArray[3]);
	                                		if(eventData.value == "on"){
	                                			var aCar = document.getElementById("car");
	                                			var count = 0;
	                                			// Animate the car oscillations-------------------
	                                			var relocationCount = oscillationCount;
	                                			var anim = interval(function(){
	                                				context.fillStyle = (count == oscillationCount)?"white":(count%2==0)?"#57E964":"white";
	                                				context.fillRect(parseInt(locationDimensionArray[0]) + 9, parseInt(locationDimensionArray[1]) + 4, 60,
	                                						121);
	                                				count++;
	                                				if (Math.ceil((j+1)/30) % 2 == 0) {
	                                					context.drawImage(aCar, parseInt(locationDimensionArray[0]) + 16,parseInt(locationDimensionArray[1]) +5);
	                                				} else {
	                                					context.drawImage(aCar, parseInt(locationDimensionArray[0]) + 16,parseInt(locationDimensionArray[1]) + 25);
	                                				}
	                                				if(count==oscillationCount){
	                                					interval.cancel(anim);
	                                				}
	                                				if (scope.allAssestsCheckboxModel || scope.stallLightsCheckboxModel){
	                                					drawStallLightOnCarEvent(floors[i].parkingSpots[j],context);
	                                				}
	                                			}, 200);
	                                    	}else {
	                                			var aCar = document.getElementById("car");
	                                			var count = 0;
	                                			// Animate the car oscillations-------------------
	                                			var anim = interval(function(){
	                                				if(count < oscillationCount){
	                                					context.fillStyle = (count%4==0)?"#E86256":"white";
	                                					context.fillRect(parseInt(locationDimensionArray[0]) + 9, parseInt(locationDimensionArray[1]) + 4, 60,
	                                							121);
	                                					if (Math.ceil((j+1)/30) % 2 == 0) {
	                                						context.drawImage(aCar, parseInt(locationDimensionArray[0]) + 16,parseInt(locationDimensionArray[1]) + 5);
	                                					} else {
	                                						context.drawImage(aCar, parseInt(locationDimensionArray[0]) + 16,parseInt(locationDimensionArray[1]) + 25);
	                                					}
	                                				}
	                                				count++;
	                                				if(count==oscillationCount){
	                                					interval.cancel(anim);
	                                					context.drawImage(aParkingSpotImageElement,
	    	                                    				locationDimensionArray[0],locationDimensionArray[1],
	    	                                    				locationDimensionArray[2],locationDimensionArray[3]);
	                                				}
	                                				if (scope.allAssestsCheckboxModel || scope.stallLightsCheckboxModel){
	                                					drawStallLightOnCarEvent(floors[i].parkingSpots[j],context);
	                                				}
	                                			}, 200);
	                                    	}
                                    	}
                                    	usSpinnerService.stop(scope.canvasSpinnerId);
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
            };
            
            scope.updateParkingMeter = function(eventData){
            	alert("Update meter called");
            	var targetArray = eventData.target.split(".");
                var floorId = "";
                if(scope.parkingData.organization && scope.parkingData.organization.id == targetArray[0]){
                    floorId = targetArray[0]+"."+targetArray[1];
                }
                var floors = scope.parkingData.parkingFloors;
                for(var i = 0; i < floors.length; i++){
                    if(floors[i].floorInfo.id == floorId){
                        for( var j = 0 ; j < floors[i].parkingSpots.length; j++){
                            if(floorId + "." + targetArray[2] == floors[i].parkingSpots[j].id){
                            	var parkingSpot = floors[i].parkingSpots[j];
                            	parkingSpot.parkingMeterInfo.parkingMeterLabel =  eventData.value  + " per hour"; 
                            	 if(scope.floorChangeModel == "auto" || scope.activeFloor==floors[i]){
                                	if(scope.allAssetsCheckboxModel || scope.metersCheckboxModel){
                                		scope.changeFloorPlan(floors[i]);
                                		
                                		var canvas = document.getElementById(scope.uniqueId);
                                		if(canvas && parkingMeterImageMap[Math.ceil((j+1)/30)]){
                                			var text_location = parkingMeterImageMap[Math.ceil((j+1)/30)].split("$");
                                		var context = canvas.getContext('2d');
                                		context.save();
                                		context.fillStyle = colorComboRandom[floors[i].floorInfo.floorNumber %4];
										context.fillRect(text_location[0],text_location[1] - 14, 100,14);
										alert("meter");
										draw3DText(context,parkingSpot.parkingMeterInfo.parkingMeterLabel,text_location[0],text_location[1],2);
										context.restore();
//                                		context.font = "20px bold";
//										context.fillStyle = "black";
//										context.rect(text_location[0] -1,text_location[1]-1, 102, 15)
//										context.fillText( eventData.value + " per hour",text_location[0],text_location[1]);
                                		}
                                	}
                            	 }
                            	break;
                            }
                        }
                        break;
                    }
                }
            };
            
            
            //=====
            scope.updateStallLight = function(eventData){
            	var targetArray = eventData.target.split(".");
                var floorId = "";
                if(scope.parkingData.organization && scope.parkingData.organization.id == targetArray[0]){
                    floorId = targetArray[0]+"."+targetArray[1];
                }
                var floors = scope.parkingData.parkingFloors;
                for(var i = 0; i < floors.length; i++){
                    if(floors[i].floorInfo.id == floorId){
                        for( var j = 0 ; j < floors[i].parkingSpots.length; j++){
                            if(floorId + "." + targetArray[2] == floors[i].parkingSpots[j].id){
                            	var parkingSpot = floors[i].parkingSpots[j];
                            	parkingSpot.stallLightInfo.powerState =  eventData.value; 
                            	if(scope.floorChangeModel == 'auto' && floors[i].floorInfo.id!= scope.activeFloor.floorInfo.id){
                            		scope.changeFloorPlan(floors[i]);
                            	}else if(floors[i].floorInfo.id == scope.activeFloor.floorInfo.id){
                            		scope.drawFloor(floors[i]);
                            	}
                            	break;
                            }
                        }
                        break;
                    }
                }
            };
            
            
            scope.updateAreaLightIntensity = function(eventData){
            	var targetArray = eventData.target.split(".");
                var floorId = "";
                if(scope.parkingData.organization && scope.parkingData.organization.id == targetArray[0]){
                    floorId = targetArray[0]+"."+targetArray[1];
                }
                var floors = scope.parkingData.parkingFloors;
                for(var i = 0; i < floors.length; i++){
                    if(floors[i].floorInfo.id == floorId){
                        for( var j = 0 ; j < floors[i].parkingSpots.length; j++){
                            if(floorId + "." + targetArray[2] == floors[i].parkingSpots[j].id){
                            	var parkingSpot = floors[i].parkingSpots[j];
                            	parkingSpot.areaLightInfo.intensityLevel =  eventData.value; 
                            	 if(scope.floorChangeModel == "auto" || scope.activeFloor==floors[i]){
                                	if(scope.allAssetsCheckboxModel || scope.areaLightsCheckboxModel){
                                		scope.changeFloorPlan(floors[i]);
                                		var light_location = parkingSpot.areaLightInfo.imageAt.split("$");
                                		var text_location = parkingSpot.areaLightInfo.textAt.split("$");
                                		var canvas = document.getElementById(scope.uniqueId);
                                		if(canvas){
                                		var context = canvas.getContext('2d');
                                		context.fillStyle = colorComboRandom[floors[i].floorInfo.floorNumber %4];
										context.fillRect(light_location[0],light_location[1], 108,108);
                                		context.drawImage(areaLightImageElement,light_location[0],light_location[1]);
                                		context.font = "30px bold";
										context.fillStyle = "black";
										context.fillText( eventData.value + "%",text_location[0],text_location[1]);
                                		}
                                	}
                            	 }
                            	break;
                            }
                        }
                        break;
                    }
                }
            };
			scope.$watch('allAssetsCheckboxModel',
							function(newVal, oldVal) {
								if(newVal == true){
									scope.areaLightsCheckboxModel = newVal;
									scope.stallLightsCheckboxModel = newVal;
									scope.digitalSignagesCheckboxModel = newVal;
									scope.metersCheckboxModel = newVal;
									scope.camerasCheckboxModel = newVal;
								}
							});

			scope.$watch('areaLightsCheckboxModel',clearAllAssetsCheckBox);
			scope.$watch('stallLightsCheckboxModel', clearAllAssetsCheckBox);
			
			scope.$watch('digitalSignagesCheckboxModel',clearAllAssetsCheckBox);
			scope.$watch('metersCheckboxModel', clearAllAssetsCheckBox);
			scope.$watch('camerasCheckboxModel', clearAllAssetsCheckBox);



			scope.tabs = [ {
				title : "Try TQL",
				linkURL : "/home"
			}, {
				title : "TQL Studio",
				linkURL : "/tql_studio"
			}, {
				title : "IoT Simulator",
				linkURL : "/iot_simulator"
			}, {
				title : "Docs",
				linkURL : "/docs"
			}, {
				title : "Support",
				linkURL : "/support"
			} ];
			scope.currentCenterSection = 'modules/IoTSimulator/views/centerSection/SingleFloor.html';


			scope.showFirstFloorOnCanvasLoad = function() {
				if (scope.parkingData != null
						&& scope.parkingData.parkingFloors) {
					if (scope.parkingData.parkingFloors.length > 0) {
						usSpinnerService.spin(scope.canvasSpinnerId);
						scope.changeFloorPlan(scope.parkingData.parkingFloors[0]);
						usSpinnerService.stop(scope.canvasSpinnerId);
					}
				}
			};
			scope.changeFloorPlan = function(floor) {
				var element = document.getElementById(scope.uniqueId+'-'+'floor-btn-'+ floor.floorInfo.id);
				var floorChanged = false;
				if (scope.activeFloor != null) {
					floorChanged = !(floor.floorInfo.id == scope.activeFloor.floorInfo.id);
					var previous = document.getElementById(scope.uniqueId+'-'+'floor-btn-'+ scope.activeFloor.floorInfo.id);
					$(previous).removeClass("floor-active");
				}
				$(element).addClass("floor-active");
				if(floorChanged ==true || scope.activeFloor==null){
					scope.drawFloor(floor);
					scope.activeFloor = floor;
				}
			};
			// ============================

			
			var drawDigitalSignage = function(context,
					direction, x, y, floor) {
				var co_ordinates = {
					x : x,
					y : y
				};

				if (context != undefined && context != null) {
					var canvas = context.canvas;
					var color = digitalSignColor;
					if (direction == 'top') {
						// alert(canvas.width);
//						context.font ="20px bold";
//						context.fillStyle = "black";
//						context.fillText(label,(canvas.width / 2) - 400, y+20);
						context.save();
						draw3DText(context,floor.floorInfo.digitalSignLabel1,(canvas.width / 2) - 400,y+20,2,color);
						floor.floorInfo.digitalSignageLabel1Position = (canvas.width / 2) - 400+"$"+(parseInt(y)+20);
						context.restore();
						y = y+ 30;
						context.drawImage(document.getElementById('digiSignTop'),(canvas.width / 2) - 400, y,91, 17);
						co_ordinates.y = y + 18;
					} else if (direction == "bottom") {
						context.drawImage(document.getElementById('digiSignBottom'),(canvas.width / 2) - 400,y, 91, 17);
//						context.font ="20px bold";
//						context.fillStyle = "black";
//						context.fillText(label,(canvas.width / 2) - 400, y+50);
						context.save();
						draw3DText(context,floor.floorInfo.digitalSignLabel2,(canvas.width / 2) - 400,y+50,2,color);
						floor.floorInfo.digitalSignageLabel2Position = (canvas.width / 2) - 400+"$"+(parseInt(y)+50);
						context.restore();
					}
				}
				return co_ordinates;

			};

			var drawMeter = function(context, direction, x, y, info,row) {
				var co_ordinates = {
					x : x,
					y : y
				};

				if (context != undefined && context != null) {
					var canvas = context.canvas;
					if (direction == "left") {
						context.drawImage(document.getElementById('parkingMeter'),
										x - 25, y, 25, 47);
						parkingMeterImageMap[info.id]= (x-25) + "$" +y;
						parkingMeterImageMap[row]= (x-25) + "$" +y;
						if(info.parkingMeterLabel){
							context.save();
//							context.font = "20px bold";
//							context.fillStyle = "#c0c0c0";
//							context.fillRect(x - 26,y-30, 150, 40);
//							context.stroke();
//							context.fillStyle ="white";
//							 context.fillText(info.parkingMeterLabel,x -25, y);
							draw3DText(context,info.parkingMeterLabel,x-20,y, 2);
							 context.restore();
						}
					} else if (direction == "right") {
						context.drawImage(document.getElementById('parkingMeter'),
										x, y, 25, 47);
						co_ordinates.x = x + 25;
						parkingMeterImageMap[info.id]= x + "$" + y;
						parkingMeterImageMap[row]= x + "$" +y;
						if(info.parkingMeterLabel){
							context.save();
//							context.font = "20px bold";
//							context.fillStyle = parkingMeterRateColor;
//							context.fillRect(x - 2,y-18, 102, 20);
//							context.fillStyle ="white";
//							context.fillText(info.parkingMeterLabel,x, y);
							draw3DText(context,info.parkingMeterLabel,x,y, 2);
							context.restore();
						}
					}
				}
				return co_ordinates;

			};
			scope.toggleCheckBox = function(event, model) {
				if (model == 'allAssestsCheckboxModel') {
					scope.allAssestsCheckboxModel = event.target.checked
				}
			}
			scope.drawFloor = function(parkingFloor) {
//				var colorComboRandom= ["#F6CEF5","#ECF6CE","#F6D8CE","#CEF6F5"]
				console.log(parkingFloor);
				if (parkingFloor == undefined || parkingFloor == null) {
					parkingFloor = scope.activeFloor;
				}
				console.log(parkingFloor);
				var canvas = document
						.getElementById(scope.uniqueId);
				console.log(canvas);
				if (canvas && parkingFloor) {

					var x = 25;
					var y = 0;
					var scale = 1;
					var lotIndex = 0;
					var rowCounter = 0;
					var rowSize = 30;
					var context = canvas.getContext('2d');
					var totalRows = Math.ceil(parkingFloor.parkingSpots.length / rowSize);
					canvas.height = totalRows*250;
					context.scale(scale*0.5,scale*0.5);
					context.clearRect(0, 0,
							context.canvas.width,
							context.canvas.height);
					context.fillStyle=colorComboRandom[parkingFloor.floorInfo.floorNumber %4];
					context.fillRect(0, 0,context.canvas.width,context.canvas.height);
					parkingMeterImageMap = [];
					for ( var j = 0; j < parkingFloor.parkingSpots.length; j++) {
						var parkingSpot = parkingFloor.parkingSpots[j];
						
						if (j == 0) {
							if ( /*parkingFloor.floorInfo.digitalSignLabel1.toLowerCase()=='available' &&*/ (scope.allAssestsCheckboxModel
									|| scope.digitalSignagesCheckboxModel)) {
								var newCoOrdinates = drawDigitalSignage(
										context, "top", x, y,parkingFloor);
								x = newCoOrdinates.x;
								y = newCoOrdinates.y;
							}
							var firstRowImage = document
									.getElementById('firstRowBorder');
							console.log("image -------------");
							console.log(firstRowBorder);
							context.drawImage(firstRowBorder,
									x, y, 2254, 160);

						} else if ((j + 1) % rowSize == 1
								&& rowCounter != 0
								&& rowCounter + 1 < totalRows) {
							var newCoOrdinates = {
								x : x,
								y : y
							};
							if (rowCounter % 2 == 0 && (scope.allAssestsCheckboxModel || scope.metersCheckboxModel)) {
								console.log("Parking Meter at : " + Math.ceil((j+1)/30));
//								console.log(scope.allFloorSummary[parkingFloor.floorInfo.floorNumber - 1].parkingMeterInfo[Math.ceil((j+1)/30)].parkingMeterLabel);
								newCoOrdinates = drawMeter(
										context, "left", x, y,parkingFloor.summary.parkingMeterInfo[Math.ceil((j+1)/30)],Math.ceil((j+1)/30));
							}
							x = newCoOrdinates.x;
							y = newCoOrdinates.y;
						}

						if (rowCounter + 1 == totalRows
								&& (j + 1) % rowSize == 1) {
							var lastRowImage = document
									.getElementById('lastRowBorder');
							context.drawImage(lastRowImage, x,
									y - 27, 2254, 160);
						}

						if (parkingSpot.camera != null
								&& (scope.allAssestsCheckboxModel || scope.camerasCheckboxModel)) {
							var camera = document
									.getElementById('camera');
							context.drawImage(camera, x + 15,
									y + 135);

						}

						var aParkingSpot = document
								.getElementById('aparkingspot');
						context.drawImage(aParkingSpot, x + 1,
								y + 3, 75, 125);
						parkingSpot.imageAt = (x+1) + "$"+ (y+3) +"$75$125";
						if (parkingSpot.state == "on") {
							context.fillStyle = "white";
							context.fillRect(x + 9, y + 4, 60,
									121);
						}

						if (scope.allAssestsCheckboxModel || scope.stallLightsCheckboxModel){
							
							var stallLightInfo = parkingSpot.stallLightInfo;
							// Check whether On or Off light on
							// spot.
							if (rowCounter % 2 == 1) {
								var aLotLight = (stallLightInfo != null && stallLightInfo.powerState == "on") ? document
										.getElementById('lotLightEven'): document.getElementById('lotLightOffEven');
										context.drawImage(aLotLight,x + 27.5, y + 100, 22, 25);
										stallLightInfo.imageAt = (x + 27.5)+"$" +(y + 100);
										stallLightInfo.evenOdd = "even";
							} else {
								var aLotLight = (stallLightInfo != null && stallLightInfo.powerState == "on") ? document
										.getElementById('lotLightOdd')
										: document
										.getElementById('lotLightOffOdd');
										context.drawImage(aLotLight,
												x + 27.5, y + 3, 22, 25);
										stallLightInfo.imageAt = (x + 27.5)+"$" +(y + 3);
										stallLightInfo.evenOdd = "odd";
							}
						}
						// lotLightLocationArray.push(x + 27.5 +
						// '@' + y + 3);

						if (parkingSpot.state == 'on') {
							// draw a car.
							var aCar = document.getElementById('car');

							if (rowCounter % 2 == 1) {
								context.drawImage(aCar, x + 16,y + 5);
							} else {
								context.drawImage(aCar, x + 16,y + 25);
							}
						}

						if (parkingSpot.areaLightInfo != null
								&& (scope.areaLightsCheckboxModel || scope.allAssestsCheckboxModel)) {
							var areaLight = document.getElementById('areaLight');
							context.font = "30px bold";
							context.fillStyle = "black";
							if (rowCounter % 2 == 1) {
								context.drawImage(areaLight, x,y - 150);
								parkingSpot.areaLightInfo.imageAt = x+"$"+(y-150);
								parkingSpot.areaLightInfo.textAt = (x + 35) + "$" + (y - 90);
								context.fillText(parkingSpot.areaLightInfo.intensityLevel
														+ "%",x + 35, y - 90);
							} else {
								context.drawImage(areaLight, x,y + 150);
								parkingSpot.areaLightInfo.imageAt = x+"$"+(y+150);
								parkingSpot.areaLightInfo.textAt = (x + 35) + "$" + (y + 210);
								context.fillText(parkingSpot.areaLightInfo.intensityLevel+ "%",x + 35, y + 210);
							}
						}

						x = x + 75;
						if ((j + 1) % rowSize == 0
								&& rowCounter != 0
								&& rowCounter < totalRows) {
							var newCoOrdinates = null;
							if (rowCounter % 2 == 1
									&& (scope.metersCheckboxModel || scope.allAssestsCheckboxModel)) {
								newCoOrdinates = drawMeter(
										context, "right", x, y,parkingFloor.summary.parkingMeterInfo[Math.ceil((j+1)/30)],Math.ceil((j+1)/30));
								x = newCoOrdinates.x;
								y = newCoOrdinates.y;
							}
						} 
						if (j == parkingFloor.parkingSpots.length - 1/* && parkingFloor.floorInfo.digitalSignLabel2.toLowerCase()=='available'*/
								&& (scope.digitalSignagesCheckboxModel || scope.allAssestsCheckboxModel)) {
							// y +=
							var newCoOrdinates = drawDigitalSignage(
									context, "bottom", x,
									y + 132,parkingFloor);
							x = newCoOrdinates.x;
							y = newCoOrdinates.y;
						}
						lotIndex = lotIndex + 1;
						if (lotIndex == rowSize) {

							lotIndex = 0;
							x = 25;

							if (rowCounter % 2 == 0) {
								y = y + 300;
							} else {
								y = y + 190;
							}
							rowCounter = rowCounter + 1;
						}

					}
				}
				// }

			}

			// ==============================

			scope.nodeData = false;
			scope.scorecardPopup=false;
			scope.floorData = [ {
				"name" : "Single Floor",
				"type" : "SingleFloor",
				"icon" : ""

			}, {
				"name" : "All Floors",
				"type" : "AllFloors",
				"icon" : ""
			}, {
				"name" : "3D",
				"type" : "ThreeDimensional",
				"icon" : ""

			} ];

            scope.reconnect=function(){
              var  ws = new WebSocket(web_Socket);
            }
             scope.hideWebsocketAlert=function(){
                 scope.webSocketAlert=false;
             }
			scope.setCurrentFloor = function(type) {
				scope.view = type;
				scope.currentCenterSection = 'modules/IoTSimulator/views/centerSection/'
						+ type + '.html';
			};
					
			/* ===summarycollpase starts=== */

			scope.collapseSearch = function() {
				$('#searchSummary').css("display", "block");
				$("body").toggleClass("rightcollapse");

			};
			/* ===summarycollpase ends=== */
			
			
			
           
		}
	}
}]);

