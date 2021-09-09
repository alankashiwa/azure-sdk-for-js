/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Elevation } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { GeneratedClientContext } from "../generatedClientContext";
import {
  ResponseFormat,
  ElevationGetDataForPointsOptionalParams,
  ElevationGetDataForPointsResponse,
  CoordinatesPairAbbreviated,
  ElevationPostDataForPointsOptionalParams,
  ElevationPostDataForPointsResponse,
  ElevationGetDataForPolylineOptionalParams,
  ElevationGetDataForPolylineResponse,
  ElevationPostDataForPolylineOptionalParams,
  ElevationPostDataForPolylineResponse,
  ElevationGetDataForBoundingBoxOptionalParams,
  ElevationGetDataForBoundingBoxResponse
} from "../models";

/** Class containing Elevation operations. */
export class ElevationImpl implements Elevation {
  private readonly client: GeneratedClientContext;

  /**
   * Initialize a new instance of the class Elevation class.
   * @param client Reference to the service client
   */
  constructor(client: GeneratedClientContext) {
    this.client = client;
  }

  /**
   * **Applies to**: S1 pricing tier.
   *
   * The Get Data for Points API provides elevation data for one or more points.  A point is defined in
   * lat,long coordinate format.
   *
   *  Due to the URL character  length limit of 2048, it's not possible to pass more than 100 coordinates
   *  as a pipeline delimited string in a URL GET request. If you intend to pass  more than 100
   * coordinates as a pipeline delimited string, use the [POST Data
   *  For Points](https://docs.microsoft.com/en-us/rest/api/maps/elevation/postdataforpoints).
   * @param format Desired format of the response. Only `json` format is supported.
   * @param points The string representation of a list of points. A point is defined in lon/lat WGS84
   *               coordinate reference system format.  If multiple points are requested, each of the points in a list
   *               should be separated by the pipe ('|') character.  The maximum number of points that can be requested
   *               in a single request is 2,000. The resolution of the elevation  data will be the highest for a single
   *               point and will decrease if multiple points are spread further apart.
   * @param options The options parameters.
   */
  getDataForPoints(
    format: ResponseFormat,
    points: string[],
    options?: ElevationGetDataForPointsOptionalParams
  ): Promise<ElevationGetDataForPointsResponse> {
    return this.client.sendOperationRequest(
      { format, points, options },
      getDataForPointsOperationSpec
    );
  }

  /**
   * **Applies to**: S1 pricing tier.
   *
   * The Post Data for Points API provides elevation data for multiple points.  A point is defined
   * lon/lat coordinate format. Use the POST endpoint only  if you intend to pass multiple points in the
   * request. If you intend to pass  a single coordinate into the API, use the [GET Data For Points
   * API](https://docs.microsoft.com/en-us/rest/api/maps/elevation/getdataforpoints).
   * @param format Desired format of the response. Only `json` format is supported.
   * @param pointsRequestBody The string representation of a list of points. A point is defined in
   *                          lon/lat WGS84 coordinate reference system format.  Each points in a list should be separated by the
   *                          pipe ('|') character. The number of points that can be requested in  a POST request ranges from 2 to
   *                          2,000. The resolution of the elevation data will be the highest for a single point  and will
   *                          decrease if multiple points are spread further apart.
   * @param options The options parameters.
   */
  postDataForPoints(
    format: ResponseFormat,
    pointsRequestBody: CoordinatesPairAbbreviated[],
    options?: ElevationPostDataForPointsOptionalParams
  ): Promise<ElevationPostDataForPointsResponse> {
    return this.client.sendOperationRequest(
      { format, pointsRequestBody, options },
      postDataForPointsOperationSpec
    );
  }

  /**
   * **Applies to**: S1 pricing tier.
   *
   * The Get Data for Polyline API provides elevation data along a polyline.
   *
   *  A polyline is defined by  passing in between 2 and N endpoint coordinates separated by a pipe ('|')
   * character. In addition  to passing in endpoints, customers can specify the number of sample points
   * that will be used to divide  polyline into equally spaced segments. Elevation data at both start and
   * endpoints and equally spaced  points along the polyline will be returned.
   *
   *  A line between two endpoints is a straight Cartesian line, the  shortest line between those two
   * points in the coordinate reference system. Note that the point is  chosen based on Euclidean
   * distance and may markedly differ from the geodesic path along the curved  surface of the reference
   * ellipsoid.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param lines The string representation of a polyline path. A polyline is defined by endpoint
   *              coordinates,  with each endpoint separated by a pipe ('|') character. The polyline should be defined
   *              in the  following format: `[longitude_point1, latitude_point1 | longitude_point2, latitude_point2,
   *              ...,  longitude_pointN, latitude_pointN]`.
   *
   *  The longitude and latitude values refer to the World Geodetic  System (WGS84) coordinate reference
   *              system. The resolution of the data used to compute the  elevation depends on the distance between
   *              the endpoints.
   * @param options The options parameters.
   */
  getDataForPolyline(
    format: ResponseFormat,
    lines: string[],
    options?: ElevationGetDataForPolylineOptionalParams
  ): Promise<ElevationGetDataForPolylineResponse> {
    return this.client.sendOperationRequest(
      { format, lines, options },
      getDataForPolylineOperationSpec
    );
  }

