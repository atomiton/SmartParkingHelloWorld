/**
 * Created by puneettiwari on 11/21/14.
 */



var TQL = TQL || {};
var CONTEXT = window.location;

TQL.URL = {

    /*getApplicationSchema: function() {
        return 'data/selectedTabs.json';
    },

    getUIModel: function() {
        return 'data/ui_model.json';
    },

    getDataModel: function() {
        return 'data/data_model.json';
    },*/
		
	getParkingSnapshot : function(){
        return 'http://tql.atomiton.com:8080/fid-ParkingResources/res/Atom-Org-1/splatest.json';
    },
		
    getWebSocket:function(){
        return 'ws://tql.atomiton.com:9090/fid-ws';
    },
    getAllOrganization:function(){
        return 'http://tql.atomiton.com:8080/fid-smartparking?Command=readAll&Model=Organization';
    },
    getDataModel:function(){
       return 'http://tql.atomiton.com:8080/fid-smartparking?Command=model';
    },
    getAllObjects:function(){
        return 'http://tql.atomiton.com:8080/fid-smartparking?Command=readAll&Model=ParkingFloor';
    },
    getAllSpecificEntity:function(){
        return 'http://tql.atomiton.com:8080/fid-smartparking?Command=read&Model=AreaLight&FilterName={â€œeqâ€�: {â€œtargetâ€�: â€œparkingFloorIdâ€�, â€œvalueâ€�: â€œAtom-Org-1.F10.S10â€�}}';
    },
    getAllSpecificDataModel:function(){
        return 'http://tql.atomiton.com:8080/fid-smartparking?Command=update&Target=ParkingSpot&Result=NewValue';
    },
    getScorecard : function(){
    	return 'http://tql.atomiton.com:8080/fid-smartparking?Command=scorecard&orgId=Atom-Org-1';
    },
    getCreateTask: function(){
    	return 'http://tql.atomiton.com:8080/fid-async?Command=createTask';
    },
    getQueryInterface : function(){
    	return "http://tql.atomiton.com:8080/fid-tqlinterface";
    },
    getHelpApi:function(){
        return "http://tql.atomiton.com:8080/fid-ParkingResources/res/queries/help/help.json";
    },
    getTutorialApi:function(){
        return "http://tql.atomiton.com:8080/fid-ParkingResources/res/queries/tutorial/";
    }
};
