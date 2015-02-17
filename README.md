# Smart Parking Hello World

Smart Parking Hello World  is the easiest way to get started with writing your first Java Application that manages a parking lot for efficiency while receiving a stream of events from Magnet sensors and Camera. 

You can get the [source code](https://github.com/Atomtion/SmartParkingHelloWorld) and create your own Smart Parking  Application with this [tutorial](http://tqldev.atomiton.com/docs)


## Requirements

SmartParkingHelloWorld requires JDK 1.7+ and Eclipse Version: Luna Service Release 1 (4.4.1) or other earlier versions.

#### Setting up your Eclipse Project

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

#### Building from command line

1. You can build the application from command line as well by running this script (for windows use gradlew.bat) :
```
cd SmartParkingHelloWorld
./gradlew installApp
```

2. The executable script will be installed in the folder: . 

3. You can run the installed script :

```
build/install/SmartParkingHelloWorld/bin/SmartParkingHelloWorld
```

