/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Check if an IoT hub name is available.
 *
 * @summary Check if an IoT hub name is available.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/preview/2022-04-30-preview/examples/checkNameAvailability.json
 */
async function iotHubResourceCheckNameAvailability() {
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const operationInputs = { name: "test-request" };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.checkNameAvailability(operationInputs);
  console.log(result);
}

iotHubResourceCheckNameAvailability().catch(console.error);
