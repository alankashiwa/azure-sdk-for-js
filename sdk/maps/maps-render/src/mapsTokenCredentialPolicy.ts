import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy
} from "@azure/core-rest-pipeline";

const CLIENT_ID_HEADER_NAME = "x-ms-client-id";

/**
 * The programmatic identifier of the mapsTokenCredentialPolicy.
 */
export const mapsTokenCredentialPolicyName = "mapsTokenCredentialPolicy";

/**
 * Create an HTTP pipeline policy to add x-ms-client-id header
 * for `TokenCredential` based authentication for Azure Maps
 * @internal
 */
export function mapsTokenCredentialPolicy(mapsClientId: string): PipelinePolicy {
  return {
    name: mapsTokenCredentialPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has(CLIENT_ID_HEADER_NAME)) {
        request.headers.set(CLIENT_ID_HEADER_NAME, mapsClientId);
      }
      return next(request);
    }
  };
}
