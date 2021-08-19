# Azure Maps Elevation client library for JavaScript/TypeScript

The Azure Maps Elevation service provides APIs to query elevation data anywhere on the earth's surface. You can request sampled elevation data along paths, within a defined bounding box, or at specific coordinates. Also, you can use the [Render V2 - Get Map Tile API](https://docs.microsoft.com/en-us/rest/api/maps/render-v2) to retrieve elevation data in tile format. The tiles are delivered in GeoTIFF raster format.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Maps Elevation client.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-elevation) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-elevation) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/maps-elevation) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-elevation/samples) |
[Product Information](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-request-elevation-data)

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

### Install the `@azure/maps-elevation` package

Install the Azure Maps Elevation client library for JavaScript with `npm`:

```bash
npm install @azure/maps-elevation
```

### Create and authenticate a `ElevationClient`

To create a client object to access the Azure Maps Elevation API, you will need a `credential` object. The Azure Maps Elevation client can use an Azure Active Directory credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { ElevationClient } = require("@azure/maps-elevation");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new ElevationClient(new DefaultAzureCredential(), { xMsClientId: '<maps-client-id>' });
```
#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscriptiion Key. Please install the `@azure/core-auth` package:

```bash
npm install @azure/core-auth
```

```javascript
const { ElevationClient } = require("@azure/maps-elevation");
const { AzureKeyCredential } = require("@azure/core-auth");
const client = new ElevationClient(new AzureKeyCredential('<subscription-key>'));
```

## Key concepts

### ElevationClient

`ElevationClient` is the primary interface for developers using the Azure Maps Elevation client library. Explore the methods on this client object to understand the different features of the Azure Maps Elevation service that you can access.

## Examples
The following sections provide several code snippets covering some of the most common Azure Maps Elevation tasks, including:

- [Request elevation data for points](#request-elevation-data-for-points)
- [Request elevation data samples along a Polyline](#request-elevation-data-samples-along-a-polyline)
- [Request elevation data by Bounding Box](#request-elevation-data-by-bounding-box)

### Request elevation data for points

You can request elevation data using the coordinates. Latitudes and longitudes are expected to be in WGS84 (World Geodetic System) decimal degree.

```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const client = new ElevationClient(credential, { xMsClientId: '<maps-client-id>' }).elevation;
  const response = await client.getDataForPoints(
    "json",
    ["-121.66853362143818,46.84646479863713", "-121.65853362143818,46.85646479863713"],
    operationOptions
  )
```
Response
```yaml
{
  "data": [
    {
      "coordinate": { "latitude": 46.84646479863713, "longitude": -121.66853362143819 },
      "elevationInMeter": 2298.65819
    },
    {
      "coordinate": { "latitude": 46.85646479863713, "longitude": -121.65853362143818 },
      "elevationInMeter": 1988.36315
    }
  ]
}

```
### Request elevation data samples along a Polyline
You can request elevation data samples along a straight line. Both coordinates must be defined in longitude/latitude format. If you don't specify a value for the samples parameter, the number of samples defaults to 10. The maximum number of samples is 2,000.

```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const client = new ElevationClient(credential, { xMsClientId: '<maps-client-id>' }).elevation;
  const response = await client.getDataForPolyline(
    "json",
    ["-121.66853362143818,46.84646479863713", "-121.65853362143818,46.85646479863713"],
    operationOptions
  )
```

Response
```yaml
{
  "data": [
    {
      "coordinate": { "latitude": 46.84646479863713, "longitude": -121.66853362143819 },
      "elevationInMeter": 2298.65819
    },
    {
      "coordinate": { "latitude": 46.84757590974824, "longitude": -121.66742251032707 },
      "elevationInMeter": 2330.53627
    },
    {
      "coordinate": { "latitude": 46.84868702085935, "longitude": -121.66631139921596 },
      "elevationInMeter": 2298.10707
    },
    {
      "coordinate": { "latitude": 46.84979813197046, "longitude": -121.66520028810486 },
      "elevationInMeter": 2266.74946
    },
    {
      "coordinate": { "latitude": 46.850909243081574, "longitude": -121.66408917699374 },
      "elevationInMeter": 2258.03966
    },
    {
      "coordinate": { "latitude": 46.85202035419268, "longitude": -121.66297806588263 },
      "elevationInMeter": 2209.64516
    },
    {
      "coordinate": { "latitude": 46.8531314653038, "longitude": -121.66186695477151 },
      "elevationInMeter": 2083.25575
    },
    {
      "coordinate": { "latitude": 46.854242576414904, "longitude": -121.66075584366041 },
      "elevationInMeter": 2033.04355
    },
    {
      "coordinate": { "latitude": 46.85535368752602, "longitude": -121.6596447325493 },
      "elevationInMeter": 2016.0694
    },
    {
      "coordinate": { "latitude": 46.85646479863713, "longitude": -121.65853362143818 },
      "elevationInMeter": 1988.36315
    }
  ]
}
```
### Request elevation data by Bounding Box
You can request elevation data by a bounding box. The elevation data will be returned at equally spaced locations within a bounding box. The bounding area is defined by two sets of latitude/longitude coordinates (south latitude, west longitude | north latitude, east longitude) and is divided into rows and columns. The edges of the bounding box account for two of the rows and two of the columns. Elevations are returned for the grid vertices created at row and column intersections. Up to 2000 elevations can be returned in a single request.

```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const client = new ElevationClient(credential, { xMsClientId: '<maps-client-id>' }).elevation;
  const response = await client.getDataForBoundingBox(
    "json",
    ["-121.66853362143818", "46.84646479863713", "-121.65853362143818", "46.85646479863713"],
    3,
    3,
    operationOptions
  )
```

Response
```yaml
{
  "data": [
    {
      "coordinate": { "latitude": 46.84646479863713, "longitude": -121.66853362143819 },
      "elevationInMeter": 2298.65819
    },
    {
      "coordinate": { "latitude": 46.84646479863713, "longitude": -121.66353362143818 },
      "elevationInMeter": 2257.62784
    },
    {
      "coordinate": { "latitude": 46.84646479863713, "longitude": -121.65853362143818 },
      "elevationInMeter": 2133.17568
    },
    {
      "coordinate": { "latitude": 46.851464798637124, "longitude": -121.66853362143819 },
      "elevationInMeter": 2370.3053
    },
    {
      "coordinate": { "latitude": 46.851464798637124, "longitude": -121.66353362143818 },
      "elevationInMeter": 2247.90366
    },
    {
      "coordinate": { "latitude": 46.851464798637124, "longitude": -121.65853362143818 },
      "elevationInMeter": 2124.02787
    },
    {
      "coordinate": { "latitude": 46.85646479863713, "longitude": -121.66853362143819 },
      "elevationInMeter": 2318.75315
    },
    {
      "coordinate": { "latitude": 46.85646479863713, "longitude": -121.66353362143818 },
      "elevationInMeter": 2100.20795
    },
    {
      "coordinate": { "latitude": 46.85646479863713, "longitude": -121.65853362143818 },
      "elevationInMeter": 1988.36315
    }
  ]
}
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

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-elevation/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-elevation%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
