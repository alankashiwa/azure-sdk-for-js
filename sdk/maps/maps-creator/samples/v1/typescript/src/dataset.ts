// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Dataset API usage. Simple CRUD operations are performed.
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

  const dataset = new CreatorClient(credential, { xMsClientId: mapsClientId }).dataset;

  // TO USE need to have some DWG Conversion done already - please use env CREATOR_CONVERSION_ID
  const conversionId = process.env.CREATOR_CONVERSION_ID;
  if (typeof conversionId !== "string" || conversionId.length != 36) {
    throw "This sample needs some DWG Conversion done";
  }

  console.log(" --- Create Dataset:");
  const createResult = await dataset.beginCreateAndWait(conversionId);
  console.log(createResult);
  const datasetId = await pollUntilOperationIsDone(() =>
    dataset.getOperation(createResult.operationId!)
  );

  // ! you can use the created dataset in the Tileset API - please put in env CREATOR_DATASET_ID

  console.log(" --- Get details about the created Dataset:");
  console.log(await dataset.get(datasetId!));

  console.log(" --- Delete the created Dataset:");
  await dataset.delete(datasetId!);
  console.log("Done (no response body)");

  console.log(" --- List all the Datasets:");
  for await (const datasetItem of dataset.list()) {
    console.log(datasetItem);
  }
}

main();
