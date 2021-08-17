import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { WeatherClient as GeneratedClient } from "./generated/weatherClient";
import { WeatherClientOptionalParams as WeatherClientOptions } from "./generated/models";
import { mapsTokenCredentialPolicy } from "./mapsTokenCredentialPolicy";
import { mapsAzureKeyCredentialPolicy } from "./mapsAzureKeyCredentialPolicy";
import { EmptyTokenCredential } from "./emptyTokenCredential";

export class WeatherClient extends GeneratedClient {
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    options: WeatherClientOptions = {}
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
