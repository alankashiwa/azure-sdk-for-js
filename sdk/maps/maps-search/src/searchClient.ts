import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions
} from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated";
import {
  SearchListPolygonsOptionalParams as ListPolygonsOptionalParams,
  SearchFuzzySearchOptionalParams as FuzzySearchOptionalParams,
  SearchSearchPointOfInterestOptionalParams as SearchPointOfInterestOptionalParams,
  SearchGetPointOfInterestCategoryTreeOptionalParams as GetPointOfInterestCategoryTreeOptionalParams,
  SearchSearchAddressOptionalParams as SearchAddressOptionalParams,
  SearchSearchStructuredAddressOptionalParams as SearchStructuredAddressOptionalParams,
  SearchSearchInsideGeometryOptionalParams as SearchInsideGeometryOptionalParams,
  SearchSearchAlongRouteOptionalParams as SearchAlongRouteOptionalParams,
  SearchSearchNearbyPointOfInterestOptionalParams as SearchNearbyPointOfInterestOptionalParams,
  SearchReverseSearchAddressOptionalParams as ReverseSearchAddressOptionalParams,
  SearchReverseSearchCrossStreetAddressOptionalParams as ReverseSearchCrossStreetAddressOptionalParams,
  PolygonResult,
  PointOfInterestCategoryTreeResult,
  SearchAddressResult,
  ReverseSearchAddressResult,
  ReverseSearchCrossStreetAddressResult,
  SearchAddressBatchResult,
  BatchRequest,
  ReverseSearchAddressBatchProcessResult
} from "./generated/models";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  Coordinate,
  StructuredAddress,
  GeoJsonLineString,
  GeoJsonFeatureCollection,
  GeoJsonPolygon,
  GeoJsonGeometryCollection
} from "./models";
import {
  SearchClientOptions,
  isSearchClientOptions,
  ListPolygonsOptions,
  FuzzySearchOptions,
  SearchPointOfInterestOptions,
  SearchNearbyPointOfInterestOptions,
  GetPointOfInterestCategoryTreeOptions,
  SearchAddressOptions,
  ReverseSearchAddressOptions,
  ReverseSearchCrossStreetAddressOptions,
  SearchStructuredAddressOptions,
  SearchInsideGeometryOptions,
  SearchAlongRouteOptions,
  BeginFuzzySearchBatchOptions,
  BeginSearchAddressBatchOptions,
  BeginReverseSearchAddressBatchOptions,
  SearchBaseOptions,
  SearchExtraFilterOptions
} from "./options";
import { mapsClientIdPolicy } from "./credential/mapsClientIdPolicy";
import { mapsAzureKeyCredentialPolicy } from "./credential/mapsAzureKeyCredentialPolicy";
import { logger } from "./utils/logger";
import { OperationOptions } from "@azure/core-client";

/**
 * Client class for interacting with Azure Maps Search Service.
 */
