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
  GeoJsonLineString,
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
