import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { TimezoneClient as GeneratedClient } from "./generated/timezoneClient";
import { TimezoneClientOptionalParams as TimezoneClientOptions } from "./generated/models";
import { mapsTokenCredentialPolicy } from "./mapsTokenCredentialPolicy";
import { mapsAzureKeyCredentialPolicy } from "./mapsAzureKeyCredentialPolicy";
import { EmptyTokenCredential } from "./emptyTokenCredential";

export class TimezoneClient extends GeneratedClient {
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    options: TimezoneClientOptions = {}
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
