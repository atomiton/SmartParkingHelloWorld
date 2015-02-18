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
package com.atomiton.smartparking;

import java.net.URI;
import java.util.concurrent.TimeUnit;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig.Feature;
import org.eclipse.jetty.websocket.client.ClientUpgradeRequest;
import org.eclipse.jetty.websocket.client.WebSocketClient;
import org.json.JSONObject;

import com.atomiton.smartparking.model.ParkingFloor;
import com.atomiton.smartparking.model.ParkingLot;
import com.atomiton.smartparking.model.ParkingSpot;
import com.atomiton.smartparking.util.HttpRequestResponseHandler;
import com.atomiton.smartparking.util.SPConstants;
import com.atomiton.smartparking.util.WebSocketListener;



/**
 * The purpose of this class is to generate Events.
 * @author baseerkhan
 *
 */
public class SmartParking {

	/*******************************************************************************
	 * @param args
	 * 
	 * 
	 * 
	 * 
	 ********************************************************************************/
	public static void main(String[] args) {
		try {

			System.out.println("Welcome to Smart Parking Hello World Application.");
			if (args.length > 0) {
				switch (args[0]) {
				case "getOrgs": {
					System.out.println("Getting list of Organization Id..");
					getOrgId();
					break;
				}
				case "snapshot": {
					//Construct the URL to get Parking Lot snapshot
					String snapURL = SPConstants.SNAPSHOT_URL + getOrgId() + "/" + SPConstants.SNAPSHOT_FILENAME;
					String output = HttpRequestResponseHandler.sendGet(snapURL,null);
					ObjectMapper obj = new ObjectMapper();
					ParkingLot pl = obj.readValue(output, ParkingLot.class);
					//Read Various values of the lot..
					System.out.println(pl.getOrganization().getName());
					for (ParkingFloor pf: pl.getParkingFloors()) {
						System.out.println("Floor Number: " + pf.getFloorInfo().getFloorNumber());
						for (ParkingSpot ps: pf.getParkingSpots()) {
							System.out.println("Parking Spot id: " + ps.getId());
						}
					}
					break;
				}
				
				case "events": {
					WebSocketClient client = new WebSocketClient();
			        WebSocketListener wsListener = new WebSocketListener();
			        try {
			            client.start();
			            URI wsUri = new URI(SPConstants.SP_EVENTS_WSURL);
			            ClientUpgradeRequest request = new ClientUpgradeRequest();
			            client.connect(wsListener, wsUri, request);
			            System.out.printf("Connecting to : %s%n", wsUri);
			            wsListener.awaitClose(5, TimeUnit.SECONDS);
			        } catch (Throwable t) {
			            t.printStackTrace();
			        } finally {
			            try {
			                client.stop();
			            } catch (Exception e) {
			                e.printStackTrace();
			            }
			        }
				}
				break;
				default: {
					printHelp();
					break;
				}
				}
			} else {
				printHelp();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static String getOrgId() throws Exception {
		System.out.println("Getting list of Organizations..");
		String output = HttpRequestResponseHandler.sendGet(
				SPConstants.SERVER_URL, 
				SPConstants.SP_ORG_PARAMS);
		JSONObject obj = new JSONObject(output);
		System.out.println("Name is: " + obj.getJSONObject("Organization").getJSONObject("Name").getString("Value"));
		String id =  obj.getJSONObject("Organization").getJSONObject("id").getString("Value");
		System.out.println("Org Id is: " + id);
		return id;
	}

	private static void printHelp() {
		System.out.println("SmartParking <options>. Where options are:");
		System.out.println("getOrgs");
		System.out.println("snapshot");
		System.out.println("events");
		System.out.println("update");
	}


}
