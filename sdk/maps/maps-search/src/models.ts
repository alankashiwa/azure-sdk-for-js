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
  ReverseSearchAddressBatchProcessResult
} from "./generated/models";

/**
 * Bounding Box
 */
export interface BoundingBox {
  /** Top left coordinate of the bounding box */
  topLeft: Coordinate;
  /** Bottom right coordinate of the bounding box */
  bottomRight: Coordinate;
}

/**
 * Latitude/Longitude Pair
 */
export interface Coordinate {
  /** latitude */
  latitude: number;
  /** longitude */
  longitude: number;
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
