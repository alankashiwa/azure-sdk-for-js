import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { RouteClient as GeneratedClient } from "./generated/routeClient";
import { RouteClientOptionalParams as RouteClientOptions } from "./generated/models";
import { mapsTokenCredentialPolicy } from "./mapsTokenCredentialPolicy";
import { mapsAzureKeyCredentialPolicy } from "./mapsAzureKeyCredentialPolicy";
import { EmptyTokenCredential } from "./emptyTokenCredential";

export class RouteClient extends GeneratedClient {
  constructor(credential: TokenCredential | AzureKeyCredential, options: RouteClientOptions = {}) {
    if (isTokenCredential(credential)) {
      if (!options.xMsClientId) {
        throw Error("option: xMsClientId is needed for TokenCredential");
      }
      super(credential, options);
      this.pipeline.addPolicy(mapsTokenCredentialPolicy(options.xMsClientId));
    } else {
      super(new EmptyTokenCredential(), options);
      this.pipeline.addPolicy(mapsAzureKeyCredentialPolicy(credential));
    }
  }
}
