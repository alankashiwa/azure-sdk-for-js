import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated";
import {
  SearchListPolygonsOptionalParams as ListPolygonsOptionalParams,
  PolygonResult,
  SearchFuzzySearchOptionalParams as FuzzySearchOptionalParams,
  SearchSearchPointOfInterestOptionalParams as SearchPointOfInterestOptionalParams,
  PointOfInterestCategoryTreeResult,
  SearchGetPointOfInterestCategoryTreeOptionalParams as GetPointOfInterestCategoryTreeOptionalParams,
  SearchSearchAddressOptionalParams as SearchAddressOptionalParams,
  SearchSearchStructuredAddressOptionalParams as SearchStructuredAddressOptionalParams,
  SearchAddressResult,
  SearchIndexes,
  GeographicEntityType,
  LocalizedMapView,
  ElectricVehicleConnector,
  OperatingHoursRange,
  ReverseSearchAddressResult,
  RoadUseType,
  ReverseSearchCrossStreetAddressResult,
  SearchSearchInsideGeometryOptionalParams as SearchInsideGeometryOptionalParams,
  SearchSearchAlongRouteOptionalParams as SearchAlongRouteOptionalParams,
  GeoJsonLineString,
  SearchSearchNearbyPointOfInterestOptionalParams as SearchNearbyPointOfInterestOptionalParams,
  GeoJsonObjectUnion,
  SearchAddressBatchResult,
  BatchRequest,
  ReverseSearchAddressBatchProcessResult
} from "./generated/models";
import { OperationOptions } from "@azure/core-client";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { BoundingBox, Coordinate } from "./models";
import { mapsClientIdPolicy } from "./credential/mapsClientIdPolicy";
import { mapsAzureKeyCredentialPolicy } from "./credential/mapsAzureKeyCredentialPolicy";
import { MapsCommonClientOptions } from "./mapsCommonOptions";

/**
 * Client options used to configure the Search Client
 */
export interface SearchClientOptions extends MapsCommonClientOptions {}

/**
 * Client class for interacting with Azure Maps Search Service to query the ISO country code for the provided IP address
 */
