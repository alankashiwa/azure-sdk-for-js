// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CancelOnProgress, PollerLike, PollOperationState } from "@azure/core-lro";
import { AbortSignalLike } from "@azure/abort-controller";
import { BatchRequest } from "./generated/models";
import { SearchAddressOptions, ReverseSearchAddressOptions, FuzzySearchOptions } from "./options";

export {
  Polygon,
  PolygonResult,
  SearchIndexes,
  GeographicEntityType,
  LocalizedMapView,
  QueryType,
  SearchAddressResultType,
  PointOfInterest,
  MatchType,
  GeometryIdentifier,
  EntryPointType,
  DataSource,
  Address,
  BrandName,
  Classification,
  ClassificationName,
  PointOfInterestCategorySet,
  OperatingHours,
  OperatingHoursTimeRange,
  OperatingHoursTime,
  OperatingHoursRange,
  ElectricVehicleConnector,
  PointOfInterestCategoryTreeResult,
  RoadUseType,
  GeoJsonObjectUnion,
} from "./generated/models";

/**
 * Bounding Box
 */
export class BoundingBox {
  private _topLeft: LatLong;
  private _bottomRight: LatLong;
  constructor(topLeft: LatLong, bottomRight: LatLong) {
    this._topLeft = topLeft;
    this._bottomRight = bottomRight;
  }
  /** Top left coordinate of the bounding box */
  public get topLeft(): LatLong {
    return this._topLeft;
  }

  /** Bottom right coordinate of the bounding box */
  public get bottomRight(): LatLong {
    return this._bottomRight;
  }

  /** Top latitude of the bounding box */
  public get top(): number {
    return this._topLeft.latitude;
  }

  /** Left longitude of the bounding box */
  public get left(): number {
    return this._topLeft.longitude;
  }

  /** Bottom latitude of the bounding box */
  public get bottom(): number {
    return this._bottomRight.latitude;
  }

  /** Right longitude of the bounding box */
  public get right(): number {
    return this._bottomRight.longitude;
  }

  /** Top right coordinate of the bounding box */
  public get topRight(): LatLong {
    return new LatLong(this._topLeft.latitude, this._bottomRight.longitude);
  }

  /** Bottom left coordinate of the bounding box */
  public get bottomLeft(): LatLong {
    return new LatLong(this._bottomRight.latitude, this._topLeft.longitude);
  }
}

/**
 * Latitude/Longitude Pair
 */
export class LatLong {
  private _latitude: number;
  private _longitude: number;
  constructor(latitude: number, longitude: number) {
    this._latitude = latitude;
    this._longitude = longitude;
  }

  /** Latitude */
  public get latitude(): number {
    return this._latitude;
  }

  /** Longitude */
  public get longitude(): number {
    return this._longitude;
  }
}

/**
 * GeoJson object for Point
 */
export interface GeoJsonPoint {
  type: "Point";
  coordinates: number[];
}

/**
 * GeoJson object for LineString
 */
export interface GeoJsonLineString {
  type: "LineString";
  coordinates: number[][];
}

/**
 * GeoJson object for Polygon
 */
export interface GeoJsonPolygon {
  type: "Polygon";
  coordinates: number[][][];
}

/**
 * GeoJson feature
 */
export interface GeoJsonFeature {
  type: "Feature";
  geometry: GeoJsonPolygon | GeoJsonPoint;
  id?: string | number | undefined;
  properties?: { [name: string]: any };
}

/**
 * GeoJson feature for polygon
 */
export interface GeoJsonPolygonFeature extends GeoJsonFeature {
  geometry: GeoJsonPolygon;
}

/**
 * GeoJson feature for circle
 */
export interface GeoJsonCircleFeature extends GeoJsonFeature {
  geometry: GeoJsonPoint;
  properties: {
    subType: "Circle";
    radius: number;
  };
}

/**
 * GeoJson feature collection
 */