export class SearchClient {
  /**
   * A reference to the auto-generated Search HTTP client.
   */
  private readonly client: GeneratedClient;
  private readonly defaultFormat: string = "json";
  /**
   * Creates an instance of SearchClient.
   *
   * @param credential - An AzureKeyCredential instance used to authenticate requests to the service.
   */
  constructor(credential: AzureKeyCredential);
  /**
   * Creates an instance of SearchClient.
   *
   * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
   * @param options - Options used to configure the Search Client
   */
  constructor(credential: AzureKeyCredential, options?: SearchClientOptions);
  /**
   * Creates an instance of SearchClient.
   *
   * @param credential - An TokenCredential instance used to authenticate requests to the service
   * @param clientId - The Azure Maps client id of a specific map resource
   */
  constructor(credential: TokenCredential, clientId: string);
  /**
   * Creates an instance of SearchClient.
   *
   * @param credential - An TokenCredential instance used to authenticate requests to the service
   * @param clientId - The Azure Maps client id of a specific map resource
   * @param options - Options used to configure the Search Client
   */
  constructor(credential: TokenCredential, clientId: string, options?: SearchClientOptions);
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    clientIdOrOptions?: string | SearchClientOptions,
    maybeOptions: SearchClientOptions = {}
  ) {
    const options = isSearchClientOptions(clientIdOrOptions) ? clientIdOrOptions : maybeOptions;
    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    this.client = new GeneratedClient(internalPipelineOptions);
    if (isTokenCredential(credential)) {
      const clientId = typeof clientIdOrOptions === "string" ? clientIdOrOptions : "";
      if (!clientId) {
        throw Error("Client id is needed for TokenCredential");
      }
      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential,
          scopes: "https://atlas.microsoft.com/.default"
        })
      );
      this.client.pipeline.addPolicy(mapsClientIdPolicy(clientId));
    } else {
      this.client.pipeline.addPolicy(mapsAzureKeyCredentialPolicy(credential));
    }
  }

  /**
   * Requests the geometry data such as a city or country outline for a set of entities.
   *
   * @param geometryIds - Comma separated list of geometry UUIDs, previously retrieved from an Online Search request.
   * @param options - Optional parameters for the operation
   */
  public async listPolygons(
    geometryIds: string[],
    options: ListPolygonsOptions = {}
  ): Promise<PolygonResult> {
    const internalOptions = options as ListPolygonsOptionalParams;
    return this.client.search.listPolygons(this.defaultFormat, geometryIds, internalOptions);
  }

  /**
   * Perform a free-form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens.
   *
   * @param keyword - The applicable query string (e.g., "seattle", "pizza").
   *                  Can also be specified as a comma separated string composed by latitude followed by longitude (e.g., "47.641268, -122.125679").
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    keyword: string,
    options: FuzzySearchOptions = {}
  ): Promise<SearchAddressResult> {
    const internalOptions = mapFuzzySearchOptions(options);
    return this.client.search.fuzzySearch(this.defaultFormat, keyword, internalOptions);
  }

  /**
   * Requests points of interest (POI) results by name
   *
   * @param poiName - The POI name to search for (e.g., "statue of liberty", "starbucks")
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    poiName: string,
    options: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const internalOptions = mapSearchPointOfInterestOptions(options);
    return this.client.search.searchPointOfInterest(this.defaultFormat, poiName, internalOptions);
  }

  /**
   * Requests points of interest (POI) results around a specific location.
   *
   * @param coordinate - The coordinate for the nearby POI search
   * @param options - Optional parameters for the operation
   */
  public async searchNearbyPointOfInterest(
    coordinate: Coordinate,
    options: SearchNearbyPointOfInterestOptions = {}
  ) {
    const internalOptions = mapSearchNearbyPointOfInterestOptions(options);
    return this.client.search.searchNearbyPointOfInterest(
      this.defaultFormat,
      coordinate.latitude,
      coordinate.longitude,
      internalOptions
    );
  }

  /**
   * Requests points of interests (POI) results from given category.
   *
   * @param poiCategoryName - The POI category to search for (e.g., "AIRPORT", "RESTAURANT")
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    poiCategoryName: string,
    options: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const internalOptions = mapSearchPointOfInterestOptions(options);
    return this.client.search.searchPointOfInterestCategory(
      this.defaultFormat,
      poiCategoryName,
      internalOptions
    );
  }

  /**
   * Requests a full list of supported Points of Interest (POI) categories.
   *
   * @param options - Optional parameters for the operation
   */
  public async getPointOfInterestCategoryTree(
    options: GetPointOfInterestCategoryTreeOptions = {}
  ): Promise<PointOfInterestCategoryTreeResult> {
    const internalOptions = options as GetPointOfInterestCategoryTreeOptionalParams;
    return this.client.search.getPointOfInterestCategoryTree(this.defaultFormat, internalOptions);
  }

  /**
   * Geocodes a address.
   *
   * @param address - The address to search for (e.g., "1 Microsoft way, Redmond, WA")
   * @param options - Optional parameters for the operation
   */
  public async searchAddress(
    address: string,
    options: SearchAddressOptions = {}
  ): Promise<SearchAddressResult> {
    const internalOptions = mapSearchAddressOptions(options);
    return this.client.search.searchAddress(this.defaultFormat, address, internalOptions);
  }

  /**
   * Translates a coordinate into a human understandable street address.
   *
   * @param coordinate - The coordinate for the reverse search query
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchAddress(
    coordinate: Coordinate,
    options: ReverseSearchAddressOptions = {}
  ): Promise<ReverseSearchAddressResult> {
    const internalOptions = options as ReverseSearchAddressOptionalParams;
    return this.client.search.reverseSearchAddress(
      this.defaultFormat,
      [coordinate.latitude, coordinate.longitude],
      internalOptions
    );
  }

  /**
   * Translates a coordinate into a human understandable cross street.
   *
   * @param coordinate - The coordinate for the reverse search query
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchCrossStreetAddress(
    coordinate: Coordinate,
    options: ReverseSearchCrossStreetAddressOptions = {}
  ): Promise<ReverseSearchCrossStreetAddressResult> {
    const internalOptions = options as ReverseSearchCrossStreetAddressOptionalParams;
    return this.client.search.reverseSearchCrossStreetAddress(
      this.defaultFormat,
      [coordinate.latitude, coordinate.longitude],
      internalOptions
    );
  }

  /**
   * Geocodes a structured address.
   *
   * @param structuredAddress - Structured address used for geocoding
   * @param options - Optional parameters for the operation
   */
  public async searchStructuredAddress(
    structuredAddress: StructuredAddress,
    options: SearchStructuredAddressOptions = {}
  ) {
    const { countryCode, ...structuredAddressOptions } = structuredAddress;
    const internalOptions = {
      ...options,
      ...structuredAddressOptions
    } as SearchStructuredAddressOptionalParams;
    return this.client.search.searchStructuredAddress(
      this.defaultFormat,
      countryCode,
      internalOptions
    );
  }

  /**
   * Performs a free form search inside a single geometry or many of them.
   *
   * @param poiName - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza").
   * @param geometry - This represents the geometry for one or more geographical features (parks, state
   *                   boundary etc.) to search in and should be a GeoJSON compliant type. Please refer to [RFC
   *                   7946](https://tools.ietf.org/html/rfc7946) for details.
   * @param options - Optional parameters for the operation
   */
  public async searchInsideGeometry(
    poiName: string,
    geometry: GeoJsonPolygon | GeoJsonGeometryCollection | GeoJsonFeatureCollection,
    options: SearchInsideGeometryOptions = {}
  ) {
    const internalOptions = options as SearchInsideGeometryOptionalParams;
    return this.client.search.searchInsideGeometry(
      this.defaultFormat,
      poiName,
      {
        geometry: (geometry as unknown) as Record<string, unknown>
      },
      internalOptions
    );
  }

  /**
   * Performs a fuzzy search for POIs along a specified route.
   *
   * @param poiName - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza").
   * @param maxDetourTime - Maximum detour time of the point of interest in seconds. Max value is 3600 seconds
   * @param route - This represents the route to search along and should be a valid `GeoJSON LineString` type.
   * @param options - Optional parameters for the operation
   */
  public async searchAlongRoute(
    poiName: string,
    maxDetourTime: number,
    route: GeoJsonLineString,
    options: SearchAlongRouteOptions = {}
  ): Promise<SearchAddressResult> {
    const internalOptions = options as SearchAlongRouteOptionalParams;
    return this.client.search.searchAlongRoute(
      this.defaultFormat,
      poiName,
      maxDetourTime,
      { route: route },
      internalOptions
    );
  }

  /**
   * Sends batches of fuzzy search queries.
   *
   * @param batchRequest - The list of search queries to process. The list can contain a
   *                       max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginFuzzySearchBatch(
    batchRequest: BatchRequest,
    options: BeginFuzzySearchBatchOptions = {}
  ): Promise<PollerLike<PollOperationState<SearchAddressBatchResult>, SearchAddressBatchResult>> {
    return await this.client.search.beginFuzzySearchBatch(
      this.defaultFormat,
      batchRequest,
      options
    );
  }

  /**
   * Sends batches of geocoding queries.
   *
   * @param batchRequest - The list of search queries to process. The list can contain a
   *                       max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginSearchAddressBatch(
    batchRequest: BatchRequest,
    options: BeginSearchAddressBatchOptions = {}
  ): Promise<PollerLike<PollOperationState<SearchAddressBatchResult>, SearchAddressBatchResult>> {
    return await this.client.search.beginSearchAddressBatch(
      this.defaultFormat,
      batchRequest,
      options
    );
  }

  /**
   * Sends batches of reverse geocoding queries.
   *
   * @param batchRequest - The list of queries to process. The list can contain a
   *                       max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginReverseSearchAddressBatch(
    batchRequest: BatchRequest,
    options: BeginReverseSearchAddressBatchOptions = {}
  ): Promise<
    PollerLike<
      PollOperationState<ReverseSearchAddressBatchProcessResult>,
      ReverseSearchAddressBatchProcessResult
    >
  > {
    return await this.client.search.beginReverseSearchAddressBatch(
      this.defaultFormat,
      batchRequest,
      options
    );
  }
}

/**
 * @internal
 */
