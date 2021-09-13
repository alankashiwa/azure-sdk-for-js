import { CommonClientOptions } from "@azure/core-client";

/**
 * Client options common for all maps clients
 */
export interface MapsCommonClientOptions extends CommonClientOptions {
  /**
   * Azure Maps account-based GUID that appears on the Azure Maps authentication page
   * When authenticated with TokenCredential, the client send an HTTPS request along with the x-ms-client-id header
   */
  xMsClientId?: string;
}
