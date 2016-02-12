
var getWebSocket=function(){
    return 'ws://tql.atomiton.com:9090/fid-ws';
}
var getAllOrganization=function(){
        return 'http://tql.atomiton.com:8080/fid-smartparking?Command=readAll&Model=Organization';
    };

var getDataModel=function(){
        return 'http://tql.atomiton.com:8080/fid-smartparking?Command=model';
};

var getAllObjects=function(){
    return 'http://tql.atomiton.com:8080/fid-smartparking?Command=readAll&Model=ParkingFloor';
};
var getAllSpecificEntity=function(){
    return 'http://tql.atomiton.com:8080/fid-smartparking?Command=read&Model=AreaLight&FilterName={“eq”: {“target”: “parkingFloorId”, “value”: “Atom-Org-1.F10.S10”}}';
};
var getAllSpecificDataModel=function(){
    return 'http://tql.atomiton.com:8080/fid-smartparking?Command=update&Target=ParkingSpot&Result=NewValue';
}
