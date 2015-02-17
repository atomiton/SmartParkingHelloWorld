package com.atomiton.smartparking.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * <Attribute name="id" type="String" />
			<Attribute name="operatedByOrgId" type="string" />
			<Attribute name="state" type="string" />
			<Attribute name="parkingSpotId" type="string" />
 * @author baseerkhan
 *
 */
public class MagneticSensor {
	@JsonProperty("id")
	private String id;
	@JsonProperty("state")
	private String state;
	@JsonProperty("operatedByOrgId")
	private String operatedByOrgId;
	@JsonProperty("parkingSpotId")
	private String parkingSpotId;

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
	 *     The state
	 */
	@JsonProperty("state")
	public String getstate() {
		return state;
	}

	/**
	 * 
	 * @param state
	 *     The state
	 */
	@JsonProperty("state")
	public void setstate(String state) {
		this.state = state;
	}

	/**
	 * 
	 * @return
	 *     The operatedByOrgId
	 */
	@JsonProperty("operatedByOrgId")
	public String getoperatedByOrgId() {
		return operatedByOrgId;
	}

	/**
	 * 
	 * @param operatedByOrgId
	 *     The operatedByOrgId
	 */
	@JsonProperty("operatedByOrgId")
	public void setoperatedByOrgId(String operatedByOrg) {
		this.operatedByOrgId = operatedByOrg;
	}

	/**
	 * 
	 * @return
	 *     The parkingSpotId
	 */
	@JsonProperty("parkingSpotId")
	public String getparkingSpotId() {
		return parkingSpotId;
	}

	/**
	 * 
	 * @param parkingSpotId
	 *     The parkingSpotId
	 */
	@JsonProperty("parkingSpotId")
	public void setparkingSpotId(String block) {
		this.parkingSpotId = block;
	} 
}
