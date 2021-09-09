/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Dataset } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { GeneratedClientContext } from "../generatedClientContext";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  DatasetDetailInfo,
  DatasetListNextOptionalParams,
  DatasetListOptionalParams,
  DatasetCreateOptionalParams,
  DatasetCreateResponse,
  DatasetListOperationResponse,
  DatasetGetOptionalParams,
  DatasetGetResponse,
  DatasetDeleteOptionalParams,
  DatasetGetOperationOptionalParams,
  DatasetGetOperationResponse,
  DatasetListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing Dataset operations. */
export class DatasetImpl implements Dataset {
  private readonly client: GeneratedClientContext;

  /**
   * Initialize a new instance of the class Dataset class.
   * @param client Reference to the service client
   */
  constructor(client: GeneratedClientContext) {
    this.client = client;
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This API allows the caller to fetch a list of all previously successfully created datasets.
   *
   * ### Submit List Request
   *
   * To list all your datasets, you will issue a `GET` request with no additional parameters.
   *
   *
   * ### List Data Response
   *
   * The List API returns the complete list of all datasets in `json` format. The response contains the
   * following fields (if they are not null or empty):
   * > created - The timestamp the dataset was created.
   * > datasetId - The id for the dataset.
   * > description - The description for the dataset.
   * > datasetSources - The source data that was used when the create request was issued.
   * > ontology - The source
   * [ontology](https://docs.microsoft.com/en-us/azure/azure-maps/creator-facility-ontology) that was
   * used in the conversion service for the input data.<br/>
   *
   * The `datasetSources` describes the source data that was used when the create request was issued and
   * contains the following elements (if they are not null or empty):
   *
   * > conversionIds - The list of `conversionId` (null if none were provided).
   * > appendDatasetId - The `datasetId` that was used for an append operation (null if none was used).
   * >featureCounts - The counts for each feature type in the dataset.<br/>
   *
   * Here's a sample response returning the `timestamp`, `datasetId`, `description`, `datasetSources`,
   * and `ontology` of 3 dataset resources:
   *
   *
   * ```json
   * {
   *   "datasets": [
   *     {
   *       "timestamp": "2020-01-01T22:50:48.123Z",
   *       "datasetId": "f6495f62-94f8-0ec2-c252-45626f82fcb2",
   *       "description": "Some description or comment for the dataset.",
   *       "datasetSources": {
   *         "conversionIds": [
   *           "15d21452-c9bb-27b6-5e79-743ca5c3205d"
   *         ],      },
   *       "ontology": "facility-2.0",
   *       "featureCounts": {
   *         "directoryInfo": 2,
   *         "category": 10,
   *         "facility": 1,
   *         "level": 3,
   *         "unit": 183,
   *         "zone": 3,
   *         "verticalPenetration": 6,
   *         "opening": 48,
   *         "areaElement": 108
   *       }
   *     },
   *     {
   *       "timestamp": "2020-01-01T22:57:53.123Z",
   *       "datasetId": "8b1288fa-1958-4a2b-b68e-13a7i5af7d7c",
   *       "description": "Create from upload '0c1288fa-2058-4a1b-b68d-13a5f5af7d7c'.",
   *       "datasetSources": {
   *         "conversionIds": [
   *           "0c1288fa-2058-4a1b-b68d-13a5f5af7d7c"
   *         ],
   *         "appendDatasetId": "46d1edb6-d29e-4786-9589-dbd4efd7a977"
   *       },
   *       "ontology": "facility-2.0",
   *       "featureCounts": {
   *         "directoryInfo": 2,
   *         "category": 10,
   *         "facility": 1,
   *         "level": 3,
   *         "unit": 183,
   *         "zone": 3,
   *         "verticalPenetration": 6,
   *         "opening": 48,
   *         "areaElement": 108
   *       }
   *     }
   *   ]
   * }
   * ```
   * @param options The options parameters.
   */
  public list(
    options?: DatasetListOptionalParams
  ): PagedAsyncIterableIterator<DatasetDetailInfo> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: DatasetListOptionalParams
  ): AsyncIterableIterator<DatasetDetailInfo[]> {
    let result = await this._list(options);
    yield result.datasets || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.datasets || [];
    }
  }

