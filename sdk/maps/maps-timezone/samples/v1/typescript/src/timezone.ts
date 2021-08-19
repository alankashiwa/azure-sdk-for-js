// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Timezone API usage. Simple queries are performed.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { TokenCredential, AzureKeyCredential } from "@azure/core-auth";
import { TimezoneClient } from "@azure/maps-timezone";
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

  const timezone = new TimezoneClient(credential, { xMsClientId: mapsClientId }).timezone;

  console.log(" --- Get timezone by coordinates:");
  const timezoneByCoordinatesOptions = { options: "all" };
  console.log(
    await timezone.getTimezoneByCoordinates("json", "47.0,-122", {
      ...timezoneByCoordinatesOptions
    })
  );

  console.log(" --- Get enum IANA timezones:");
  console.log(await timezone.getTimezoneEnumIana("json"));

  console.log(" --- Get IANA version:");
  console.log(await timezone.getTimezoneIanaVersion("json"));

  console.log(" --- Get timezone by IANA ID:");
  const timezoneByIdOptions = { options: "all" };
  console.log(
    await timezone.getTimezoneByID("json", "Asia/Bahrain", {
      ...timezoneByIdOptions
    })
  );

  console.log(" --- Get enum Windows timezones:");
  console.log(await timezone.getTimezoneEnumWindows("json"));

  console.log(" --- Get Windows timezone to IANA:");
  console.log(await timezone.getTimezoneWindowsToIana("json", "Eastern Standard Time"));
}

main();
