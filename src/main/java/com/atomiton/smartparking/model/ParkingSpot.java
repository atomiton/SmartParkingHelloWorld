
package com.atomiton.smartparking.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ParkingSpot {

    @JsonProperty("id")
    private String id;
    @JsonProperty("state")
    private String state;
    @JsonProperty("label")
    private String label;
    @JsonProperty("spotSize")
    private String spotSize;
    @JsonProperty("stallLightInfo")
    private StallLightInfo stallLightInfo;
    @JsonProperty("areaLightInfo")
    private AreaLightInfo areaLightInfo;
    @JsonProperty("parkingMeterInfo")
    private ParkingMeterInfo parkingMeterInfo;
    @JsonProperty("camera")
    private Camera camera;
    
    @JsonProperty("magneticSensor")
    private MagneticSensor magneticSensor;
   
    /**
     * 
     * @return
     *     The id
     */
    @JsonProperty("id")
    public String getId() {
        return id;
    }

    /**
     * 
     * @param id
     *     The id
     */
    @JsonProperty("id")
    public void setId(String id) {
        this.id = id;
    }

    /**
     * 
     * @return
     *     The state
     */
    @JsonProperty("state")
    public String getState() {
        return state;
    }

    /**
     * 
     * @param state
     *     The state
     */
    @JsonProperty("state")
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 
     * @return
     *     The label
     */
    @JsonProperty("label")
    public String getLabel() {
        return label;
    }

    /**
     * 
     * @param label
     *     The label
     */
    @JsonProperty("label")
    public void setLabel(String label) {
        this.label = label;
    }

    /**
     * 
     * @return
     *     The spotSize
     */
    @JsonProperty("spotSize")
    public String getSpotSize() {
        return spotSize;
    }

    /**
     * 
     * @param spotSize
     *     The spotSize
     */
    @JsonProperty("spotSize")
    public void setSpotSize(String spotSize) {
        this.spotSize = spotSize;
    }

    /**
     * 
     * @return
     *     The stallLightInfo
     */
    @JsonProperty("stallLightInfo")
    public StallLightInfo getStallLightInfo() {
        return stallLightInfo;
    }

    /**
     * 
     * @param stallLightInfo
     *     The stallLightInfo
     */
    @JsonProperty("stallLightInfo")
    public void setStallLightInfo(StallLightInfo stallLightInfo) {
        this.stallLightInfo = stallLightInfo;
    }

    /**
     * 
     * @return
     *     The areaLightInfo
     */
    @JsonProperty("areaLightInfo")
    public AreaLightInfo getAreaLightInfo() {
        return areaLightInfo;
    }

    /**
     * 
     * @param areaLightInfo
     *     The areaLightInfo
     */
    @JsonProperty("areaLightInfo")
    public void setAreaLightInfo(AreaLightInfo areaLightInfo) {
        this.areaLightInfo = areaLightInfo;
    }

    /**
     * 
     * @return
     *     The parkingMeterInfo
     */
    @JsonProperty("parkingMeterInfo")
    public ParkingMeterInfo getParkingMeterInfo() {
        return parkingMeterInfo;
    }

    /**
     * 
     * @param parkingMeterInfo
     *     The parkingMeterInfo
     */
    @JsonProperty("parkingMeterInfo")
    public void setParkingMeterInfo(ParkingMeterInfo parkingMeterInfo) {
        this.parkingMeterInfo = parkingMeterInfo;
    }

    /**
     * 
     * @return
     *     The camera
     */
    @JsonProperty("camera")
    public Camera getCamera() {
        return camera;
    }

    /**
     * 
     * @param camera
     *     The camera
     */
    @JsonProperty("camera")
    public void setCamera(Camera camera) {
        this.camera = camera;
    }
    
    
    /**
     * 
     * @return
     *     The magneticSensor
     */
    @JsonProperty("magneticSensor")
    public MagneticSensor getmagneticSensor() {
        return magneticSensor;
    }

    /**
     * 
     * @param magneticSensor
     *     The magneticSensor
     */
    @JsonProperty("magneticSensor")
    public void setMagneticSensor(MagneticSensor magneticSensor) {
        this.magneticSensor = magneticSensor;
    }

   

}
