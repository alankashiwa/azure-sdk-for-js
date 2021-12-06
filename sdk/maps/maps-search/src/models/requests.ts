// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LatLong } from "./models";
import { FuzzySearchOptions, ReverseSearchAddressOptions, SearchAddressOptions } from "./options";

/**
 * Request object containing parameters for making fuzzy search call
 */
export interface FuzzySearchRequest {
  query: string;
  coordinates?: LatLong;
  countryFilter?: string[];
  options?: FuzzySearchOptions;
}

/**
 * Request object containing parameters for making search address call
 */
export interface SearchAddressRequest {
  query: string;
  options?: SearchAddressOptions;
}

/**
 * Request object containing parameters for making reverse search address call
 */
export interface ReverseSearchAddressRequest {
  coordinates: LatLong;
  options?: ReverseSearchAddressOptions;
}
