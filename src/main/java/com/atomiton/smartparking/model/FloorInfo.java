
package com.atomiton.smartparking.model;

import com.fasterxml.jackson.annotation.JsonProperty;
public class FloorInfo {

    @JsonProperty("id")
    private String id;
    @JsonProperty("parkingFloorState")
    private ParkingFloorState parkingFloorState;
    @JsonProperty("parkingUsageTypeInfo")
    private ParkingUsageTypeInfo parkingUsageTypeInfo;
    @JsonProperty("parkingRateInfo")
    private ParkingRateInfo parkingRateInfo;
    @JsonProperty("parkingPolicyInfo")
    private ParkingPolicyInfo parkingPolicyInfo;
    @JsonProperty("floorNumber")
    private Integer floorNumber;
    @JsonProperty("digitalSignLabel1")
    private String digitalSignLabel1;
    @JsonProperty("digitalSignLabel2")
    private String digitalSignLabel2;
    @JsonProperty("defParkingPolicyName")
    private String defParkingPolicyName;
   
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
     *     The parkingFloorState
     */
    @JsonProperty("parkingFloorState")
    public ParkingFloorState getParkingFloorState() {
        return parkingFloorState;
    }

    /**
     * 
     * @param parkingFloorState
     *     The parkingFloorState
     */
    @JsonProperty("parkingFloorState")
    public void setParkingFloorState(ParkingFloorState parkingFloorState) {
        this.parkingFloorState = parkingFloorState;
    }

    /**
     * 
     * @return
     *     The parkingUsageTypeInfo
     */
    @JsonProperty("parkingUsageTypeInfo")
    public ParkingUsageTypeInfo getParkingUsageTypeInfo() {
        return parkingUsageTypeInfo;
    }

    /**
     * 
     * @param parkingUsageTypeInfo
     *     The parkingUsageTypeInfo
     */
    @JsonProperty("parkingUsageTypeInfo")
    public void setParkingUsageTypeInfo(ParkingUsageTypeInfo parkingUsageTypeInfo) {
        this.parkingUsageTypeInfo = parkingUsageTypeInfo;
    }

    /**
     * 
     * @return
     *     The parkingRateInfo
     */
    @JsonProperty("parkingRateInfo")
    public ParkingRateInfo getParkingRateInfo() {
        return parkingRateInfo;
    }

    /**
     * 
     * @param parkingRateInfo
     *     The parkingRateInfo
     */
    @JsonProperty("parkingRateInfo")
    public void setParkingRateInfo(ParkingRateInfo parkingRateInfo) {
        this.parkingRateInfo = parkingRateInfo;
    }

    /**
     * 
     * @return
     *     The parkingPolicyInfo
     */
    @JsonProperty("parkingPolicyInfo")
    public ParkingPolicyInfo getParkingPolicyInfo() {
        return parkingPolicyInfo;
    }

    /**
     * 
     * @param parkingPolicyInfo
     *     The parkingPolicyInfo
     */
    @JsonProperty("parkingPolicyInfo")
    public void setParkingPolicyInfo(ParkingPolicyInfo parkingPolicyInfo) {
        this.parkingPolicyInfo = parkingPolicyInfo;
    }

    /**
     * 
     * @return
     *     The floorNumber
     */
    @JsonProperty("floorNumber")
    public Integer getFloorNumber() {
        return floorNumber;
    }

    /**
     * 
     * @param floorNumber
     *     The floorNumber
     */
    @JsonProperty("floorNumber")
    public void setFloorNumber(Integer floorNumber) {
        this.floorNumber = floorNumber;
    }

    /**
     * 
     * @return
     *     The digitalSignLabel1
     */
    @JsonProperty("digitalSignLabel1")
    public String getDigitalSignLabel1() {
        return digitalSignLabel1;
    }

    /**
     * 
     * @param digitalSignLabel1
     *     The digitalSignLabel1
     */
    @JsonProperty("digitalSignLabel1")
    public void setDigitalSignLabel1(String digitalSignLabel1) {
        this.digitalSignLabel1 = digitalSignLabel1;
    }

    /**
     * 
     * @return
     *     The digitalSignLabel2
     */
    @JsonProperty("digitalSignLabel2")
    public String getDigitalSignLabel2() {
        return digitalSignLabel2;
    }

    /**
     * 
     * @param digitalSignLabel2
     *     The digitalSignLabel2
     */
    @JsonProperty("digitalSignLabel2")
    public void setDigitalSignLabel2(String digitalSignLabel2) {
        this.digitalSignLabel2 = digitalSignLabel2;
    }

    /**
     * 
     * @return
     *     The defParkingPolicyName
     */
    @JsonProperty("defParkingPolicyName")
    public String getDefParkingPolicyName() {
        return defParkingPolicyName;
    }

    /**
     * 
     * @param defParkingPolicyName
     *     The defParkingPolicyName
     */
    @JsonProperty("defParkingPolicyName")
    public void setDefParkingPolicyName(String defParkingPolicyName) {
        this.defParkingPolicyName = defParkingPolicyName;
    }

   

}
