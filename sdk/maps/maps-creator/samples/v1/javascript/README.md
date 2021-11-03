---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-maps
  - creator
urlFragment: maps-creator-javascript
---

# Azure Maps Creator client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Maps Creator in some common scenarios.

| **File Name**                   | **Description**                                                             |
| ------------------------------- | --------------------------------------------------------------------------- |
| [alias.js][alias]               | Demonstrates Alias API usage. Simple CRUD operations are performed.         |
| [conversion.js][conversion]     | Demonstrates Conversion API usage. Simple CRUD operations are performed.    |
| [data.js][data]                 | Demonstrates Data API usage. Simple CRUD operations are performed.          |
| [dataset.js][dataset]           | Demonstrates Dataset API usage. Simple CRUD operations are performed.       |
| [featurestate.js][featurestate] | Demonstrates Feature State API usage. Simple CRUD operations are performed. |
| [spatial.js][spatial]           | Demonstrates Spatial API usage. Simple queries are performed.               |
| [tileset.js][tileset]           | Demonstrates Tileset API usage. Simple queries are performed.               |
| [wfs.js][wfs]                   | Demonstrates WFS API usage. Simple queries are performed.                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Maps Resource][createinstance_azuremapsresource]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node alias.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MAPS_SUBSCRIPTION_KEY="<maps subscription key>" MAPS_SUBSCRIPTION_KEY="<maps subscription key>" MAPS_CLIENT_ID="<maps client id>" MAPS_CLIENT_ID="<maps client id>" CREATOR_DWG_ZIP_UDID="<creator dwg zip udid>" node alias.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alias]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-creator/samples/v1/javascript/alias.js
[conversion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-creator/samples/v1/javascript/conversion.js
[data]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-creator/samples/v1/javascript/data.js
[dataset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-creator/samples/v1/javascript/dataset.js
[featurestate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-creator/samples/v1/javascript/featurestate.js
[spatial]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-creator/samples/v1/javascript/spatial.js
[tileset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-creator/samples/v1/javascript/tileset.js
[wfs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-creator/samples/v1/javascript/wfs.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/maps-creator
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://docs.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-creator/README.md
