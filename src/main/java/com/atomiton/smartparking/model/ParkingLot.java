
package com.atomiton.smartparking.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ParkingLot {

    @JsonProperty("organization")
    private Organization organization;
    @JsonProperty("parkingFloors")
    private List<ParkingFloor> parkingFloors = new ArrayList<ParkingFloor>();
    @JsonProperty("actionCounter")
    int actionCounter;
    
    /**
     * 
     * @return
     *     The organization
     */
    @JsonProperty("organization")
    public Organization getOrganization() {
        return organization;
    }

    /**
     * 
     * @param organization
     *     The organization
     */
    @JsonProperty("organization")
    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    /**
     * 
     * @return
     *     The parkingFloors
     */
    @JsonProperty("parkingFloors")
    public List<ParkingFloor> getParkingFloors() {
        return parkingFloors;
    }

    /**
     * 
     * @param parkingFloors
     *     The parkingFloors
     */
    @JsonProperty("parkingFloors")
    public void setParkingFloors(List<ParkingFloor> parkingFloors) {
        this.parkingFloors = parkingFloors;
    }
    
    @JsonProperty("actionCounter")
    public void setactionCounter(int c) {
    	actionCounter = c;
    }
    
    @JsonProperty("actionCounter")
    public int getactionCounter() {
    	return (actionCounter);
    }

}
