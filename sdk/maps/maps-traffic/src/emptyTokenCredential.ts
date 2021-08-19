import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

export class EmptyTokenCredential implements TokenCredential {
  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return {
      token: "token",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000
    };
  }
}
