
package com.atomiton.smartparking.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AreaLightInfo {

	@JsonProperty("id")
    private String id;
    @JsonProperty("powerState")
    private String powerState;
    @JsonProperty("intensityLevel")
    private Double intensityLevel;
    @JsonProperty("operatedByOrg")
    private String operatedByOrg;
    @JsonProperty("block")
    private String block;
   
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
     *     The powerState
     */
    @JsonProperty("powerState")
    public String getPowerState() {
        return powerState;
    }

    /**
     * 
     * @param powerState
     *     The powerState
     */
    @JsonProperty("powerState")
    public void setPowerState(String powerState) {
        this.powerState = powerState;
    }

    /**
     * 
     * @return
     *     The intensityLevel
     */
    @JsonProperty("intensityLevel")
    public Double getIntensityLevel() {
        return intensityLevel;
    }

    /**
     * 
     * @param intensityLevel
     *     The intensityLevel
     */
    @JsonProperty("intensityLevel")
    public void setIntensityLevel(Double intensityLevel) {
        this.intensityLevel = intensityLevel;
    }

    /**
     * 
     * @return
     *     The operatedByOrg
     */
    @JsonProperty("operatedByOrg")
    public String getOperatedByOrg() {
        return operatedByOrg;
    }

    /**
     * 
     * @param operatedByOrg
     *     The operatedByOrg
     */
    @JsonProperty("operatedByOrg")
    public void setOperatedByOrg(String operatedByOrg) {
        this.operatedByOrg = operatedByOrg;
    }

    /**
     * 
     * @return
     *     The block
     */
    @JsonProperty("block")
    public String getBlock() {
        return block;
    }

    /**
     * 
     * @param block
     *     The block
     */
    @JsonProperty("block")
    public void setBlock(String block) {
        this.block = block;
    }

    

}
