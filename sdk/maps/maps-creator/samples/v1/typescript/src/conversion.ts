// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Conversion API usage. Simple CRUD operations are performed.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { TokenCredential, AzureKeyCredential } from "@azure/core-auth";
import { CreatorClient, LongRunningOperationResult } from "@azure/maps-creator";
import * as dotenv from "dotenv";
dotenv.config();

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

declare type LongRunningOperationResponse = LongRunningOperationResult & {
  /** If successful, a URI where details on the newly created resource can be found. */
  resourceLocation?: string;
};

/**
 * This method is used for LROs (long running operations) in the Azure Maps API.
 * Since Maps API is not 100% compatible with Azure LROs it needs to be used.
 *
 * @param operation The operation that would be polled for the status.
 */
export async function pollUntilOperationIsDone(
  operation: (...args: any[]) => Promise<LongRunningOperationResponse>
): Promise<string> {
  let operationResponse = await operation();
  console.log(operationResponse);
  while (operationResponse.status == "NotStarted" || operationResponse.status == "Running") {
    console.log("   --> operation status: " + operationResponse.status);
    await wait(5000); // wait for 5 seconds between each poll
    operationResponse = await operation();
    console.log(operationResponse);
  }
  if (operationResponse.status == "Failed") {
    console.log(operationResponse.error?.details);
    if (operationResponse.error?.details) console.log(operationResponse.error?.details[0].details);
    throw "Failed operation!";
  }

  // get resource ID from the response header "Resource-Location"
  const resourceId = operationResponse.resourceLocation?.match("[0-9A-Fa-f-]{36}")?.join();

  return Promise.resolve(resourceId!);
}

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

  const conversion = new CreatorClient(credential).conversion;

  // TO USE need to have some DWG data uploaded already - please use env CREATOR_DWG_ZIP_UDID
  const udid = process.env.CREATOR_DWG_ZIP_UDID;
  if (typeof udid !== "string" || udid.length != 36) {
    throw "This sample needs some DWG data uploaded";
  }

  console.log(" --- Begin the Conversion:");
  const convertResult = await conversion.beginConvertAndWait(udid, "facility-2.0");
  console.log(convertResult);
  const conversionId = await pollUntilOperationIsDone(() =>
    conversion.getOperation(convertResult.operationId!)
  );

  // ! you can use the converted data in the Dataset API - please put in env CREATOR_CONVERSION_ID

  console.log(" --- Get details about the created Conversion:");
  console.log(await conversion.get(conversionId!));

  console.log(" --- Delete the created Conversion:");
  await conversion.delete(conversionId!);
  console.log("Done (no response body)");

  console.log(" --- List all the Conversions:");
  for await (const conversionItem of conversion.list()) {
    console.log(conversionItem);
  }
}

main();
