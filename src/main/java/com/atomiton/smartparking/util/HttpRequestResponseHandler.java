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


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URLEncoder;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;


/**
 * The purpose of this class is to handle HTTP GET/POST/PUT Operations
 * @author baseerkhan
 *
 */
public class HttpRequestResponseHandler {

	// HTTP GET request
	public static String sendGet(String serverURL, String qParams) 
			throws Exception {
		
		String url = serverURL + "?" + qParams;

		CloseableHttpClient client = HttpClients.createDefault();
		HttpGet request = new HttpGet(url);

		HttpResponse response = client.execute(request);

		//System.out.println("\nSending 'GET' request to URL : " + url);
	
		BufferedReader rd = new BufferedReader(
				new InputStreamReader(response.getEntity().getContent()));

		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		client.close();
		return result.toString();
	}


	// HTTP POST request
	public static String sendPost(String serverURL, String postBody) 
			throws Exception {

		CloseableHttpClient client = HttpClients.createDefault();
		HttpPost post = new HttpPost(serverURL);

		StringEntity entity=new StringEntity(postBody,"UTF-8");

		post.setEntity(entity);

		HttpResponse response = client.execute(post);
		//System.out.println("\nSending 'POST' request to URL : " + serverURL);
		
		BufferedReader rd = new BufferedReader(
				new InputStreamReader(response.getEntity().getContent()));

		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		client.close();
		//System.out.println(result.toString()); 
		return result.toString();
	}

	// HTTP PUT request
	public static void sendPut(String serverURL, String postBody) 
			throws Exception {

		CloseableHttpClient client = HttpClients.createDefault();
		HttpPut post = new HttpPut(serverURL);

		StringEntity entity=new StringEntity(postBody,"UTF-8");

		post.setEntity(entity);

		HttpResponse response = client.execute(post);
		//System.out.println("\nSending 'PUT' request to URL : " + serverURL);
		
		BufferedReader rd = new BufferedReader(
				new InputStreamReader(response.getEntity().getContent()));

		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		client.close();
		//System.out.println(result.toString()); 
	}
}