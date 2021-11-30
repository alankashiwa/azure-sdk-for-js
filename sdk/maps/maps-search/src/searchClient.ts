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
  ReverseSearchCrossStreetAddressResult as ReverseSearchCrossStreetAddressResultInternal,
  SearchAddressResult as SearchAddressResultInternal,
  BoundingBox as BoundingBoxInternal,
  ReverseSearchAddressResult as ReverseSearchAddressResultInternal,
  SearchAddressBatchResult,
  ReverseSearchAddressBatchProcessResult,
  LatLongPairAbbreviated,
  Polygon,
  PointOfInterestCategory
} from "./generated/models";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  LatLong,
  StructuredAddress,
  GeoJsonLineString,
  GeoJsonFeatureCollection,
  GeoJsonPolygon,
  GeoJsonGeometryCollection,
  BoundingBox,
  createFuzzySearchBatchRequest,
  FuzzySearchRequestItem,
  SearchAddressRequestItem,
  createSearchAddressBatchRequest,
  ReverseSearchAddressRequestItem,
  createReverseSearchAddressBatchRequest
} from "./models";
import {
  SearchAddressResult,
  SearchAddressResultItem,
  ReverseSearchAddressResult,
  ReverseSearchAddressResultItem,
  ReverseSearchCrossStreetAddressResult,
  ReverseSearchCrossStreetAddressResultItem
} from "./results";
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
  SearchExtraFilterOptions,
  SearchPointOfInterestCategoryOptions
} from "./options";
import { mapsClientIdPolicy } from "./credential/mapsClientIdPolicy";
import { mapsAzureKeyCredentialPolicy } from "./credential/mapsAzureKeyCredentialPolicy";
import { logger } from "./utils/logger";
import { OperationOptions } from "@azure/core-client";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";

const isSearchClientOptions = (clientIdOrOptions: any): clientIdOrOptions is SearchClientOptions =>
  clientIdOrOptions && typeof clientIdOrOptions !== "string";

const isPOISearchOptions = <
  POISearchOptions extends
    | FuzzySearchOptions
    | SearchPointOfInterestOptions
    | SearchPointOfInterestCategoryOptions
>(
  countryFilterOrOptions: any
): countryFilterOrOptions is POISearchOptions =>
  countryFilterOrOptions && Array.isArray(countryFilterOrOptions) === false;

