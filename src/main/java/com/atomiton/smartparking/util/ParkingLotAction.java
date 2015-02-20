/**
 * Copyright © 2015 Atomiton, Inc. All rights reserved.

	This file, or any software and its documentation downloaded from 
	Atomiton website tql.atomiton.com (hereinafter referred as “Software”) 
	is copyright protected work of Atomiton, inc. 
	You may not use, copy, modify or 
	distribute Software without an End User License Agreement (hereinafter referred as “EULA”). 
	Use of Software must be restrained by the clauses in the EULA. 
	You may obtain a copy of the EULA at:
	http://www.atomiton.com
	Unless you agree with the clauses set out in the EULA, you may not install or 
	use any Atomiton Software.
 */
package com.atomiton.smartparking.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;



/**
 * The purpose of this class is to take an action on the Parking Lot thing.
 * This example demonstrates action on: Area Intensity Light
 * @author baseerkhan
 */
public class ParkingLotAction {


	//This method updates the AreaLight;
	public static void updateAreaLightIntensity(
			String serverURL, String sid, String version, String intensityLevel)
					throws Exception {
		String pJSON = "{" + 
				"\"Model\": \"AreaLight\", " +
				"\"AreaLight\": { " +
				"\"sid\": \"" + sid + "\", " +
				"\"intensityLevel\": {\"Version\":\"" + version + "\", \"Value\":\"" + intensityLevel + "\"}}}";

		System.out.println("Changing Intensity Level :" + intensityLevel);
		HttpRequestResponseHandler.sendPut(serverURL, pJSON);
	}


	//This method updates the DigitalSign;
	public static void updateDigitalSignage1(
			String serverURL, String sid, String version, String label)
					throws Exception {
		String pJSON = "{" + 
				"\"Model\": \"ParkingFloor\", " +
				"\"ParkingFloor\": { " +
				"\"sid\": \"" + sid + "\", " +
				"\"digitalSignage1\": {\"Version\":\"" + version + "\", \"Value\":\"" + label + "\"}}}";

		System.out.println("Changing Signage Label :" + label);
		HttpRequestResponseHandler.sendPut(serverURL, pJSON);
	}

	public static void updateParkingMeterPrice(String serverURL, String sid, 
			String version, String price)
					throws Exception {
		String pJSON = "{" + 
				"\"Model\": \"ParkingMeter\", " +
				"\"ParkingMeter\": { " +
				"\"sid\": \"" + sid + "\", " +
				"\"parkignMeterLabel\": {\"Version\":\"" + version + "\", \"Value\":\"" + price + "\"}}}";

		System.out.println("Changing Price :" + price);
		HttpRequestResponseHandler.sendPut(serverURL, pJSON);
	}

	//This method updates the AreaLight;
	public static void updateStallLightPowerState(
			String serverURL, String sid, String version, String powerState)
					throws Exception {
		String pJSON = "{" + 
				"\"Model\": \"StallLight\", " +
				"\"StallLight\": { " +
				"\"sid\": \"" + sid + "\", " +
				"\"powerState\": {\"Version\":\"" + version + "\", \"Value\":\"" + powerState + "\"}}}";

		System.out.println("Changing Power State :" + powerState);
		HttpRequestResponseHandler.sendPut(serverURL, pJSON);
	}


	//Get the current state of the Area Light. This is needed to get the current version of the 
	//Attribute "intensityLevel" as well as internal Id refered to as SID.
	public static String getAreaLightBySpotId(String serverURL, String spotId) 
			throws Exception {

		String filterName = 
				"{\"eq\": {\"target\":\"parkingSpotId\", \"value\":\"" + spotId + "\"} }";

		List<NameValuePair> nvPairs = new ArrayList<NameValuePair>();
		nvPairs.add(new BasicNameValuePair("Command", "read"));
		nvPairs.add(new BasicNameValuePair("Model", "AreaLight")); //Model Name is AreaLight
		nvPairs.add(new BasicNameValuePair("FilterName", filterName));
		String paramString = URLEncodedUtils.format(nvPairs, "utf-8");

		String getJSON = HttpRequestResponseHandler.sendGet(serverURL, paramString);
		return getJSON;
	}

	//Get the current state of the Area Light. This is needed to get the current version of the 
	//Attribute "intensityLevel" as well as internal Id referred to as SID.
	public static String getAreaLightById(String serverURL, String areaLightId) 
			throws Exception {

		String filterName = 
				"{\"eq\": {\"target\":\"id\", \"value\":\"" + areaLightId + "\"} }";

		List<NameValuePair> nvPairs = new ArrayList<NameValuePair>();
		nvPairs.add(new BasicNameValuePair("Command", "read"));
		nvPairs.add(new BasicNameValuePair("Model", "AreaLight")); //Model Name is AreaLight
		nvPairs.add(new BasicNameValuePair("FilterName", filterName));
		String paramString = URLEncodedUtils.format(nvPairs, "utf-8");

		String getJSON = HttpRequestResponseHandler.sendGet(serverURL, paramString);
		return getJSON;
	}

	//Get the current state of the Area Light. This is needed to get the current version of the 
	//Attribute "intensityLevel" as well as internal Id referred to as SID.
	public static String getStallLightById(String serverURL, String stallLightId) 
			throws Exception {

		String filterName = 
				"{\"eq\": {\"target\":\"id\", \"value\":\"" + stallLightId + "\"} }";

		List<NameValuePair> nvPairs = new ArrayList<NameValuePair>();
		nvPairs.add(new BasicNameValuePair("Command", "read"));
		nvPairs.add(new BasicNameValuePair("Model", "StallLight")); //Model Name is AreaLight
		nvPairs.add(new BasicNameValuePair("FilterName", filterName));
		String paramString = URLEncodedUtils.format(nvPairs, "utf-8");

		String getJSON = HttpRequestResponseHandler.sendGet(serverURL, paramString);
		return getJSON;
	}

