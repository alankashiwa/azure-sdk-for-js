import { TokenCredential, AzureKeyCredential, isTokenCredential } from "@azure/core-auth";
import { SearchClient } from "./generated/searchClient";
import {
  SearchGetSearchAddressOptionalParams as GetSearchAddressOptionalParams,
  SearchGetSearchAddressResponse as GetSearchAddressResponse,
  TextFormat
} from "./generated";
import { createMapsClientIdPolicy } from "./createClientIdPolicy";
import { createSubscriptionKeyPolicy } from "./createSubscriptionKeyPolicy";
import { EmptyTokenCredential } from "./emptyTokenCredential";

export class MapsSearchClientOptions {
  xMsClientId?: string;
}

export class MapsSearchClient {
  private readonly client: SearchClient;

  constructor(
    credential: TokenCredential | AzureKeyCredential,
    options: MapsSearchClientOptions = {}
  ) {
    if (isTokenCredential(credential)) {
      if (!options.xMsClientId) {
        throw Error("option: xMsClientId is needed for TokenCredential");
      }
      this.client = new SearchClient(credential, options);
      this.client.pipeline.addPolicy(createMapsClientIdPolicy(options.xMsClientId));
    } else {
      this.client = new SearchClient(new EmptyTokenCredential(), options);
      this.client.pipeline.addPolicy(createSubscriptionKeyPolicy(credential));
    }
  }

  getSearchAddress(
    format: TextFormat,
    query: string,
    options?: GetSearchAddressOptionalParams
  ): Promise<GetSearchAddressResponse> {
    return this.client.search.getSearchAddress(format, query, options);
  }
}
