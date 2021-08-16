import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy
} from "@azure/core-rest-pipeline";

export const mapsClientIdPolicyName = "mapsClientIdPolicy";

export function createMapsClientIdPolicy(mapsClientId: string): PipelinePolicy {
  return {
    name: mapsClientIdPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has("x-ms-client-id")) {
        request.headers.set("x-ms-client-id", mapsClientId);
      }
      return next(request);
    }
  };
}
