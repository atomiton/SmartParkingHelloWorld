
package com.atomiton.smartparking.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Organization {

    @JsonProperty("id")
    private String id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("email")
    private String email;
    @JsonProperty("locLon")
    private Double locLon;
    @JsonProperty("locLat")
    private Double locLat;
    @JsonProperty("addressStreetName1")
    private String addressStreetName1;
    
    
    /**
     * 
     * @return
     *     The addressStreetName1
     */
    @JsonProperty("addressStreetName1")
    public String getaddressStreetName1() {
        return addressStreetName1;
    }

    /**
     * 
     * @param addressStreetName1
     *     The addressStreetName1
     */
    @JsonProperty("addressStreetName1")
    public void setaddressStreetName1(String st) {
        this.addressStreetName1 = st;
    }
   
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
     *     The name
     */
    @JsonProperty("name")
    public String getName() {
        return name;
    }

    /**
     * 
     * @param name
     *     The name
     */
    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 
     * @return
     *     The email
     */
    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    /**
     * 
     * @param email
     *     The email
     */
    @JsonProperty("email")
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 
     * @return
     *     The locLon
     */
    @JsonProperty("locLon")
    public Double getLocLon() {
        return locLon;
    }

    /**
     * 
     * @param locLon
     *     The locLon
     */
    @JsonProperty("locLon")
    public void setLocLon(Double locLon) {
        this.locLon = locLon;
    }

    /**
     * 
     * @return
     *     The locLat
     */
    @JsonProperty("locLat")
    public Double getLocLat() {
        return locLat;
    }

    /**
     * 
     * @param locLat
     *     The locLat
     */
    @JsonProperty("locLat")
    public void setLocLat(Double locLat) {
        this.locLat = locLat;
    }  

}
