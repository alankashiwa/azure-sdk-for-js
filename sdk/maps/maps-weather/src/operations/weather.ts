/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Weather } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { WeatherClientContext } from "../weatherClientContext";
import {
  ResponseFormat,
  WeatherGetHourlyForecastOptionalParams,
  WeatherGetHourlyForecastResponse,
  WeatherGetMinuteForecastOptionalParams,
  WeatherGetMinuteForecastResponse,
  WeatherGetQuarterDayForecastOptionalParams,
  WeatherGetQuarterDayForecastResponse,
  WeatherGetCurrentConditionsOptionalParams,
  WeatherGetCurrentConditionsResponse,
  WeatherGetDailyForecastOptionalParams,
  WeatherGetDailyForecastResponse,
  WeatherGetWeatherAlongRouteOptionalParams,
  WeatherGetWeatherAlongRouteResponse,
  WeatherGetSevereWeatherAlertsOptionalParams,
  WeatherGetSevereWeatherAlertsResponse,
  WeatherGetDailyIndicesOptionalParams,
  WeatherGetDailyIndicesResponse
} from "../models";

/** Class representing a Weather. */
export class WeatherImpl implements Weather {
  private readonly client: WeatherClientContext;

  /**
   * Initialize a new instance of the class Weather class.
   * @param client Reference to the service client
   */
  constructor(client: WeatherClientContext) {
    this.client = client;
  }

