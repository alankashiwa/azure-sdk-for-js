# Azure Maps Creator client library for JavaScript/TypeScript

Azure Maps Creator includes a set of capabilities that allow an enterprise to securely create and use indoor maps that dynamically change as new events in spaces occur. The data is not used to improve Azure Maps, customers own and are in full control of the created map content, including defining how to secure access using Azure Maps authentication and authorization options. You can develop solutions for the general public or for selected authenticated users for virtually any indoor space such as offices, stores, factories, and hospitals for facility management, occupant and guest experiences, productivity tools, and more.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Maps Creator client.

APIs for managing aliases in Azure Maps.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-creator) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-creator) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/maps-creator) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-creator/samples) |
[Product Information](https://docs.microsoft.com/en-us/azure/azure-maps/creator-indoor-maps)

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

### Install the `@azure/maps-creator` package

Install the Azure Maps Creator client library with `npm`:

```bash
npm install @azure/maps-creator
```

### Create and authenticate a `CreatorClient`

To create a client object to access the Azure Maps Creator API, you will need a `credential` object. The Azure Maps Creator client can use an Azure Active Directory credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { CreatorClient } = require("@azure/maps-creator");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new CreatorClient(new DefaultAzureCredential());
```

## Key concepts

### CreatorClient

`CreatorClient` is the primary interface for developers using the Azure Maps Creator client library. Explore the methods on this client object to understand the different features of the Azure Maps Creator service that you can access.

## Examples
The following sections provide several code snippets covering some of the most common Azure Maps Creator tasks, including:
- [Upload a Drawing package](#upload-a-drawing-package)
- [Convert a Drawing package](#convert-a-drawing-package)
- [Create indoor map data](#create-indoor-map-data)
- [Using indoor maps](#using-indoor-maps)
### Upload a Drawing package

Creator collects indoor map data by converting an uploaded Drawing package. The Drawing package represents a constructed or remodeled facility. For information about Drawing package requirements, see [Drawing package requirements](https://docs.microsoft.com/en-us/azure/azure-maps/drawing-requirements).

Use the code snippet below to upload a Drawing package using [Data Upload API](https://docs.microsoft.com/en-us/rest/api/maps/data-v2/update-preview). After the Drawing packing is uploaded, the Data Upload API returns a user data identifier (`udid`). The `udid` can then be used to convert the uploaded package into indoor map data.

```javascript
import fs from "fs";

const credential = new DefaultAzureCredential();
const operationOptions = {
  requestOptions: {
    customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
  }
};
const dataClient = new CreatorClient(credential).data;

// Perform the data upload
const filePathForZipUpload = "<dwg-zip-package>";
const response = await dataClient.beginUploadPreviewAndWait(
  "dwgzippackage",
  "application/octet-stream",
  fs.readFileSync(filePathForZipUpload),
  operationOptions
);

// Get the udid when the upload is complete
const zipUdid = await pollUntilOperationIsDone(() =>
  dataClient.getOperationPreview(uploadZipResult.operationId!, operationOptions)
);
```

Here is an example of the `pollUntilOperationIsDone` function implementation

```javascript
declare type LongRunningOperationResponse = LongRunningOperationResult & {
  /** If successful, a URI where details on the newly created resource can be found. */
  resourceLocation?: string;
};

export async function pollUntilOperationIsDone(
  operation: (...args: any[]) => Promise<LongRunningOperationResponse>
): Promise<string> {
  let operationResponse = await operation();
  console.log(operationResponse);
  while (operationResponse.status == "NotStarted" || operationResponse.status == "Running") {
    console.log("   --> operation status: " + operationResponse.status);
    await wait(5000); // wait for 5 seconds between each poll
    operationResponse = await operation();
    console.log(operationResponse);
  }
  if (operationResponse.status == "Failed") {
    console.log(operationResponse.error?.details);
    if (operationResponse.error?.details) console.log(operationResponse.error?.details[0].details);
    throw "Failed operation!";
  }

  // get resource ID from the response header "Resource-Location"
  const resourceId = operationResponse.resourceLocation?.match("[0-9A-Fa-f-]{36}")?.join();

  return Promise.resolve(resourceId!);
}
```

### Convert a Drawing package

The [Azure Maps Conversion service](https://docs.microsoft.com/en-us/rest/api/maps/v2/conversion) converts an uploaded Drawing package into indoor map data. The Conversion service also validates the package. Validation issues are classified into two types:

- `Errors`: If any errors are detected, the conversion process fails. When an error occurs, the Conversion service provides a link to the [Azure Maps Drawing Error Visualizer](https://docs.microsoft.com/en-us/azure/azure-maps/drawing-error-visualizer) stand-alone web application. You can use the Drawing Error Visualizer to inspect [Drawing package warnings and errors](https://docs.microsoft.com/en-us/azure/azure-maps/drawing-conversion-error-codes) that occurred during the conversion process. After you fix the errors, you can attempt to upload and convert the package.
- `Warnings`: If any warnings are detected, the conversion succeeds. However, we recommend that you review and resolve all warnings. A warning means that part of the conversion was ignored or automatically fixed. Failing to resolve the warnings could result in errors in later processes. For more information, see [Drawing package warnings and errors]((https://docs.microsoft.com/en-us/azure/azure-maps/drawing-conversion-error-codes).

```javascript
const credential = new DefaultAzureCredential();
const operationOptions = {
  requestOptions: {
    customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
  }
};
const conversionClient = new CreatorClient(credential).conversion;

// Perform the data conversion
const udid = "<udid-from-data-upload-result>";
const convertResult = await conversionClient.beginConvertAndWait(
  udid,
  "facility-2.0",
  operationOptions
);


// Get the conversion id until when the conversion is complete
const conversionId = await pollUntilOperationIsDone(() =>
  conversionClient.getOperation(convertResult.operationId!, operationOptions)
);
```


### Create indoor map data

Azure Maps Creator provides the following services that support map creation:

- [Dataset service](https://docs.microsoft.com/en-us/rest/api/maps/v2/dataset)
  - A dataset is a collection of indoor map features. The indoor map features represent facilities that are defined in a converted Drawing package. After you create a dataset with the Dataset service, you can create any number of [tilesets](https://docs.microsoft.com/en-us/azure/azure-maps/creator-indoor-maps#tilesets) or [feature statesets](https://docs.microsoft.com/en-us/azure/azure-maps/creator-indoor-maps#feature-statesets).
  - At any time, developers can use the Dataset service to add or remove facilities to an existing dataset.
- [Tileset service](https://docs.microsoft.com/en-us/rest/api/maps/v2/tileset)
  - A tileset is a collection of vector data that represents a set of uniform grid tiles. Developers can use the Tileset service to create tilesets from a dataset.
  - To reflect different content stages, you can create multiple tilesets from the same dataset. For example, you can make one tileset with furniture and equipment, and another tileset without furniture and equipment. You might choose to generate one tileset with the most recent data updates, and another tileset without the most recent data updates.
  - After a tileset is created, it can be retrieved by the [Render V2 service](https://docs.microsoft.com/en-us/azure/azure-maps/creator-indoor-maps#render-v2-get-map-tile-api).
- [Feature State service](https://docs.microsoft.com/en-us/rest/api/maps/v2/feature-state)
  - Feature statesets are collections of dynamic properties (states) that are assigned to dataset features, such as rooms or equipment. An example of a state can be temperature or occupancy. Each state is a key/value pair that contains the name of the property, the value, and the timestamp of the last update.
  - You can use the Feature State service to create and manage a feature stateset for a dataset. The stateset is defined by one or more states. Each feature, such as a room, can have one state attached to it.

Dataset Creation
```javascript
const credential = new DefaultAzureCredential();
const operationOptions = {
  requestOptions: {
    customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
  }
};
const datasetClient = new CreatorClient(credential).dataset;

// Perform the dataset creation
const conversionId = "<conversion-id-from-data-conversion>";
const createResult = await datasetClient.beginCreateAndWait(conversionId, operationOptions);


// Get the dataset id until when the creation is complete
const datasetId = await pollUntilOperationIsDone(() =>
  datasetClient.getOperation(createResult.operationId!, operationOptions)
);
```

Tileset Creation
```javascript
const credential = new DefaultAzureCredential();
const operationOptions = {
  requestOptions: {
    customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
  }
};
const tilesetClient = new CreatorClient(credential).tileset;

// Perform the dataset creation
const datasetId = "<dataset-id-from-dataset-creation>";
const createResult = await tilesetClient.beginCreateAndWait(datasetId, operationOptions);


// Get the dataset id until when the creation is complete
const tilesetId = await pollUntilOperationIsDone(() =>
  tilesetClient.getOperation(createResult.operationId!, operationOptions)
);
```

Feature State Creation and Retrieval
```javascript
const credential = new DefaultAzureCredential();
const operationOptions = {
  requestOptions: {
    customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
  }
};
const featureStateClient = new CreatorClient(credential).featureState;

// Perform the feature state set creation
const datasetId = "<dataset-id-from-dataset-creation>";
const createResult = await featureStateClient.createStateset(
  datasetId,
  {
    styles: [
      {
        keyName: "occupied",
        type: "boolean",
        rules: [
          {
            true: "#FF0000",
            false: "#00FF00"
          }
        ]
      }
    ]
  },
  operationOptions
);;


// Retrieve the current states of the feature
const statesetId = createResult.statesetId;
const currentFeatureState = await featureStateClient.getStateset(statesetId!, operationOptions);
```

### Using indoor maps

The Azure Maps [Render V2-Get Map Tile API](https://docs.microsoft.com/en-us/rest/api/maps/render-v2/get-map-tile) has been extended to support Creator tilesets.

Applications can use the Render V2-Get Map Tile API to request tilesets. The tilesets can then be integrated into a map control or SDK. 
- For an example of a map control that uses the Render V2 service, see [Indoor Maps Module](https://docs.microsoft.com/en-us/azure/azure-maps/creator-indoor-maps#indoor-maps-module).
- To use the Azure Maps Render SDK to request indoor maps tilesets, please refer to the [Render SDK Readme](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-render/README.md).


## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-creator/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-creator%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
