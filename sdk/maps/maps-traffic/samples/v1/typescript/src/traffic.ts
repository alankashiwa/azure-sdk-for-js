// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Traffic API usage. Simple queries are performed.
 */

import fs from "fs";
import { DefaultAzureCredential } from "@azure/identity";
import { TokenCredential, AzureKeyCredential } from "@azure/core-auth";
import { TrafficClient } from "@azure/maps-traffic";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Azure Maps supports two ways to authenticate requests:
 * - Shared Key authentication (subscription-key)
 * - Azure Active Directory (Azure AD) authentication
 *
 * In this sample you can put MAPS_SUBSCRIPTION_KEY into .env file to use the first approach or populate
 * the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for trying out AAD auth.
 *
 * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
 */

async function main() {
  let credential: TokenCredential | AzureKeyCredential;
  let mapsClientId: string | undefined;

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    credential = new AzureKeyCredential(process.env.MAPS_SUBSCRIPTION_KEY);
  } else {
    // Use Azure AD authentication
    credential = new DefaultAzureCredential();
    mapsClientId = process.env.MAPS_CLIENT_ID;
  }

  const traffic = new TrafficClient(credential, { xMsClientId: mapsClientId }).traffic;

  console.log(" --- Get traffic flow segment:");
  console.log(await traffic.getTrafficFlowSegment("json", "absolute", 10, "52.41072,4.84239"));

  if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");

  console.log(" --- Get traffic flow tile:");
  let result = await traffic.getTrafficFlowTile("png", "absolute", 12, 2044, 1360);
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  result.readableStreamBody?.pipe(fs.createWriteStream("tmp/traffic_flow_tile.png"));

  console.log(" --- Get traffic incident detail:");
  console.log(
    await traffic.getTrafficIncidentDetail(
      "json",
      "s3",
      "6841263.950712,511972.674418,6886056.049288,582676.925582",
      11,
      "1335294634919"
    )
  );

  console.log(" --- Get traffic incident tile:");
  result = await traffic.getTrafficIncidentTile("png", "night", 10, 175, 408);
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  result.readableStreamBody?.pipe(fs.createWriteStream("tmp/traffic_incident_tile.png"));

  console.log(" --- Get traffic incident viewport:");
  const viewportBBox =
    "-939584.4813015489,-23954526.723651607,14675583.153020501,25043442.895825107";
  const overviewBBox =
    "-939584.4813018347,-23954526.723651607,14675583.153020501,25043442.8958229083";
  console.log(await traffic.getTrafficIncidentViewport("json", viewportBBox, 2, overviewBBox, 2));
}

main();
