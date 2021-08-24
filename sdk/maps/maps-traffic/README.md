# Azure Maps Traffic client library for JavaScript/TypeScript

The Azure Maps Traffic Service is a set of RESTful APIs designed to help developers design mobility solutions that improve travel time and avoid gridlock. It offer multiple alternate routes around traffic jams, insight into the length of the backup and the time it takes to get through it, and a faster travel experience during rush hour.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Maps Traffic client.


[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-traffic) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-traffic) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/maps-traffic) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-traffic/samples) |
[Product Information](https://docs.microsoft.com/en-us/rest/api/maps/traffic)

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

### Install the `@azure/maps-traffic` package

Install the Azure Maps Traffic client library with `npm`:

```bash
npm install @azure/maps-traffic
```

### Create and authenticate a `TrafficClient`

To create a client object to access the Azure Maps Traffic API, you will need a `credential` object. The Azure Maps Traffic client can use an Azure Active Directory credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { TrafficClient } = require("@azure/maps-traffic");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new TrafficClient(new DefaultAzureCredential(), { xMsClientId: '<maps-client-id>' });
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscriptiion Key. Please install the `@azure/core-auth` package:

```bash
npm install @azure/core-auth
```

```javascript
const { TrafficClient } = require("@azure/maps-traffic");
const { AzureKeyCredential } = require("@azure/core-auth");
const client = new TrafficClient(new AzureKeyCredential('<subscription-key>'));
```

## Key concepts

### TrafficClient

`TrafficClient` is the primary interface for developers using the Azure Maps Traffic client library. Explore the methods on this client object to understand the different features of the Azure Maps Traffic service that you can access.

## Examples
The following sections provide several code snippets covering some of the most common Azure Maps Traffic tasks, including:
- [Request traffic information of the road fragment](#request-traffic-information-of-the-road-fragment)
- [Request traffic flow tile](#request-traffic-flow-tile)
- [Request traffic incident tile](#request-traffic-incident-tile)

### Request traffic information of the road fragment

This service provides information about the speeds and travel times of the road fragment closest to the given coordinates. It is designed to work alongside the Flow layer of the Render Service to support clickable flow data visualizations.

```javascript
  const credential = new DefaultAzureCredential();
  const client = new TrafficClient(credential, { xMsClientId: '<maps-client-id>' }).traffic;
  const response = await client.getTrafficFlowSegment(
    "json",
    "absolute",
    10,
    "52.41072,4.84239"
  );
```
Response
```yaml
{
  "flowSegmentData": {
    "frc": "FRC3",
    "currentSpeed": 55,
    "freeFlowSpeed": 55,
    "currentTravelTime": 175,
    "freeFlowTravelTime": 175,
    "confidence": 1,
    "coordinates": {
      "coordinate": [
        { "latitude": 52.40183231336056, "longitude": 4.849252708696554 },
        { "latitude": 52.401924990696955, "longitude": 4.849053979358899 },
        { "latitude": 52.40203698518244, "longitude": 4.848813378217727 },
        { "latitude": 52.40214263506514, "longitude": 4.848573909201235 },
        { "latitude": 52.4023046145239, "longitude": 4.848227444360418 },
        { "latitude": 52.402462971056, "longitude": 4.847878215114321 },
        { "latitude": 52.40258688093721, "longitude": 4.847606653801279 },
        { "latitude": 52.402679371176106, "longitude": 4.8474098097837555 },
        { "latitude": 52.40276008735337, "longitude": 4.847236894406791 },
        ...
      ]
    },
    "version": "traffic-service-flow 1.0.014",
    "roadClosure": false
  }
}

```
### Request traffic flow tile

The service serves 256 x 256 pixel tiles showing traffic flow. All tiles use the same grid system. Because the traffic tiles use transparent images, they can be layered on top of map tiles to create a compound display. 

```javascript
  const credential = new DefaultAzureCredential();
  const client = new TrafficClient(credential, { xMsClientId: '<maps-client-id>' }).traffic;
  const response = await client.getTrafficFlowTile(
    "png",
    "absolute",
    12,
    2044,
    1360
  );
```

The response will contain the traffic flow tile based on the request parameters.

### Request traffic incident tile

```javascript
  const credential = new DefaultAzureCredential();
  const client = new TrafficClient(credential, { xMsClientId: '<maps-client-id>' }).traffic;
  const response = await client.getTrafficIncidentTile("png", "night", 10, 175, 408);
```

The response will contain the traffic incident tile based on the request parameters.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-traffic/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-traffic%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
