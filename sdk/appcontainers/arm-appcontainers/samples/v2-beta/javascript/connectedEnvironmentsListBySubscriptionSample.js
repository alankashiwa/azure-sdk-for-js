/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Get all connectedEnvironments for a subscription.
 *
 * @summary Get all connectedEnvironments for a subscription.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-06-01-preview/examples/ConnectedEnvironments_ListBySubscription.json
 */
async function listConnectedEnvironmentsBySubscription() {
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.connectedEnvironments.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listConnectedEnvironmentsBySubscription().catch(console.error);
