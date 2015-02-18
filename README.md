# Smart Parking Hello World

Smart Parking Hello World  is the easiest way to get started with writing your first Java Application that manages a parking lot for efficiency while receiving a stream of events from Magnetic sensors and Camera. 

You can get the [source code](https://github.com/Atomtion/SmartParkingHelloWorld) and create your own Smart Parking  Application with this [tutorial](http://tqldev.atomiton.com/docs)


## I. Requirements

SmartParkingHelloWorld requires JDK 1.7+ and Eclipse Version: Luna Service Release 1 (4.4.1) or other earlier versions.

#### II. Setting up your Eclipse Project

1. Generate the eclipse project settings files by running this script (for windows use gradlew.bat) : 
```
cd SmartParkingHelloWorld
./gradlew eclipse
```

2. Open the Eclipse and do File->Import->General->Existing Project into workspace.

3. Select your local SmartParkingHelloWorld folder as your root directory

4. SmartParkingHelloWorld project will now be loaded into Eclipse as a Java Project.


Finally, you can start modifying the code as appropriate - for example to receive events and
perform some business logic, post model updates etc .

#### III. Building from command line

1. You can build the application from command line as well by running this script (for windows use gradlew.bat) :
```
cd SmartParkingHelloWorld
./gradlew installApp
```

2. The executable script will be installed in the folder: 
```
build/install/SmartParkingHelloWorld/bin/SmartParkingHelloWorld
```

3. You can run the installed script from command line as follows:

```
build/install/SmartParkingHelloWorld/bin/SmartParkingHelloWorld <options>
```

#### IV. SmartParking HelloWorld Demonstrates Following Features

######Get the Parking Lot Organization ID. 

This feature makes a simple HTTP GET call on the following URL as 
described in the documentation section. 

URL:  http://tqldev.atomiton.com:8080/fid-smartparking

Parameters: "Command=readAll&Model=Organization"

The response JSON is:
```json
{
    "Type": "ParkingLot.ParkingLotAssets.Organization",
    "Format": "version,timestamp",
    "Key": "Organization",
    "Organization": {
        "AddressStreetName1": {
            "Version": 2,
            "Timestamp": 1424117577573,
            "Value": "Mission & 4th"
        },
        "id": {
            "Version": 2,
            "Timestamp": 1424117577573,
            "Value": "Atom-Org-1" <<<---------------------ID Of the Organization
        },
        "LocLon": {
            "Version": 2,
            "Timestamp": 1424117577573,
            "Value": 88.1212
        },
        "Name": {
            "Version": 2,
            "Timestamp": 1424117577573,
            "Value": "Atomiton Smart Parking"
        },
        "LocLat": {
            "Version": 2,
            "Timestamp": 1424117577573,
            "Value": -122.1212
        },
        "Email": {
            "Version": 2,
            "Timestamp": 1424117577573,
            "Value": "parking@atomiton.com"
        },
        "sid": "JOKALN3FAAAH6AABAH5NXIXA"
    }
}
```
You can run the following command to see the output.
```
build/install/SmartParkingHelloWorld/bin/SmartParkingHelloWorld getOrgs
```

###### Get the Initial Parking Lot Snapshot
This will display various Ids associated with the parking lot - example: Floor, Parking Spots
```java
//Construct the URL to get Parking Lot snapshot
String snapURL = SPConstants.SNAPSHOT_URL + getOrgId() + "/" + SPConstants.SNAPSHOT_FILENAME;

//Make a HTTP Call.
String output = HttpRequestResponseHandler.sendGet(snapURL,null);

//Parse the JSON Output
ObjectMapper obj = new ObjectMapper();
ParkingLot pl = obj.readValue(output, ParkingLot.class);
//Read Various values of the lot..
System.out.println(pl.getOrganization().getName());
//Loop through the floors and then spots.
for (ParkingFloor pf: pl.getParkingFloors()) {
	System.out.println("Floor Number: " + pf.getFloorInfo().getFloorNumber());
	for (ParkingSpot ps: pf.getParkingSpots()) {
		System.out.println("Parking Spot id: " + ps.getId());
	}
}

```
You can run the following command to see various Parking floors and Spot Ids printed
```
build/install/SmartParkingHelloWorld/bin/SmartParkingHelloWorld snapshot
```


###### Recieve the magnetic sensor and camera events. 

The sample code uses Websocket Jetty Client library to connect to the Atomiton's Websocket server and listen to the events.

You can run the following command to see various magnetic sensors and camera events printed out on the console. You can start applying the business logic to process the events and take some actions on things in the parking lot. You can look at onMessage function of the WebSocketListener class
```java
@OnWebSocketMessage
    public void onMessage(String msg) {
        System.out.printf("Got msg: %s%n", msg);
        //Do something with it. This is where you fill in the
        //business logic to manage the parking lot
    }

```

```
build/install/SmartParkingHelloWorld/bin/SmartParkingHelloWorld events
```
######Camera Event Example
```
<Set Name="camera.parkingSpotId" Target="Atom-Org-1.F1.S8" Time="1424140991624 Value="Car In"/>
```

######Magnetic Sensor Event Example
```
<Set Name="magneticSensor.parkingSpotId" Target="Atom-Org-1.F1.S0" Time="1424140991624" Value="available"/>
```

##### Taking Actions on things (Example: Area Light, Parking Meter, Digital Signage etc)

This example show how to take actions on Parking Area Lights. We are going to set the intensity of the Parking Area light to given value in command line argument as below.
```
build/install/SmartParkingHelloWorld/bin/SmartParkingHelloWorld updateLight 70
```



######The steps to actions are:

###### 1. Populate a HashMap of ParkingSpot Ids to AreaLight Ids
```java
/**
	 * This method creates a map of Parking Spot where Area Lights are
       attached.
	 * @param pl - Parking Lot
	 * @return
	 */
	public static Map<String, String> getAreaLightMap(ParkingLot pl) {
		Map<String, String> alMap = new HashMap<String, String>();
		for (ParkingFloor pf: pl.getParkingFloors()) {
			for (ParkingSpot ps: pf.getParkingSpots()) {
                //Is Area Light attached to the spot?
				if (ps.getAreaLightInfo() != null) { 
					System.out.println(ps.getId() + "---->" + 
                    ps.getAreaLightInfo().getid());
					alMap.put(ps.getId(), ps.getAreaLightInfo().getid());
				}
			}
		}
		return alMap;
	}
```

###### 2. Get the current record of AreaLight to be changed i.e. query by AreaLight Id.

```java
/*Get the current state of the Area Light. This is needed to get the current version of the Attribute "intensityLevel" as well as internal Id referred to as SID.
*/
	public static String getAreaLightById(String serverURL, 
     String areaLightId) throws Exception {

		String filterName = 
				"{\"eq\": {\"target\":\"id\", \"value\":\"" + areaLightId + "\"} }";

		List<NameValuePair> nvPairs = new ArrayList<NameValuePair>();
		nvPairs.add(new BasicNameValuePair("Command", "read"));
        //Model Name is AreaLight
		nvPairs.add(new BasicNameValuePair("Model", "AreaLight")); 
		nvPairs.add(new BasicNameValuePair("FilterName", filterName));
		String paramString = URLEncodedUtils.format(nvPairs, "utf-8");

		String getJSON = HttpRequestResponseHandler.sendGet(
               serverURL, paramString);
		return getJSON;
	}
```

###### 3. Call 'Update' API using ACTIONS URL as below.
```java
//This method updates the AreaLight;
	public static void updateAreaLightIntensity(
			String serverURL, String sid, String version, 
            String intensityLevel)
			throws Exception {
		String pJSON = "{" + 
				"\"Model\": \"AreaLight\", " +
				"\"AreaLight\": { " +
				"\"sid\": \"" + sid + "\", " +
				"\"intensityLevel\": {\"Version\":\"" + version + "\", \"Value\":\"" + intensityLevel + "\"}}}";
		System.out.println("Changing Intensity Level :" + intensityLevel);
		HttpRequestResponseHandler.sendPut(serverURL, pJSON);
	}
```

###### 4. Steps 2 and 3 are combined into one convinent method
```java
//This methods prepares for action on AreaLight
	public static void addMissingAreaLightId(String areaLightId, String spotId, String newIntensity)
			throws Exception {
		String psr = getAreaLightBySpotId(SPConstants.SERVER_URL, spotId);
		if (psr != null) {
			System.out.println(psr);
			JSONObject obj = new JSONObject(psr);
			String sid = obj.getJSONObject("AreaLight").getString("sid");
			String idVersion = 
                 ""+obj.getJSONObject("AreaLight").getJSONObjec"id").getInt("Version");
			System.out.println(sid + "  " + " " + idVersion);
			String target = spotId+"."+areaLightId;
			String result = newIntensity;
			String uri = "?Command=update&Target=" + target + "&Result=" + result;
			updateAreaLightId(SPConstants.ACTIONS_URL+uri, sid, 
            idVersion, areaLightId);
		}
	}
```

