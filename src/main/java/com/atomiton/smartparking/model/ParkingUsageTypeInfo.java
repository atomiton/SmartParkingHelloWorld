
package com.atomiton.smartparking.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ParkingUsageTypeInfo {

    @JsonProperty("self")
    private Integer self;
    @JsonProperty("parknRide")
    private Integer parknRide;
    @JsonProperty("valet")
    private Integer valet;
    @JsonProperty("airport")
    private Integer airport;
    @JsonProperty("meetnGreet")
    private Integer meetnGreet;
    @JsonProperty("parknFly")
    private Integer parknFly;
    /**
     * 
     * @return
     *     The self
     */
    @JsonProperty("self")
    public Integer getSelf() {
        return self;
    }

    /**
     * 
     * @param self
     *     The self
     */
    @JsonProperty("self")
    public void setSelf(Integer self) {
        this.self = self;
    }

    /**
     * 
     * @return
     *     The parknRide
     */
    @JsonProperty("parknRide")
    public Integer getParknRide() {
        return parknRide;
    }

    /**
     * 
     * @param parknRide
     *     The parknRide
     */
    @JsonProperty("parknRide")
    public void setParknRide(Integer parknRide) {
        this.parknRide = parknRide;
    }

    /**
     * 
     * @return
     *     The valet
     */
    @JsonProperty("valet")
    public Integer getValet() {
        return valet;
    }

    /**
     * 
     * @param valet
     *     The valet
     */
    @JsonProperty("valet")
    public void setValet(Integer valet) {
        this.valet = valet;
    }

    /**
     * 
     * @return
     *     The airport
     */
    @JsonProperty("airport")
    public Integer getAirport() {
        return airport;
    }

    /**
     * 
     * @param airport
     *     The airport
     */
    @JsonProperty("airport")
    public void setAirport(Integer airport) {
        this.airport = airport;
    }

    /**
     * 
     * @return
     *     The meetnGreet
     */
    @JsonProperty("meetnGreet")
    public Integer getMeetnGreet() {
        return meetnGreet;
    }

    /**
     * 
     * @param meetnGreet
     *     The meetnGreet
     */
    @JsonProperty("meetnGreet")
    public void setMeetnGreet(Integer meetnGreet) {
        this.meetnGreet = meetnGreet;
    }

    /**
     * 
     * @return
     *     The parknFly
     */
    @JsonProperty("parknFly")
    public Integer getParknFly() {
        return parknFly;
    }

    /**
     * 
     * @param parknFly
     *     The parknFly
     */
    @JsonProperty("parknFly")
    public void setParknFly(Integer parknFly) {
        this.parknFly = parknFly;
    }

   

}
