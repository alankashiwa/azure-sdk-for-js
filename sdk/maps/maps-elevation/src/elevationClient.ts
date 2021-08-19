import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { ElevationClient as GeneratedClient } from "./generated/elevationClient";
import { ElevationClientOptionalParams as ElevationClientOptions } from "./generated/models";
import { mapsTokenCredentialPolicy } from "./mapsTokenCredentialPolicy";
import { mapsAzureKeyCredentialPolicy } from "./mapsAzureKeyCredentialPolicy";
import { EmptyTokenCredential } from "./emptyTokenCredential";

export class ElevationClient extends GeneratedClient {
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    options: ElevationClientOptions = {}
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