export class SearchClient {
  /**
   * A reference to the auto-generated Search HTTP client.
   */
  private readonly client: GeneratedClient;
  private readonly defaultFormat: string;
  /**
   * Creates an instance of SearchClient.
   *
   * Example usage:
   * ```ts
   * import { SearchClient } from "@azure/maps-search";
   * import { AzureKeyCredential } from "@azure/core-auth"
   *
   * const client = new SearchClient(new AzureKeyCredential('<subscription-key>'));
   * ```
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Search Client
   */
  constructor(credential: TokenCredential | AzureKeyCredential, options: SearchClientOptions = {}) {
    this.defaultFormat = "json";
    this.client = new GeneratedClient(options);
    if (isTokenCredential(credential)) {
      if (!options.clientId) {
        throw Error("option: maps client id is needed for TokenCredential");
      }
      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential,
          scopes: "https://atlas.microsoft.com/.default"
        })
      );
      this.client.pipeline.addPolicy(mapsClientIdPolicy(options.clientId));
    } else {
      this.client.pipeline.addPolicy(mapsAzureKeyCredentialPolicy(credential));
    }
  }

  /**
   * Get polygon
   * @param geometryIds - Comma separated list of geometry UUIDs, previously retrieved from an Online
   *                    Search request.
   * @param options - Optional parameters for the operation
   */
  public async listPolygons(
    geometryIds: string[],
    options: ListPolygonsOptions = {}
  ): Promise<PolygonResult> {
    const internalOptions: ListPolygonsOptionalParams = {
      ...extractOperationOptions(options)
    };
    return this.client.search.listPolygons(this.defaultFormat, geometryIds, internalOptions);
  }

  /**
   * Fuzzy search
   * @param query - The applicable query string (e.g., "seattle", "pizza").
   *                Can also be specified as a comma separated string composed by latitude followed by longitude (e.g., "47.641268, -122.125679").
   *                Must be properly URL encoded.
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    query: string,
    options: FuzzySearchOptions = {}
  ): Promise<SearchAddressResult> {
    // TODO: URL-encode query and give it a better name
    const internalOptions = mapFuzzySearchOptions(options);
    return this.client.search.fuzzySearch(this.defaultFormat, query, internalOptions);
  }

  /**
   * Search point of interest
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks"), must be properly URL encoded.
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    query: string,
    options: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    // TODO: URL-encode query and give it a better name
    const internalOptions = mapSearchPointOfInterestOptions(options);
    return this.client.search.searchPointOfInterest(this.defaultFormat, query, internalOptions);
  }

  /**
   * Search nearby point of interest
   * @param coordinate - The coordinate for the nearby POI search
   * @param options - Optional parameters for the operation
   */
  public async searchNearbyPointOfInterest(
    coordinate: Coordinate,
    options: SearchNearbyPointOfInterestOptions
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
   * Search point of interest category
   * @param query - The POI category to search for (e.g., "AIRPORT", "RESTAURANT"), must be properly URL encoded
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    query: string,
    options: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    // TODO: URL-encode query and give it a better name
    const internalOptions = mapSearchPointOfInterestOptions(options);
    return this.client.search.searchPointOfInterestCategory(
      this.defaultFormat,
      query,
      internalOptions
    );
  }

  /**
   * Get point of interest category tree
   * @param options - Optional parameters for the operation
   */
  public async getPointOfInterestCategoryTree(
    options: GetPointOfInterestCategoryTreeOptions = {}
  ): Promise<PointOfInterestCategoryTreeResult> {
    const internalOptions = mapGetPointOfInterestCategoryTreeOptions(options);
    return this.client.search.getPointOfInterestCategoryTree(this.defaultFormat, internalOptions);
  }

  /**
   * Search address
   * @param query - The address to search for (e.g., "1 Microsoft way, Redmond, WA")
   * @param options - Optional parameters for the operation
   */
  public async searchAddress(
    query: string,
    options: SearchAddressOptions = {}
  ): Promise<SearchAddressResult> {
    // TODO: URL-encode query and give it a better name
    const internalOptions = mapSearchAddressOptions(options);
    return this.client.search.searchAddress(this.defaultFormat, query, internalOptions);
  }

  /**
   * Reverse search address
   * @param coordinate - The coordinate for the reverse search query
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchAddress(
    coordinate: Coordinate,
    options: ReverseSearchAddressOptions = {}
  ): Promise<ReverseSearchAddressResult> {
    return this.client.search.reverseSearchAddress(
      this.defaultFormat,
      [coordinate.latitude, coordinate.longitude],
      { ...options }
    );
  }

  /**
   * Reverse search cross street address
   * @param coordinate - The coordinate for the reverse search query
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchCrossStreetAddress(
    coordinate: Coordinate,
    options: ReverseSearchCrossStreetAddressOptions = {}
  ): Promise<ReverseSearchCrossStreetAddressResult> {
    return this.client.search.reverseSearchCrossStreetAddress(
      this.defaultFormat,
      [coordinate.latitude, coordinate.longitude],
      { ...options }
    );
  }

  /**
   * Search structured address
   * @param countryCode - The 2 or 3 letter [ISO3166-1](https://www.iso.org/iso-3166-country-codes.html)
   *                      country code portion of an address. E.g. US.
   * @param options - Optional parameters for the operation
   */
  public async searchStructuredAddress(
    countryCode: string,
    options: SearchStructuredAddressOptions = {}
  ) {
    const internalOptions = mapSearchStructuredAddressOptions(options);
    return this.client.search.searchStructuredAddress(
      this.defaultFormat,
      countryCode,
      internalOptions
    );
  }

  /**
   * Search inside Geometry
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza"). Must be
   *              properly URL encoded.
   * @param geometry - This represents the geometry for one or more geographical features (parks, state
   *                   boundary etc.) to search in and should be a GeoJSON compliant type. Please refer to [RFC
   *                   7946](https://tools.ietf.org/html/rfc7946) for details.
   * @param options - Optional parameters for the operation
   */
  public async searchInsideGeometry(
    query: string,
    geometry: GeoJsonObjectUnion,
    options: SearchInsideGeometryOptions = {}
  ) {
    // TODO: URL-encode query and give it a better name
    const internalOptions = mapSearchInsideGeometryOptions(options);
    return this.client.search.searchInsideGeometry(
      this.defaultFormat,
      query,
      {
        geometry: (geometry as unknown) as Record<string, unknown>
      },
      internalOptions
    );
  }

  /**
   * Search along route
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza"). Must be
   *                properly URL encoded.
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
    const internalOptions = mapSearchAlongRouteOptions(options);
    return this.client.search.searchAlongRoute(
      this.defaultFormat,
      query,
      maxDetourTime,
      { route: route },
      internalOptions
    );
  }

  /**
   * Begin fuzzy search: batch version
   * @param batchRequest
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
   * Search address: batch version
   * @param batchRequest -
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
   * Reverse search address: batch version
   * @param batchRequest -
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
 * Options for get polygon
 */
