// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Route API usage. Simple queries are performed.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { RouteClient } = require("@azure/maps-route");
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

  const route = new RouteClient(credential);

  console.log(" --- Get route directions:");
  console.log(
    await route.getRouteDirections("json", "51.368752,-0.118332:41.385426,-0.128929", {
      vehicleWidth: 2,
      vehicleHeight: 2,
      isCommercialVehicle: true,
      vehicleLoadType: "USHazmatClass1",
      travelMode: "truck",
      ...operationOptions
    })
  );

  console.log(" --- Get route range:");
  const routeRangeOptions = { timeBudgetInSec: 6000 };
  console.log(
    await route.getRouteRange("json", [50.97452, 5.86605], {
      ...routeRangeOptions,
      ...operationOptions
    })
  );

  console.log(" --- Post route directions:");
  const routeDirectionParameters = {
    supportingPoints: {
      type: "GeometryCollection",
      geometries: [
        {
          type: "Point",
          coordinates: [13.42936, 52.5093]
        },
        {
          type: "Point",
          coordinates: [13.42859, 52.50844]
        }
      ]
    },
    avoidVignette: ["AUS", "CHE"],
    avoidArea: {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-122.39456176757811, 47.489368981370724],
            [-122.00454711914061, 47.489368981370724],
            [-122.00454711914061, 47.65151268066222],
            [-122.39456176757811, 47.65151268066222],
            [-122.39456176757811, 47.489368981370724]
          ]
        ],
        [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ]
        ]
      ]
    }
  };
  console.log(
    await route.getRouteDirectionsWithAdditionalParameters(
      "json",
      "52.50931,13.42936:52.50274,13.43872",
      routeDirectionParameters,
      operationOptions
    )
  );

  console.log(" --- Post route directions batch:");
  const routeDirectionsBatchQueries = {
    batchItems: [
      {
        query:
          "?query=47.639987,-122.128384:47.621252,-122.184408:47.596437,-122.332000&routeType=fastest&travelMode=car&maxAlternatives=99"
      },
      {
        query:
          "?query=47.620659,-122.348934:47.610101,-122.342015&travelMode=bicycle&routeType=eco&traffic=false"
      },
      {
        query:
          "?query=40.759856,-73.985108:40.771136,-73.973506&travelMode=pedestrian&routeType=shortest"
      }
    ]
  };
  console.log(
    await route.beginRequestRouteDirectionsBatchAndWait(
      "json",
      routeDirectionsBatchQueries,
      operationOptions
    )
  );

  console.log(" --- Post route matrix:");
  const routeMatrixQuery = {
    origins: {
      type: "MultiPoint",
      coordinates: [
        [4.85106, 52.36006],
        [4.85056, 52.36187]
      ]
    },
    destinations: {
      type: "MultiPoint",
      coordinates: [
        [4.85003, 52.36241],
        [13.42937, 52.50931]
      ]
    }
  };
  console.log(
    await route.beginRequestRouteMatrixAndWait("json", routeMatrixQuery, operationOptions)
  );
}

main();
