
package com.atomiton.smartparking.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ParkingRateInfo {

    @JsonProperty("durationMinutes")
    private Integer durationMinutes;
    @JsonProperty("farePerMinute")
    private Integer farePerMinute;
    @JsonProperty("minimumFare")
    private Integer minimumFare;
    @JsonProperty("maximumFare")
    private Integer maximumFare;
    @JsonProperty("currentFare")
    private Integer currentFare;
    
    /**
     * 
     * @return
     *     The durationMinutes
     */
    @JsonProperty("durationMinutes")
    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    /**
     * 
     * @param durationMinutes
     *     The durationMinutes
     */
    @JsonProperty("durationMinutes")
    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    /**
     * 
     * @return
     *     The farePerMinute
     */
    @JsonProperty("farePerMinute")
    public Integer getFarePerMinute() {
        return farePerMinute;
    }

    /**
     * 
     * @param farePerMinute
     *     The farePerMinute
     */
    @JsonProperty("farePerMinute")
    public void setFarePerMinute(Integer farePerMinute) {
        this.farePerMinute = farePerMinute;
    }

    /**
     * 
     * @return
     *     The minimumFare
     */
    @JsonProperty("minimumFare")
    public Integer getMinimumFare() {
        return minimumFare;
    }

    /**
     * 
     * @param minimumFare
     *     The minimumFare
     */
    @JsonProperty("minimumFare")
    public void setMinimumFare(Integer minimumFare) {
        this.minimumFare = minimumFare;
    }

    /**
     * 
     * @return
     *     The maximumFare
     */
    @JsonProperty("maximumFare")
    public Integer getMaximumFare() {
        return maximumFare;
    }

    /**
     * 
     * @param maximumFare
     *     The maximumFare
     */
    @JsonProperty("maximumFare")
    public void setMaximumFare(Integer maximumFare) {
        this.maximumFare = maximumFare;
    }

    /**
     * 
     * @return
     *     The currentFare
     */
    @JsonProperty("currentFare")
    public Integer getCurrentFare() {
        return currentFare;
    }

    /**
     * 
     * @param currentFare
     *     The currentFare
     */
    @JsonProperty("currentFare")
    public void setCurrentFare(Integer currentFare) {
        this.currentFare = currentFare;
    }

   

}