export interface ListPolygonsOptions extends OperationOptions {}

/**
 * Options for fuzzy search
 *
 * Fuzzy Level: 1-4
 * - Level 1 has no spell checking.
 * - Level 2 uses normal n-gram spell checking. For example, query "restrant" can be matched to "restaurant."
 * - Level 3 uses sound-like spell checking, and shingle spell checking. Sound-like spell checking is for "rstrnt" to "restaurant" matching. Shingle spell checking is for "mountainview" to "mountain view" matching.
 * - Level 4 doesn’t add any more spell checking functions.
 */
export interface FuzzySearchOptions extends SearchPointOfInterestOptions {
  /** Minimum fuzziness level to be used. Default: 1 */
  minFuzzyLevel?: number;
  /** Maximum fuzziness level to be used. Default: 1 */
  maxFuzzyLevel?: number;
  /** A comma separated list of indexes which should be utilized for the search. Item order does not matter.
   *  Available indexes are:
   *   - Addr = Address range interpolation,
   *   - Geo = Geographies, PAD = Point Addresses,
   *   - POI = Points of interest, Str = Streets,
   *   - Xstr = Cross Streets (intersections)
   * */
  indexFilter?: SearchIndexes[];
}

/**
 * Options for search point of interest
 */
export interface SearchPointOfInterestOptions extends SearchAddressOptions {
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories.
   * ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   * The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315` (Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017` (Search Points of Interest of category either Italian or French Restaurant)
   */
  categoryFilter?: number[];
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands.
   * Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned.
   * Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   * `brandSet=Foo`
   * `brandSet=Foo,Bar`
   * `brandSet="A,B,C Comma",Bar`
   * */
  brandFilter?: string[];
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types.
   * Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Usage examples:
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  electricVehicleConnectorFilter?: ElectricVehicleConnector[];
  /** Hours of operation for a POI (Points of Interest). */
  operatingHours?: OperatingHoursRange;
}

/**
 * Options for search nearby point of interest
 */
export interface SearchNearbyPointOfInterestOptions extends OperationOptions {
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  top?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  skip?: number;
  /** Language in which search results should be returned. */
  language?: string;
  /** Indexes for which extended postal codes should be included in the results */
  extendedPostalCodesFor?: SearchIndexes[];
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories.
   * ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   * The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315` (Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017` (Search Points of Interest of category either Italian or French Restaurant)
   */
  categoryFilter?: number[];
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands.
   * Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned.
   * Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   * `brandSet=Foo`
   * `brandSet=Foo,Bar`
   * `brandSet="A,B,C Comma",Bar`
   * */
  brandFilter?: string[];
  /** Counter filters that limit the search to the specified countries */
  countryFilter?: string[];
  /** The radius in meters to for the results to be constrained to the defined area, Min value is 1, Max Value is 50000. */
  radiusInMeters?: number;
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types.
   * Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Usage examples:
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  electricVehicleConnectorFilter?: ElectricVehicleConnector[];
}

/**
 * Options for get point of interest category tree
 */
export interface GetPointOfInterestCategoryTreeOptions extends OperationOptions {
  /** Language in which search results should be returned. */
  language?: string;
}

/**
 * Search base options
 */

