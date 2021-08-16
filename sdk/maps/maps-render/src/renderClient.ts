import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { RenderClient as GeneratedClient } from "./generated/renderClient";
import { RenderClientOptionalParams as RenderClientOptions } from "./generated/models";
import { mapsTokenCredentialPolicy } from "./mapsTokenCredentialPolicy";
import { mapsAzureKeyCredentialPolicy } from "./mapsAzureKeyCredentialPolicy";
import { EmptyTokenCredential } from "./emptyTokenCredential";

export class RenderClient extends GeneratedClient {
  constructor(credential: TokenCredential | AzureKeyCredential, options: RenderClientOptions = {}) {
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
