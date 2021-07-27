// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Dataset API usage. Simple CRUD operations are performed.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { CreatorClient } = require("@azure/maps-creator");
require("dotenv").config();

const wait = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * This method is used for LROs (long running operations) in the Azure Maps API.
 * Since Maps API is not 100% compatible with Azure LROs it needs to be used.
 * 
 * @param operation The operation that would be polled for the status.
 */
async function pollUntilOperationIsDone(operation) {
  let operationResponse = await operation();
  console.log(operationResponse);
  while ((operationResponse.status == "NotStarted") || (operationResponse.status == "Running")) {
    console.log("   --> operation status: " + operationResponse.status);
    await wait(5000); // wait for 5 seconds between each poll
    operationResponse = await operation();
    console.log(operationResponse);
  }
  if (operationResponse.status == "Failed") {
    const operationError = operationResponse.error;
    if ((operationError !== null) && (operationError !== void 0)) {
      console.log(operationError.details);
      if (operationError.details)
        console.log(operationError.details[0].details);
    }
    throw "Failed operation!";
  }

  // get resource ID from the response header "Resource-Location"
  const resourceLocation = operationResponse.resourceLocation;
  if ((resourceLocation === null) || (resourceLocation === void 0))
    return Promise.resolve(void 0);
  const resourceId = resourceLocation.match("[0-9A-Fa-f\-]{36}");
  if ((resourceId === null) || (resourceId === void 0))
    return Promise.resolve(void 0);
  return Promise.resolve(resourceId.join());
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
class EmptyTokenCredential {
  async getToken(_scopes, _options) {
    return {
      token: "token",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000
    };
  }
}


async function main() {
  let credential;
  let operationOptions = {};

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    credential = new EmptyTokenCredential();
    operationOptions.requestOptions = { customHeaders: { "subscription-key": process.env.MAPS_SUBSCRIPTION_KEY } };
  }
  else {
    // Use Azure AD authentication
    credential = new DefaultAzureCredential();
  }

  const dataset = new CreatorClient(credential).dataset;

  // TO USE need to have some DWG Conversion done already - please use env CREATOR_CONVERSION_ID
  const conversionId = process.env.CREATOR_CONVERSION_ID;
  if ((typeof conversionId !== "string") || (conversionId.length != 36)) {
    throw "This sample needs some DWG Conversion done";
  }

  console.log(" --- Create Dataset:");
  const createResult = await dataset.beginCreateAndWait(conversionId, operationOptions);
  console.log(createResult);
  const datasetId = await pollUntilOperationIsDone(() => dataset.getOperation(createResult.operationId, operationOptions));

  // ! you can use the created dataset in the Tileset API - please put in env CREATOR_DATASET_ID

  console.log(" --- Get details about the created Dataset:");
  console.log(await dataset.get(datasetId, operationOptions));

  console.log(" --- Delete the created Dataset:");
  await dataset.delete(datasetId, operationOptions);
  console.log("Done (no response body)");

  console.log(" --- List all the Datasets:");
  for await (const datasetItem of dataset.list(operationOptions)) {
    console.log(datasetItem);
  }

}

main();
