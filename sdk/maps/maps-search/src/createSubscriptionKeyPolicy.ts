import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy
} from "@azure/core-rest-pipeline";
import { AzureKeyCredential } from "@azure/core-auth";

export const subscriptionIdPolicyName = "subscriptionIdPolicyName";

export function createSubscriptionKeyPolicy(
  azureKeyCredential: AzureKeyCredential
): PipelinePolicy {
  return {
    name: subscriptionIdPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has("subscription-key")) {
        request.headers.set("subscription-key", azureKeyCredential.key);
      }
      return next(request);
    }
  };
}
