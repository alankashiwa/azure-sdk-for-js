// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  LatLong,
  StructuredAddress,
  GeoJsonLineString,
  GeoJsonFeatureCollection,
  GeoJsonPolygon,
  GeoJsonGeometryCollection
} from "./models";
import {
  SearchClientOptions,
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
  FuzzySearchBatchOptions,
  SearchAddressBatchOptions,
  ReverseSearchAddressBatchOptions,
  SearchBaseOptions,
  SearchExtraFilterOptions
} from "./options";
import { mapsClientIdPolicy } from "./credential/mapsClientIdPolicy";
import { mapsAzureKeyCredentialPolicy } from "./credential/mapsAzureKeyCredentialPolicy";
import { logger } from "./utils/logger";
import { OperationOptions } from "@azure/core-client";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";

const isSearchClientOptions = (clientIdOrOptions: any): clientIdOrOptions is SearchClientOptions =>
  clientIdOrOptions && typeof clientIdOrOptions !== "string";

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
    const { span, updatedOptions } = createSpan("SearchClient-listPolygons", options);
    const internalOptions = updatedOptions as ListPolygonsOptionalParams;
    try {
      return await this.client.search.listPolygons(
        this.defaultFormat,
        geometryIds,
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Perform a free-form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens.
   *
   * @param query - The applicable query string (e.g., "seattle", "pizza").
   *                  Can also be specified as a comma separated string composed by latitude followed by longitude (e.g., "47.641268, -122.125679").
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    query: string,
    options: FuzzySearchOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("SearchClient-fuzzySearch", options);
    const internalOptions = mapFuzzySearchOptions(updatedOptions);
    try {
      return await this.client.search.fuzzySearch(this.defaultFormat, query, internalOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests points of interest (POI) results by name
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks")
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    query: string,
    options: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("SearchClient-searchPointOfInterest", options);
    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    try {
      return await this.client.search.searchPointOfInterest(
        this.defaultFormat,
        query,
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests points of interest (POI) results around a specific location.
   *
   * @param coordinates - The coordinates for the nearby POI search
   * @param options - Optional parameters for the operation
   */
  public async searchNearbyPointOfInterest(
    coordinates: LatLong,
    options: SearchNearbyPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan(
      "SearchClient-searchNearbyPointOfInterest",
      options
    );
    const internalOptions = mapSearchNearbyPointOfInterestOptions(updatedOptions);
    try {
      return await this.client.search.searchNearbyPointOfInterest(
        this.defaultFormat,
        coordinates.latitude,
        coordinates.longitude,
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests points of interests (POI) results from given category.
   *
   * @param query - The POI category to search for (e.g., "AIRPORT", "RESTAURANT")
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    query: string,
    options: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan(
      "SearchClient-searchPointOfInterestCategory",
      options
    );
    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    try {
      return await this.client.search.searchPointOfInterestCategory(
        this.defaultFormat,
        query,
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests a full list of supported Points of Interest (POI) categories.
   *
   * @param options - Optional parameters for the operation
   */
  public async getPointOfInterestCategoryTree(
    options: GetPointOfInterestCategoryTreeOptions = {}
  ): Promise<PointOfInterestCategoryTreeResult> {
    const { span, updatedOptions } = createSpan(
      "SearchClient-getPointOfInterestCategoryTree",
      options
    );
    const internalOptions = updatedOptions as GetPointOfInterestCategoryTreeOptionalParams;
    try {
      return await this.client.search.getPointOfInterestCategoryTree(
        this.defaultFormat,
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Geocodes a address.
   *
   * @param query - The address to search for (e.g., "1 Microsoft way, Redmond, WA")
   * @param options - Optional parameters for the operation
   */
  public async searchAddress(
    query: string,
    options: SearchAddressOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("SearchClient-searchAddress", options);
    const internalOptions = mapSearchAddressOptions(updatedOptions);
    try {
      return await this.client.search.searchAddress(this.defaultFormat, query, internalOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Translates a coordinates into a human understandable street address.
   *
   * @param coordinates - The coordinates for the reverse search query
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchAddress(
    coordinates: LatLong,
    options: ReverseSearchAddressOptions = {}
  ): Promise<ReverseSearchAddressResult> {
    const { span, updatedOptions } = createSpan("SearchClient-reverseSearchAddress", options);
    const internalOptions = updatedOptions as ReverseSearchAddressOptionalParams;
    try {
      return await this.client.search.reverseSearchAddress(
        this.defaultFormat,
        [coordinates.latitude, coordinates.longitude],
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Translates a coordinates into a human understandable cross street.
   *
   * @param coordinates - The coordinates for the reverse search query
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchCrossStreetAddress(
    coordinates: LatLong,
    options: ReverseSearchCrossStreetAddressOptions = {}
  ): Promise<ReverseSearchCrossStreetAddressResult> {
    const { span, updatedOptions } = createSpan(
      "SearchClient-reverseSearchCrossStreetAddress",
      options
    );
    const internalOptions = updatedOptions as ReverseSearchCrossStreetAddressOptionalParams;
    try {
      return await this.client.search.reverseSearchCrossStreetAddress(
        this.defaultFormat,
        [coordinates.latitude, coordinates.longitude],
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("SearchClient-searchStructuredAddress", options);
    const { countryCode, ...structuredAddressOptions } = structuredAddress;
    const internalOptions = {
      ...updatedOptions,
      ...structuredAddressOptions
    } as SearchStructuredAddressOptionalParams;
    try {
      return await this.client.search.searchStructuredAddress(
        this.defaultFormat,
        countryCode,
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Performs a free form search inside a single geometry or many of them.
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza").
   * @param geometry - This represents the geometry for one or more geographical features (parks, state
   *                   boundary etc.) to search in and should be a GeoJSON compliant type. Please refer to [RFC
   *                   7946](https://tools.ietf.org/html/rfc7946) for details.
   * @param options - Optional parameters for the operation
   */
  public async searchInsideGeometry(
    query: string,
    geometry: GeoJsonPolygon | GeoJsonGeometryCollection | GeoJsonFeatureCollection,
    options: SearchInsideGeometryOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("SearchClient-searchInsideGeometry", options);
    const internalOptions = updatedOptions as SearchInsideGeometryOptionalParams;
    try {
      return await this.client.search.searchInsideGeometry(
        this.defaultFormat,
        query,
        {
          geometry: (geometry as unknown) as Record<string, unknown>
        },
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Performs a fuzzy search for POIs along a specified route.
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza").
   * @param maxDetourTime - Maximum detour time of the point of interest in seconds. Max value is 3600 seconds
   * @param route - This represents the route to search along and should be a valid `GeoJSON LineString` type.
   * @param options - Optional parameters for the operation
   */
  public async searchAlongRoute(
    query: string,
    maxDetourTime: number,
    route: GeoJsonLineString,
    options: SearchAlongRouteOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("SearchClient-searchAlongRoute", options);
    const internalOptions = updatedOptions as SearchAlongRouteOptionalParams;
    try {
      return await this.client.search.searchAlongRoute(
        this.defaultFormat,
        query,
        maxDetourTime,
        { route: route },
        internalOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of fuzzy search queries. The method return the result directly.
   *
   * @param batchRequest - The list of search queries to process. The list can contain a
   *                       max of 100 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearchBatchSync(
    batchRequest: BatchRequest,
    options: FuzzySearchBatchOptions = {}
  ) {
    const { span, updatedOptions } = createSpan("SearchClient-fuzzySearchBatchSync", options);
    try {
      return await this.client.search.fuzzySearchBatchSync(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of fuzzy search queries. The method returns a poller for retrieving the result later.
   *
   * @param batchRequest - The list of search queries to process. The list can contain a
   *                       max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginFuzzySearchBatch(
    batchRequest: BatchRequest,
    options: FuzzySearchBatchOptions = {}
  ): Promise<PollerLike<PollOperationState<SearchAddressBatchResult>, SearchAddressBatchResult>> {
    const { span, updatedOptions } = createSpan("SearchClient-beginFuzzySearchBatch", options);
    try {
      return await this.client.search.beginFuzzySearchBatch(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of geocoding queries. The method return the result directly.
   *
   * @param batchRequest - The list of search queries to process. The list can contain a
   *                       max of 100 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async searchAddressBatchSync(
    batchRequest: BatchRequest,
    options: SearchAddressBatchOptions = {}
  ) {
    const { span, updatedOptions } = createSpan("SearchClient-searchAddressBatchSync", options);
    try {
      return await this.client.search.searchAddressBatchSync(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of geocoding queries. The method returns a poller for retrieving the result later.
   *
   * @param batchRequest - The list of search queries to process. The list can contain a
   *                       max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginSearchAddressBatch(
    batchRequest: BatchRequest,
    options: SearchAddressBatchOptions = {}
  ): Promise<PollerLike<PollOperationState<SearchAddressBatchResult>, SearchAddressBatchResult>> {
    const { span, updatedOptions } = createSpan("SearchClient-beginSearchAddressBatch", options);
    try {
      return await this.client.search.beginSearchAddressBatch(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of reverse geocoding queries. The method return the result directly.
   *
   * @param batchRequest - The list of search queries to process. The list can contain a
   *                       max of 100  queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchAddressBatchSync(
    batchRequest: BatchRequest,
    options: ReverseSearchAddressBatchOptions = {}
  ) {
    const { span, updatedOptions } = createSpan(
      "SearchClient-reverseSearchAddressBatchSync",
      options
    );
    try {
      return await this.client.search.reverseSearchAddressBatchSync(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of reverse geocoding queries. The method returns a poller for retrieving the result later.
   *
   * @param batchRequest - The list of queries to process. The list can contain a
   *                       max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginReverseSearchAddressBatch(
    batchRequest: BatchRequest,
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<
    PollerLike<
      PollOperationState<ReverseSearchAddressBatchProcessResult>,
      ReverseSearchAddressBatchProcessResult
    >
  > {
    const { span, updatedOptions } = createSpan(
      "SearchClient-beginReverseSearchAddressBatch",
      options
    );
    try {
      return await this.client.search.beginReverseSearchAddressBatch(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

/**
 * @internal
 */
function toLatLongString(coordinates: LatLong): string {
  return `${coordinates.latitude},${coordinates.longitude}`;
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
    lat: options.coordinates?.latitude,
    lon: options.coordinates?.longitude,
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
    lat: options.coordinates?.latitude,
    lon: options.coordinates?.longitude,
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
