
package com.atomiton.smartparking.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class ParkingMeterInfo {
	
	@JsonProperty("id")
	private String id;
	
	

    @JsonProperty("parkingMeterLabel")
    private String parkingMeterLabel;
    
    
    /**
	 * 
	 * @return
	 *     The id
	 */
	@JsonProperty("id")
	public String getid() {
		return id;
	}

	/**
	 * 
	 * @param id
	 *     The id
	 */
	@JsonProperty("id")
	public void setid(String id) {
		this.id = id;
	}
   
    /**
     * 
     * @return
     *     The parkingMeterLabel
     */
    @JsonProperty("parkingMeterLabel")
    public String getParkingMeterLabel() {
        return parkingMeterLabel;
    }

    /**
     * 
     * @param parkingMeterLabel
     *     The parkingMeterLabel
     */
    @JsonProperty("parkingMeterLabel")
    public void setParkingMeterLabel(String parkingMeterLabel) {
        this.parkingMeterLabel = parkingMeterLabel;
    }

   

}
