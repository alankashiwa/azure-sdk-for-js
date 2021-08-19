# Azure Maps Timezone client library for JavaScript/TypeScript

The Azure Maps Timezone Service is a set of RESTful APIs designed to make it easy for users to see what time it is anywhere in the world.  Users can select a location to find the time zone, its offset to Coordinated Universal Time (UTC), and daylight saving time updates.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Maps Timezone client.


[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-timezone) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-timezone) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/maps-timezone) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-timezone/samples) |
[Product Information](https://docs.microsoft.com/en-us/rest/api/maps/timezone)

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

### Install the `@azure/maps-timezone` package

Install the Azure Maps Timezone client library with `npm`:

```bash
npm install @azure/maps-timezone
```

### Create and authenticate a `TimezoneClient`

To create a client object to access the Azure Maps Timezone API, you will need a `credential` object. The Azure Maps Timezone client can use an Azure Active Directory credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { TimezoneClient } = require("@azure/maps-timezone");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new TimezoneClient(new DefaultAzureCredential(), { xMsClientId: '<maps-client-id>' });
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscriptiion Key. Please install the `@azure/core-auth` package:

```bash
npm install @azure/core-auth
```

```javascript
const { TimezoneClient } = require("@azure/maps-timezone");
const { AzureKeyCredential } = require("@azure/core-auth");
const client = new TimezoneClient(new AzureKeyCredential('<subscription-key>'));
```

## Key concepts

### TimezoneClient

`TimezoneClient` is the primary interface for developers using the Azure Maps Timezone client library. Explore the methods on this client object to understand the different features of the Azure Timezone service that you can access.

## Examples
The following sections provide several code snippets covering some of the most common Azure Maps Timezone tasks, including:
- [Request timezone information by coordinates](#request-timezone-information-by-coordinates)
- [Request IANA timezone IDs](#request-IANA-timezone-IDs)
- [Request timezone information by ID](#request-timezone-information-by-ID)
### Request timezone information by coordinates

The service provides current, historical, and future time zone information for a specified latitude-longitude pair. In addition, it also provides sunset and sunrise times for a given location.

```javascript
  const credential = new DefaultAzureCredential();
  const client = new TimezoneClient(credential, { xMsClientId: '<maps-client-id>' }).timezone;
  const response = await client.getTimezoneByCoordinates("json", "47.0,-122", {
    ...timezoneByCoordinatesOptions,
    ...operationOptions
  })
```
Response
```yaml
{
  "version": "2021a",
  "referenceUtcTimestamp": "2021-08-19T01:49:53.262Z",
  "timeZones": [
    {
      "id": "America/Los_Angeles",
      "aliases": ["US/Pacific"],
      "countries": [{ "name": "United States", "code": "US" }],
      "names": {
        "iSO6391LanguageCode": "en",
        "generic": "Pacific Time",
        "standard": "Pacific Standard Time",
        "daylight": "Pacific Daylight Time"
      },
      "referenceTime": {
        "tag": "PDT",
        "standardOffset": "-08:00:00",
        "daylightSavings": "01:00:00",
        "wallTime": "2021-08-18T18:49:53.262733-07:00",
        "posixTzValidYear": 2021,
        "posixTz": "PST+8PDT,M3.2.0,M11.1.0",
        "sunrise": "2021-08-18T06:09:20.4971445-07:00",
        "sunset": "2021-08-18T20:14:22.3270802-07:00"
      },
      "representativePoint": { "latitude": 34.05222222222222, "longitude": -118.24277777777777 },
      "timeTransitions": [
        {
          "tag": "PDT",
          "standardOffset": "-08:00:00",
          "daylightSavings": "01:00:00",
          "utcStart": "2021-03-14T10:00:00.000Z",
          "utcEnd": "2021-11-07T09:00:00.000Z"
        },
        {
          "tag": "PST",
          "standardOffset": "-08:00:00",
          "daylightSavings": "00:00:00",
          "utcStart": "2021-11-07T09:00:00.000Z",
          "utcEnd": "2022-03-13T10:00:00.000Z"
        },
        {
          "tag": "PDT",
          "standardOffset": "-08:00:00",
          "daylightSavings": "01:00:00",
          "utcStart": "2022-03-13T10:00:00.000Z",
          "utcEnd": "2022-11-06T09:00:00.000Z"
        }
      ]
    }
  ]
}
```

### Request IANA timezone IDs

This service provides a full list of IANA time zone IDs. Updates to the IANA service will be reflected in the system within one day.

```javascript
  const credential = new DefaultAzureCredential();
  const client = new TimezoneClient(credential, { xMsClientId: '<maps-client-id>' }).timezone;
  const response = await client.getTimezoneEnumIana("json", operationOptions)
```
Response
```yaml
[
  {
    Id: 'Africa/Bamako',
    IsAlias: true,
    AliasOf: 'Africa/Abidjan',
    HasZone1970Location: true
  },
  {
    Id: 'Africa/Banjul',
    IsAlias: true,
    AliasOf: 'Africa/Abidjan',
    HasZone1970Location: true
  },
  ...
]
```
### Request timezone information by ID

This service provides current, historical, and future time zone information for the specified IANA time zone ID.

```javascript
  const credential = new DefaultAzureCredential();
  const client = new TimezoneClient(credential, { xMsClientId: '<maps-client-id>' }).timezone;
  const response = await client.getTimezoneByID("json", "Asia/Bahrain", {
    ...timezoneByIdOptions,
    ...operationOptions
  })
```
Response
```yaml
{
  "version": "2021a",
  "referenceUtcTimestamp": "2021-08-19T01:52:33.293Z",
  "timeZones": [
    {
      "id": "Asia/Qatar",
      "aliases": ["Asia/Bahrain"],
      "countries": [
        { "name": "Qatar", "code": "QA" },
        { "name": "Bahrain", "code": "BH" }
      ],
      "names": {
        "iSO6391LanguageCode": "en",
        "generic": "Arabian Time",
        "standard": "Arabian Standard Time",
        "daylight": "Arabian Daylight Time"
      },
      "referenceTime": {
        "tag": "+03",
        "standardOffset": "03:00:00",
        "daylightSavings": "00:00:00",
        "wallTime": "2021-08-19T04:52:33.2933702+03:00",
        "posixTzValidYear": 2021,
        "posixTz": "<+03>-3"
      },
      "representativePoint": { "latitude": 25.283333333333335, "longitude": 51.53333333333333 },
      "timeTransitions": [
        {
          "tag": "+03",
          "standardOffset": "03:00:00",
          "daylightSavings": "00:00:00",
          "utcStart": "1972-05-31T20:00:00.000Z",
          "utcEnd": "9999-12-31T23:59:59.999Z"
        }
      ]
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

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-timezone/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-timezone%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
