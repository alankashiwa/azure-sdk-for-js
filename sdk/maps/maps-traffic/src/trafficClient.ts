import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { TrafficClient as GeneratedClient } from "./generated/trafficClient";
import { TrafficClientOptionalParams as TrafficClientOptions } from "./generated/models";
import { mapsTokenCredentialPolicy } from "./mapsTokenCredentialPolicy";
import { mapsAzureKeyCredentialPolicy } from "./mapsAzureKeyCredentialPolicy";
import { EmptyTokenCredential } from "./emptyTokenCredential";

export class TrafficClient extends GeneratedClient {
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    options: TrafficClientOptions = {}
  ) {
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
