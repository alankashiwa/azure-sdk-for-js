/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { FeatureState } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { CreatorClientContext } from "../creatorClientContext";
import {
  StatesetInfoObject,
  FeatureStateListStatesetNextOptionalParams,
  FeatureStateListStatesetOptionalParams,
  StylesObject,
  FeatureStateCreateStatesetOptionalParams,
  FeatureStateCreateStatesetResponse,
  FeatureStateListStatesetResponse,
  FeatureStatePutStatesetOptionalParams,
  FeatureStateDeleteStatesetOptionalParams,
  FeatureStateGetStatesetOptionalParams,
  FeatureStateGetStatesetResponse,
  FeatureStatesStructure,
  FeatureStateUpdateStatesOptionalParams,
  FeatureStateDeleteStateOptionalParams,
  FeatureStateGetStatesOptionalParams,
  FeatureStateGetStatesResponse,
  FeatureStateListStatesetNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing FeatureState operations. */
export class FeatureStateImpl implements FeatureState {
  private readonly client: CreatorClientContext;

  /**
   * Initialize a new instance of the class FeatureState class.
   * @param client Reference to the service client
   */
  constructor(client: CreatorClientContext) {
    this.client = client;
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  This API allows the caller to fetch a list of all previously successfully created statesets.
   * @param options The options parameters.
   */
  public listStateset(
    options?: FeatureStateListStatesetOptionalParams
  ): PagedAsyncIterableIterator<StatesetInfoObject> {
    const iter = this.listStatesetPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listStatesetPagingPage(options);
      }
    };
  }

  private async *listStatesetPagingPage(
    options?: FeatureStateListStatesetOptionalParams
  ): AsyncIterableIterator<StatesetInfoObject[]> {
    let result = await this._listStateset(options);
    yield result.statesets || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listStatesetNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.statesets || [];
    }
  }

  private async *listStatesetPagingAll(
    options?: FeatureStateListStatesetOptionalParams
  ): AsyncIterableIterator<StatesetInfoObject> {
    for await (const page of this.listStatesetPagingPage(options)) {
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
   * This POST API allows the user to create a new Stateset and define stateset style using request body.
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. The Feature State API is part of Creator.
   *
   * The Feature State service allows the user to update the states of a feature and query them to be
   * used in other services. The dynamic properties of a feature that don't belong to the dataset are
   * referred to as *states* here.
   *
   * This Feature State service pivot on the Stateset. Like Tileset, Stateset encapsulates the storage
   * mechanism for feature states for a dataset.
   *
   * Once the stateset is created, users can use that statesetId to post feature state updates and
   * retrieve the current feature states. A feature can have only one state at a given point in time.
   *
   * Feature state is defined by the key name, value and the timestamp. When a feature state update is
   * posted to Azure Maps, the state value gets updated only if the provided state’s timestamp is later
   * than the stored timestamp.
   *
   * Azure Maps MapControl provides a way to use these feature states to style the features. Please refer
   * to the [State Tile
   * documentation](https://docs.microsoft.com/en-us/rest/api/maps/render/get-map-state-tile-preview) for
   * more information.
   * @param datasetId The datasetId must have been obtained from a successful [Dataset Create
   *                  API](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create) call.
   * @param statesetCreateRequestBody The stateset style JSON data.
   * @param options The options parameters.
   */
  createStateset(
    datasetId: string,
    statesetCreateRequestBody: StylesObject,
    options?: FeatureStateCreateStatesetOptionalParams
  ): Promise<FeatureStateCreateStatesetResponse> {
    return this.client.sendOperationRequest(
      { datasetId, statesetCreateRequestBody, options },
      createStatesetOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  This API allows the caller to fetch a list of all previously successfully created statesets.
   * @param options The options parameters.
   */
  private _listStateset(
    options?: FeatureStateListStatesetOptionalParams
  ): Promise<FeatureStateListStatesetResponse> {
    return this.client.sendOperationRequest(
      { options },
      listStatesetOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This PUT API allows the user to update the stateset style rules.
   * @param statesetId The stateset id that was created.
   * @param statesetStyleUpdateRequestBody The stateset style JSON data. Only style rules are allowed to
   *                                       be updated, update on keyname and type is not allowed.
   * @param options The options parameters.
   */
  putStateset(
    statesetId: string,
    statesetStyleUpdateRequestBody: StylesObject,
    options?: FeatureStatePutStatesetOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { statesetId, statesetStyleUpdateRequestBody, options },
      putStatesetOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  This DELETE API allows the user to delete the stateset and the associated data.
   * @param statesetId The stateset id that was created.
   * @param options The options parameters.
   */
  deleteStateset(
    statesetId: string,
    options?: FeatureStateDeleteStatesetOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { statesetId, options },
      deleteStatesetOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This GET API allows the user to get the stateset Information.
   *
   * The stateset Information includes the datasetId associated to the stateset, and the styles of that
   * stateset.
   * @param statesetId The stateset id that was created.
   * @param options The options parameters.
   */
  getStateset(
    statesetId: string,
    options?: FeatureStateGetStatesetOptionalParams
  ): Promise<FeatureStateGetStatesetResponse> {
    return this.client.sendOperationRequest(
      { statesetId, options },
      getStatesetOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * This PUT API allows the user to update the state of the given feature in the given stateset.
   * @param statesetId The stateset id that was created.
   * @param featureId The id of a feature in the given dataset. If the featureId is not present in the
   *                  dataset, Bad Request response will be returned.
   * @param featureStateUpdateRequestBody The feature state JSON data. A feature can have only one state
   *                                      at a given point in time. The specified state keyname must have been defined during the stateset
   *                                      creation.
   * @param options The options parameters.
   */
  updateStates(
    statesetId: string,
    featureId: string,
    featureStateUpdateRequestBody: FeatureStatesStructure,
    options?: FeatureStateUpdateStatesOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { statesetId, featureId, featureStateUpdateRequestBody, options },
      updateStatesOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  This API deletes the state information identified by the StateKeyName parameter for the feature
   * identified by the FeatureId parameter in the the stateset.
   * @param statesetId The stateset id that was created.
   * @param featureId The id of a feature in the given stateset. If no state was set for the featureId in
   *                  the stateset earlier, Bad Request response will be returned.
   * @param stateKeyName The Name of the state to be deleted.
   * @param options The options parameters.
   */
  deleteState(
    statesetId: string,
    featureId: string,
    stateKeyName: string,
    options?: FeatureStateDeleteStateOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { statesetId, featureId, stateKeyName, options },
      deleteStateOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  This API returns the current state information associated with the given feature in the given
   * stateset.
   * @param statesetId The stateset id that was created.
   * @param featureId The id of a feature in the given stateset. If no state was set for the featureId in
   *                  the stateset earlier, Bad Request response will be returned.
   * @param options The options parameters.
   */
  getStates(
    statesetId: string,
    featureId: string,
    options?: FeatureStateGetStatesOptionalParams
  ): Promise<FeatureStateGetStatesResponse> {
    return this.client.sendOperationRequest(
      { statesetId, featureId, options },
      getStatesOperationSpec
    );
  }

  /**
   * ListStatesetNext
   * @param nextLink The nextLink from the previous successful call to the ListStateset method.
   * @param options The options parameters.
   */
  private _listStatesetNext(
    nextLink: string,
    options?: FeatureStateListStatesetNextOptionalParams
  ): Promise<FeatureStateListStatesetNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listStatesetNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createStatesetOperationSpec: coreClient.OperationSpec = {
  path: "/featureStateSets",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.StatesetCreatedResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.statesetCreateRequestBody,
  queryParameters: [
    Parameters.apiVersion,
    Parameters.description,
    Parameters.datasetId2
  ],
  urlParameters: [Parameters.geography],
  headerParameters: [
    Parameters.accept,
    Parameters.xMsClientId,
    Parameters.contentType2
  ],
  mediaType: "json",
  serializer
};
const listStatesetOperationSpec: coreClient.OperationSpec = {
  path: "/featureStateSets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StatesetListResponse
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
const putStatesetOperationSpec: coreClient.OperationSpec = {
  path: "/featureStateSets/{statesetId}",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.statesetStyleUpdateRequestBody,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.statesetId],
  headerParameters: [
    Parameters.accept,
    Parameters.xMsClientId,
    Parameters.contentType2
  ],
  mediaType: "json",
  serializer
};
const deleteStatesetOperationSpec: coreClient.OperationSpec = {
  path: "/featureStateSets/{statesetId}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.statesetId],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getStatesetOperationSpec: coreClient.OperationSpec = {
  path: "/featureStateSets/{statesetId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StatesetGetResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.geography, Parameters.statesetId],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const updateStatesOperationSpec: coreClient.OperationSpec = {
  path: "/featureStateSets/{statesetId}/featureStates/{featureId}",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.featureStateUpdateRequestBody,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.geography,
    Parameters.statesetId,
    Parameters.featureId
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.xMsClientId,
    Parameters.contentType2
  ],
  mediaType: "json",
  serializer
};
const deleteStateOperationSpec: coreClient.OperationSpec = {
  path: "/featureStateSets/{statesetId}/featureStates/{featureId}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stateKeyName],
  urlParameters: [
    Parameters.geography,
    Parameters.statesetId,
    Parameters.featureId
  ],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getStatesOperationSpec: coreClient.OperationSpec = {
  path: "/featureStateSets/{statesetId}/featureStates/{featureId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FeatureStatesStructure
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.geography,
    Parameters.statesetId,
    Parameters.featureId
  ],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const listStatesetNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StatesetListResponse
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
