/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { HealthApiImpl, WebPubSubImpl } from "./operations";
import { HealthApi, WebPubSub } from "./operationsInterfaces";
import { GeneratedClientContext } from "./generatedClientContext";
import { GeneratedClientOptionalParams } from "./models";

/** @internal */
export class GeneratedClient extends GeneratedClientContext {
  /**
   * Initializes a new instance of the GeneratedClient class.
   * @param endpoint HTTP or HTTPS endpoint for the Web PubSub service instance.
   * @param options The parameter options
   */
  constructor(endpoint: string, options?: GeneratedClientOptionalParams) {
    super(endpoint, options);
    this.healthApi = new HealthApiImpl(this);
    this.webPubSub = new WebPubSubImpl(this);
  }

  healthApi: HealthApi;
  webPubSub: WebPubSub;
}
