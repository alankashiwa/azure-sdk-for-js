/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

/** This object is returned from a successful call to IP Address to country/region API */
export interface IpAddressToLocationResult {
  /**
   * The object containing the country/region information.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly countryRegion?: CountryRegion;
  /**
   * The IP Address of the request.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly ipAddress?: string;
}

/** The object containing the country/region information. */
export interface CountryRegion {
  /**
   * The IP Address's 2-character code [(ISO 3166-1)](https://www.iso.org/iso-3166-country-codes.html) of the country or region as assigned by IANA and regional internet authorities. Please note, IP address in ranges reserved for special purpose will return Null for country/region.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly isoCode?: string;
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
export interface GeolocationGetIPToLocationPreviewOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getIPToLocationPreview operation. */
export type GeolocationGetIPToLocationPreviewResponse = IpAddressToLocationResult;

/** Optional parameters. */
export interface GeolocationClientOptionalParams
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
