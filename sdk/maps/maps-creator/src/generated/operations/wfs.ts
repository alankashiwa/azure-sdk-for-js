/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Wfs } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { CreatorClientContext } from "../creatorClientContext";
import {
  WfsGetLandingPageOptionalParams,
  WfsGetLandingPageResponse,
  WfsGetConformanceOptionalParams,
  WfsGetConformanceResponse,
  WfsGetCollectionsOptionalParams,
  WfsGetCollectionsResponse,
  WfsGetCollectionOptionalParams,
  WfsGetCollectionResponse,
  WfsGetCollectionDefinitionOptionalParams,
  WfsGetCollectionDefinitionResponse,
  WfsGetFeaturesOptionalParams,
  WfsGetFeaturesResponse,
  WfsGetFeatureOptionalParams,
  WfsGetFeatureResponse,
  WfsDeleteFeatureOptionalParams
} from "../models";

/** Class containing Wfs operations. */
export class WfsImpl implements Wfs {
  private readonly client: CreatorClientContext;

  /**
   * Initialize a new instance of the class Wfs class.
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
   *  The Web Feature Service (WFS) API is part of  Creator. WFS API follows the [Open Geospatial
   * Consortium API standard for Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) to
   * query [Datasets](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create).
   * A dataset consists of multiple feature collections. A feature collection is a collection of features
   * of a similar type, based on a common schema.
   * The Get Landing Page API provides links to the API definition, the Conformance statements  and the
   * metadata about the feature data in this dataset.
   * @param datasetId The identifier for the dataset to query from.
   * @param options The options parameters.
   */
  getLandingPage(
    datasetId: string,
    options?: WfsGetLandingPageOptionalParams
  ): Promise<WfsGetLandingPageResponse> {
    return this.client.sendOperationRequest(
      { datasetId, options },
      getLandingPageOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   * The Web Feature Service (WFS) API is part of  Creator. WFS API follows the [Open Geospatial
   * Consortium API standard for Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) to
   * query [Datasets](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create).
   * A dataset consists of multiple feature collections. A feature collection is a collection of features
   * of a similar type, based on a common schema.
   * The Get Requirements Classes lists all requirements classes specified in the standard that the
   * server conforms to.
   * @param datasetId The identifier for the dataset to query from.
   * @param options The options parameters.
   */
  getConformance(
    datasetId: string,
    options?: WfsGetConformanceOptionalParams
  ): Promise<WfsGetConformanceResponse> {
    return this.client.sendOperationRequest(
      { datasetId, options },
      getConformanceOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  The Web Feature Service (WFS) API is part of  Creator. WFS API follows the [Open Geospatial
   * Consortium API standard for Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) to
   * query [Datasets](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create).
   * A dataset consists of multiple feature collections. A feature collection is a collection of features
   * of a similar type, based on a common schema.
   * The Collections Description API provides descriptions of all the collections in a given dataset.
   * @param datasetId The identifier for the dataset to query from.
   * @param options The options parameters.
   */
  getCollections(
    datasetId: string,
    options?: WfsGetCollectionsOptionalParams
  ): Promise<WfsGetCollectionsResponse> {
    return this.client.sendOperationRequest(
      { datasetId, options },
      getCollectionsOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  The Web Feature Service (WFS) API is part of  Creator. WFS API follows the [Open Geospatial
   * Consortium API standard for Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) to
   * query [Datasets](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create).
   * A dataset consists of multiple feature collections. A feature collection is a collection of features
   * of a similar type, based on a common schema.
   *
   * The Collection Description API provides the description of a given collection. It includes the links
   * to the operations that can be performed on the collection.
   * @param datasetId The identifier for the dataset to query from.
   * @param collectionId Identifier (name) of a specific collection
   * @param options The options parameters.
   */
  getCollection(
    datasetId: string,
    collectionId: string,
    options?: WfsGetCollectionOptionalParams
  ): Promise<WfsGetCollectionResponse> {
    return this.client.sendOperationRequest(
      { datasetId, collectionId, options },
      getCollectionOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  [This](https://docs.microsoft.com/en-us/azure/azure-maps/creator-indoor-maps) article introduces
   * concepts and tools that apply to Azure Maps Creator. WFS API follows the [Open Geospatial Consortium
   * API standard for Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) to query
   * [Datasets](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create).
   * A dataset consists of multiple feature collections. A feature collection is a collection of features
   * of a similar type, based on a common schema.
   *
   * The Collection Definition API provides the detailed data model of a given collection.
   * @param datasetId The identifier for the dataset to query from.
   * @param collectionId Identifier (name) of a specific collection
   * @param options The options parameters.
   */
  getCollectionDefinition(
    datasetId: string,
    collectionId: string,
    options?: WfsGetCollectionDefinitionOptionalParams
  ): Promise<WfsGetCollectionDefinitionResponse> {
    return this.client.sendOperationRequest(
      { datasetId, collectionId, options },
      getCollectionDefinitionOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  The Web Feature Service (WFS) API is part of  Creator. WFS API follows the [Open Geospatial
   * Consortium API standard for Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) to
   * query [Datasets](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create).
   * A dataset consists of multiple feature collections. A feature collection is a collection of features
   * of a similar type, based on a common schema.
   * The Get Features API returns the list of features in the given collection.
   * @param datasetId The identifier for the dataset to query from.
   * @param collectionId Identifier (name) of a specific collection
   * @param options The options parameters.
   */
  getFeatures(
    datasetId: string,
    collectionId: string,
    options?: WfsGetFeaturesOptionalParams
  ): Promise<WfsGetFeaturesResponse> {
    return this.client.sendOperationRequest(
      { datasetId, collectionId, options },
      getFeaturesOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  The Web Feature Service (WFS) API is part of  Creator. WFS API follows the [Open Geospatial
   * Consortium API standard for Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) to
   * query [Datasets](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create).
   * A dataset consists of multiple feature collections. A feature collection is a collection of features
   * of a similar type, based on a common schema.
   * The Get Feature API returns the feature identified by the provided id in the given collection.
   * @param datasetId The identifier for the dataset to query from.
   * @param collectionId Identifier (name) of a specific collection
   * @param featureId Local identifier of a specific feature
   * @param options The options parameters.
   */
  getFeature(
    datasetId: string,
    collectionId: string,
    featureId: string,
    options?: WfsGetFeatureOptionalParams
  ): Promise<WfsGetFeatureResponse> {
    return this.client.sendOperationRequest(
      { datasetId, collectionId, featureId, options },
      getFeatureOperationSpec
    );
  }

  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Creator makes it possible to develop applications based on your private indoor map data using Azure
   * Maps API and SDK. [This](https://docs.microsoft.com/azure/azure-maps/creator-indoor-maps) article
   * introduces concepts and tools that apply to Azure Maps Creator.
   *
   *  The Web Feature Service (WFS) API is part of  Creator. WFS API follows the [Open Geospatial
   * Consortium API standard for Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) to
   * query [Datasets](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset/create).
   * A dataset consists of multiple feature collections. A feature collection is a collection of features
   * of a similar type, based on a common schema.
   * The Delete Feature API deletes the feature identified by the provided id in the given collection. At
   * this point this API supports only facility features. Deleting a facility feature deletes all the
   * child features of that facility recursively.
   * @param datasetId The identifier for the dataset to query from.
   * @param collectionId Identifier (name) of a specific collection
   * @param featureId Local identifier of a specific feature
   * @param options The options parameters.
   */
  deleteFeature(
    datasetId: string,
    collectionId: string,
    featureId: string,
    options?: WfsDeleteFeatureOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { datasetId, collectionId, featureId, options },
      deleteFeatureOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getLandingPageOperationSpec: coreClient.OperationSpec = {
  path: "/wfs/datasets/{datasetId}/",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LandingPageResponse
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
const getConformanceOperationSpec: coreClient.OperationSpec = {
  path: "/wfs/datasets/{datasetId}/conformance",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConformanceResponse
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
const getCollectionsOperationSpec: coreClient.OperationSpec = {
  path: "/wfs/datasets/{datasetId}/collections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CollectionsResponse
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
const getCollectionOperationSpec: coreClient.OperationSpec = {
  path: "/wfs/datasets/{datasetId}/collections/{collectionId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CollectionInfo
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.geography,
    Parameters.datasetId1,
    Parameters.collectionId
  ],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getCollectionDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/wfs/datasets/{datasetId}/collections/{collectionId}/definition",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CollectionDefinitionResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.geography,
    Parameters.datasetId1,
    Parameters.collectionId
  ],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getFeaturesOperationSpec: coreClient.OperationSpec = {
  path: "/wfs/datasets/{datasetId}/collections/{collectionId}/items",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ExtendedGeoJsonFeatureCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.limit,
    Parameters.bbox,
    Parameters.filter
  ],
  urlParameters: [
    Parameters.geography,
    Parameters.datasetId1,
    Parameters.collectionId
  ],
  headerParameters: [Parameters.accept, Parameters.xMsClientId],
  serializer
};
const getFeatureOperationSpec: coreClient.OperationSpec = {
  path:
    "/wfs/datasets/{datasetId}/collections/{collectionId}/items/{featureId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FeatureResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.geography,
    Parameters.datasetId1,
    Parameters.featureId,
    Parameters.collectionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteFeatureOperationSpec: coreClient.OperationSpec = {
  path:
    "/wfs/datasets/{datasetId}/collections/{collectionId}/items/{featureId}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.geography,
    Parameters.datasetId1,
    Parameters.featureId,
    Parameters.collectionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
