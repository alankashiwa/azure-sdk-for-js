/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

/** This object is returned from a successful Timezone By ID call */
export interface TimezoneByIdResult {
  /**
   * Version property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly version?: string;
  /**
   * Reference Utc Timestamp property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly referenceUtcTimestamp?: Date;
  /**
   * TimeZoneById array
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly timeZones?: TimezoneById[];
}

export interface TimezoneById {
  /**
   * Id property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * An array of time zone ID aliases.  Only returned when [options]=*zoneinfo* or *all*.
   *
   * Note: may be null.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly aliases?: string[];
  /**
   * An array of country records. Only returned when [options]=*zoneinfo* or *all*.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly countries?: CountryRecord[];
  /** Timezone names object. */
  names?: TimezoneNames;
  /**
   * Details in effect at the local time.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly referenceTime?: ReferenceTimeById;
  /**
   * Representative point property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly representativePoint?: RepresentativePoint;
  /**
   * Time zone DST transitions from [transitionsFrom] until timestamp + 1 year.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly timeTransitions?: TimeTransition[];
}

/** A country record. */
export interface CountryRecord {
  /**
   * Country Name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * ISO-3166 2-letter country code for the country.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly code?: string;
}

/** Timezone names object. */
export interface TimezoneNames {
  /**
   * The ISO 639-1 language code of the Names
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly iSO6391LanguageCode?: string;
  /**
   * Generic Name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly generic?: string;
  /**
   * Standard Name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly standard?: string;
  /**
   * Daylight Name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly daylight?: string;
}

/** Details in effect at the local time. */
export interface ReferenceTimeById {
  /**
   * Time zone name in effect at the reference timestamp (i.e. PST or PDT depending whether Daylight Savings Time is in effect).
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tag?: string;
  /**
   * UTC offset in effect at the `ReferenceUTCTimestamp`.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly standardOffset?: string;
  /**
   * Time saving in minutes in effect at the `ReferenceUTCTimestamp`.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly daylightSavings?: string;
  /**
   * Current wall time at the given time zone as shown in the `Tag` property.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly wallTime?: string;
  /**
   * The year this POSIX string is valid for. Note: A POSIX string will only be valid in the given year.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly posixTzValidYear?: number;
  /**
   * POSIX string used to set the time zone environment variable.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly posixTz?: string;
}

/** Representative point property */
export interface RepresentativePoint {
  /**
   * Latitude property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly latitude?: number;
  /**
   * Longitude property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly longitude?: number;
}

export interface TimeTransition {
  /**
   * Tag property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tag?: string;
  /**
   * StandardOffset property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly standardOffset?: string;
  /**
   * DaylightSavings property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly daylightSavings?: string;
  /**
   * Start date, start time for this transition period
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly utcStart?: Date;
  /**
   * End date, end time for this transition period
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly utcEnd?: Date;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

/** The error detail. */
export interface ErrorDetail {
  /**
   * The error code.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly code?: string;
  /**
   * The error message.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly message?: string;
  /**
   * The error target.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly target?: string;
  /**
   * The error details.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly details?: ErrorDetail[];
  /**
   * The error additional info.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /**
   * The additional info type.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /**
   * The additional info.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly info?: Record<string, unknown>;
}

/** This object is returned from a successful Timezone By Coordinates call */
export interface TimezoneByCoordinatesResult {
  /**
   * Version property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly version?: string;
  /**
   * Reference Utc Timestamp property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly referenceUtcTimestamp?: Date;
  /**
   * TimeZoneByCoordinates array
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly timeZones?: TimeZoneByCoordinates[];
}

export interface TimeZoneByCoordinates {
  /**
   * Id property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * An array of time zone ID aliases.  Only returned when [options]=*zoneinfo* or *all*.
   *
   * Note: may be null.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly aliases?: string[];
  /**
   * An array of country records. Only returned when [options]=*zoneinfo* or *all*.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly countries?: CountryRecord[];
  /** Timezone names object. */
  names?: TimezoneNames;
  /**
   * Details in effect at the local time.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly referenceTime?: ReferenceTimeByCoordinates;
  /**
   * Representative point property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly representativePoint?: RepresentativePoint;
  /**
   * Time zone DST transitions from [transitionsFrom] until timestamp + 1 year.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly timeTransitions?: TimeTransition[];
}

/** Details in effect at the local time. */
export interface ReferenceTimeByCoordinates {
  /**
   * Time zone name in effect at the reference timestamp (i.e. PST or PDT depending whether Daylight Savings Time is in effect).
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tag?: string;
  /**
   * UTC offset in effect at the `ReferenceUTCTimestamp`.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly standardOffset?: string;
  /**
   * Time saving in minutes in effect at the `ReferenceUTCTimestamp`.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly daylightSavings?: string;
  /**
   * Current wall time at the given time zone as shown in the `Tag` property.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly wallTime?: string;
  /**
   * The year this POSIX string is valid for. Note: A POSIX string will only be valid in the given year.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly posixTzValidYear?: number;
  /**
   * POSIX string used to set the time zone environment variable.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly posixTz?: string;
  /**
   * Sunrise at the given time zone as shown in the `Tag` property.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sunrise?: string;
  /**
   * Sunset at the given time zone as shown in the `Tag` property.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sunset?: string;
}

export interface TimezoneEnumWindow {
  /**
   * Windows Id property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly windowsId?: string;
  /**
   * Territory property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly territory?: string;
  /** IanaIds array */
  ianaIds?: string[];
}

export interface IanaId {
  /**
   * Id property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * IsAlias property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly isAlias?: boolean;
  /**
   * AliasOf property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly aliasOf?: string;
  /**
   * HasZone1970Location property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly hasZone1970Location?: boolean;
}

/** This object is returned from a successful Timezone IANA Version call */
export interface TimezoneIanaVersionResult {
  /**
   * Version property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly version?: string;
}

/** Known values of {@link Geography} that the service accepts. */
export enum KnownGeography {
  Us = "us",
  Eu = "eu"
}

/**
 * Defines values for Geography. \
 * {@link KnownGeography} can be used interchangeably with Geography,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **us** \
 * **eu**
 */
export type Geography = string;

/** Known values of {@link TimezoneOptions} that the service accepts. */
export enum KnownTimezoneOptions {
  /** Do not include zoneinfo or transitions in the result. */
  None = "none",
  /** Include additional time zone info in the result. */
  ZoneInfo = "zoneInfo",
  /** Include transition information in the result (The number of transitions is currently capped at 250). */
  Transitions = "transitions",
  /** Include both zoneinfo and transitions in the result. */
  All = "all"
}

/**
 * Defines values for TimezoneOptions. \
 * {@link KnownTimezoneOptions} can be used interchangeably with TimezoneOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none**: Do not include zoneinfo or transitions in the result. \
 * **zoneInfo**: Include additional time zone info in the result. \
 * **transitions**: Include transition information in the result (The number of transitions is currently capped at 250). \
 * **all**: Include both zoneinfo and transitions in the result.
 */
export type TimezoneOptions = string;

/** Known values of {@link ResponseFormat} that the service accepts. */
export enum KnownResponseFormat {
  /** [The JavaScript Object Notation Data Interchange Format](https://tools.ietf.org/html/rfc8259) */
  Json = "json"
}

/**
 * Defines values for ResponseFormat. \
 * {@link KnownResponseFormat} can be used interchangeably with ResponseFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **json**: [The JavaScript Object Notation Data Interchange Format](https:\/\/tools.ietf.org\/html\/rfc8259)
 */
export type ResponseFormat = string;

/** Known values of {@link GeographicResourceLocation} that the service accepts. */
export enum KnownGeographicResourceLocation {
  /** Used to access an Azure Maps Creator resource in the United States */
  Us = "us",
  /** Used to access an Azure Maps Creator resource in Europe */
  Eu = "eu"
}

/**
 * Defines values for GeographicResourceLocation. \
 * {@link KnownGeographicResourceLocation} can be used interchangeably with GeographicResourceLocation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **us**: Used to access an Azure Maps Creator resource in the United States \
 * **eu**: Used to access an Azure Maps Creator resource in Europe
 */
export type GeographicResourceLocation = string;

/** Optional parameters. */
export interface TimezoneGetTimezoneByIDOptionalParams
  extends coreClient.OperationOptions {
  /** Specifies the language code in which the timezone names should be returned. If no language code is provided, the response will be in "EN". Please refer to [Supported Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details. */
  acceptLanguage?: string;
  /** Alternatively, use alias "o". Options available for types of information returned in the result. */
  options?: TimezoneOptions;
  /** Alternatively, use alias "stamp", or "s". Reference time, if omitted, the API will use the machine time serving the request. */
  timeStamp?: Date;
  /** Alternatively, use alias "tf". The start date from which daylight savings time (DST) transitions are requested, only applies when "options" = all or "options" = transitions. */
  transitionsFrom?: Date;
  /** Alternatively, use alias "ty". The number of years from "transitionsFrom" for which DST transitions are requested, only applies when "options" = all or "options" = transitions. */
  transitionsYears?: number;
}

/** Contains response data for the getTimezoneByID operation. */
export type TimezoneGetTimezoneByIDResponse = TimezoneByIdResult;

/** Optional parameters. */
export interface TimezoneGetTimezoneByCoordinatesOptionalParams
  extends coreClient.OperationOptions {
  /** Specifies the language code in which the timezone names should be returned. If no language code is provided, the response will be in "EN". Please refer to [Supported Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details. */
  acceptLanguage?: string;
  /** Alternatively, use alias "o". Options available for types of information returned in the result. */
  options?: TimezoneOptions;
  /** Alternatively, use alias "stamp", or "s". Reference time, if omitted, the API will use the machine time serving the request. */
  timeStamp?: Date;
  /** Alternatively, use alias "tf". The start date from which daylight savings time (DST) transitions are requested, only applies when "options" = all or "options" = transitions. */
  transitionsFrom?: Date;
  /** Alternatively, use alias "ty". The number of years from "transitionsFrom" for which DST transitions are requested, only applies when "options" = all or "options" = transitions. */
  transitionsYears?: number;
}

/** Contains response data for the getTimezoneByCoordinates operation. */
export type TimezoneGetTimezoneByCoordinatesResponse = TimezoneByCoordinatesResult;

/** Optional parameters. */
export interface TimezoneGetTimezoneEnumWindowsOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getTimezoneEnumWindows operation. */
export type TimezoneGetTimezoneEnumWindowsResponse = TimezoneEnumWindow[];

/** Optional parameters. */
export interface TimezoneGetTimezoneEnumIanaOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getTimezoneEnumIana operation. */
export type TimezoneGetTimezoneEnumIanaResponse = IanaId[];

/** Optional parameters. */
export interface TimezoneGetTimezoneIanaVersionOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getTimezoneIanaVersion operation. */
export type TimezoneGetTimezoneIanaVersionResponse = TimezoneIanaVersionResult;

/** Optional parameters. */
export interface TimezoneGetTimezoneWindowsToIanaOptionalParams
  extends coreClient.OperationOptions {
  /** Windows Time Zone territory code. */
  territory?: string;
}

/** Contains response data for the getTimezoneWindowsToIana operation. */
export type TimezoneGetTimezoneWindowsToIanaResponse = IanaId[];

/** Optional parameters. */
export interface TimezoneClientOptionalParams
  extends coreClient.ServiceClientOptions {
  /** This parameter specifies where the Azure Maps Creator resource is located.  Valid values are us and eu. */
  geography?: Geography;
  /** Specifies which account is intended for usage in conjunction with the Azure AD security model.  It represents a unique ID for the Azure Maps account and can be retrieved from the Azure Maps management  plane Account API. To use Azure AD security in Azure Maps see the following [articles](https://aka.ms/amauthdetails) for guidance. */
  xMsClientId?: string;
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
