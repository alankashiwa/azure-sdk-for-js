import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { SearchClient } from "../generated/searchClient";
import { SearchClientOptionalParams as SearchClientOptions } from "../generated/models";
import {
  ResponseFormat,
  GetSearchPolygonOptions,
  GetSearchPolygonResponse,
  TextFormat,
  GetSearchAddressOptions,
  GetSearchAddressResponse
} from "./models";
import { mapsTokenCredentialPolicy } from "../mapsTokenCredentialPolicy";
import { mapsAzureKeyCredentialPolicy } from "../mapsAzureKeyCredentialPolicy";
import { EmptyTokenCredential } from "../emptyTokenCredential";

export interface MapsSearchClientOptions extends SearchClientOptions {}

export class MapsSearchClient {
  /**
   * A reference to the auto-generated client
   * @internal
   */
  private readonly client: SearchClient;

  /**
   * Creates an instance of MapsSearchClient.
   * @param credential - Used to authenticate requests to the service
   * @param options - Used to configure the MapsSearchClient
   */
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    options: MapsSearchClientOptions = {}
  ) {
    if (isTokenCredential(credential)) {
      if (!options.xMsClientId) {
        throw Error("option: xMsClientId is needed for TokenCredential");
      }
      this.client = new SearchClient(credential, options);
      this.client.pipeline.addPolicy(mapsTokenCredentialPolicy(options.xMsClientId));
    } else {
      this.client = new SearchClient(new EmptyTokenCredential(), options);
      this.client.pipeline.addPolicy(mapsAzureKeyCredentialPolicy(credential));
    }
  }

  /**
   * Request the geometry data such as a city or country outline for a set of entities,
   * previously retrieved from an Online Search request in GeoJSON format.
   *
   * The geometry ID is returned in the dataSources object under "geometry" and "id" in either a Search
   * Address or Search Fuzzy call.
   *
   * @param format - Desired format of the response (only json is supported now).
   * @param geometries Comma separated list of geometry UUIDs, previously retrieved from an Online Search
   *                   request.
   * @param options The options parameters.
   */
  getSearchPolygon(
    format: ResponseFormat,
    geometries: string[],
    options?: GetSearchPolygonOptions
  ): Promise<GetSearchPolygonResponse> {
    return this.client.search.getSearchPolygon(format, geometries, options);
  }

  /**
   * Address Geocoding
   *
   * @param format - Desired format of the response (json or xml).
   * @param query - The address to search for. Must be properly URL encoded.
   * @param options - The options parameters.
   */
  getSearchAddress(
    format: TextFormat,
    query: string,
    options?: GetSearchAddressOptions
  ): Promise<GetSearchAddressResponse> {
    return this.client.search.getSearchAddress(format, query, options);
  }
}
