/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  TilesetDetailInfo,
  TilesetListOptionalParams,
  TilesetCreateOptionalParams,
  TilesetCreateResponse,
  TilesetGetOptionalParams,
  TilesetGetResponse,
  TilesetDeleteOptionalParams,
  TilesetGetOperationOptionalParams,
  TilesetGetOperationResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Tileset. */
export interface Tileset {
  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This API allows the caller to fetch a list of all tilesets created.
   * <br>
   * @param options The options parameters.
   */
  list(
    options?: TilesetListOptionalParams
  ): PagedAsyncIterableIterator<TilesetDetailInfo>;
  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  [This](https://docs.microsoft.com/en-us/azure/azure-maps/creator-indoor-maps) article introduces
   * concepts and tools that apply to Azure Maps Creator.
   *
   * The Tileset Create API allows the caller to create a tileset from a dataset. A tileset contains a
   * set of tiles that can be consumed
   * from the [Get Map Tile](/rest/api/maps/render/getmaptile) to retrieve custom tiles. To make a
   * dataset, use the
   * [DataSet Create API](/rest/api/maps/dataset/createpreview).
   *
   * ## Submit Create Request
   *
   * To create your tileset you will make a `POST` request with an empty body. The `datasetId` query
   * parameter will be
   * used as the source of the tileset data.
   *
   * The Create Tileset API is a
   * [long-running request](https://aka.ms/am-creator-lrt-v2).
   * @param datasetId The unique `datasetId` that the tileset create API uses to retrieve features to
   *                  generate tiles. The `datasetId` must have been obtained from a successful [Dataset Create
   *                  API](/en-us/rest/api/maps/dataset/createpreview) call.
   * @param options The options parameters.
   */
  beginCreate(
    datasetId: string,
    options?: TilesetCreateOptionalParams
  ): Promise<
    PollerLike<PollOperationState<TilesetCreateResponse>, TilesetCreateResponse>
  >;
  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  [This](https://docs.microsoft.com/en-us/azure/azure-maps/creator-indoor-maps) article introduces
   * concepts and tools that apply to Azure Maps Creator.
   *
   * The Tileset Create API allows the caller to create a tileset from a dataset. A tileset contains a
   * set of tiles that can be consumed
   * from the [Get Map Tile](/rest/api/maps/render/getmaptile) to retrieve custom tiles. To make a
   * dataset, use the
   * [DataSet Create API](/rest/api/maps/dataset/createpreview).
   *
   * ## Submit Create Request
   *
   * To create your tileset you will make a `POST` request with an empty body. The `datasetId` query
   * parameter will be
   * used as the source of the tileset data.
   *
   * The Create Tileset API is a
   * [long-running request](https://aka.ms/am-creator-lrt-v2).
   * @param datasetId The unique `datasetId` that the tileset create API uses to retrieve features to
   *                  generate tiles. The `datasetId` must have been obtained from a successful [Dataset Create
   *                  API](/en-us/rest/api/maps/dataset/createpreview) call.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    datasetId: string,
    options?: TilesetCreateOptionalParams
  ): Promise<TilesetCreateResponse>;
  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This API allows the caller to fetch a tileset.
   * @param tilesetId The Tileset Id
   * @param options The options parameters.
   */
  get(
    tilesetId: string,
    options?: TilesetGetOptionalParams
  ): Promise<TilesetGetResponse>;
  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This API allows the caller to delete a created tileset.<br>
   * You can use this API if a tileset is no longer needed.
   *
   * ### Submit Delete Request
   *
   * To delete your content you will issue a `DELETE` request where the path will contain the `tilesetId`
   * of the tileset to delete.<br>
   *
   * #### Delete request "Successful"
   *
   * The Tileset Delete API returns a HTTP `204 No Content` response with an empty body, if the tileset
   * was deleted successfully.<br>
   *
   * #### Delete request "Failed"
   *
   * A HTTP `400 Bad Request` error response will be returned if the tileset with the passed-in
   * `tilesetId` is not found.
   *
   * Here is a sample error response:
   *
   * <br>
   *
   * ```json
   * {
   *   "error": {
   *       "code": "400 BadRequest",
   *       "message": "Bad request - Tileset Id: d85b5b27-5fc4-4599-8b50-47160e90f8ce does not exist."
   *   }
   * }
   * ```
   * @param tilesetId The Tileset Id
   * @param options The options parameters.
   */
  delete(
    tilesetId: string,
    options?: TilesetDeleteOptionalParams
  ): Promise<void>;
  /**
   * This path will be obtained from a call to /tilesets/create.  While in progress, an http200 will be
   * returned with no extra headers -  followed by an http200 with Resource-Location header once
   * successfully completed.
   * @param operationId The ID to query the status for the dataset create/import request.
   * @param options The options parameters.
   */
  getOperation(
    operationId: string,
    options?: TilesetGetOperationOptionalParams
  ): Promise<TilesetGetOperationResponse>;
}
