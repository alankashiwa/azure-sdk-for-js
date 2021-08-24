// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Alias API usage. Simple CRUD operations are performed.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { CreatorClient } = require("@azure/maps-creator");
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

  const alias = new CreatorClient(credential, { xMsClientId: mapsClientId }).alias;

  console.log(" --- Create Alias:");
  const aliasCreateResponse = await alias.create();
  console.log(aliasCreateResponse);
  const aliasId = aliasCreateResponse.aliasId;

  // TO USE need to have some data uploaded already - please use env CREATOR_DWG_ZIP_UDID or CREATOR_GEOJSON_UDID
  const udid = process.env.CREATOR_DWG_ZIP_UDID;
  if (typeof udid === "string" && udid.length == 36) {
    console.log(" --- Assign the aliasId to some Creator's udid:");
    console.log(await alias.assign(aliasId, udid));
  }

  console.log(" --- Get details about the created Alias:");
  console.log(await alias.getDetails(aliasId));

  console.log(" --- Delete the created Alias:");
  await alias.delete(aliasId);
  console.log("Done (no response body)");

  console.log(" --- List all the created Aliases:");
  for await (const aliasItem of alias.list()) {
    console.log(aliasItem);
  }
}

main();