  /**
   * **Applies to**: S1 pricing tier.
   *
   *  The Post Data for Polyline API provides elevation data along a polyline. A polyline is defined by
   * passing in between 2 and N endpoint coordinates separated by a pipe ('|') character. In addition  to
   * passing in endpoints, customers can specify the number of sample points that will be used to divide
   * polyline into equally spaced segments.
   *
   *  Elevation data at both start and end points and equally spaced  points along the polyline will be
   * returned. A line between two endpoints is a straight Cartesian line, the  shortest line between
   * those two points in the coordinate reference system. Note that the point is  chosen based on
   * Euclidean distance and may markedly differ from the geodesic path along the curved  surface of the
   * reference ellipsoid.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param linesRequestBody The string representation of a polyline path. A polyline is defined by
   *                         endpoint coordinates,  with each endpoint separated by a pipe ('|') character. The polyline should
   *                         be defined in the  following format: `[longitude_point1, latitude_point1 | longitude_point2,
   *                         latitude_point2, ...,  longitude_pointN, latitude_pointN]`. The longitude and latitude values refer
   *                         to the World Geodetic  System (WGS84) coordinate reference system. The resolution of the data used
   *                         to compute the  elevation will depend on the distance between the endpoints.
   * @param options The options parameters.
   */
  postDataForPolyline(
    format: ResponseFormat,
    linesRequestBody: CoordinatesPairAbbreviated[],
    options?: ElevationPostDataForPolylineOptionalParams
  ): Promise<ElevationPostDataForPolylineResponse> {
    return this.client.sendOperationRequest(
      { format, linesRequestBody, options },
      postDataForPolylineOperationSpec
    );
  }

  /**
   * **Applies to**: S1 pricing tier.
   *
   * The Get Data for Bounding Box API provides elevation data at equally spaced locations within a
   * bounding box. A bounding box is defined by the coordinates for two corners (southwest, northeast)
   * and then subsequently  divided into rows and columns.
   *
   *  Elevations are returned for the vertices of the grid created by the rows and  columns. Up to 2,000
   * elevations can be returned in a single request. The returned elevation values are ordered,  starting
   * at the southwest corner, and then proceeding west to east along the row. At the end of the row,  it
   * moves north to the next row, and repeats the process until it reaches the far northeast corner.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param bounds The string that represents the rectangular area of a bounding box. The bounds
   *               parameter is defined by the 4 bounding box coordinates, with WGS84 longitude and latitude of the
   *               southwest corner followed by  WGS84 longitude and latitude of the northeast corner. The string is
   *               presented in the following  format: `[SouthwestCorner_Longitude, SouthwestCorner_Latitude,
   *               NortheastCorner_Longitude,  NortheastCorner_Latitude]`.
   * @param rows Specifies the number of rows to use to divide the bounding box area into a grid. The
   *             number of vertices  in the grid should be less than 2,000.
   * @param columns Specifies the number of columns to use to divide the bounding box area into a grid.
   *                The number of vertices  in the grid should be less than 2,000.
   * @param options The options parameters.
   */
  getDataForBoundingBox(
    format: ResponseFormat,
    bounds: string[],
    rows: number,
    columns: number,
    options?: ElevationGetDataForBoundingBoxOptionalParams
  ): Promise<ElevationGetDataForBoundingBoxResponse> {
    return this.client.sendOperationRequest(
      { format, bounds, rows, columns, options },
      getDataForBoundingBoxOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getDataForPointsOperationSpec: coreClient.OperationSpec = {
  path: "/elevation/point/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PointsResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.points],
  urlParameters: [Parameters.$host, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const postDataForPointsOperationSpec: coreClient.OperationSpec = {
  path: "/elevation/point/{format}",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.PointsResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.pointsRequestBody,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.format],
  headerParameters: [
    Parameters.accept,
    Parameters.xMsClientId,
    Parameters.contentType
  ],
  mediaType: "json",
  serializer
};
const getDataForPolylineOperationSpec: coreClient.OperationSpec = {
  path: "/elevation/line/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LinesResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.lines,
    Parameters.samples
  ],
  urlParameters: [Parameters.$host, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const postDataForPolylineOperationSpec: coreClient.OperationSpec = {
  path: "/elevation/line/{format}",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.LinesResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.linesRequestBody,
  queryParameters: [Parameters.apiVersion, Parameters.samples],
  urlParameters: [Parameters.$host, Parameters.format],
  headerParameters: [
    Parameters.accept,
    Parameters.xMsClientId,
    Parameters.contentType
  ],
  mediaType: "json",
  serializer
};
const getDataForBoundingBoxOperationSpec: coreClient.OperationSpec = {
  path: "/elevation/lattice/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BoundingBoxResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.bounds,
    Parameters.rows,
    Parameters.columns
  ],
  urlParameters: [Parameters.$host, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
