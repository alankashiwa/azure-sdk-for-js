/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { AppPlatformManagementClient } = require("@azure/arm-appplatform");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Lists all of the available runtime versions supported by Microsoft.AppPlatform provider.
 *
 * @summary Lists all of the available runtime versions supported by Microsoft.AppPlatform provider.
 * x-ms-original-file: specification/appplatform/resource-manager/Microsoft.AppPlatform/preview/2022-11-01-preview/examples/RuntimeVersions_ListRuntimeVersions.json
 */
async function runtimeVersionsListRuntimeVersions() {
  const subscriptionId =
    process.env["APPPLATFORM_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AppPlatformManagementClient(credential, subscriptionId);
  const result = await client.runtimeVersions.listRuntimeVersions();
  console.log(result);
}

async function main() {
  runtimeVersionsListRuntimeVersions();
}

main().catch(console.error);
