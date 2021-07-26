/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Data } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { CreatorClientContext } from "../creatorClientContext";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl, shouldDeserializeLro } from "../lroImpl";
import {
  UploadDataFormat,
  DataUploadPreview$binaryOptionalParams,
  DataUploadPreview$jsonOptionalParams,
  DataUploadPreviewResponse,
  DataListPreviewOptionalParams,
  DataListPreviewResponse,
  DataUpdatePreviewOptionalParams,
  DataUpdatePreviewResponse,
  DataDownloadPreviewOptionalParams,
  DataDownloadPreviewResponse,
  DataDeletePreviewOptionalParams,
  DataGetOperationPreviewOptionalParams,
  DataGetOperationPreviewResponse
} from "../models";

/** Class representing a Data. */
export class DataImpl implements Data {
  private readonly client: CreatorClientContext;

  /**
   * Initialize a new instance of the class Data class.
   * @param client Reference to the service client
   */
  constructor(client: CreatorClientContext) {
    this.client = client;
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * The Data Upload API allows the caller to upload data content to the Azure Maps service.
   * You can use this API in a scenario like uploading a collection of Geofences in `GeoJSON`
   * format, for use in our [Azure Maps Geofencing
   * Service](https://docs.microsoft.com/rest/api/maps/spatial).
   *
   * ## Submit Upload Request
   *
   * To upload your content you will use a `POST` request. The request body will contain the data to
   * upload. The
   * `dataFormat` query parameter will contain the format for the data, the `dataSharingLevel` query
   * parameter
   * can contain the sharing level for the data. The `Content-Type` header will be set to the content
   * type of the
   * data.
   *
   * For example, to upload a collection of geofences  in `GeoJSON` format, set the request body to the
   * geofence
   * content. Set the `dataFormat` query parameter to _geojson_, and set the `Content-Type` header to
   * either one
   * of the following media types:
   *
   * - `application/json`
   * - `application/vnd.geo+json`
   * - `application/octet-stream`
   *
   * Here's a sample request body for uploading a simple Geofence represented as a circle geometry using
   * a center
   * point and a radius. The sample below is in `GeoJSON`:
   *
   * ```json
   * {
   *     "type": "FeatureCollection",
   *     "features": [{
   *         "type": "Feature",
   *         "geometry": {
   *             "type": "Point",
   *             "coordinates": [-122.126986, 47.639754]
   *         },
   *         "properties": {
   *             "geometryId": "001",
   *             "radius": 500
   *         }
   *     }]
   * }
   * ```
   *
   * The Data Upload API performs a
   * [long-running request](https://aka.ms/am-creator-lrt-v2).
   *
   * ## Data Upload Limits
   *
   * Please, be aware that currently every Azure Maps account has a [data storage
   * limit](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-maps-limits).
   *
   * Once the storage limit is reached, all the new upload API calls will return a `409 Conflict` http
   * error response.
   * You can always use the [Data Delete
   * API](https://docs.microsoft.com/rest/api/maps/data%20v2/deletepreview) to
   * delete old/unused content and create space for new uploads.
   * @param uploadDataFormat Data format of the content being uploaded.
   * @param contentType Upload file type
   * @param uploadContent The content to upload.
   * @param options The options parameters.
   */
  beginUploadPreview(
    uploadDataFormat: UploadDataFormat,
    contentType: "application/octet-stream",
    uploadContent: coreRestPipeline.RequestBodyType,
    options?: DataUploadPreview$binaryOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DataUploadPreviewResponse>,
      DataUploadPreviewResponse
    >
  >;
  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * The Data Upload API allows the caller to upload data content to the Azure Maps service.
   * You can use this API in a scenario like uploading a collection of Geofences in `GeoJSON`
   * format, for use in our [Azure Maps Geofencing
   * Service](https://docs.microsoft.com/rest/api/maps/spatial).
   *
   * ## Submit Upload Request
   *
   * To upload your content you will use a `POST` request. The request body will contain the data to
   * upload. The
   * `dataFormat` query parameter will contain the format for the data, the `dataSharingLevel` query
   * parameter
   * can contain the sharing level for the data. The `Content-Type` header will be set to the content
   * type of the
   * data.
   *
   * For example, to upload a collection of geofences  in `GeoJSON` format, set the request body to the
   * geofence
   * content. Set the `dataFormat` query parameter to _geojson_, and set the `Content-Type` header to
   * either one
   * of the following media types:
   *
   * - `application/json`
   * - `application/vnd.geo+json`
   * - `application/octet-stream`
   *
   * Here's a sample request body for uploading a simple Geofence represented as a circle geometry using
   * a center
   * point and a radius. The sample below is in `GeoJSON`:
   *
   * ```json
   * {
   *     "type": "FeatureCollection",
   *     "features": [{
   *         "type": "Feature",
   *         "geometry": {
   *             "type": "Point",
   *             "coordinates": [-122.126986, 47.639754]
   *         },
   *         "properties": {
   *             "geometryId": "001",
   *             "radius": 500
   *         }
   *     }]
   * }
   * ```
   *
   * The Data Upload API performs a
   * [long-running request](https://aka.ms/am-creator-lrt-v2).
   *
   * ## Data Upload Limits
   *
   * Please, be aware that currently every Azure Maps account has a [data storage
   * limit](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-maps-limits).
   *
   * Once the storage limit is reached, all the new upload API calls will return a `409 Conflict` http
   * error response.
   * You can always use the [Data Delete
   * API](https://docs.microsoft.com/rest/api/maps/data%20v2/deletepreview) to
   * delete old/unused content and create space for new uploads.
   * @param uploadDataFormat Data format of the content being uploaded.
   * @param contentType Body Parameter content-type
   * @param uploadContent The content to upload.
   * @param options The options parameters.
   */
  beginUploadPreview(
    uploadDataFormat: UploadDataFormat,
    contentType: "application/json",
    uploadContent: Record<string, unknown>,
    options?: DataUploadPreview$jsonOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DataUploadPreviewResponse>,
      DataUploadPreviewResponse
    >
  >;
  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * The Data Upload API allows the caller to upload data content to the Azure Maps service.
   * You can use this API in a scenario like uploading a collection of Geofences in `GeoJSON`
   * format, for use in our [Azure Maps Geofencing
   * Service](https://docs.microsoft.com/rest/api/maps/spatial).
   *
   * ## Submit Upload Request
   *
   * To upload your content you will use a `POST` request. The request body will contain the data to
   * upload. The
   * `dataFormat` query parameter will contain the format for the data, the `dataSharingLevel` query
   * parameter
   * can contain the sharing level for the data. The `Content-Type` header will be set to the content
   * type of the
   * data.
   *
   * For example, to upload a collection of geofences  in `GeoJSON` format, set the request body to the
   * geofence
   * content. Set the `dataFormat` query parameter to _geojson_, and set the `Content-Type` header to
   * either one
   * of the following media types:
   *
   * - `application/json`
   * - `application/vnd.geo+json`
   * - `application/octet-stream`
   *
   * Here's a sample request body for uploading a simple Geofence represented as a circle geometry using
   * a center
   * point and a radius. The sample below is in `GeoJSON`:
   *
   * ```json
   * {
   *     "type": "FeatureCollection",
   *     "features": [{
   *         "type": "Feature",
   *         "geometry": {
   *             "type": "Point",
   *             "coordinates": [-122.126986, 47.639754]
   *         },
   *         "properties": {
   *             "geometryId": "001",
   *             "radius": 500
   *         }
   *     }]
   * }
   * ```
   *
   * The Data Upload API performs a
   * [long-running request](https://aka.ms/am-creator-lrt-v2).
   *
   * ## Data Upload Limits
   *
   * Please, be aware that currently every Azure Maps account has a [data storage
   * limit](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-maps-limits).
   *
   * Once the storage limit is reached, all the new upload API calls will return a `409 Conflict` http
   * error response.
   * You can always use the [Data Delete
   * API](https://docs.microsoft.com/rest/api/maps/data%20v2/deletepreview) to
   * delete old/unused content and create space for new uploads.
   * @param args Includes all the parameters for this operation.
   */
  async beginUploadPreview(
    ...args:
      | [
          UploadDataFormat,
          "application/octet-stream",
          coreRestPipeline.RequestBodyType,
          DataUploadPreview$binaryOptionalParams?
        ]
      | [
          UploadDataFormat,
          "application/json",
          Record<string, unknown>,
          DataUploadPreview$jsonOptionalParams?
        ]
  ): Promise<
    PollerLike<
      PollOperationState<DataUploadPreviewResponse>,
      DataUploadPreviewResponse
    >
  > {
    let operationSpec: coreClient.OperationSpec;
    let operationArguments: coreClient.OperationArguments;
    let options;
    if (args[1] === "application/octet-stream") {
      operationSpec = uploadPreview$binaryOperationSpec;
      operationArguments = {
        uploadDataFormat: args[0],
        contentType: args[1],
        uploadContent: args[2],
        options: args[3]
      };
      options = args[3];
    } else if (args[1] === "application/json") {
      operationSpec = uploadPreview$jsonOperationSpec;
      operationArguments = {
        uploadDataFormat: args[0],
        contentType: args[1],
        uploadContent: args[2],
        options: args[3]
      };
      options = args[3];
    } else {
      throw new TypeError(
        `"contentType" must be a valid value but instead was "${args[1]}".`
      );
    }
    operationArguments.options = this.getOperationOptions(options, "location");
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DataUploadPreviewResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(sendOperation, operationArguments, operationSpec);
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * The Data Upload API allows the caller to upload data content to the Azure Maps service.
   * You can use this API in a scenario like uploading a collection of Geofences in `GeoJSON`
   * format, for use in our [Azure Maps Geofencing
   * Service](https://docs.microsoft.com/rest/api/maps/spatial).
   *
   * ## Submit Upload Request
   *
   * To upload your content you will use a `POST` request. The request body will contain the data to
   * upload. The
   * `dataFormat` query parameter will contain the format for the data, the `dataSharingLevel` query
   * parameter
   * can contain the sharing level for the data. The `Content-Type` header will be set to the content
   * type of the
   * data.
   *
   * For example, to upload a collection of geofences  in `GeoJSON` format, set the request body to the
   * geofence
   * content. Set the `dataFormat` query parameter to _geojson_, and set the `Content-Type` header to
   * either one
   * of the following media types:
   *
   * - `application/json`
   * - `application/vnd.geo+json`
   * - `application/octet-stream`
   *
   * Here's a sample request body for uploading a simple Geofence represented as a circle geometry using
   * a center
   * point and a radius. The sample below is in `GeoJSON`:
   *
   * ```json
   * {
   *     "type": "FeatureCollection",
   *     "features": [{
   *         "type": "Feature",
   *         "geometry": {
   *             "type": "Point",
   *             "coordinates": [-122.126986, 47.639754]
   *         },
   *         "properties": {
   *             "geometryId": "001",
   *             "radius": 500
   *         }
   *     }]
   * }
   * ```
   *
   * The Data Upload API performs a
   * [long-running request](https://aka.ms/am-creator-lrt-v2).
   *
   * ## Data Upload Limits
   *
   * Please, be aware that currently every Azure Maps account has a [data storage
   * limit](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-maps-limits).
   *
   * Once the storage limit is reached, all the new upload API calls will return a `409 Conflict` http
   * error response.
   * You can always use the [Data Delete
   * API](https://docs.microsoft.com/rest/api/maps/data%20v2/deletepreview) to
   * delete old/unused content and create space for new uploads.
   * @param args Includes all the parameters for this operation.
   */
  async beginUploadPreviewAndWait(
    ...args:
      | [
          UploadDataFormat,
          "application/octet-stream",
          coreRestPipeline.RequestBodyType,
          DataUploadPreview$binaryOptionalParams?
        ]
      | [
          UploadDataFormat,
          "application/json",
          Record<string, unknown>,
          DataUploadPreview$jsonOptionalParams?
        ]
  ): Promise<DataUploadPreviewResponse> {
    if (args[1] === "application/octet-stream") {
      const poller = await this.beginUploadPreview(...args);
      return poller.pollUntilDone();
    } else if (args[1] === "application/json") {
      const poller = await this.beginUploadPreview(...args);
      return poller.pollUntilDone();
    }
    throw new Error("Impossible case");
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * This API allows the caller to fetch a list of all content uploaded previously using the [Data Upload
   * API](https://docs.microsoft.com/en-us/rest/api/maps/data%20v2/uploadpreview).
   *
   *
   * ### Submit List Request
   *
   * To list all your map data content you will issue a `GET` request with no additional parameters.
   *
   *
   * ### List Data Response
   *
   * The Data List API returns the complete list of all data in `json` format. The response contains the
   * following details for each data resource:
   *
   *   > udid - The unique data id for the data resource.
   *
   *   > location - The location of the data resource. Execute a HTTP `GET` on this location to download
   * the data.
   *
   *
   * Here's a sample response returning the `udid` and `location` of 3 data resources:
   *
   * <br>
   *
   * ```json
   * {
   *     "mapDataList":
   *     [
   *         {
   *             "udid": "9a1288fa-1858-4a3b-b68d-13a8j5af7d7c",
   *             "location":
   * "https://us.atlas.microsoft.com/mapData/9a1288fa-1858-4a3b-b68d-13a8j5af7d7c?api-version=1.0",
   *             "sizeInBytes": 29920,
   *             "uploadStatus": "Completed"
   *         },
   *         {
   *             "udid": "8b1288fa-1958-4a2b-b68e-13a7i5af7d7c",
   *             "location":
   * "https://us.atlas.microsoft.com/mapData/8b1288fa-1958-4a2b-b68e-13a7i5af7d7c?api-version=1.0",
   *             "sizeInBytes": 1339,
   *             "uploadStatus": "Completed"
   *         },
   *         {
   *             "udid": "7c1288fa-2058-4a1b-b68f-13a6h5af7d7c",
   *             "location":
   * "https://us.atlas.microsoft.com/mapData/7c1288fa-2058-4a1b-b68f-13a6h5af7d7c?api-version=1.0",
   *             "sizeInBytes": 1650,
   *             "uploadStatus": "Pending"
   *         }]
   * }
   * ```
   *
   * <br>
   * @param options The options parameters.
   */
  listPreview(
    options?: DataListPreviewOptionalParams
  ): Promise<DataListPreviewResponse> {
    return this.client.sendOperationRequest(
      { options },
      listPreviewOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * The Data Update API allows the caller to update a previously uploaded data content.
   *
   * You can use this API in a scenario like adding or removing geofences to or from an existing
   * collection of geofences.
   * Geofences are uploaded using the [Data Upload
   * API](https://docs.microsoft.com/rest/api/maps/data%20v2/uploadpreview), for
   * use in the [Azure Maps Geofencing Service](https://docs.microsoft.com/rest/api/maps/spatial).
   *
   * Please note that the Update API will *replace* and *override* the existing data content.
   *
   * ## Submit Update Request
   *
   * To update your content you will use a `PUT` request. The request body will contain the new data that
   * will replace
   * the existing data. The `Content-Type` header will be set to the content type of the data, and the
   * path will contain
   * the `udid` of the data to be update.
   *
   * For example, to update a collection of geofences that were previously uploaded using the Upload API,
   * place the new
   * geofence content in the request body. Set the `udid` parameter in the path to the `udid` of the data
   * received
   * previously in the upload API response. And set the `Content-Type` header to one of the following
   * media types:
   *
   * - `application/json`
   * - `application/vnd.geo+json`
   * - `application/octet-stream`
   *
   * Here's a sample request body for updating a simple Geofence. It's represented as a circle geometry
   * using a center
   * point and a radius. The sample below is in `GeoJSON`:
   *
   * ```json
   * {
   *     "type": "FeatureCollection",
   *     "features": [{
   *         "type": "Feature",
   *         "geometry": {
   *             "type": "Point",
   *             "coordinates": [-122.126986, 47.639754]
   *         },
   *         "properties": {
   *             "geometryId": "001",
   *             "radius": 500
   *         }
   *     }]
   * }
   * ```
   *
   * The previously uploaded geofence had a radius of 100m. The above request will update it to 500m.
   *
   * The Data Update API performs a
   * [long-running request](https://aka.ms/am-creator-lrt-v2).
   *
   * ## Data Update Limits
   *
   * Please, be aware that currently every Azure Maps account has a [data storage
   * limit](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-maps-limits).
   *
   * Once the storage limit is reached, all the new upload API calls will return a `409 Conflict` http
   * error response.
   * You can always use the [Data Delete
   * API](https://docs.microsoft.com/rest/api/maps/data%20v2/deletepreview) to
   * delete old/unused content and create space for new uploads.
   * @param uniqueDataId The unique data id for the content. The `udid` must have been obtained from a
   *                     successful [Data Upload API](https://docs.microsoft.com/en-us/rest/api/maps/data%20v2/uploadpreview)
   *                     call.
   * @param updateContent The new content that will update/replace the previously uploaded content.
   * @param options The options parameters.
   */
  async beginUpdatePreview(
    uniqueDataId: string,
    updateContent: Record<string, unknown>,
    options?: DataUpdatePreviewOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DataUpdatePreviewResponse>,
      DataUpdatePreviewResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DataUpdatePreviewResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { uniqueDataId, updateContent, options },
      updatePreviewOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * The Data Update API allows the caller to update a previously uploaded data content.
   *
   * You can use this API in a scenario like adding or removing geofences to or from an existing
   * collection of geofences.
   * Geofences are uploaded using the [Data Upload
   * API](https://docs.microsoft.com/rest/api/maps/data%20v2/uploadpreview), for
   * use in the [Azure Maps Geofencing Service](https://docs.microsoft.com/rest/api/maps/spatial).
   *
   * Please note that the Update API will *replace* and *override* the existing data content.
   *
   * ## Submit Update Request
   *
   * To update your content you will use a `PUT` request. The request body will contain the new data that
   * will replace
   * the existing data. The `Content-Type` header will be set to the content type of the data, and the
   * path will contain
   * the `udid` of the data to be update.
   *
   * For example, to update a collection of geofences that were previously uploaded using the Upload API,
   * place the new
   * geofence content in the request body. Set the `udid` parameter in the path to the `udid` of the data
   * received
   * previously in the upload API response. And set the `Content-Type` header to one of the following
   * media types:
   *
   * - `application/json`
   * - `application/vnd.geo+json`
   * - `application/octet-stream`
   *
   * Here's a sample request body for updating a simple Geofence. It's represented as a circle geometry
   * using a center
   * point and a radius. The sample below is in `GeoJSON`:
   *
   * ```json
   * {
   *     "type": "FeatureCollection",
   *     "features": [{
   *         "type": "Feature",
   *         "geometry": {
   *             "type": "Point",
   *             "coordinates": [-122.126986, 47.639754]
   *         },
   *         "properties": {
   *             "geometryId": "001",
   *             "radius": 500
   *         }
   *     }]
   * }
   * ```
   *
   * The previously uploaded geofence had a radius of 100m. The above request will update it to 500m.
   *
   * The Data Update API performs a
   * [long-running request](https://aka.ms/am-creator-lrt-v2).
   *
   * ## Data Update Limits
   *
   * Please, be aware that currently every Azure Maps account has a [data storage
   * limit](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-maps-limits).
   *
   * Once the storage limit is reached, all the new upload API calls will return a `409 Conflict` http
   * error response.
   * You can always use the [Data Delete
   * API](https://docs.microsoft.com/rest/api/maps/data%20v2/deletepreview) to
   * delete old/unused content and create space for new uploads.
   * @param uniqueDataId The unique data id for the content. The `udid` must have been obtained from a
   *                     successful [Data Upload API](https://docs.microsoft.com/en-us/rest/api/maps/data%20v2/uploadpreview)
   *                     call.
   * @param updateContent The new content that will update/replace the previously uploaded content.
   * @param options The options parameters.
   */
  async beginUpdatePreviewAndWait(
    uniqueDataId: string,
    updateContent: Record<string, unknown>,
    options?: DataUpdatePreviewOptionalParams
  ): Promise<DataUpdatePreviewResponse> {
    const poller = await this.beginUpdatePreview(
      uniqueDataId,
      updateContent,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * This API allows the caller to download a previously uploaded data content.<br>
   * You can use this API in a scenario like downloading an existing collection of geofences uploaded
   * previously using the [Data Upload
   * API](https://docs.microsoft.com/en-us/rest/api/maps/data%20v2/uploadpreview) for use in our [Azure
   * Maps Geofencing Service](https://docs.microsoft.com/en-us/rest/api/maps/spatial).
   *
   *
   * ### Submit Download Request
   *
   * To download your content you will use a `GET` request where the path will contain the `udid` of the
   * data to download. Optionally, you can also pass in an `Accept` header to specify a preference for
   * the `Content-Type` of the data response. <br>
   * For example, to download a collection of geofences previously uploaded using the Upload API, set the
   * `udid` parameter in the path to the `udid` of the data received previously in the upload API
   * response and set the `Accept` header to either one of the following media types:
   *
   *   - `application/json`
   *   - `application/vnd.geo+json`
   *   - `application/octet-stream`
   *
   *
   * ### Download Data Response
   *
   * The Download API will return a HTTP `200 OK` response if the data resource with the passed-in `udid`
   * is found, where the response body will contain the content of the data resource.<br>
   * A HTTP `400 Bad Request` error response will be returned if the data resource with the passed-in
   * `udid` is not found.<br>
   *
   * Here's a sample response body for a simple geofence represented in `GeoJSON` uploaded previously
   * using the Upload API:
   * <br>
   *
   * ```json
   * {
   *     "type": "FeatureCollection",
   *     "features": [{
   *         "type": "Feature",
   *         "geometry": {
   *             "type": "Point",
   *             "coordinates": [-122.126986, 47.639754]
   *         },
   *         "properties": {
   *             "geometryId": "001",
   *             "radius": 500
   *         }
   *     }]
   * }
   * ```
   * @param uniqueDataId The unique data id for the content. The `udid` must have been obtained from a
   *                     successful [Data Upload API](https://docs.microsoft.com/en-us/rest/api/maps/data%20v2/uploadpreview)
   *                     call.
   * @param options The options parameters.
   */
  downloadPreview(
    uniqueDataId: string,
    options?: DataDownloadPreviewOptionalParams
  ): Promise<DataDownloadPreviewResponse> {
    return this.client.sendOperationRequest(
      { uniqueDataId, options },
      downloadPreviewOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * This API allows the caller to delete a previously uploaded data content.<br>
   * You can use this API in a scenario like removing geofences previously uploaded using the [Data
   * Upload API](https://docs.microsoft.com/en-us/rest/api/maps/data%20v2/uploadpreview) for use in our
   * [Azure Maps Geofencing Service](https://docs.microsoft.com/en-us/rest/api/maps/spatial). You can
   * also use this API to delete old/unused uploaded content and create space for new content.
   *
   *
   * ### Submit Delete Request
   *
   * To delete your content you will issue a `DELETE` request where the path will contain the `udid` of
   * the data to delete.<br>
   * For example, to delete a collection of geofences previously uploaded using the Upload API, set the
   * `udid` parameter in the path to the `udid` of the data received previously in the upload API
   * response.
   *
   *
   * ### Delete Data Response
   *
   * The Data Delete API returns a HTTP `204 No Content` response with an empty body, if the data
   * resource was deleted successfully.<br>
   * A HTTP `400 Bad Request` error response will be returned if the data resource with the passed-in
   * `udid` is not found.
   * @param uniqueDataId The unique data id for the content. The `udid` must have been obtained from a
   *                     successful [Data Upload API](https://docs.microsoft.com/en-us/rest/api/maps/data%20v2/uploadpreview)
   *                     call.
   * @param options The options parameters.
   */
  deletePreview(
    uniqueDataId: string,
    options?: DataDeletePreviewOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { uniqueDataId, options },
      deletePreviewOperationSpec
    );
  }

  /**
   * This path will be obtained from a call to POST /mapData.  While in progress, an http200 will be
   * returned with no extra headers -  followed by an http200 with Resource-Location header once
   * completed.
   * @param operationId The ID to query the status for the data upload request.
   * @param options The options parameters.
   */
  getOperationPreview(
    operationId: string,
    options?: DataGetOperationPreviewOptionalParams
  ): Promise<DataGetOperationPreviewResponse> {
    return this.client.sendOperationRequest(
      { operationId, options },
      getOperationPreviewOperationSpec
    );
  }

  private getOperationOptions<TOptions extends coreClient.OperationOptions>(
    options: TOptions | undefined,
    lroResourceLocationConfig?: string
  ): coreClient.OperationOptions {
    const operationOptions: coreClient.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLro(lroResourceLocationConfig)
    };
    return operationOptions;
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const uploadPreview$binaryOperationSpec: coreClient.OperationSpec = {
  path: "/mapData",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUploadPreviewHeaders
    },
    201: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUploadPreviewHeaders
    },
    202: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUploadPreviewHeaders
    },
    204: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUploadPreviewHeaders
    },
    409: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.uploadContent,
  queryParameters: [
    Parameters.apiVersion,
    Parameters.uploadDataDescription,
    Parameters.uploadDataFormat
  ],
  urlParameters: [Parameters.geography],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.accept1,
    Parameters.xMsClientId
  ],
  mediaType: "binary",
  serializer
};
const uploadPreview$jsonOperationSpec: coreClient.OperationSpec = {
  path: "/mapData",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUploadPreviewHeaders
    },
    201: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUploadPreviewHeaders
    },
    202: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUploadPreviewHeaders
    },
    204: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUploadPreviewHeaders
    },
    409: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.uploadContent1,
  queryParameters: [
    Parameters.apiVersion,
    Parameters.uploadDataDescription,
    Parameters.uploadDataFormat
  ],
  urlParameters: [Parameters.geography],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType1,
    Parameters.xMsClientId
  ],
  mediaType: "json",
  serializer
};
const listPreviewOperationSpec: coreClient.OperationSpec = {
  path: "/mapData",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MapDataListResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const updatePreviewOperationSpec: coreClient.OperationSpec = {
  path: "/mapData/{udid}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUpdatePreviewHeaders
    },
    201: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUpdatePreviewHeaders
    },
    202: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUpdatePreviewHeaders
    },
    204: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataUpdatePreviewHeaders
    },
    409: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.updateContent,
  queryParameters: [Parameters.apiVersion, Parameters.uploadDataDescription],
  urlParameters: [Parameters.geography, Parameters.uniqueDataId],
  headerParameters: [
    Parameters.accept,
    Parameters.xMsClientId,
    Parameters.contentType2
  ],
  mediaType: "json",
  serializer
};
const downloadPreviewOperationSpec: coreClient.OperationSpec = {
  path: "/mapData/{udid}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: { name: "Stream" },
        serializedName: "parsedResponse"
      },
      headersMapper: Mappers.DataDownloadPreviewHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.uniqueDataId],
  headerParameters: [Parameters.xMsClientId, Parameters.accept2],
  serializer
};
const deletePreviewOperationSpec: coreClient.OperationSpec = {
  path: "/mapData/{udid}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.uniqueDataId],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getOperationPreviewOperationSpec: coreClient.OperationSpec = {
  path: "/mapData/operations/{operationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DataGetOperationPreviewHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.operationId],
  headerParameters: [Parameters.accept],
  serializer
};
