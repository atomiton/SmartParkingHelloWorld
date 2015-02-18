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

/**
 * Maintain list of all the constants used through out the program.
 * @author baseerkhan
 *
 */
public class SPConstants {
	//Web sockets to recieve events.
	public static String SP_EVENTS_WSURL = "ws://tqldev.atomiton.com:8090/fid-sensors";
	
	public static String SERVER_URL = "http://tqldev.atomiton.com:8080/fid-smartparking";
	
	public static String SP_ORG_PARAMS = "Command=readAll&Model=Organization";
	
	public static String SNAPSHOT_URL = "http://tqldev.atomiton.com:8080/fid-ParkingResoures/res/";
	
	public static String ACTIONS_URL = "http://tqldev.atomiton.com:8080/fid-actions";
	
	public static String SNAPSHOT_FILENAME = "splatest.json";
	
	
	
}
