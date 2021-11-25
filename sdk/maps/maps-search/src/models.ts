// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  Polygon,
  PolygonResult,
  SearchIndexes,
  GeographicEntityType,
  LocalizedMapView,
  SearchAddressResult,
  SearchAddressResultItem,
  SearchSummary,
  QueryType,
  LatLongPairAbbreviated,
  SearchAddressResultType,
  PointOfInterest,
  Viewport,
  EntryPoint,
  AddressRanges,
  Address,
  DataSource,
  MatchType,
  GeometryIdentifier,
  EntryPointType,
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
  ReverseSearchAddressResult,
  RoadUseType,
  ReverseSearchCrossStreetAddressResult,
  ReverseSearchAddressResultItem,
  GeoJsonObjectUnion,
  SearchAddressBatchResult,
  BatchRequest,
  ReverseSearchAddressBatchProcessResult,
  BatchResult,
  ReverseSearchCrossStreetAddressResultItem,
  BatchRequestItem,
  BatchResultSummary
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
  public get topLeft() {
    return this._topLeft;
  }

  /** Bottom right coordinate of the bounding box */
  public get bottomRight() {
    return this._bottomRight;
  }

  /** Top latitude of the bounding box */
  public get top() {
    return this._topLeft.latitude;
  }

  /** Left longitude of the bounding box */
  public get left() {
    return this._topLeft.longitude;
  }

  /** Bottom latitude of the bounding box */
  public get bottom() {
    return this._bottomRight.latitude;
  }

  /** Right longitude of the bounding box */
  public get right() {
    return this._bottomRight.longitude;
  }

  /** Top right coordinate of the bounding box */
  public get topRight() {
    return new LatLong(this._topLeft.latitude, this._bottomRight.longitude);
  }

  /** Bottom left coordinate of the bounding box */
  public get bottomLeft() {
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
  public get latitude() {
    return this._latitude;
  }

  /** Longitude */
  public get longitude() {
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

export interface GeoJsonGeometryCollection {
  type: "GeometryCollection";
  geometries: GeoJsonPolygon[];
}

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