function toLatLongString(coordinate: Coordinate): string {
  return `${coordinate.latitude},${coordinate.longitude}`;
}

/**
 * @internal
 */
function extractOperationOptions(options: OperationOptions): OperationOptions {
  return {
    abortSignal: options.abortSignal,
    requestOptions: options.requestOptions,
    tracingOptions: options.tracingOptions,
    serializerOptions: options.serializerOptions,
    onResponse: options.onResponse
  };
}

/**
 * @internal
 */
function mapSearchBaseOptions(options: SearchBaseOptions): SearchBaseOptions {
  return {
    top: options.top,
    skip: options.skip,
    language: options.language,
    extendedPostalCodesFor: options.extendedPostalCodesFor,
    localizedMapView: options.localizedMapView,
    ...extractOperationOptions(options)
  };
}

/**
 * @internal
 */
function mapSearchExtraFilterOptions(options: SearchExtraFilterOptions): SearchExtraFilterOptions {
  return {
    categoryFilter: options.categoryFilter,
    brandFilter: options.brandFilter,
    electricVehicleConnectorFilter: options.electricVehicleConnectorFilter
  };
}

/**
 * @internal
 */
function mapSearchAddressOptions(options: SearchAddressOptions): SearchAddressOptionalParams {
  return {
    isTypeAhead: options.isTypeAhead,
    countryFilter: options.countryFilter,
    lat: options.coordinate?.latitude,
    lon: options.coordinate?.longitude,
    radiusInMeters: options.radiusInMeters,
    topLeft: options.boundingBox ? toLatLongString(options.boundingBox.topLeft) : undefined,
    btmRight: options.boundingBox ? toLatLongString(options.boundingBox.bottomRight) : undefined,
    ...mapSearchBaseOptions(options)
  };
}

