
package com.atomiton.smartparking.model;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ParkingFloor {

    @JsonProperty("floorInfo")
    private FloorInfo floorInfo;
    @JsonProperty("parkingSpots")
    private List<ParkingSpot> parkingSpots = new ArrayList<ParkingSpot>();
   
    /**
     * 
     * @return
     *     The floorInfo
     */
    @JsonProperty("floorInfo")
    public FloorInfo getFloorInfo() {
        return floorInfo;
    }

    /**
     * 
     * @param floorInfo
     *     The floorInfo
     */
    @JsonProperty("floorInfo")
    public void setFloorInfo(FloorInfo floorInfo) {
        this.floorInfo = floorInfo;
    }

    /**
     * 
     * @return
     *     The parkingSpots
     */
    @JsonProperty("parkingSpots")
    public List<ParkingSpot> getParkingSpots() {
        return parkingSpots;
    }

    /**
     * 
     * @param parkingSpots
     *     The parkingSpots
     */
    @JsonProperty("parkingSpots")
    public void setParkingSpots(List<ParkingSpot> parkingSpots) {
        this.parkingSpots = parkingSpots;
    }

  

}