const isStringArray = (array: any[]): array is string[] => typeof array[0] === "string";

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
  ): Promise<Polygon[]> {
    const { span, updatedOptions } = createSpan("SearchClient-listPolygons", options);
    const internalOptions = updatedOptions as ListPolygonsOptionalParams;
    try {
      const result = await this.client.search.listPolygons(
        this.defaultFormat,
        geometryIds,
        internalOptions
      );
      return result.polygons ? result.polygons : [];
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
   * @param coordinates - The coordinates where results should be biased
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    query: string,
    coordinates: LatLong,
    options?: FuzzySearchOptions
  ): Promise<SearchAddressResult>;
  /**
   * Perform a free-form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens.
   *
   * @param query - The applicable query string (e.g., "seattle", "pizza").
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    query: string,
    countryFilter: string[],
    options?: FuzzySearchOptions
  ): Promise<SearchAddressResult>;
  /**
   * Perform a free-form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens.
   *
   * @param query - The applicable query string (e.g., "seattle", "pizza").
   * @param coordinates - The coordinates where results should be biased
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    query: string,
    coordinates: LatLong,
    countryFilter: string[],
    options?: FuzzySearchOptions
  ): Promise<SearchAddressResult>;
  public async fuzzySearch(
    query: string,
    coordinatesOrCountryFilter: string[] | LatLong,
    countryFilterOrOptions?: string[] | FuzzySearchOptions,
    maybeOptions: FuzzySearchOptions = {}
  ): Promise<SearchAddressResult> {
    const options: FuzzySearchOptions = isPOISearchOptions<FuzzySearchOptions>(
      countryFilterOrOptions
    )
      ? countryFilterOrOptions
      : maybeOptions;
    const { span, updatedOptions } = createSpan("SearchClient-fuzzySearch", options);
    const internalOptions = mapFuzzySearchOptions(updatedOptions);
    if (coordinatesOrCountryFilter instanceof LatLong) {
      internalOptions.lat = coordinatesOrCountryFilter.latitude;
      internalOptions.lon = coordinatesOrCountryFilter.longitude;
      if (!isPOISearchOptions<FuzzySearchOptions>(countryFilterOrOptions)) {
        internalOptions.countryFilter = countryFilterOrOptions;
      }
    } else if (
      Array.isArray(coordinatesOrCountryFilter) &&
      isStringArray(coordinatesOrCountryFilter)
    ) {
      internalOptions.countryFilter = coordinatesOrCountryFilter;
    }
    try {
      const result = await this.client.search.fuzzySearch(
        this.defaultFormat,
        query,
        internalOptions
      );
      return mapSearchAddressResult(result);
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
   * @param coordinates - The coordinates where results should be biased
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    query: string,
    coordinates: LatLong,
    options?: SearchPointOfInterestOptions
  ): Promise<SearchAddressResult>;
  /**
   * Requests points of interest (POI) results by name
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks")
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    query: string,
    countryFilter: string[],
    options?: SearchPointOfInterestOptions
  ): Promise<SearchAddressResult>;
  /**
   * Requests points of interest (POI) results by name
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks")
   * @param coordinates - The coordinates where results should be biased
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    query: string,
    coordinates: LatLong,
    countryFilter: string[],
    options?: SearchPointOfInterestOptions
  ): Promise<SearchAddressResult>;
  public async searchPointOfInterest(
    query: string,
    coordinatesOrCountryFilter: string[] | LatLong,
    countryFilterOrOptions?: string[] | SearchPointOfInterestOptions,
    maybeOptions: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const options: SearchPointOfInterestOptions = isPOISearchOptions<SearchPointOfInterestOptions>(
      countryFilterOrOptions
    )
      ? countryFilterOrOptions
      : maybeOptions;
    const { span, updatedOptions } = createSpan("SearchClient-searchPointOfInterest", options);
    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    if (coordinatesOrCountryFilter instanceof LatLong) {
      internalOptions.lat = coordinatesOrCountryFilter.latitude;
      internalOptions.lon = coordinatesOrCountryFilter.longitude;
      if (!isPOISearchOptions<SearchPointOfInterestOptions>(countryFilterOrOptions)) {
        internalOptions.countryFilter = countryFilterOrOptions;
      }
    } else if (
      Array.isArray(coordinatesOrCountryFilter) &&
      isStringArray(coordinatesOrCountryFilter)
    ) {
      internalOptions.countryFilter = coordinatesOrCountryFilter;
    }
    try {
      const result = await this.client.search.searchPointOfInterest(
        this.defaultFormat,
        query,
        internalOptions
      );
      return mapSearchAddressResult(result);
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
      const result = await this.client.search.searchNearbyPointOfInterest(
        this.defaultFormat,
        coordinates.latitude,
        coordinates.longitude,
        internalOptions
      );
      return mapSearchAddressResult(result);
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
   * @param coordinates - The coordinates where results should be biased
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    query: string,
    coordinates: LatLong,
    options?: SearchPointOfInterestCategoryOptions
  ): Promise<SearchAddressResult>;
  /**
   * Requests points of interests (POI) results from given category.
   *
   * @param query - The POI category to search for (e.g., "AIRPORT", "RESTAURANT")
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    query: string,
    countryFilter: string[],
    options?: SearchPointOfInterestCategoryOptions
  ): Promise<SearchAddressResult>;
  /**
   * Requests points of interests (POI) results from given category.
   *
   * @param query - The POI category to search for (e.g., "AIRPORT", "RESTAURANT")
   * @param coordinates - The coordinates where results should be biased
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    query: string,
    coordinates: LatLong,
    countryFilter: string[],
    options?: SearchPointOfInterestCategoryOptions
  ): Promise<SearchAddressResult>;
  public async searchPointOfInterestCategory(
    query: string,
    coordinatesOrCountryFilter: string[] | LatLong,
    countryFilterOrOptions?: string[] | SearchPointOfInterestCategoryOptions,
    maybeOptions: SearchPointOfInterestCategoryOptions = {}
  ): Promise<SearchAddressResult> {
    const options: SearchPointOfInterestCategoryOptions = isPOISearchOptions<
      SearchPointOfInterestCategoryOptions
    >(countryFilterOrOptions)
      ? countryFilterOrOptions
      : maybeOptions;
    const { span, updatedOptions } = createSpan(
      "SearchClient-searchPointOfInterestCategory",
      options
    );
    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    if (coordinatesOrCountryFilter instanceof LatLong) {
      internalOptions.lat = coordinatesOrCountryFilter.latitude;
      internalOptions.lon = coordinatesOrCountryFilter.longitude;
      if (!isPOISearchOptions<SearchPointOfInterestOptions>(countryFilterOrOptions)) {
        internalOptions.countryFilter = countryFilterOrOptions;
      }
    } else if (
      Array.isArray(coordinatesOrCountryFilter) &&
      isStringArray(coordinatesOrCountryFilter)
    ) {
      internalOptions.countryFilter = coordinatesOrCountryFilter;
    }
    try {
      const result = await this.client.search.searchPointOfInterestCategory(
        this.defaultFormat,
        query,
        internalOptions
      );
      return mapSearchAddressResult(result);
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
  ): Promise<PointOfInterestCategory[]> {
    const { span, updatedOptions } = createSpan(
      "SearchClient-getPointOfInterestCategoryTree",
      options
    );
    const internalOptions = updatedOptions as GetPointOfInterestCategoryTreeOptionalParams;
    try {
      const result = await this.client.search.getPointOfInterestCategoryTree(
        this.defaultFormat,
        internalOptions
      );
      return result.categories ? result.categories : [];
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
      const result = await this.client.search.searchAddress(
        this.defaultFormat,
        query,
        internalOptions
      );
      return mapSearchAddressResult(result);
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
      const result = await this.client.search.reverseSearchAddress(
        this.defaultFormat,
        [coordinates.latitude, coordinates.longitude],
        internalOptions
      );
      return mapReverseSearchAddressResult(result);
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
      const result = await this.client.search.reverseSearchCrossStreetAddress(
        this.defaultFormat,
        [coordinates.latitude, coordinates.longitude],
        internalOptions
      );
      return mapReverseSearchCrossStreetAddressCrResult(result);
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
      const result = await this.client.search.searchStructuredAddress(
        this.defaultFormat,
        countryCode,
        internalOptions
      );
      return mapSearchAddressResult(result);
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
      const result = await this.client.search.searchInsideGeometry(
        this.defaultFormat,
        query,
        {
          geometry: (geometry as unknown) as Record<string, unknown>
        },
        internalOptions
      );
      return mapSearchAddressResult(result);
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
      const result = await this.client.search.searchAlongRoute(
        this.defaultFormat,
        query,
        maxDetourTime,
        { route: route },
        internalOptions
      );
      return mapSearchAddressResult(result);
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
    requests: FuzzySearchRequestItem[],
    options: FuzzySearchBatchOptions = {}
  ): Promise<SearchAddressBatchResult> {
    const { span, updatedOptions } = createSpan("SearchClient-fuzzySearchBatchSync", options);
    const batchRequest = createFuzzySearchBatchRequest(requests, options);
    console.log(batchRequest);
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
    requests: FuzzySearchRequestItem[],
    options: FuzzySearchBatchOptions = {}
  ): Promise<PollerLike<PollOperationState<SearchAddressBatchResult>, SearchAddressBatchResult>> {
    const { span, updatedOptions } = createSpan("SearchClient-beginFuzzySearchBatch", options);
    const batchRequest = createFuzzySearchBatchRequest(requests, options);
    console.log(batchRequest);
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
    requests: SearchAddressRequestItem[],
    options: SearchAddressBatchOptions = {}
  ): Promise<SearchAddressBatchResult> {
    const { span, updatedOptions } = createSpan("SearchClient-searchAddressBatchSync", options);
    const batchRequest = createSearchAddressBatchRequest(requests, options);
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
    requests: SearchAddressRequestItem[],
    options: SearchAddressBatchOptions = {}
  ): Promise<PollerLike<PollOperationState<SearchAddressBatchResult>, SearchAddressBatchResult>> {
    const { span, updatedOptions } = createSpan("SearchClient-beginSearchAddressBatch", options);
    const batchRequest = createSearchAddressBatchRequest(requests, options);
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
    requests: ReverseSearchAddressRequestItem[],
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<ReverseSearchAddressBatchProcessResult> {
    const { span, updatedOptions } = createSpan(
      "SearchClient-reverseSearchAddressBatchSync",
      options
    );
    const batchRequest = createReverseSearchAddressBatchRequest(requests, options);
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
    requests: ReverseSearchAddressRequestItem[],
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
    const batchRequest = createReverseSearchAddressBatchRequest(requests, options);
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

/**
 * @internal
 */
function mapLatLongPairAbbreviatedToLatLong(
  latLongAbbr?: LatLongPairAbbreviated
): LatLong | undefined {
  if (latLongAbbr && latLongAbbr.lat && latLongAbbr.lon) {
    return new LatLong(latLongAbbr.lat, latLongAbbr.lon);
  } else {
    return undefined;
  }
}

/**
 * @internal
 */
function mapStringToLatLong(latLongStr?: string): LatLong | undefined {
  if (latLongStr && typeof latLongStr === "string") {
    const latLongArray = latLongStr.split(",");
    if (latLongArray.length === 2) {
      const lat = Number(latLongArray[0]);
      const lon = Number(latLongArray[1]);
      if (!isNaN(lat) && !isNaN(lon)) {
        return new LatLong(lat, lon);
      }
    }
  }
  return undefined;
}

/**
 * @internal
 */
function mapBoundingBox(bbox?: BoundingBoxInternal): BoundingBox | undefined {
  if (bbox && bbox.topLeft && bbox.bottomRight) {
    const topLeft = mapLatLongPairAbbreviatedToLatLong(bbox.topLeft);
    const bottomRight = mapLatLongPairAbbreviatedToLatLong(bbox.bottomRight);
    if (topLeft && bottomRight) {
      return new BoundingBox(topLeft, bottomRight);
    }
  }
  return undefined;
}

/**
 * @internal
 */
function mapSearchAddressResult(internalResult: SearchAddressResultInternal): SearchAddressResult {
  const resultWithUndefined = {
    query: internalResult.summary?.query,
    queryType: internalResult.summary?.queryType,
    queryTime: internalResult.summary?.queryTime,
    numResults: internalResult.summary?.numResults,
    top: internalResult.summary?.top,
    skip: internalResult.summary?.skip,
    totalResults: internalResult.summary?.totalResults,
    fuzzyLevel: internalResult.summary?.fuzzyLevel,
    geoBias: mapLatLongPairAbbreviatedToLatLong(internalResult.summary?.geoBias),
    results: internalResult.results?.map((ir) => {
      const mappedResult: SearchAddressResultItem = {
        type: ir.type,
        id: ir.id,
        score: ir.score,
        distanceInMeters: ir.distanceInMeters,
        info: ir.info,
        entityType: ir.entityType,
        pointOfInterest: ir.pointOfInterest,
        address: ir.address,
        position:
          ir.position && ir.position.lat && ir.position.lon
            ? new LatLong(ir.position.lat, ir.position.lon)
            : undefined,
        viewport: mapBoundingBox(ir.viewport),
        entryPoints: ir.entryPoints?.map((p) => {
          return { type: p.type, position: mapLatLongPairAbbreviatedToLatLong(p.position) };
        }),
        addressRanges: ir.addressRanges
          ? {
              rangeLeft: ir.addressRanges.rangeLeft,
              rangeRight: ir.addressRanges.rangeRight,
              from: mapLatLongPairAbbreviatedToLatLong(ir.addressRanges.from),
              to: mapLatLongPairAbbreviatedToLatLong(ir.addressRanges.to)
            }
          : undefined,
        dataSources: ir.dataSources,
        matchType: ir.matchType,
        detourTime: ir.detourTime
      };
      return removeUndefinedProperties(mappedResult);
    })
  };

  const result: SearchAddressResult = removeUndefinedProperties(resultWithUndefined);
  return result;
}

/**
 * @internal
 */
function removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj)
    .filter(([, value]) => value !== undefined)
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
}

