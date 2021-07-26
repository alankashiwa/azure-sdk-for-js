/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Timezone } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { TimezoneClientContext } from "../timezoneClientContext";
import {
  ResponseFormat,
  TimezoneGetTimezoneByIDOptionalParams,
  TimezoneGetTimezoneByIDResponse,
  TimezoneGetTimezoneByCoordinatesOptionalParams,
  TimezoneGetTimezoneByCoordinatesResponse,
  TimezoneGetTimezoneEnumWindowsOptionalParams,
  TimezoneGetTimezoneEnumWindowsResponse,
  TimezoneGetTimezoneEnumIanaOptionalParams,
  TimezoneGetTimezoneEnumIanaResponse,
  TimezoneGetTimezoneIanaVersionOptionalParams,
  TimezoneGetTimezoneIanaVersionResponse,
  TimezoneGetTimezoneWindowsToIanaOptionalParams,
  TimezoneGetTimezoneWindowsToIanaResponse
} from "../models";

/** Class representing a Timezone. */
export class TimezoneImpl implements Timezone {
  private readonly client: TimezoneClientContext;

  /**
   * Initialize a new instance of the class Timezone class.
   * @param client Reference to the service client
   */
  constructor(client: TimezoneClientContext) {
    this.client = client;
  }

  /**
   * __Time Zone by Id__
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * This API returns current, historical, and future time zone information for the specified IANA time
   * zone ID.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query The IANA time zone ID.
   * @param options The options parameters.
   */
  getTimezoneByID(
    format: ResponseFormat,
    query: string,
    options?: TimezoneGetTimezoneByIDOptionalParams
  ): Promise<TimezoneGetTimezoneByIDResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getTimezoneByIDOperationSpec
    );
  }

  /**
   * __Time Zone by Coordinates__
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * This API returns current, historical, and future time zone information for a specified
   * latitude-longitude pair. In addition, the API provides sunset and sunrise times for a given
   * location.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates of the point for which time zone information is requested. The applicable
   *              query is specified as a comma separated string composed by latitude followed by longitude e.g.
   *              "47.641268,-122.125679".
   * @param options The options parameters.
   */
  getTimezoneByCoordinates(
    format: ResponseFormat,
    query: string,
    options?: TimezoneGetTimezoneByCoordinatesOptionalParams
  ): Promise<TimezoneGetTimezoneByCoordinatesResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getTimezoneByCoordinatesOperationSpec
    );
  }

  /**
   * __Enumerate Windows Time Zones__
   *
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * This API returns a full list of Windows Time Zone IDs.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param options The options parameters.
   */
  getTimezoneEnumWindows(
    format: ResponseFormat,
    options?: TimezoneGetTimezoneEnumWindowsOptionalParams
  ): Promise<TimezoneGetTimezoneEnumWindowsResponse> {
    return this.client.sendOperationRequest(
      { format, options },
      getTimezoneEnumWindowsOperationSpec
    );
  }

  /**
   * __Enumerate IANA Time Zones__
   *
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * This API returns a full list of IANA time zone IDs. Updates to the IANA service will be reflected in
   * the system within one day.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param options The options parameters.
   */
  getTimezoneEnumIana(
    format: ResponseFormat,
    options?: TimezoneGetTimezoneEnumIanaOptionalParams
  ): Promise<TimezoneGetTimezoneEnumIanaResponse> {
    return this.client.sendOperationRequest(
      { format, options },
      getTimezoneEnumIanaOperationSpec
    );
  }

  /**
   * __Time Zone IANA Version__
   *
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * This API returns the current IANA version number.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param options The options parameters.
   */
  getTimezoneIanaVersion(
    format: ResponseFormat,
    options?: TimezoneGetTimezoneIanaVersionOptionalParams
  ): Promise<TimezoneGetTimezoneIanaVersionResponse> {
    return this.client.sendOperationRequest(
      { format, options },
      getTimezoneIanaVersionOperationSpec
    );
  }

  /**
   * __Windows to IANA Time Zone__
   *
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * This API returns a corresponding IANA ID, given a valid Windows Time Zone ID. Multiple IANA IDs may
   * be returned for a single Windows ID. It is possible to narrow these results by adding an optional
   * territory parameter.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query The Windows time zone ID.
   * @param options The options parameters.
   */
  getTimezoneWindowsToIana(
    format: ResponseFormat,
    query: string,
    options?: TimezoneGetTimezoneWindowsToIanaOptionalParams
  ): Promise<TimezoneGetTimezoneWindowsToIanaResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getTimezoneWindowsToIanaOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getTimezoneByIDOperationSpec: coreClient.OperationSpec = {
  path: "/timezone/byId/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TimezoneByIdResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.options,
    Parameters.timeStamp,
    Parameters.transitionsFrom,
    Parameters.transitionsYears,
    Parameters.query
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [
    Parameters.accept,
    Parameters.xMsClientId,
    Parameters.acceptLanguage
  ],
  serializer
};
const getTimezoneByCoordinatesOperationSpec: coreClient.OperationSpec = {
  path: "/timezone/byCoordinates/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TimezoneByCoordinatesResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.options,
    Parameters.timeStamp,
    Parameters.transitionsFrom,
    Parameters.transitionsYears,
    Parameters.query
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [
    Parameters.accept,
    Parameters.xMsClientId,
    Parameters.acceptLanguage
  ],
  serializer
};
const getTimezoneEnumWindowsOperationSpec: coreClient.OperationSpec = {
  path: "/timezone/enumWindows/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TimezoneEnumWindow" }
          }
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getTimezoneEnumIanaOperationSpec: coreClient.OperationSpec = {
  path: "/timezone/enumIana/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "IanaId" } }
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getTimezoneIanaVersionOperationSpec: coreClient.OperationSpec = {
  path: "/timezone/ianaVersion/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TimezoneIanaVersionResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getTimezoneWindowsToIanaOperationSpec: coreClient.OperationSpec = {
  path: "/timezone/windowsToIana/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "IanaId" } }
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.territory
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