export interface SearchBaseOptions extends OperationOptions {
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  top?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  skip?: number;
  /** Language in which search results should be returned. */
  language?: string;
  /** Indexes for which extended postal codes should be included in the results */
  extendedPostalCodesFor?: SearchIndexes[];
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
}

/**
 * Options for search address
 */
export interface SearchAddressOptions extends SearchBaseOptions {
  /** Bounding box of the search range */
  boundingBox?: BoundingBox;
  /** Counter filters that limit the search to the specified countries */
  countryFilter?: string[];
  /** The coordinate where results should be biased */
  coordinate?: Coordinate;
  /** Whether the query should be interpreted as a partial input and the search will enter predictive mode */
  isTypeAhead?: boolean;
  /** The radius in meters to for the results to be constrained to the defined area */
  radiusInMeters?: number;
}

/**
 * Options for search structured address
 */
export interface SearchStructuredAddressOptions extends SearchBaseOptions {
  /** The 2 or 3 letter [ISO3166-1](https://www.iso.org/iso-3166-country-codes.html) country code portion of an address. E.g. US. */
  countryCode?: string;
  /** The street number portion of an address */
  streetNumber?: string;
  /** The street name portion of an address */
  streetName?: string;
  /** The cross street name for the structured address */
  crossStreet?: string;
  /** The municipality portion of an address */
  municipality?: string;
  /** The municipality subdivision (sub/super city) for the structured address */
  municipalitySubdivision?: string;
  /** The named area for the structured address */
  countryTertiarySubdivision?: string;
  /** The county for the structured address */
  countrySecondarySubdivision?: string;
  /** The country subdivision portion of an address */
  countrySubdivision?: string;
  /** The postal code portion of an address */
  postalCode?: string;
}

/**
 * Options for reverse search address
 */
export interface ReverseSearchAddressOptions extends OperationOptions {
  /** The radius in meters to for the results to be constrained to the defined area */
  radiusInMeters?: number;
  /** Language in which search results should be returned. */
  language?: string;
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
  /** To enable return of the posted speed limit */
  includeSpeedLimit?: boolean;
  /** The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is North, 90 is East and so on, values range from -360 to 360. The precision can include upto one decimal place */
  heading?: number;
  /** If a number is sent in along with the request, the response may include the side of the street (Left/Right) and also an offset position for that number */
  numberParam?: string;
  /** Boolean. To enable return of the road use array for reverse geocodes at street level */
  includeRoadUse?: boolean;
  /** To restrict reverse geocodes to a certain type of road use. The road use array for reverse geocodes can be one or more of LimitedAccess, Arterial, Terminal, Ramp, Rotary, LocalStreet */
  roadUse?: RoadUseType[];
  /**
   * Format of newlines in the formatted address.
   *
   * If true, the address will contain newlines.
   * If false, newlines will be converted to commas.
   */
  allowFreeformNewline?: boolean;
  /** Include information on the type of match the geocoder achieved in the response. */
  includeMatchType?: boolean;
}

/**
 * Options for reverse search cross street address
 */
export interface ReverseSearchCrossStreetAddressOptions extends OperationOptions {
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  top?: number;
  /** The radius in meters to for the results to be constrained to the defined area */
  radiusInMeters?: number;
  /** Language in which search results should be returned. */
  language?: string;
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
  /** The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is North, 90 is East and so on, values range from -360 to 360. The precision can include upto one decimal place */
  heading?: number;
}

/**
 * Options for search inside geometry
 */
export interface SearchInsideGeometryOptions extends OperationOptions {
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  top?: number;
  /** Language in which search results should be returned. */
  language?: string;
  /** Indexes for which extended postal codes should be included in the results */
  extendedPostalCodesFor?: SearchIndexes[];
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories.
   * ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   * The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315` (Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017` (Search Points of Interest of category either Italian or French Restaurant)
   */
  categoryFilter?: number[];
  /** Hours of operation for a POI (Points of Interest). */
  operatingHours?: OperatingHoursRange;
}

/**
 * Options for search along route
 */