	/**
	 * This method gets the ParkingFloor given its Id.
	 * @param serverURL
	 * @param floorId
	 * @return
	 * @throws Exception
	 */
	public static String getParkingFloorById(String serverURL, String floorId) 
			throws Exception {

		String filterName = 
				"{\"eq\": {\"target\":\"id\", \"value\":\"" + floorId + "\"} }";

		List<NameValuePair> nvPairs = new ArrayList<NameValuePair>();
		nvPairs.add(new BasicNameValuePair("Command", "read"));
		nvPairs.add(new BasicNameValuePair("Model", "ParkingFloor")); //Model Name is AreaLight
		nvPairs.add(new BasicNameValuePair("FilterName", filterName));
		String paramString = URLEncodedUtils.format(nvPairs, "utf-8");

		String getJSON = HttpRequestResponseHandler.sendGet(serverURL, paramString);
		return getJSON;
	}


	//Get the current state of the Area Light. This is needed to get the current version of the 
	//Attribute "intensityLevel" as well as internal Id refered to as SID.
	public static String getParkingMeterById(String serverURL, String pmId) 
			throws Exception {

		String filterName = 
				"{\"eq\": {\"target\":\"id\", \"value\":\"" + pmId + "\"} }";

		List<NameValuePair> nvPairs = new ArrayList<NameValuePair>();
		nvPairs.add(new BasicNameValuePair("Command", "read"));
		nvPairs.add(new BasicNameValuePair("Model", "ParkingMeter")); //Model Name is AreaLight
		nvPairs.add(new BasicNameValuePair("FilterName", filterName));
		String paramString = URLEncodedUtils.format(nvPairs, "utf-8");

		String getJSON = HttpRequestResponseHandler.sendGet(serverURL, paramString);
		return getJSON;
	}

	//This methods prepares for action on AreaLight
	public static void actionOnAreaLight(String areaLightId, String spotId, String newIntensity)
			throws Exception {
		String psr = getAreaLightById(SPConstants.SERVER_URL, areaLightId);
		if (psr != null) {
			JSONObject obj = new JSONObject(psr);
			String sid = obj.getJSONObject("AreaLight").getString("sid");
			String intensityVersion = ""+obj.getJSONObject("AreaLight").getJSONObject("intensityLevel").getInt("Version");
			System.out.println(sid + "  " + " " + intensityVersion);
			String target = spotId+"."+areaLightId;
			String result = newIntensity;
			String uri = "?Command=update&Target=" + target + "&Result=" + result;
			updateAreaLightIntensity(SPConstants.ACTIONS_URL+uri, sid, intensityVersion, newIntensity);
		}
	}

	//This methods prepares for action on AreaLight
	public static void actionOnStallLight(String stallLightId, String spotId, String powerState)
			throws Exception {
		String psr = getStallLightById(SPConstants.SERVER_URL, stallLightId);
		if (psr != null) {
			JSONObject obj = new JSONObject(psr);
			String sid = obj.getJSONObject("StallLight").getString("sid");
			String powerStateVersion = ""+obj.getJSONObject("StallLight").getJSONObject("powerState").getInt("Version");
			System.out.println(sid + "  " + " " + powerStateVersion);
			String target = spotId+"."+stallLightId;
			String result = powerState;
			String uri = "?Command=update&Target=" + target + "&Result=" + result;
			updateStallLightPowerState(SPConstants.ACTIONS_URL+uri, sid, powerStateVersion, powerState);
		}
	}


	//This methods prepares for action on Parking Meter
	public static void actionOnParkingMeter(String pmeterId, String spotId, String newPrice)
			throws Exception {
		String psr = getParkingMeterById(SPConstants.SERVER_URL, pmeterId);
		if (psr != null) {
			JSONObject obj = new JSONObject(psr);
			String sid = obj.getJSONObject("ParkingMeter").getString("sid");
			String intensityVersion = ""+obj.getJSONObject("ParkingMeter").getJSONObject("parkingMeterLabel").getInt("Version");
			System.out.println(sid + "  " + " " + intensityVersion);
			String target = spotId+"."+pmeterId;
			String result = newPrice;
			String uri = "?Command=update&Target=" + target + "&Result=" + result;
			updateParkingMeterPrice(SPConstants.ACTIONS_URL+uri, sid, intensityVersion, newPrice);
		}
	}
	
	public static void actionOnDigitalSignage(String floorId, String label)
			throws Exception {
		String psr = getParkingFloorById(SPConstants.SERVER_URL, floorId);
		if (psr != null) {
			JSONObject obj = new JSONObject(psr);
			String sid = obj.getJSONObject("ParkingFloor").getString("sid");
			String labelVersion = ""+obj.getJSONObject("ParkingFloor").getJSONObject("digitalSignLabel1").getInt("Version");
			System.out.println(sid + "  " + " " + labelVersion);
			String target = floorId+".digitalSignLabel1";
			String result = label;
			String uri = "?Command=update&Target=" + target + "&Result=" + result;
			updateDigitalSignage1(SPConstants.ACTIONS_URL+uri, sid, labelVersion, label);
		}
	}



}
