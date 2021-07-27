---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: maps-creator-typescript
---

# Azure Maps Creator client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Maps Creator in some common scenarios.

| **File Name**                   | **Description**                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [alias.ts][alias]               | Manages aliases of the data uploaded using [Data API][data].                                                                         |
| [conversion.ts][conversion]     | Converts DWG ZIP packages uploaded using [Data API][data].                                                                           |
| [data.ts][data]                 | Uploads both GeoJSON files for [Spatial API][spatial] and DWG ZIP packages for [Conversion][conversion] and [Dataset][dataset] APIs. |
| [dataset.ts][dataset]           | Creates dataset from converted DWG ZIP file.                                                                                         |
| [featurestate.ts][featurestate] | Manages states of the features of the given dataset.                                                                                 |
| [spatial.ts][spatial]           | Operations for geospatial calculations.                                                                                              |
| [tileset.ts][tileset]           | Manages tileset used for rendering the dataset.                                                                                      |
| [wfs.ts][wfs]                   | The Web Feature Service API that manages features and feature collections within the dataset.                                        |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/data.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MAPS_SUBSCRIPTION_KEY="<subscription-key>" node dist/data.js
```

[alias]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/typescript/src/alias.ts
[conversion]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/typescript/src/conversion.ts
[data]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/typescript/src/data.ts
[dataset]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/typescript/src/dataset.ts
[featurestate]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/typescript/src/featurestate.ts
[spatial]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/typescript/src/spatial.ts
[tileset]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/typescript/src/tileset.ts
[wfs]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/maps/maps-creator/samples/v1/typescript/src/wfs.ts
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-creator/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