/**
 * @internal
 */
function mapSearchPointOfInterestOptions(
  options: SearchPointOfInterestOptions
): SearchPointOfInterestOptionalParams {
  return {
    operatingHours: options.operatingHours,
    isTypeAhead: options.isTypeAhead,
    countryFilter: options.countryFilter,
    lat: options.coordinate?.latitude,
    lon: options.coordinate?.longitude,
    radiusInMeters: options.radiusInMeters,
    topLeft: options.boundingBox ? toLatLongString(options.boundingBox.topLeft) : undefined,
    btmRight: options.boundingBox ? toLatLongString(options.boundingBox.bottomRight) : undefined,
    ...mapSearchBaseOptions(options)
  };
}

/**
 * @internal
 */
function mapSearchNearbyPointOfInterestOptions(
  options: SearchNearbyPointOfInterestOptions
): SearchNearbyPointOfInterestOptionalParams {
  return {
    countryFilter: options.countryFilter,
    radiusInMeters: options.radiusInMeters,
    ...mapSearchBaseOptions(options),
    ...mapSearchExtraFilterOptions(options),
    ...extractOperationOptions(options)
  };
}

/**
 * @internal
 */
function mapFuzzySearchOptions(options: FuzzySearchOptions): FuzzySearchOptionalParams {
  return {
    entityType: options.entityType,
    minFuzzyLevel: options.minFuzzyLevel,
    maxFuzzyLevel: options.maxFuzzyLevel,
    indexFilter: options.indexFilter,
    ...mapSearchPointOfInterestOptions(options)
  };
}
