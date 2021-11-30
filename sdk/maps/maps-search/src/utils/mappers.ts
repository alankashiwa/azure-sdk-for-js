// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchFuzzySearchOptionalParams as FuzzySearchOptionalParams,
  SearchSearchPointOfInterestOptionalParams as SearchPointOfInterestOptionalParams,
  SearchSearchAddressOptionalParams as SearchAddressOptionalParams,
  SearchSearchNearbyPointOfInterestOptionalParams as SearchNearbyPointOfInterestOptionalParams,
  ReverseSearchCrossStreetAddressResult as ReverseSearchCrossStreetAddressResultInternal,
  SearchAddressResult as SearchAddressResultInternal,
  BoundingBox as BoundingBoxInternal,
  ReverseSearchAddressResult as ReverseSearchAddressResultInternal,
  SearchAddressBatchResult,
  ReverseSearchAddressBatchProcessResult,
  LatLongPairAbbreviated,
  ErrorResponse
} from "../generated/models";
import { LatLong, BoundingBox } from "../models";
import {
  SearchAddressResult,
  SearchAddressResultItem,
  ReverseSearchAddressResult,
  ReverseSearchAddressResultItem,
  ReverseSearchCrossStreetAddressResult,
  ReverseSearchCrossStreetAddressResultItem,
  BatchResult
} from "../results";
import {
  FuzzySearchOptions,
  SearchPointOfInterestOptions,
  SearchNearbyPointOfInterestOptions,
  SearchAddressOptions,
  SearchBaseOptions,
  SearchExtraFilterOptions
} from "../options";
import { OperationOptions } from "@azure/core-client";

/**
 * @internal
 */
export function toLatLongString(coordinates: LatLong): string {
  return `${coordinates.latitude},${coordinates.longitude}`;
}

/**
 * @internal
 */
export function extractOperationOptions(options: OperationOptions): OperationOptions {
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
export function mapSearchBaseOptions(options: SearchBaseOptions): SearchBaseOptions {
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
export function mapSearchExtraFilterOptions(
  options: SearchExtraFilterOptions
): SearchExtraFilterOptions {
  return {
    categoryFilter: options.categoryFilter,
    brandFilter: options.brandFilter,
    electricVehicleConnectorFilter: options.electricVehicleConnectorFilter
  };
}

/**
 * @internal
 */
export function mapSearchAddressOptions(
  options: SearchAddressOptions
): SearchAddressOptionalParams {
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
export function mapSearchPointOfInterestOptions(
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
export function mapSearchNearbyPointOfInterestOptions(
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
export function mapFuzzySearchOptions(options: FuzzySearchOptions): FuzzySearchOptionalParams {
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
export function mapLatLongPairAbbreviatedToLatLong(
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
export function mapStringToLatLong(latLongStr?: string): LatLong | undefined {
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
export function mapBoundingBox(bbox?: BoundingBoxInternal): BoundingBox | undefined {
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
export function mapSearchAddressResult(
  internalResult: SearchAddressResultInternal
): SearchAddressResult {
  const resultWithUndefinedProps = {
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

  const result: SearchAddressResult = removeUndefinedProperties(resultWithUndefinedProps);
  return result;
}

/**
 * @internal
 */
export function removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj)
    .filter(([, value]) => value !== undefined)
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
}

/**
 * @internal
 */
export function mapReverseSearchAddressResult(
  internalResult: ReverseSearchAddressResultInternal
): ReverseSearchAddressResult {
  const resultWithUndefinedProps = {
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
  const result: ReverseSearchAddressResult = removeUndefinedProperties(resultWithUndefinedProps);
  return result;
}

/**
 * @internal
 */
export function mapReverseSearchCrossStreetAddressResult(
  internalResult: ReverseSearchCrossStreetAddressResultInternal
): ReverseSearchCrossStreetAddressResult {
  const resultWithUndefinedProps = {
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
    resultWithUndefinedProps
  );
  return result;
}

/**
 * @Internal
 */
export function mapSearchAddressBatchResult(
  internalResult: SearchAddressBatchResult
): BatchResult<SearchAddressResult> {
  const result: BatchResult<SearchAddressResult> = {
    totalRequests: internalResult.batchSummary?.totalRequests,
    successfulRequests: internalResult.batchSummary?.successfulRequests,
    batchItems: internalResult.batchItems?.map((item) => {
      if (item.statusCode === 200) {
        return {
          statusCode: item.statusCode,
          response: mapSearchAddressResult(item.response as SearchAddressResultInternal)
        };
      } else {
        return { statusCode: item.statusCode, response: item.response as ErrorResponse };
      }
    })
  };
  return result;
}

/**
 * @Internal
 */
export function mapReverseSearchAddressBatchResult(
  internalResult: ReverseSearchAddressBatchProcessResult
): BatchResult<ReverseSearchAddressResult> {
  const result: BatchResult<SearchAddressResult> = {
    totalRequests: internalResult.batchSummary?.totalRequests,
    successfulRequests: internalResult.batchSummary?.successfulRequests,
    batchItems: internalResult.batchItems?.map((item) => {
      if (item.statusCode === 200) {
        return {
          statusCode: item.statusCode,
          response: mapReverseSearchAddressResult(
            item.response as ReverseSearchAddressResultInternal
          )
        };
      } else {
        return { statusCode: item.statusCode, response: item.response as ErrorResponse };
      }
    })
  };
  return result;
}
