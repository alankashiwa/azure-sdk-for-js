// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Render API usage. Simple queries are performed.
 */

const fs = require("fs");
const { DefaultAzureCredential } = require("@azure/identity");
const { RenderClient } = require("@azure/maps-render");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Azure Maps supports two ways to authenticate requests:
 * - Shared Key authentication (subscription-key)
 * - Azure Active Directory (Azure AD) authentication
 *
 * In this sample you can put MAPS_SUBSCRIPTION_KEY into .env file to use the first approach or populate
 * the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for trying out AAD auth.
 *
 * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
 */

/**
 * Empty token class definition. To be used with AzureKey credentials.
 */
class EmptyTokenCredential {
  async getToken(_scopes, _options) {
    return {
      token: "token",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000
    };
  }
}

async function main() {
  let credential;
  let operationOptions = {};

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    credential = new EmptyTokenCredential();
    operationOptions.requestOptions = {
      customHeaders: { "subscription-key": process.env.MAPS_SUBSCRIPTION_KEY }
    };
  } else {
    // Use Azure AD authentication
    credential = new DefaultAzureCredential();
    if (process.env.MAPS_CLIENT_ID) {
      operationOptions.requestOptions = {
        customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
      };
    }
  }

  let render = new RenderClient(credential);

  console.log(" --- Get copyright caption:");
  console.log(await render.getCopyrightCaption("json", operationOptions));

  console.log(" --- Get copyright for tile:");
  let tileIndex = { z: 6, x: 9, y: 22 };
  console.log(await render.getCopyrightForTile("json", tileIndex, operationOptions));

  console.log(" --- Get copyright for world:");
  console.log(await render.getCopyrightForWorld("json", operationOptions));

  console.log(" --- Get copyright from bounding box:");
  const boundingBox = { southWest: [52.41064, 4.84228], northEast: [52.41072, 4.84239] };
  console.log(await render.getCopyrightFromBoundingBox("json", boundingBox, operationOptions));

  if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");

  const statesetId = process.env.CREATOR_STATESET_ID;
  if (typeof statesetId === "string" && statesetId.length == 36) {
    console.log(" --- Get map state tile:");
    let result = await render.getMapStateTile(statesetId, tileIndex, operationOptions);
    // use result.blobBody for Browser, readableStreamBody for Node.js:
    result.readableStreamBody?.pipe(fs.createWriteStream("tmp/state_tile.pbf"));
  }

  console.log(" --- Get map static image:");
  const mapStaticImageOptions = {
    layer: "basic",
    style: "dark",
    zoom: 2,
    boundingBox: [1.355233, 42.982261, 24.980233, 56.526017]
  };
  let result = await render.getMapStaticImage("png", {
    ...mapStaticImageOptions,
    ...operationOptions
  });
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  result.readableStreamBody?.pipe(fs.createWriteStream("tmp/static_image.png"));

  console.log(" --- Get map tile v2:");
  const mapTileOptions = { tileSize: "512" };
  result = await render.getMapTileV2("microsoft.base", tileIndex, {
    ...mapTileOptions,
    ...operationOptions
  });
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  result.readableStreamBody?.pipe(fs.createWriteStream("tmp/tile_v2.vector.pbf"));

  console.log(" --- Get attribution:");
  const attribution = await render.getMapAttribution(
    "microsoft.base",
    6,
    [-122.414162, 47.57949, -122.247157, 47.668372],
    operationOptions
  );
  console.log(attribution);

  console.log(" --- Get tileset metadata:");
  const metadata = await render.getMapTileset("microsoft.base", operationOptions);
  console.log(metadata);
}

main();
