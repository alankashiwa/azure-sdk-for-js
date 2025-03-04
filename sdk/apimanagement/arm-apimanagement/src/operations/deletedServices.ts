/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { DeletedServices } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClient } from "../apiManagementClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  DeletedServiceContract,
  DeletedServicesListBySubscriptionNextOptionalParams,
  DeletedServicesListBySubscriptionOptionalParams,
  DeletedServicesListBySubscriptionResponse,
  DeletedServicesGetByNameOptionalParams,
  DeletedServicesGetByNameResponse,
  DeletedServicesPurgeOptionalParams,
  DeletedServicesListBySubscriptionNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing DeletedServices operations. */
export class DeletedServicesImpl implements DeletedServices {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class DeletedServices class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists all soft-deleted services available for undelete for the given subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: DeletedServicesListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<DeletedServiceContract> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listBySubscriptionPagingPage(options, settings);
      }
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: DeletedServicesListBySubscriptionOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<DeletedServiceContract[]> {
    let result: DeletedServicesListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: DeletedServicesListBySubscriptionOptionalParams
  ): AsyncIterableIterator<DeletedServiceContract> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all soft-deleted services available for undelete for the given subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: DeletedServicesListBySubscriptionOptionalParams
  ): Promise<DeletedServicesListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec
    );
  }

  /**
   * Get soft-deleted Api Management Service by name.
   * @param serviceName The name of the API Management service.
   * @param location The location of the deleted API Management service.
   * @param options The options parameters.
   */
  getByName(
    serviceName: string,
    location: string,
    options?: DeletedServicesGetByNameOptionalParams
  ): Promise<DeletedServicesGetByNameResponse> {
    return this.client.sendOperationRequest(
      { serviceName, location, options },
      getByNameOperationSpec
    );
  }

  /**
   * Purges Api Management Service (deletes it with no option to undelete).
   * @param serviceName The name of the API Management service.
   * @param location The location of the deleted API Management service.
   * @param options The options parameters.
   */
  async beginPurge(
    serviceName: string,
    location: string,
    options?: DeletedServicesPurgeOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
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
      { serviceName, location, options },
      purgeOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Purges Api Management Service (deletes it with no option to undelete).
   * @param serviceName The name of the API Management service.
   * @param location The location of the deleted API Management service.
   * @param options The options parameters.
   */
  async beginPurgeAndWait(
    serviceName: string,
    location: string,
    options?: DeletedServicesPurgeOptionalParams
  ): Promise<void> {
    const poller = await this.beginPurge(serviceName, location, options);
    return poller.pollUntilDone();
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: DeletedServicesListBySubscriptionNextOptionalParams
  ): Promise<DeletedServicesListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/deletedservices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedServicesCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const getByNameOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/locations/{location}/deletedservices/{serviceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedServiceContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const purgeOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/locations/{location}/deletedservices/{serviceName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedServicesCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