  /**
   * **Get Hourly Forecast**
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * Request detailed weather forecast by the hour for the next 1, 12, 24 (1 day), 72 (3 days), 120 (5
   * days), and 240 hours (10 days) for the given the given coordinate location.  The API returns details
   * such as temperature, humidity, wind, precipitation, and ultraviolet (UV) index.
   *
   * In S0 you can request hourly forecast for the next 1, 12, 24 hours (1 day), and 72 hours (3 days).
   * In S1 you can also request hourly forecast for the next 120 (5 days) and 240 hours (10 days).
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates of the location for which hourly forecast information is requested. The
   *              applicable query is specified as a comma separated string composed by latitude followed by longitude
   *              e.g. "47.641268,-122.125679".
   * @param options The options parameters.
   */
  getHourlyForecast(
    format: ResponseFormat,
    query: string,
    options?: WeatherGetHourlyForecastOptionalParams
  ): Promise<WeatherGetHourlyForecastResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getHourlyForecastOperationSpec
    );
  }

  /**
   * **Get Minute Forecast**
   *
   *
   * **Applies to**: S1 pricing tier.
   *
   *
   * Get Minute Forecast service returns minute-by-minute forecasts for a given location for the next 120
   * minutes.  Users can request weather forecasts in the interval of 1, 5 and 15 minutes.  The response
   * will include details such as the type of precipitation (including rain, snow, or a mixture of both),
   * start time, and precipitation intensity value (dBZ).
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates of the location for which minute forecast information is requested. The
   *              applicable query is specified as a comma separated string composed by latitude followed by longitude
   *              e.g. "47.641268,-122.125679".
   * @param options The options parameters.
   */
  getMinuteForecast(
    format: ResponseFormat,
    query: string,
    options?: WeatherGetMinuteForecastOptionalParams
  ): Promise<WeatherGetMinuteForecastResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getMinuteForecastOperationSpec
    );
  }

  /**
   * **Get Quarter-Day Forecast**
   *
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * Service returns detailed weather forecast by quarter-day for the next 1, 5, 10, or 15 days for a
   * given location. Response data is presented by quarters of the day - morning, afternoon, evening, and
   * overnight. Details such as temperature, humidity, wind, precipitation, and UV index are returned.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates of the location for which quarter-day forecast information is requested.
   *              The applicable query is specified as a comma separated string composed by latitude followed by
   *              longitude e.g. "47.641268,-122.125679".
   * @param options The options parameters.
   */
  getQuarterDayForecast(
    format: ResponseFormat,
    query: string,
    options?: WeatherGetQuarterDayForecastOptionalParams
  ): Promise<WeatherGetQuarterDayForecastResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getQuarterDayForecastOperationSpec
    );
  }

  /**
   * **Get Current Conditions**
   *
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * Get Current Conditions service returns detailed current weather conditions such as precipitation,
   * temperature and wind for a given coordinate location. Also, observations from the past 6 or 24 hours
   * for a particular location can be retrieved. The basic information returned with the response include
   * details such as observation date and time, brief description of the weather conditions, weather
   * icon, precipitation indicator flags, and temperature. Additional details such as RealFeel™
   * Temperature and UV index are also returned.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates of the location for which current conditions information is requested. The
   *              applicable query is specified as a comma separated string composed by latitude followed by longitude
   *              e.g. "47.641268,-122.125679".
   * @param options The options parameters.
   */
  getCurrentConditions(
    format: ResponseFormat,
    query: string,
    options?: WeatherGetCurrentConditionsOptionalParams
  ): Promise<WeatherGetCurrentConditionsResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getCurrentConditionsOperationSpec
    );
  }

  /**
   * **Get Daily Forecast**
   *
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * The service returns detailed weather forecast such as temperature and wind by day for the next 1, 5,
   * 10, 15, 25, or 45 days for a given coordinate location.  The response include details such as
   * temperature, wind, precipitation, air quality, and UV index.
   *
   * In S0 you can request daily forecast for the next 1, 5, 10, and 15 days. In S1 you can also request
   * daily forecast for the next 25 days, and 45 days.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates of the location for which current conditions information is requested. The
   *              applicable query is specified as a comma separated string composed by latitude followed by longitude
   *              e.g. "47.641268,-122.125679".
   * @param options The options parameters.
   */
  getDailyForecast(
    format: ResponseFormat,
    query: string,
    options?: WeatherGetDailyForecastOptionalParams
  ): Promise<WeatherGetDailyForecastResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getDailyForecastOperationSpec
    );
  }

  /**
   * **Get Weather along route**
   *
   *
   *  **Applies to**: S1 pricing tier.
   *
   *  Weather along a route API returns hyper local (one kilometer or less), up-to-the-minute weather
   * nowcasts, weather hazard assessments, and notifications along a route described as a sequence of
   * waypoints.
   *  This includes a list of weather hazards affecting the waypoint or route, and the aggregated hazard
   * index for each waypoint might be used to paint each portion of a route according to how safe it is
   * for the driver. When submitting the waypoints, it is recommended to stay within, or close to, the
   * distance that can be traveled within 120-mins or shortly after. Data is updated every five minutes.
   *
   *  The service supplements Azure Maps [Route Service](https://docs.microsoft.com/rest/api/maps/route)
   * that allows you to first request a route between an origin and a destination and use that as an
   * input for Weather Along Route endpoint.
   *
   *  In addition, the service supports scenarios to generate weather notifications for waypoints that
   * experience an increase in intensity of a weather hazard. For example, if the vehicle is expected to
   * begin experiencing heavy rain as it reaches a waypoint, a weather notification for heavy rain will
   * be generated for that waypoint allowing the end product to display a heavy rain notification before
   * the driver reaches that waypoint.
   *  The trigger for when to display the notification for a waypoint could be based, for example, on a
   * [geofence](https://docs.microsoft.com/azure/azure-maps/tutorial-iot-hub-maps), or selectable
   * distance to the waypoint.
   *
   *  The API covers all regions of the planet except latitudes above Greenland and Antarctica.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates through which the route is calculated, separated by colon (:) and entered
   *              in chronological order. A minimum of two waypoints is required. A single API call may contain up to
   *              60 waypoints.
   *              A waypoint indicates location, ETA, and optional heading: latitude,longitude,ETA,heading, where
   *                * `Latitude` - Latitude coordinate in decimal degrees.
   *                * `Longitude` - Longitude coordinate in decimal degrees.
   *                * `ETA (estimated time of arrival)` - The number of minutes from the present time that it will
   *              take for the vehicle to reach the waypoint. Allowed range is from 0.0 to 120.0 minutes.
   *                * `Heading` - An optional value indicating the vehicle heading as it passes the waypoint.
   *              Expressed in clockwise degrees relative to true north. This is issued to calculate sun glare as a
   *              driving hazard. Allowed range is from 0.0 to 360.0 degrees. If not provided, a heading will
   *              automatically be derived based on the position of neighboring waypoints.
   *
   * It is recommended to stay within, or close to, the distance that can be traveled within 120-mins or
   *              shortly after. This way a more accurate assessment can be provided for the trip and prevent isolated
   *              events not being captured between waypoints.  Information can and should be updated along the route
   *              (especially for trips greater than 2 hours) to continuously pull new waypoints moving forward, but
   *              also to ensure that forecast information for content such as precipitation type and intensity is
   *              accurate as storms develop and dissipate over time.
   * @param options The options parameters.
   */
  getWeatherAlongRoute(
    format: ResponseFormat,
    query: string,
    options?: WeatherGetWeatherAlongRouteOptionalParams
  ): Promise<WeatherGetWeatherAlongRouteResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getWeatherAlongRouteOperationSpec
    );
  }

  /**
   * **Get Severe Weather Alerts**
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   * Severe weather phenomenon can significantly impact our everyday life and business operations. For
   * example, severe weather conditions such as tropical storms, high winds or flooding can close roads
   * and force logistics companies to reroute their fleet causing delays in reaching destinations and
   * breaking the cold chain of refrigerated food products.  Azure Maps Severe Weather Alerts API returns
   * the severe weather alerts that are available worldwide from both official Government Meteorological
   * Agencies and leading global to regional weather alert providers. The service can return details such
   * as alert type, category, level and detailed description about the active severe alerts for the
   * requested location, like hurricanes, thunderstorms, lightning, heat waves or forest fires.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates of the location for which severe weather alerts are requested. The
   *              applicable query is specified as a comma separated string composed by latitude followed by longitude
   *              e.g. "47.641268,-122.125679".
   * @param options The options parameters.
   */
  getSevereWeatherAlerts(
    format: ResponseFormat,
    query: string,
    options?: WeatherGetSevereWeatherAlertsOptionalParams
  ): Promise<WeatherGetSevereWeatherAlertsResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getSevereWeatherAlertsOperationSpec
    );
  }

  /**
   * **Get Daily Indices**
   *
   * **Applies to**: S0 and S1 pricing tiers.
   *
   * There may be times when you want to know if the weather conditions are optimal for a specific
   * activity, for example, for outdoor construction, indoor activities, running or farming including
   * soil moisture information.  Azure Maps Indices API returns index values that will guide end users to
   * plan future activities. For example, a health mobile application can notify users that today is good
   * weather for running or for other outdoors activities like for playing golf, and retail stores can
   * optimize their digital marketing campaigns based on predicted index values. The service returns in
   * daily indices values for current and next 5, 10 and 15 days starting from current day.
   * @param format Desired format of the response. Only `json` format is supported.
   * @param query Coordinates of the location for which daily indices are requested. The applicable query
   *              is specified as a comma separated string composed by latitude followed by longitude e.g.
   *              "47.641268,-122.125679".
   * @param options The options parameters.
   */
  getDailyIndices(
    format: ResponseFormat,
    query: string,
    options?: WeatherGetDailyIndicesOptionalParams
  ): Promise<WeatherGetDailyIndicesResponse> {
    return this.client.sendOperationRequest(
      { format, query, options },
      getDailyIndicesOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getHourlyForecastOperationSpec: coreClient.OperationSpec = {
  path: "/weather/forecast/hourly/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HourlyForecastResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.unit,
    Parameters.duration,
    Parameters.language
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getMinuteForecastOperationSpec: coreClient.OperationSpec = {
  path: "/weather/forecast/minute/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MinuteForecastResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.language,
    Parameters.interval
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getQuarterDayForecastOperationSpec: coreClient.OperationSpec = {
  path: "/weather/forecast/quarterDay/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuarterDayForecastResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.unit,
    Parameters.duration,
    Parameters.language
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getCurrentConditionsOperationSpec: coreClient.OperationSpec = {
  path: "/weather/currentConditions/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CurrentConditionsResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.unit,
    Parameters.duration,
    Parameters.language,
    Parameters.details
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getDailyForecastOperationSpec: coreClient.OperationSpec = {
  path: "/weather/forecast/daily/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DailyForecastResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.unit,
    Parameters.duration,
    Parameters.language
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getWeatherAlongRouteOperationSpec: coreClient.OperationSpec = {
  path: "/weather/route/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WeatherAlongRouteResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.language
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getSevereWeatherAlertsOperationSpec: coreClient.OperationSpec = {
  path: "/weather/severe/alerts/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SevereWeatherAlertsResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.language,
    Parameters.details
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getDailyIndicesOperationSpec: coreClient.OperationSpec = {
  path: "/weather/indices/daily/{format}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DailyIndicesResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.query,
    Parameters.duration,
    Parameters.language,
    Parameters.indexId,
    Parameters.indexGroupId
  ],
  urlParameters: [Parameters.geography, Parameters.format],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
