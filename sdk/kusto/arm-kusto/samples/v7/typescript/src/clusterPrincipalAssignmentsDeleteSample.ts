/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Deletes a Kusto cluster principalAssignment.
 *
 * @summary Deletes a Kusto cluster principalAssignment.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2022-07-07/examples/KustoClusterPrincipalAssignmentsDelete.json
 */
async function kustoClusterPrincipalAssignmentsDelete() {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-123456789098";
  const resourceGroupName =
    process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const principalAssignmentName = "kustoprincipal1";
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusterPrincipalAssignments.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    principalAssignmentName
  );
  console.log(result);
}

async function main() {
  kustoClusterPrincipalAssignmentsDelete();
}

main().catch(console.error);
