import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated";
import { IpAddressToLocationResult } from "./generated/models";
import { mapsClientIdPolicy } from "./mapsClientIdPolicy";
import { mapsAzureKeyCredentialPolicy } from "./mapsAzureKeyCredentialPolicy";
import { MapsCommonClientOptions } from "./mapsCommonOptions";

/**
 * Client options used to configure the Geolocation Client
 */
export interface GeolocationClientOptions extends MapsCommonClientOptions {}

/**
 * Client class for interacting with Azure Maps Geolocation Service to query the ISO country code for the provided IP address
 */
export class GeolocationClient {
  /**
   * A reference to the auto-generated Geolocation HTTP client.
   */
  private readonly client: GeneratedClient;
  /**
   * Creates an instance of GeolocationClient.
   *
   * Example usage:
   * ```ts
   * import { GeolocationClient } from "@azure/ai-metrics-advisor";
   * import { AzureKeyCredential } from "@azure/core-auth"
   *
   * const client = new GeolocationClient(new AzureKeyCredential('<subscription-key>'));
   * ```
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Geolocation Client
   */
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    options: GeolocationClientOptions = {}
  ) {
    this.client = new GeneratedClient(options);
    if (isTokenCredential(credential)) {
      if (!options.xMsClientId) {
        throw Error("option: xMsClientId is needed for TokenCredential");
      }
      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential,
          scopes: "https://atlas.microsoft.com/.default"
        })
      );
      this.client.pipeline.addPolicy(mapsClientIdPolicy(options.xMsClientId));
    } else {
      this.client.pipeline.addPolicy(mapsAzureKeyCredentialPolicy(credential));
    }
  }

  /**
   * Return the ISO country code for the provided IP address.
   * @param ip - The IP address. Both IPv4 and IPv6 are allowed.
   */
  public async getIpAddressLocation(ip: string): Promise<IpAddressToLocationResult> {
    return await this.client.geolocation.getIPToLocationPreview("json", ip);
  }
}
