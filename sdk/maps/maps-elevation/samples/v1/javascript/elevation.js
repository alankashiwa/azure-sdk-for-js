// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Elevation API usage. Simple CRUD operations are performed.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { ElevationClient } = require("@azure/maps-elevation");
require("dotenv").config();

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
  let credential;
  let mapsClientId;

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    credential = new AzureKeyCredential(process.env.MAPS_SUBSCRIPTION_KEY);
  } else {
    // Use Azure AD authentication
    credential = new DefaultAzureCredential();
    mapsClientId = process.env.MAPS_CLIENT_ID;
  }

  const elevation = new ElevationClient(credential, { xMsClientId: mapsClientId }).elevation;

  console.log(" --- Get Data For Bounding Box:");
  console.log(
    await elevation.getDataForBoundingBox(
      "json",
      ["-121.66853362143818", "46.84646479863713", "-121.65853362143818", "46.85646479863713"],
      3,
      3
    )
  );

  console.log(" --- Get Data For Points:");
  console.log(
    await elevation.getDataForPoints("json", [
      "-121.66853362143818,46.84646479863713",
      "-121.65853362143818,46.85646479863713"
    ])
  );

  console.log(" --- Get Data For Polyline:");
  console.log(
    await elevation.getDataForPolyline("json", [
      "-121.66853362143818,46.84646479863713",
      "-121.65853362143818,46.85646479863713"
    ])
  );

  console.log(" --- Post Data For Points:");
  console.log(
    await elevation.postDataForPoints("json", [
      { lat: 46.84646479863713, lon: -121.66853362143818 },
      { lat: 46.85646479863713, lon: -121.65853362143818 }
    ])
  );

  console.log(" --- Post Data For Polyline:");
  console.log(
    await elevation.postDataForPolyline("json", [
      { lat: 46.84646479863713, lon: -121.66853362143818 },
      { lat: 46.85646479863713, lon: -121.65853362143818 }
    ])
  );
}

main();
