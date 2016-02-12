/**
 * Created by puneettiwari on 11/21/14.
 */


angular.module('serviceModule').
    service('schemaService',['messagesBusService','HttpService','$q','guid','$timeout'
        ,function(messagesBusService,HttpService,$q,guid,$timeout){


            //getSchemaData - fetch the complete schema to show in the left hand pane.
            var schemaData="";
            var uiModel ="";
            var dataModel="";
            var selectedTabs={data:[]};
            var interactiveShellData = null;
            var navigationTabs = null;
            var scorecardData = "";
            var orgData = "";
            var parkindData = "";
            
//            var orgURL = "http://tql.atomiton.com:8080/fid-smartparking?Command=readAll&Model=Organization";
            this.getSchemaData = function(callBack)
            {
                var deferred = $q.defer();
                if(schemaData!="")
                {
                    deferred.resolve(schemaData);
                }
                else
                    HttpService.get(MQ.URL.getApplicationSchema()).  then(
                        function(data)
                        {
                            schemaData=data;
                            deferred.resolve(schemaData);
                            messagesBusService.publish('schemaUpdate', { msg: schemaData });

                        },
                        function(error)
                        {
                            deferred.reject(error);
                        }
                    );
                return deferred.promise;
            }

            this.getOrgData = function()
            {
                var deferred = $q.defer();
                if(orgData!="")
                {
                    deferred.resolve(orgData);
                }
                else
//                    HttpService.get("http://tql.atomiton.com:8080/fid-smartparking?Command=readAll&Model=Organization").  then(
                	HttpService.get(TQL.URL.getAllOrganization()).  then(
                        function(data)
                        {
                        	orgData=data;
                            deferred.resolve(orgData);
                            messagesBusService.publish('schemaUpdate', { msg: orgData });

                        },
                        function(error)
                        {
                            deferred.reject(error);
                        }
                    );
                return deferred.promise;
            }
            //getChildrenByType(type) - get the child nodes
            this.getChildrenByType = function(type)
            {
                //console.log(schemaData);
                for(var i=0;i<schemaData.length;i++)
                {
                    var schemaObj=schemaData[i];
                    if(schemaObj.type==type)
                    {
                        return schemaObj.children;
                    }
                }
            }


            //getEditorInfoByType(id)   - get the Editor info from the schema based on child selected
            this.getEditorInfoByType=function(type)
            {

                for(var i=0;i<schemaData.length;i++)
                {
                    var schemaObj=schemaData[i];
                    if(schemaObj.type==type)
                    {
                        return schemaObj;
                    }
                }
            }


            //createNewChild(type) - For a particular type create a new child
            this.createNewChild=function(name,type,perspective,selectedResultPanel)
            {
                var child ={
                    id:'',
                    name:'',
                    type:'',
                    perspective:'',
                    selectedResultPanel:''
                }
                child.id=guid();
                child.name=name;
                child.type=type;
                child.perspective=perspective
                child.selectedResultPanel=selectedResultPanel;

                for(var i=0;i<schemaData.length;i++)
                {
                    var schemaObj=schemaData[i];
                    if(schemaObj.type==type)
                    {
                        schemaObj.children.push(child);
                        messagesBusService.publish('schemaUpdate', { msg: schemaData });
                        return schemaData;
                    }
                }
            }


            this.getNavigationTabs = function(){
            	var deferred = $q.defer();
            	
            	alert("Navigation fetch");
            	if(navigationTabs == null){
            		HttpService.get('data/navigation_tabs.json').then(
            					function(data){
            						messagesBusService.publish('navigationLoaded',{msg : data});
            						deferred.resolve(data);
            					},function (error){
            						deferred.reject(error);
            					}
            				);
            	}else { 
            		deferred.resolve(navigationTabs);
            	}
            };
            this.getParkingData = function(){
            	var deferred = $q.defer();
            		HttpService.get(TQL.URL.getParkingSnapshot()).then(
//            	HttpService.get("data/parkinglot.json").then(
    				function(data)
    				{
    					deferred.resolve(data);
    					messagesBusService.publish('parkingDataLoaded', { msg: data });
    				},
    				function(error)
    				{
    					deferred.reject(error);
    				}
            		);
            	
            	 return deferred.promise;
            };
            this.getInteractiveShellData = function(){
            	var deferred = $q.defer();
            	if(interactiveShellData == null){
            		HttpService.get("data/shell.json").then(
            				function(data)
            				{
            					interactiveShellData=data;
            					deferred.resolve(interactiveShellData);
            					messagesBusService.publish('shellDataLoaded', { msg: interactiveShellData });
            					
            				},
            				function(error)
            				{
            					deferred.reject(error);
            				}
            		);
            	}else {
            		deferred.resolve(interactiveShellData);
            	}
            	 return deferred.promise;
            };

            //get data model data
            this.getDataModel = function()
            {
                var deferred = $q.defer();
                if(dataModel!="")
                {
                    deferred.resolve(dataModel);
                }
                else
                    HttpService.get(MQ.URL.getDataModel()).then(
                        function(data)
                        {
                            dataModel=data;
                            deferred.resolve(dataModel);
                            messagesBusService.publish('dataModelUpdate', { msg: dataModel });

                        },
                        function(error)
                        {
                            deferred.reject(error);
                        }
                    );
                return deferred.promise;
            }

            //get ui model data
            this.getUIModel = function()
            {
                var deferred = $q.defer();
                if(uiModel!="")
                {
                    deferred.resolve(uiModel);
                }
                else
                    HttpService.get(MQ.URL.getUIModel()).then(
                        function(data)
                        {
                            uiModel=data;
//                            $timeout(function(){
                                deferred.resolve(uiModel);
//                            }, 750)
                            //deferred.resolve(uiModel);
                            messagesBusService.publish('uiModelUpdate', { msg: uiModel });

                        },
                        function(error)
                        {
                            deferred.reject(error);
                        }
                    );
//                alert("getUIModel");
                return deferred.promise;
            }

            //create application schema data

            var getUIModelForDataType = function(type)
            {
                //get the ui model for a  data model
                var uiModelData="";
                for(var i=0;i<uiModel.length;i++)
                {
                    uiModelData=uiModel[i];
                    if(uiModelData.type==type)
                    {
                        return uiModelData;
                    }
                }

                return uiModelData;


            }

            var getDataModelForDataType=function(type,dataModelList)
            {
                var dataModelData="";
                var returnObject="";
                if(dataModelList==undefined)
                    dataModelList=dataModel;
                for(var i=0;i<dataModelList.length;i++)
                {
                    if(dataModelList[i].children.length>0 && returnObject=="")
                    {
                        returnObject= getDataModelForDataType(type,dataModelList[i].children);
                        if(returnObject!="")
                        return returnObject;

                        else
                        continue;
                    }

                    else
                    {
                        dataModelData=dataModelList[i];
                        if(dataModelData.type==type)
                        {
                            returnObject=dataModelData;
                            return dataModelData;
                        }
                    }

                }

                return returnObject;
            }

            this.addNewTab=function(type,dataModel)
            {
                var uiModelValue = getUIModelForDataType(type);
                console.log("uiModel........");
                console.log(uiModel);
                var dataModelValue=dataModel || getDataModelForDataType(type,dataModel);
                console.log("dataModel........");
                console.log(dataModel)
                var newTab= angular.extend({}, uiModelValue, dataModelValue);
                console.log('mergedObject.......');
                console.log(newTab);
                newTab.id=guid();

                selectedTabs.data.push(newTab);
//                newTab.name='Untitled '+type +' '+selectedTabs.data.length;
                return newTab;


            }
            this.getTabs = function()
            {
                return selectedTabs.data;
            }

             //add a child to name space.

            //modifyChildElement(id,name,perspective)
            //deleteChildFromSchema(id)
            //getCompleteChildInfo(id) - gets the complete info with relevant editor values and result templates attached.


        }])
