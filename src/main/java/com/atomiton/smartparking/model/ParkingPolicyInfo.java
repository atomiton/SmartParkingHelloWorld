
package com.atomiton.smartparking.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ParkingPolicyInfo {

    @JsonProperty("loadingZone")
    private Integer loadingZone;
    @JsonProperty("noParking")
    private Integer noParking;
    @JsonProperty("alwaysValid")
    private Integer alwaysValid;
    @JsonProperty("fireZone")
    private Integer fireZone;
    @JsonProperty("standingZone")
    private Integer standingZone;
    
    /**
     * 
     * @return
     *     The loadingZone
     */
    @JsonProperty("loadingZone")
    public Integer getLoadingZone() {
        return loadingZone;
    }

    /**
     * 
     * @param loadingZone
     *     The loadingZone
     */
    @JsonProperty("loadingZone")
    public void setLoadingZone(Integer loadingZone) {
        this.loadingZone = loadingZone;
    }

    /**
     * 
     * @return
     *     The noParking
     */
    @JsonProperty("noParking")
    public Integer getNoParking() {
        return noParking;
    }

    /**
     * 
     * @param noParking
     *     The noParking
     */
    @JsonProperty("noParking")
    public void setNoParking(Integer noParking) {
        this.noParking = noParking;
    }

    /**
     * 
     * @return
     *     The alwaysValid
     */
    @JsonProperty("alwaysValid")
    public Integer getAlwaysValid() {
        return alwaysValid;
    }

    /**
     * 
     * @param alwaysValid
     *     The alwaysValid
     */
    @JsonProperty("alwaysValid")
    public void setAlwaysValid(Integer alwaysValid) {
        this.alwaysValid = alwaysValid;
    }

    /**
     * 
     * @return
     *     The fireZone
     */
    @JsonProperty("fireZone")
    public Integer getFireZone() {
        return fireZone;
    }

    /**
     * 
     * @param fireZone
     *     The fireZone
     */
    @JsonProperty("fireZone")
    public void setFireZone(Integer fireZone) {
        this.fireZone = fireZone;
    }

    /**
     * 
     * @return
     *     The standingZone
     */
    @JsonProperty("standingZone")
    public Integer getStandingZone() {
        return standingZone;
    }

    /**
     * 
     * @param standingZone
     *     The standingZone
     */
    @JsonProperty("standingZone")
    public void setStandingZone(Integer standingZone) {
        this.standingZone = standingZone;
    }

  

}
