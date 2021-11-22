// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import {
  ElectricVehicleConnector,
  GeographicEntityType,
  LocalizedMapView,
  OperatingHoursRange,
  RoadUseType,
  SearchIndexes
} from "./generated/models";
import { BoundingBox, Coordinate } from "./models";

/**
 * Client options used to configure the Search Client
 */
export interface SearchClientOptions extends CommonClientOptions {}

/**
 * Options for get polygon
 */
export interface ListPolygonsOptions extends OperationOptions {}

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
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
}

/**
 * Options for search address
 */
export interface SearchAddressBaseOptions extends SearchBaseOptions {
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

export interface SearchExtraFilterOptions {
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories.
   * ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   * The list of supported categories can be discovered using [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315`(Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017`(Search Points of Interest of category either Italian or French Restaurant)
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
}

/**
 * Options for search point of interest
 */
export interface SearchPointOfInterestOptions
  extends SearchAddressBaseOptions,
    SearchExtraFilterOptions {
  /** Hours of operation for a POI (Points of Interest). */
  operatingHours?: OperatingHoursRange;
}

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
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
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
 * Options for search nearby point of interest
 */
export interface SearchNearbyPointOfInterestOptions
  extends SearchBaseOptions,
    SearchExtraFilterOptions {
  /** Counter filters that limit the search to the specified countries */
  countryFilter?: string[];
  /** The radius in meters to for the results to be constrained to the defined area, Min value is 1, Max Value is 50000. */
  radiusInMeters?: number;
}

export interface SearchAddressOptions extends SearchAddressBaseOptions {
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
}

/**
 * Options for search structured address
 */
export interface SearchStructuredAddressOptions extends SearchBaseOptions {
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
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
   * The list of supported categories can be discovered using [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315`(Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017`(Search Points of Interest of category either Italian or French Restaurant)
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
   * The list of supported categories can be discovered using [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315`(Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017`(Search Points of Interest of category either Italian or French Restaurant)
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
export interface FuzzySearchBatchOptions extends OperationOptions {}
/**
 * Options for begin search address batch
 */
export interface SearchAddressBatchOptions extends OperationOptions {}
/**
 * Options for reverse begin search address batch
 */
export interface ReverseSearchAddressBatchOptions extends OperationOptions {}
