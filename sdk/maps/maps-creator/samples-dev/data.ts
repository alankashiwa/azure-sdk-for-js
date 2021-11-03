// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Data API usage. Simple CRUD operations are performed.
 */

import fs from "fs";
import path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import * as coreAuth from "@azure/core-auth";
import * as coreClient from "@azure/core-client";
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

/**
 * Empty token class definition. To be used with AzureKey credentials.
 */
class EmptyTokenCredential implements coreAuth.TokenCredential {
  async getToken(
    _scopes: string | string[],
    _options?: coreAuth.GetTokenOptions
  ): Promise<coreAuth.AccessToken | null> {
    return {
      token: "token",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000
    };
  }
}

async function main() {
  let credential: coreAuth.TokenCredential;
  let operationOptions: coreClient.OperationOptions = {};

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    credential = new EmptyTokenCredential();
    operationOptions.requestOptions = {
      customHeaders: { "subscription-key": process.env.MAPS_SUBSCRIPTION_KEY }
    };
  } else {
    // Use Azure AD authentication
    credential = new DefaultAzureCredential();
    if (process.env.MAPS_CLIENT_ID) {
      operationOptions.requestOptions = {
        customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
      };
    }
  }

  const data = new CreatorClient(credential).data;

  const filePathForUpload = "./resources/data_sample_upload.json";
  const filePathForZipUpload = "./resources/data_sample_upload.zip";
  const filePathForUpdate = "./resources/data_sample_update.json";

  // This will upload new resource for Creator returning unique ID (udid) that might be used for other
  // Creator's services: Alias, Conversion, etc. Please put it in the env CREATOR_DWG_ZIP_UDID or CREATOR_GEOJSON_UDID.

  // Upload GeoJson:

  const geoJsonUpload = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, filePathForUpload), "utf8")
  );

  console.log(" --- Begin the upload Data (single JSON file):");
  const uploadResult = await data.beginUploadAndWait(
    "geojson",
    "application/json",
    geoJsonUpload,
    operationOptions
  );
  console.log(uploadResult);
  const udid = await pollUntilOperationIsDone(() =>
    data.getOperation(uploadResult.operationId!, operationOptions)
  );

  console.log(" --- Download the uploaded Data:");
  let result = await data.download(udid!, operationOptions);
  console.log("Done (content type: " + result.contentType + ")");
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  console.log(
    "Matches input?   " +
      (JSON.stringify(geoJsonUpload) == result.readableStreamBody?.read().toString())
  );

  // Update GeoJson:

  const geoJsonUpdate = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, filePathForUpdate), "utf8")
  );

  console.log(" --- Begin the update Data (single JSON file):");
  const updateResult = await data.beginUpdateAndWait(udid, geoJsonUpdate, operationOptions);
  console.log(updateResult);
  await pollUntilOperationIsDone(() =>
    data.getOperation(updateResult.operationId!, operationOptions)
  );

  console.log(" --- Download the updated Data:");
  result = await data.download(udid!, operationOptions);
  console.log("Done (content type: " + result.contentType + ")");
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  console.log(
    "Matches input?   " +
      (JSON.stringify(geoJsonUpdate) == result.readableStreamBody?.read().toString())
  );

  // Delete the data (cleanup)

  console.log(" --- Delete the created Data item:");
  await data.delete(udid, operationOptions);
  console.log("Done (no response body)");

  // Upload ZIP with DWG files:

  console.log(" --- Begin the upload Data (single ZIP file):");
  const uploadZipResult = await data.beginUploadAndWait(
    "dwgzippackage",
    "application/octet-stream",
    fs.readFileSync(path.resolve(__dirname, filePathForZipUpload)),
    operationOptions
  );
  console.log(uploadZipResult);
  const zipUdid = await pollUntilOperationIsDone(() =>
    data.getOperation(uploadZipResult.operationId!, operationOptions)
  );

  if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");

  console.log(" --- Download the uploaded Data:");
  let zipResult = await data.download(zipUdid!, operationOptions);
  console.log("Done (content type: " + zipResult.contentType + ")");
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  zipResult.readableStreamBody?.pipe(fs.createWriteStream("tmp/Data_uploaded.zip"));

  // Delete the data (cleanup)

  console.log(" --- Delete the created Data item:");
  await data.delete(zipUdid, operationOptions);
  console.log("Done (no response body)");

  // List all the data

  console.log(" --- List all the Data uploaded:");
  (await data.list(operationOptions)).mapDataList?.forEach((dataItem) => {
    console.log(dataItem);
  });
}

main();