export interface GeoJsonFeatureCollection {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

/**
 * GeoJson geometry collection
 */
export interface GeoJsonGeometryCollection {
  type: "GeometryCollection";
  geometries: GeoJsonPolygon[];
}

/**
 * Structured address
 */
export interface StructuredAddress {
  /** The 2 or 3 letter [ISO3166-1](https://www.iso.org/iso-3166-country-codes.html) country code portion of an address. E.g. US. */
  countryCode: string;
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

export interface FuzzySearchRequest {
  query: string;
  coordinates?: LatLong;
  countryFilter?: string[];
  options?: FuzzySearchOptions;
}

export interface SearchAddressRequest {
  query: string;
  options?: SearchAddressOptions;
}

export interface ReverseSearchAddressRequest {
  coordinates: LatLong;
  options?: ReverseSearchAddressOptions;
}

export function createFuzzySearchBatchRequest(requests: FuzzySearchRequest[]): BatchRequest {
  return {
    batchItems: requests.map((r) => {
      let query = `?query=${r.query}`;
      if (r.coordinates) {
        query += `&lat=${r.coordinates.latitude}&lon=${r.coordinates.longitude}`;
      }
      if (r.countryFilter && r.countryFilter.length > 0) {
        query += `&countrySet=${r.countryFilter.join(",")}`;
      }
      if (r.options) {
        for (const [k, v] of Object.entries(r.options)) {
          switch (k) {
            case "indexFilter":
              if (v && v.length > 0) {
                query += `&idxSet=${v.join(",")}`;
              }
              break;
            case "operatingHours":
              if (v) {
                query += `&openingHours=${v}`;
              }
              break;
            case "categoryFilter":
              if (v && v.length > 0) {
                query += `&categorySet=${v.join(",")}`;
              }
              break;
            case "brandFilter":
              if (v && v.length > 0) {
                query += `&brandSet=${v.join(",")}`;
              }
              break;
            case "electricVehicleConnectorFilter":
              if (v && v.length > 0) {
                query += `&connectorSet=${v.join(",")}`;
              }
              break;
            case "isTypeAhead":
              if (v) {
                query += `&typeahead=${v}`;
              }
              break;
            case "radiusInMeters":
              if (v) {
                query += `&radius=${v}`;
              }
              break;
            case "boundingBox":
              if (v) {
                query += `&topLeft=${v.topLeft}&btmRight=${v.bottomRight}`;
              }
              break;
            case "localizedMapView":
              if (v) {
                query += `&view=${v}`;
              }
              break;
            case "top":
              if (v) {
                query += `&limit=${v}`;
              }
              break;
            case "skip":
              if (v) {
                query += `&offset=${v}`;
              }
              break;
            default:
              query += `&${k}=${v}`;
              break;
          }
        }
      }
      return { query };
    })
  };
}

export function createSearchAddressBatchRequest(requests: SearchAddressRequest[]): BatchRequest {
  return {
    batchItems: requests.map((r) => {
      let query = `?query=${r.query}`;
      if (r.options) {
        for (const [k, v] of Object.entries(r.options)) {
          switch (k) {
            case "coordinates":
              if (v) {
                query += `&lat=${v.latitude}&lon=${v.longitude}`;
              }
              break;
            case "countryFilter":
              if (v && v.length > 0) {
                query += `&countrySet=${v.join(",")}`;
              }
              break;
            case "isTypeAhead":
              if (v) {
                query += `&typeahead=${v}`;
              }
              break;
            case "radiusInMeters":
              if (v) {
                query += `&radius=${v}`;
              }
              break;
            case "boundingBox":
              if (v) {
                query += `&topLeft=${v.topLeft}&btmRight=${v.bottomRight}`;
              }
              break;
            case "localizedMapView":
              if (v) {
                query += `&view=${v}`;
              }
              break;
            case "top":
              if (v) {
                query += `&limit=${v}`;
              }
              break;
            case "skip":
              if (v) {
                query += `&offset=${v}`;
              }
              break;
            default:
              query += `&${k}=${v}`;
              break;
          }
        }
      }
      return { query };
    })
  };
}

export function createReverseSearchAddressBatchRequest(
  requests: ReverseSearchAddressRequest[]
): BatchRequest {
  return {
    batchItems: requests.map((r) => {
      let query = `?query=${r.coordinates.latitude},${r.coordinates.longitude}`;
      if (r.options) {
        for (const [k, v] of Object.entries(r.options)) {
          switch (k) {
            case "includeSpeedLimit":
              if (v) {
                query += `&returnSpeedLimit=${v}`;
              }
              break;
            case "numberParam":
              if (v) {
                query += `&number=${v}`;
              }
              break;
            case "includeRoadUse":
              if (v) {
                query += `&returnRoadUse=${v}`;
              }
              break;
            case "roadUse":
              if (v && v.length > 0) {
                query += `&roadUse=${v.join(",")}`;
              }
              break;
            case "includeMatchType":
              if (v) {
                query += `&returnMatchType=${v}`;
              }
              break;
            case "radiusInMeters":
              if (v) {
                query += `&radius=${v}`;
              }
              break;
            case "localizedMapView":
              if (v) {
                query += `&view=${v}`;
              }
              break;
            default:
              query += `&${k}=${v}`;
              break;
          }
        }
      }
      return { query };
    })
  };
}

// export class FuzzySearchBatchPoller
//   implements
//     PollerLike<
//       PollOperationState<SearchBatchResult<SearchAddressResult>>,
//       SearchBatchResult<SearchAddressResult>
//     > {
//   constructor(
//     private internalPoller: PollerLike<
//       PollOperationState<SearchAddressBatchResult>,
//       SearchAddressBatchResult
//     >
//   ) {}
//   public poll(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
//     return this.internalPoller.poll(options);
//   }
//   public cancelOperation(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
//     return this.internalPoller.cancelOperation(options);
//   }

//   public async pollUntilDone(): Promise<SearchBatchResult<SearchAddressResult>> {
//     const result = await this.internalPoller.pollUntilDone();
//     return mapSearchAddressBatchResult(result);
//   }
//   public onProgress(
//     callback: (state: PollOperationState<SearchBatchResult<SearchAddressResult>>) => void
//   ): CancelOnProgress {
//     const internalCallback = (
//       internalState: PollOperationState<SearchAddressBatchResult>
//     ): void => {
//       const state: PollOperationState<SearchBatchResult<SearchAddressResult>> = {};
//       if (internalState.isStarted) {
//         state.isStarted = internalState.isStarted;
//       }
//       if (internalState.isCompleted) {
//         state.isCompleted = internalState.isCompleted;
//       }
//       if (internalState.isCancelled) {
//         state.isCancelled = internalState.isCancelled;
//       }
//       if (internalState.error) {
//         state.error = internalState.error;
//       }
//       if (internalState.result) {
//         state.result = mapSearchAddressBatchResult(internalState.result);
//       }
//       callback(state);
//     };
//     return this.internalPoller.onProgress(internalCallback);
//   }
//   public isDone(): boolean {
//     return this.internalPoller.isDone();
//   }
//   public stopPolling(): void {
//     this.internalPoller.stopPolling();
//   }
//   public isStopped(): boolean {
//     return this.internalPoller.isStopped();
//   }
//   public getOperationState(): PollOperationState<SearchBatchResult<SearchAddressResult>> {
//     const internalState = this.internalPoller.getOperationState();
//     const state: PollOperationState<SearchBatchResult<SearchAddressResult>> = {};
//     if (internalState.isStarted) {
//       state.isStarted = internalState.isStarted;
//     }
//     if (internalState.isCompleted) {
//       state.isCompleted = internalState.isCompleted;
//     }
//     if (internalState.isCancelled) {
//       state.isCancelled = internalState.isCancelled;
//     }
//     if (internalState.error) {
//       state.error = internalState.error;
//     }
//     if (internalState.result) {
//       state.result = mapSearchAddressBatchResult(internalState.result);
//     }
//     return state;
//   }
//   public getResult(): SearchBatchResult<SearchAddressResult> | undefined {
//     const result = this.internalPoller.getResult();
//     if (result) {
//       return mapSearchAddressBatchResult(result);
//     }
//     return result;
//   }
//   public toString(): string {
//     return this.internalPoller.toString();
//   }
// }

export class SearchBatchPoller<TSearchBatchResult, TInternalBatchResult>
  implements PollerLike<PollOperationState<TSearchBatchResult>, TSearchBatchResult> {
  constructor(
    private internalPoller: PollerLike<
      PollOperationState<TInternalBatchResult>,
      TInternalBatchResult
    >,
    private mapper: (res: TInternalBatchResult) => TSearchBatchResult
  ) {}
  public poll(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    return this.internalPoller.poll(options);
  }
  public cancelOperation(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    return this.internalPoller.cancelOperation(options);
  }

  public async pollUntilDone(): Promise<TSearchBatchResult> {
    const result = await this.internalPoller.pollUntilDone();
    return this.mapper(result);
  }
  public onProgress(
    callback: (state: PollOperationState<TSearchBatchResult>) => void
  ): CancelOnProgress {
    const internalCallback = (internalState: PollOperationState<TInternalBatchResult>): void => {
      const state: PollOperationState<TSearchBatchResult> = {};
      if (internalState.isStarted) {
        state.isStarted = internalState.isStarted;
      }
      if (internalState.isCompleted) {
        state.isCompleted = internalState.isCompleted;
      }
      if (internalState.isCancelled) {
        state.isCancelled = internalState.isCancelled;
      }
      if (internalState.error) {
        state.error = internalState.error;
      }
      if (internalState.result) {
        state.result = this.mapper(internalState.result);
      }
      callback(state);
    };
    return this.internalPoller.onProgress(internalCallback);
  }
  public isDone(): boolean {
    return this.internalPoller.isDone();
  }
  public stopPolling(): void {
    this.internalPoller.stopPolling();
  }
  public isStopped(): boolean {
    return this.internalPoller.isStopped();
  }
  public getOperationState(): PollOperationState<TSearchBatchResult> {
    const internalState = this.internalPoller.getOperationState();
    const state: PollOperationState<TSearchBatchResult> = {};
    if (internalState.isStarted) {
      state.isStarted = internalState.isStarted;
    }
    if (internalState.isCompleted) {
      state.isCompleted = internalState.isCompleted;
    }
    if (internalState.isCancelled) {
      state.isCancelled = internalState.isCancelled;
    }
    if (internalState.error) {
      state.error = internalState.error;
    }
    if (internalState.result) {
      state.result = this.mapper(internalState.result);
    }
    return state;
  }
  public getResult(): TSearchBatchResult | undefined {
    const result = this.internalPoller.getResult();
    if (result) {
      return this.mapper(result);
    }
    return undefined;
  }
  public toString(): string {
    return this.internalPoller.toString();
  }
}
