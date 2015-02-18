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
	
	//This method updates the AreaLight;
		public static void updateAreaLightId(
				String serverURL, String sid, String version, String areaLightId)
						throws Exception {
			String pJSON = "{" + 
					"\"Model\": \"AreaLight\", " +
					"\"AreaLight\": { " +
					"\"sid\": \"" + sid + "\", " +
					"\"id\": {\"Version\":\"" + version + "\", \"Value\":\"" + areaLightId + "\"}}}";

			System.out.println("Changing Id :" + areaLightId);
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
	//Attribute "intensityLevel" as well as internal Id refered to as SID.
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
		public static void addMissingAreaLightId(String areaLightId, String spotId, String newIntensity)
		throws Exception {
			String psr = getAreaLightBySpotId(SPConstants.SERVER_URL, spotId);
			if (psr != null) {
				System.out.println(psr);
				JSONObject obj = new JSONObject(psr);
				String sid = obj.getJSONObject("AreaLight").getString("sid");
				String idVersion = ""+obj.getJSONObject("AreaLight").getJSONObject("id").getInt("Version");
				System.out.println(sid + "  " + " " + idVersion);
				String target = spotId+"."+areaLightId;
				String result = newIntensity;
				String uri = "?Command=update&Target=" + target + "&Result=" + result;
				updateAreaLightId(SPConstants.ACTIONS_URL+uri, sid, idVersion, areaLightId);
			}
		}

}
