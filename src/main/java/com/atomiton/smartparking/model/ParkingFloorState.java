
package com.atomiton.smartparking.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class ParkingFloorState {

    @JsonProperty("vacant")
    private String vacant;
    @JsonProperty("occupied")
    private Integer occupied;
    @JsonProperty("total")
    private Integer total;
    @JsonProperty("available")
    private Integer available;
    @JsonProperty("reserved")
    private Integer reserved;
   
    /**
     * 
     * @return
     *     The vacant
     */
    @JsonProperty("vacant")
    public String getVacant() {
        return vacant;
    }

    /**
     * 
     * @param vacant
     *     The vacant
     */
    @JsonProperty("vacant")
    public void setVacant(String vacant) {
        this.vacant = vacant;
    }

    /**
     * 
     * @return
     *     The occupied
     */
    @JsonProperty("occupied")
    public Integer getOccupied() {
        return occupied;
    }

    /**
     * 
     * @param occupied
     *     The occupied
     */
    @JsonProperty("occupied")
    public void setOccupied(Integer occupied) {
        this.occupied = occupied;
    }

    /**
     * 
     * @return
     *     The total
     */
    @JsonProperty("total")
    public Integer getTotal() {
        return total;
    }

    /**
     * 
     * @param total
     *     The total
     */
    @JsonProperty("total")
    public void setTotal(Integer total) {
        this.total = total;
    }

    /**
     * 
     * @return
     *     The available
     */
    @JsonProperty("available")
    public Integer getAvailable() {
        return available;
    }

    /**
     * 
     * @param available
     *     The available
     */
    @JsonProperty("available")
    public void setAvailable(Integer available) {
        this.available = available;
    }

    /**
     * 
     * @return
     *     The reserved
     */
    @JsonProperty("reserved")
    public Integer getReserved() {
        return reserved;
    }

    /**
     * 
     * @param reserved
     *     The reserved
     */
    @JsonProperty("reserved")
    public void setReserved(Integer reserved) {
        this.reserved = reserved;
    }

   

}
