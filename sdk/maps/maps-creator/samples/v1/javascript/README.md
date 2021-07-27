---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: maps-creator-javascript
---

# Azure Maps Creator client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Maps Creator in some common scenarios.

| **File Name**                   | **Description**                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [alias.js][alias]               | Manages aliases of the data uploaded using [Data API][data].                                                                         |
| [conversion.js][conversion]     | Converts DWG ZIP packages uploaded using [Data API][data].                                                                           |
| [data.js][data]                 | Uploads both GeoJSON files for [Spatial API][spatial] and DWG ZIP packages for [Conversion][conversion] and [Dataset][dataset] APIs. |
| [dataset.js][dataset]           | Creates dataset from converted DWG ZIP file.                                                                                         |
| [featurestate.js][featurestate] | Manages states of the features of the given dataset.                                                                                 |
| [spatial.js][spatial]           | Operations for geospatial calculations.                                                                                              |
| [tileset.js][tileset]           | Manages tileset used for rendering the dataset.                                                                                      |
| [wfs.js][wfs]                   | The Web Feature Service API that manages features and feature collections within the dataset.                                        |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] to run these sample programs.

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
node data.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MAPS_SUBSCRIPTION_KEY="<subscription-key>" node data.js
```

[alias]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/javascript/src/alias.js
[conversion]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/javascript/src/conversion.js
[data]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/javascript/src/data.js
[dataset]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/javascript/src/dataset.js
[featurestate]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/javascript/src/featurestate.js
[spatial]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/javascript/src/spatial.js
[tileset]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/javascript/src/tileset.js
[wfs]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/javascript/src/wfs.js
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-creator/README.md