export interface SearchAlongRouteOptions extends OperationOptions {
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories.
   * ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   * The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315` (Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017` (Search Points of Interest of category either Italian or French Restaurant)
   */
  categoryFilter?: number[];
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands.
   * Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned.
   * Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   * `brandSet=Foo`
   * `brandSet=Foo,Bar`
   * `brandSet="A,B,C Comma",Bar`
   * */
  brandFilter?: string[];
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types.
   * Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Usage examples:
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  electricVehicleConnectorFilter?: ElectricVehicleConnector[];
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
  /** Hours of operation for a POI (Points of Interest). */
  operatingHours?: OperatingHoursRange;
  /** Maximum number of responses that will be returned. Default value is 10. Max value is 20 */
  top?: number;
}

/**
 * Options for begin fuzzy search batch
 */
export interface BeginFuzzySearchBatchOptions extends OperationOptions {}
/**
 * Options for begin search address batch
 */
export interface BeginSearchAddressBatchOptions extends OperationOptions {}
/**
 * Options for reverse begin search address batch
 */
export interface BeginReverseSearchAddressBatchOptions extends OperationOptions {}

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
    entityType: options.entityType,
    localizedMapView: options.localizedMapView,
    ...extractOperationOptions(options)
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
function mapSearchStructuredAddressOptions(
  options: SearchStructuredAddressOptions
): SearchStructuredAddressOptionalParams {
  return {
    streetName: options.streetName,
    crossStreet: options.crossStreet,
    municipality: options.municipality,
    municipalitySubdivision: options.municipalitySubdivision,
    countryTertiarySubdivision: options.countryTertiarySubdivision,
    countrySecondarySubdivision: options.countrySecondarySubdivision,
    countrySubdivision: options.countrySubdivision,
    postalCode: options.postalCode,
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
    categoryFilter: options.categoryFilter,
    brandFilter: options.brandFilter,
    electricVehicleConnectorFilter: options.electricVehicleConnectorFilter,
    operatingHours: options.operatingHours,
    ...mapSearchAddressOptions(options)
  };
}

function mapSearchNearbyPointOfInterestOptions(
  options: SearchNearbyPointOfInterestOptions
): SearchNearbyPointOfInterestOptionalParams {
  return {
    top: options.top,
    skip: options.skip,
    language: options.language,
    extendedPostalCodesFor: options.extendedPostalCodesFor,
    localizedMapView: options.localizedMapView,
    categoryFilter: options.categoryFilter,
    brandFilter: options.brandFilter,
    countryFilter: options.countryFilter,
    radiusInMeters: options.radiusInMeters,
    electricVehicleConnectorFilter: options.electricVehicleConnectorFilter,
    ...extractOperationOptions(options)
  };
}

/**
 * @internal
 */
function mapFuzzySearchOptions(options: FuzzySearchOptions): FuzzySearchOptionalParams {
  return {
    minFuzzyLevel: options.minFuzzyLevel,
    maxFuzzyLevel: options.maxFuzzyLevel,
    indexFilter: options.indexFilter,
    ...mapSearchPointOfInterestOptions(options)
  };
}

/**
 * @internal
 */
function mapGetPointOfInterestCategoryTreeOptions(
  options: FuzzySearchOptions
): GetPointOfInterestCategoryTreeOptionalParams {
  return {
    language: options.language,
    ...extractOperationOptions(options)
  };
}

/**
 * @internal
 */
function mapSearchInsideGeometryOptions(
  options: SearchInsideGeometryOptions
): SearchInsideGeometryOptionalParams {
  return {
    top: options.top,
    language: options.language,
    extendedPostalCodesFor: options.extendedPostalCodesFor,
    localizedMapView: options.localizedMapView,
    categoryFilter: options.categoryFilter,
    operatingHours: options.operatingHours,
    ...extractOperationOptions(options)
  };
}

/**
 * @internal
 */
function mapSearchAlongRouteOptions(
  options: SearchAlongRouteOptions
): SearchAlongRouteOptionalParams {
  return {
    categoryFilter: options.categoryFilter,
    brandFilter: options.brandFilter,
    electricVehicleConnectorFilter: options.electricVehicleConnectorFilter,
    localizedMapView: options.localizedMapView,
    operatingHours: options.operatingHours,
    top: options.top,
    ...extractOperationOptions(options)
  };
}
