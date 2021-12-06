// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DataSource,
  EntryPointType,
  GeographicEntityType,
  MatchType,
  PointOfInterest,
  QueryType,
  SearchAddressResultType,
  Address,
  RoadUseType,
  ErrorResponse
} from "../generated/models";
import { LatLong, BoundingBox } from "./models";

/** This object is returned from a successful Search calls. */
export interface SearchAddressResult {
  /** The query parameter that was used to produce these search results. */
  readonly query?: string;
  /** The type of query being returned: NEARBY or NON_NEAR. */
  readonly queryType?: QueryType;
  /** Time spent resolving the query, in milliseconds. */
  readonly queryTime?: number;
  /** Number of results in the response. */
  readonly numResults?: number;
  /** Maximum number of responses that will be returned */
  readonly top?: number;
  /** The starting offset of the returned Results within the full Result set. */
  readonly skip?: number;
  /** The total number of Results found. */
  readonly totalResults?: number;
  /** The maximum fuzzy level required to provide Results. */
  readonly fuzzyLevel?: number;
  /** Indication when the internal search engine has applied a geospatial bias to improve the ranking of results. */
  readonly geoBias?: LatLong;
  /** A list of Search API results. */
  readonly results?: SearchAddressResultItem[];
}

/** Result object for a Search API response. */
export interface SearchAddressResultItem {
  /** Result type */
  readonly type?: SearchAddressResultType;
  /** Id property */
  readonly id?: string;
  /** The value within a result set to indicate the relative matching score between results. */
  readonly score?: number;
  /** Straight line distance between the result and geobias location in meters. */
  readonly distanceInMeters?: number;
  /** Information about the original data source of the Result. Used for support requests. */
  readonly info?: string;
  /** Entity type of the search result. Only present if type == Geography. */
  readonly entityType?: GeographicEntityType;
  /** Details of the returned POI including information such as the name, phone, url address, and classifications. */
  readonly pointOfInterest?: PointOfInterest;
  /** The address of the result */
  readonly address?: Address;
  /** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
  readonly position?: LatLong;
  /** The viewport that covers the result represented by the top-left and bottom-right coordinates of the viewport. */
  readonly viewport?: BoundingBox;
  /** Array of EntryPoints. Those describe the types of entrances available at the location. */
  readonly entryPoints?: EntryPoint[];
  /** Describes the address range on both sides of the street for a search result. */
  readonly addressRanges?: AddressRanges;
  /** Reference geometry id for use with the [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API. */
  readonly dataSources?: DataSource;
  /** Information on the type of match. */
  readonly matchType?: MatchType;
  /** Detour time in seconds. Only returned for calls to the Search Along Route API. */
  readonly detourTime?: number;
}

/** The entry point for the POI being returned. */
export interface EntryPoint {
  /** The type of entry point. */
  readonly type?: EntryPointType;
  /** Position of the entry point */
  position?: LatLong;
}

/** Describes the address range on both sides of the street for a search result. Coordinates for the start and end locations of the address range are included. */
export interface AddressRanges {
  /** Address range on the left side of the street. */
  rangeLeft?: string;
  /** Address range on the right side of the street. */
  rangeRight?: string;
  /** The beginning point of a street segment */
  from?: LatLong;
  /** The end point of a street segment */
  to?: LatLong;
}

export interface ReverseSearchAddressResult {
  /** Time spent resolving the query, in milliseconds. */
  readonly queryTime?: number;
  /** Number of results in the response. */
  readonly numResults?: number;
  /** The Result list, sorted in descending order by score. */
  readonly results?: ReverseSearchAddressResultItem[];
}

export interface ReverseSearchCrossStreetAddressResult {
  /** Time spent resolving the query, in milliseconds. */
  readonly queryTime?: number;
  /** Number of results in the response. */
  readonly numResults?: number;
  /** The Result list, sorted in descending order by score. */
  readonly results?: ReverseSearchCrossStreetAddressResultItem[];
}

export interface ReverseSearchAddressResultItem {
  /** The address of the result */
  readonly address?: Address;
  /** Position of the result */
  readonly position?: LatLong;
  /** List of road usage types at the address */
  readonly roadUse?: RoadUseType[];
  /** Information on the type of match. */
  readonly matchType?: MatchType;
}

export interface ReverseSearchCrossStreetAddressResultItem {
  /** The address of the result */
  readonly address?: Address;
  /** Position of the result */
  readonly position?: LatLong;
  /** List of road usage types at the address */
  readonly roadUse?: RoadUseType[];
  /** Information on the type of match. */
  readonly matchType?: MatchType;
}

// /** This object is returned from a successful Search Address Batch service call. */
// export type SearchAddressBatchResult = {
//   /** Number of successful requests in the batch */
//   readonly successfulRequests?: number;
//   /** Total number of requests in the batch */
//   readonly totalRequests?: number;
//   /** Array containing the batch results. */
//   readonly batchItems?: SearchAddressBatchItem[];
// };

// /** An item returned from Search Address Batch service call. */
// export type SearchAddressBatchItem = {
//   /** HTTP request status code. */
//   readonly statusCode?: number;
//   /** The result of the query. SearchAddressResponse if the query completed successfully, ErrorResponse otherwise. */
//   readonly response?: SearchAddressResult & ErrorResponse;
// };

// /** This object is returned from a successful Search Address Reverse Batch service call. */
// export type ReverseSearchAddressBatchResult = {
//   /** Number of successful requests in the batch */
//   readonly successfulRequests?: number;
//   /** Total number of requests in the batch */
//   readonly totalRequests?: number;
//   /** Array containing the batch results.*/
//   readonly batchItems?: ReverseSearchAddressBatchItem[];
// };

// /** An item returned from Search Address Reverse Batch service call. */
// export type ReverseSearchAddressBatchItem = {
//   /** HTTP request status code. */
//   readonly statusCode?: number;
//   /** The result of the query. SearchAddressReverseResponse if the query completed successfully, ErrorResponse otherwise. */
//   readonly response?: ReverseSearchAddressResult & ErrorResponse;
// };

/** This object is returned from a successful Search Address Batch service call. */
export interface BatchResult<TResult extends SearchAddressResult | ReverseSearchAddressResult> {
  /** Number of successful requests in the batch */
  readonly successfulRequests?: number;
  /** Total number of requests in the batch */
  readonly totalRequests?: number;
  /** Array containing the batch results. */
  readonly batchItems?: BatchItem<TResult>[];
}

/** An item returned from Search Address Batch service call. */
export interface BatchItem<TResult> {
  /** HTTP request status code. */
  readonly statusCode?: number;
  /** The result of the query. SearchResultType if the query completed successfully, ErrorResponse otherwise. */
  readonly response?: TResult & ErrorResponse;
}