  private async *listPagingAll(
    options?: DatasetListOptionalParams
  ): AsyncIterableIterator<DatasetDetailInfo> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  This API allows the caller to create a dataset from data that was uploaded to the Azure Maps Data
   * Service and converted using the Azure Maps Conversion Service.
   *
   * You can use this API in a scenario like uploading a DWG zip package for a building, converting the
   * zip package using the Azure Maps Conversion Service, and creating a dataset from the converted zip
   * package. The created dataset can be used to create tilesets using the Azure Maps Tileset Service and
   * can be queried via the Azure Maps WFS Service.
   *
   * ### Submit Create Request
   *
   * To create your dataset, you will use a `POST` request where the `conversionId` query parameter is an
   * ID that represents the converted DWG zip package, the `datasetId` parameter will be the ID of a
   * previously created dataset to append with the current dataset and, optionally, the `description`
   * query parameter will contain a description (if description is not provided a default description
   * will be given).
   *
   * The Create API is a [long-running request](https://aka.ms/am-creator-lrt-v2).
   * @param conversionId The unique ID used to create the dataset. The `conversionId` must have been
   *                     obtained from a successful call to the Conversion Service [Convert
   *                     API](https://docs.microsoft.com/en-us/rest/api/maps/v2/conversion/convert) and may be provided with
   *                     multiple query parameters with same name (if more than one is provided).
   * @param options The options parameters.
   */
  async beginCreate(
    conversionId: string,
    options?: DatasetCreateOptionalParams
  ): Promise<
    PollerLike<PollOperationState<DatasetCreateResponse>, DatasetCreateResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DatasetCreateResponse> => {
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
      { conversionId, options },
      createOperationSpec
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
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  This API allows the caller to create a dataset from data that was uploaded to the Azure Maps Data
   * Service and converted using the Azure Maps Conversion Service.
   *
   * You can use this API in a scenario like uploading a DWG zip package for a building, converting the
   * zip package using the Azure Maps Conversion Service, and creating a dataset from the converted zip
   * package. The created dataset can be used to create tilesets using the Azure Maps Tileset Service and
   * can be queried via the Azure Maps WFS Service.
   *
   * ### Submit Create Request
   *
   * To create your dataset, you will use a `POST` request where the `conversionId` query parameter is an
   * ID that represents the converted DWG zip package, the `datasetId` parameter will be the ID of a
   * previously created dataset to append with the current dataset and, optionally, the `description`
   * query parameter will contain a description (if description is not provided a default description
   * will be given).
   *
   * The Create API is a [long-running request](https://aka.ms/am-creator-lrt-v2).
   * @param conversionId The unique ID used to create the dataset. The `conversionId` must have been
   *                     obtained from a successful call to the Conversion Service [Convert
   *                     API](https://docs.microsoft.com/en-us/rest/api/maps/v2/conversion/convert) and may be provided with
   *                     multiple query parameters with same name (if more than one is provided).
   * @param options The options parameters.
   */
  async beginCreateAndWait(
    conversionId: string,
    options?: DatasetCreateOptionalParams
  ): Promise<DatasetCreateResponse> {
    const poller = await this.beginCreate(conversionId, options);
    return poller.pollUntilDone();
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This API allows the caller to fetch a list of all previously successfully created datasets.
   *
   * ### Submit List Request
   *
   * To list all your datasets, you will issue a `GET` request with no additional parameters.
   *
   *
   * ### List Data Response
   *
   * The List API returns the complete list of all datasets in `json` format. The response contains the
   * following fields (if they are not null or empty):
   * > created - The timestamp the dataset was created.
   * > datasetId - The id for the dataset.
   * > description - The description for the dataset.
   * > datasetSources - The source data that was used when the create request was issued.
   * > ontology - The source
   * [ontology](https://docs.microsoft.com/en-us/azure/azure-maps/creator-facility-ontology) that was
   * used in the conversion service for the input data.<br/>
   *
   * The `datasetSources` describes the source data that was used when the create request was issued and
   * contains the following elements (if they are not null or empty):
   *
   * > conversionIds - The list of `conversionId` (null if none were provided).
   * > appendDatasetId - The `datasetId` that was used for an append operation (null if none was used).
   * >featureCounts - The counts for each feature type in the dataset.<br/>
   *
   * Here's a sample response returning the `timestamp`, `datasetId`, `description`, `datasetSources`,
   * and `ontology` of 3 dataset resources:
   *
   *
   * ```json
   * {
   *   "datasets": [
   *     {
   *       "timestamp": "2020-01-01T22:50:48.123Z",
   *       "datasetId": "f6495f62-94f8-0ec2-c252-45626f82fcb2",
   *       "description": "Some description or comment for the dataset.",
   *       "datasetSources": {
   *         "conversionIds": [
   *           "15d21452-c9bb-27b6-5e79-743ca5c3205d"
   *         ],      },
   *       "ontology": "facility-2.0",
   *       "featureCounts": {
   *         "directoryInfo": 2,
   *         "category": 10,
   *         "facility": 1,
   *         "level": 3,
   *         "unit": 183,
   *         "zone": 3,
   *         "verticalPenetration": 6,
   *         "opening": 48,
   *         "areaElement": 108
   *       }
   *     },
   *     {
   *       "timestamp": "2020-01-01T22:57:53.123Z",
   *       "datasetId": "8b1288fa-1958-4a2b-b68e-13a7i5af7d7c",
   *       "description": "Create from upload '0c1288fa-2058-4a1b-b68d-13a5f5af7d7c'.",
   *       "datasetSources": {
   *         "conversionIds": [
   *           "0c1288fa-2058-4a1b-b68d-13a5f5af7d7c"
   *         ],
   *         "appendDatasetId": "46d1edb6-d29e-4786-9589-dbd4efd7a977"
   *       },
   *       "ontology": "facility-2.0",
   *       "featureCounts": {
   *         "directoryInfo": 2,
   *         "category": 10,
   *         "facility": 1,
   *         "level": 3,
   *         "unit": 183,
   *         "zone": 3,
   *         "verticalPenetration": 6,
   *         "opening": 48,
   *         "areaElement": 108
   *       }
   *     }
   *   ]
   * }
   * ```
   * @param options The options parameters.
   */
  private _list(
    options?: DatasetListOptionalParams
  ): Promise<DatasetListOperationResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This API allows the caller to fetch a previously successfully created dataset.
   *
   * ### Submit Get Details Request
   *
   * To get the details for a previously created dataset, you will issue a `GET` request with the
   * `datasetId` in the path.
   *
   * ### Get Details Response
   *
   * The Get Details API returns the details for a dataset in `json` format. The response contains the
   * following fields (if they are not null or empty):
   * > created - The timestamp the dataset was created.
   * > datasetId - The id for the dataset.
   * > description - The description for the dataset.
   * > datasetSources - The source data that was used when the create request was issued.
   * > ontology - The source
   * [ontology](https://docs.microsoft.com/en-us/azure/azure-maps/creator-facility-ontology) that was
   * used in the conversion service for the input data.<br/>
   *
   * The `datasetSources` describes the source data that was used when the create request was issued and
   * contains the following elements (if they are not null or empty):
   * > conversionIds - The list of `conversionId` (null if none were provided).
   * > appendDatasetId - The `datasetId` that was used for an append operation (null if none was used).
   * >featureCounts - The counts for each feature type in the dataset.<br/>
   *
   * Here's a sample response returning the `timestamp`, `datasetId`, `description`, `datasetSources`,
   * and `ontology` of a dataset resource:
   *
   * ```json
   * {
   *    "timestamp": "2020-01-01T22:50:48.123Z",
   *    "datasetId": "f6495f62-94f8-0ec2-c252-45626f82fcb2",
   *    "description": "Some description or comment for the dataset.",
   *    "datasetSources": {
   *      "conversionIds": [
   *        "15d21452-c9bb-27b6-5e79-743ca5c3205d"
   *      ],
   *    },
   *    "ontology": "facility-2.0",
   *    "featureCounts": {
   *      "directoryInfo": 2,
   *      "category": 10,
   *      "facility": 1,
   *      "level": 3,
   *      "unit": 183,
   *      "zone": 3,
   *      "verticalPenetration": 6,
   *      "opening": 48,
   *      "areaElement": 108
   *    }
   *  }
   * ```
   * @param datasetId The identifier for the dataset to query from.
   * @param options The options parameters.
   */
  get(
    datasetId: string,
    options?: DatasetGetOptionalParams
  ): Promise<DatasetGetResponse> {
    return this.client.sendOperationRequest(
      { datasetId, options },
      getOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * You can also use this API to delete old/unused datasets to create space for new Creator content.
   *
   * ### Submit Delete Request
   *
   * To delete your content you will issue a `DELETE` request where the path will contain the `datasetId`
   * of the dataset to delete.
   * @param datasetId The identifier for the dataset to query from.
   * @param options The options parameters.
   */
  delete(
    datasetId: string,
    options?: DatasetDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { datasetId, options },
      deleteOperationSpec
    );
  }

  /**
   * This API allows the caller to view the current progress of a dataset operation and the path is
   * obtained from a call to the Create API.
   *
   * ### Submit Operations Request
   *
   * To view the current progress of a dataset operation, you will use a `GET` request where the
   * `operationId` given the path is the ID that represents the operation.
   *
   * ### Operation Response
   *
   * While in progress, a `200-OK` http status code will be returned with no extra headers. If the
   * operation succeeds, a `200-OK` http status code with Resource-Location header will be returned.
   * @param operationId The ID to query the status for the dataset create/import request.
   * @param options The options parameters.
   */
  getOperation(
    operationId: string,
    options?: DatasetGetOperationOptionalParams
  ): Promise<DatasetGetOperationResponse> {
    return this.client.sendOperationRequest(
      { operationId, options },
      getOperationOperationSpec
    );
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: DatasetListNextOptionalParams
  ): Promise<DatasetListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOperationSpec: coreClient.OperationSpec = {
  path: "/datasets",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DatasetCreateHeaders
    },
    201: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DatasetCreateHeaders
    },
    202: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DatasetCreateHeaders
    },
    204: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DatasetCreateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.conversionId,
    Parameters.datasetId,
    Parameters.descriptionDataset
  ],
  urlParameters: [Parameters.geography],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/datasets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatasetListResponse
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
const getOperationSpec: coreClient.OperationSpec = {
  path: "/datasets/{datasetId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatasetDetailInfo
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.datasetId1],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/datasets/{datasetId}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.datasetId1],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getOperationOperationSpec: coreClient.OperationSpec = {
  path: "/datasets/operations/{operationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LongRunningOperationResult,
      headersMapper: Mappers.DatasetGetOperationHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.operationId],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatasetListResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.nextLink],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