/**
 * @internal
 */
function mapReverseSearchAddressResult(
  internalResult: ReverseSearchAddressResultInternal
): ReverseSearchAddressResult {
  const resultWithUndefined = {
    queryTime: internalResult.summary?.queryTime,
    numResults: internalResult.summary?.numResults,
    results: internalResult.addresses?.map((ad) => {
      const mappedResult: ReverseSearchAddressResultItem = {
        address: ad.address,
        position: mapStringToLatLong(ad.position),
        roadUse: ad.roadUse,
        matchType: ad.matchType
      };
      return removeUndefinedProperties(mappedResult);
    })
  };
  const result: ReverseSearchAddressResult = removeUndefinedProperties(resultWithUndefined);
  return result;
}

/**
 * @internal
 */
function mapReverseSearchCrossStreetAddressCrResult(
  internalResult: ReverseSearchCrossStreetAddressResultInternal
): ReverseSearchCrossStreetAddressResult {
  const resultWithUndefined = {
    queryTime: internalResult.summary?.queryTime,
    numResults: internalResult.summary?.numResults,
    results: internalResult.addresses?.map((ad) => {
      const mappedResult: ReverseSearchCrossStreetAddressResultItem = {
        address: ad.address,
        position: mapStringToLatLong(ad.position)
      };
      return removeUndefinedProperties(mappedResult);
    })
  };

  const result: ReverseSearchCrossStreetAddressResult = removeUndefinedProperties(
    resultWithUndefined
  );
  return result;
}
