# Azure Maps Geolocation client library for JavaScript/TypeScript

The Azure Maps Geolocation Service returns the ISO country code for the provided IP address. Developers can use this information to block or alter certain content based on geographical locations where the application is being viewed from.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Maps Geolocation client.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-geolocation) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-geolocation) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/maps-geolocation) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-geolocation/samples) |
[Product Information](https://docs.microsoft.com/en-us/rest/api/maps/geolocation)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure Maps account](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-account-keys). You can create the resource via [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<account-name>` of your choice, and select a proper [pricing tier](https://docs.microsoft.com/en-us/azure/azure-maps/choose-pricing-tier) based on your needs via the `<sku-name>` parameter. Please refer to [this page](https://docs.microsoft.com/en-us/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create) for more details.

```bash
az maps account create --resource-group <resource-group-name> --account-name <account-name> --sku <sku-name>
```

### Install the `@azure/maps-geolocation` package

Install the Azure Maps Geolocation client library with `npm`:

```bash
npm install @azure/maps-geolocation
```

### Create and authenticate a `GeolocationClient`

To create a client object to access the Azure Maps Geolocation API, you will need a `credential` object. The Azure Maps Timezone client can use an Azure Active Directory credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { GeolocationClient } = require("@azure/maps-geolocation");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new GeolocationClient(new DefaultAzureCredential());
```

## Key concepts

### GeolocationClient

`GeolocationClient` is the primary interface for developers using the Azure Maps Geolocation client library. Explore the methods on this client object to understand the different features of the Azure Geolocation service that you can access.

## Examples
The following sections provide several code snippets covering some of the most common Azure Maps Geolocation tasks, including:

- [Retrieve the ISO country code for the provided IP address](#retrieve-the-ISO-country-code-for-the-provided-IP-address)
### Retrieve the ISO country code for the provided IP address

```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const geolocation = new GeolocationClient(credential).geolocation;
  const response = await geolocation.getIPToLocationPreview("json", ipAddressToTest, operationOptions);
```
Response
```yaml
{ countryRegion: { isoCode: 'US' }, ipAddress: '8.8.8.8' }
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-geolocation/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-geolocation%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
