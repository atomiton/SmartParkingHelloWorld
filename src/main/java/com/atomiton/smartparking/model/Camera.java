
package com.atomiton.smartparking.model;


import com.fasterxml.jackson.annotation.JsonProperty;
public class Camera {
	@JsonProperty("id")
	private String id;
	@JsonProperty("url")
	private String url;
	@JsonProperty("state")
	private String state;
	
	
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
	 *     The url
	 */
	@JsonProperty("url")
	public String getUrl() {
		return url;
	}

	/**
	 * 
	 * @param url
	 *     The url
	 */
	@JsonProperty("url")
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * 
	 * @return
	 *     The state
	 */
	@JsonProperty("state")
	public String getState() {
		return state;
	}

	/**
	 * 
	 * @param state
	 *     The state
	 */
	@JsonProperty("state")
	public void setState(String state) {
		this.state = state;
	}



}
