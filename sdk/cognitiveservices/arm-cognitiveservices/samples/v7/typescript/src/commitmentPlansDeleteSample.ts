/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes the specified commitmentPlan associated with the Cognitive Services account.
 *
 * @summary Deletes the specified commitmentPlan associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-10-01/examples/DeleteCommitmentPlan.json
 */
async function deleteCommitmentPlan() {
  const subscriptionId = "subscriptionId";
  const resourceGroupName = "resourceGroupName";
  const accountName = "accountName";
  const commitmentPlanName = "commitmentPlanName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.commitmentPlans.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    commitmentPlanName
  );
  console.log(result);
}

deleteCommitmentPlan().catch(console.error);
