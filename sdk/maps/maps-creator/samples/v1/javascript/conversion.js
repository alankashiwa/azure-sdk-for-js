// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Conversion API usage. Simple CRUD operations are performed.
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

  const conversion = new CreatorClient(credential).conversion;

  // TO USE need to have some DWG data uploaded already - please use env CREATOR_DWG_ZIP_UDID
  const udid = process.env.CREATOR_DWG_ZIP_UDID;
  if ((typeof udid !== "string") || (udid.length != 36)) {
    throw "This sample needs some DWG data uploaded";
  }

  console.log(" --- Begin the Conversion:");
  const convertResult = await conversion.beginConvertAndWait(udid, "facility-2.0", operationOptions);
  console.log(convertResult);
  const conversionId = await pollUntilOperationIsDone(() => conversion.getOperation(convertResult.operationId, operationOptions));

  // ! you can use the converted data in the Dataset API - please put in env CREATOR_CONVERSION_ID

  console.log(" --- Get details about the created Conversion:");
  console.log(await conversion.get(conversionId, operationOptions));

  console.log(" --- Delete the created Conversion:");
  await conversion.delete(conversionId, operationOptions);
  console.log("Done (no response body)");

  console.log(" --- List all the Conversions:");
  for await (const conversionItem of conversion.list(operationOptions)) {
    console.log(conversionItem);
  }

}

main();
