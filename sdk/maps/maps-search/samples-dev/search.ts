// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Search API usage. Simple queries are performed.
 */

import { DefaultAzureCredential } from "@azure/identity";
import * as coreAuth from "@azure/core-auth";
import * as coreClient from "@azure/core-client";
import {
  SearchClient,
  SearchAlongRouteRequest,
  SearchInsideGeometryRequest
} from "@azure/maps-search";
import * as dotenv from "dotenv";
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
class EmptyTokenCredential implements coreAuth.TokenCredential {
  async getToken(
    _scopes: string | string[],
    _options?: coreAuth.GetTokenOptions
  ): Promise<coreAuth.AccessToken | null> {
    return {
      token: "token",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000
    };
  }
}

async function main() {
  let credential: coreAuth.TokenCredential;
  let operationOptions: coreClient.OperationOptions = {};

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

  const search = new SearchClient(credential).search;

  console.log(" --- Get search address:");
  console.log(await search.searchAddress("json", "400 Broad, Seattle", operationOptions));

  console.log(" --- Get search address reverse:");
  console.log(await search.reverseSearchAddress("json", [47.59118, -122.3327], operationOptions));

  console.log(" --- Get search address reverse cross street:");
  console.log(
    await search.reverseSearchCrossStreetAddress("json", [47.59118, -122.3327], operationOptions)
  );

  console.log(" --- Get search address structured:");
  const searchAddressStructuredOptions = {
    countryCode: "US",
    streetNumber: "15127",
    streetName: "NE 24th Street",
    municipality: "Redmond",
    countrySubdivision: "WA",
    postalCode: "98052"
  };
  console.log(
    await search.searchStructuredAddress("json", {
      ...searchAddressStructuredOptions,
      ...operationOptions
    })
  );

  console.log(" --- Get search fuzzy:");
  const fuzzyResult = await search.fuzzySearch("json", "pizza", {
    countryFilter: ["Brazil"],
    ...operationOptions
  });
  console.log(fuzzyResult);

  // let's save geometry IDs from the fuzzy search for the getSearchPolygon example
  let geometries: string[] = [];
  fuzzyResult.results?.forEach((res) => geometries.push(res.dataSources?.geometry?.id!));

  console.log(" --- Get search nearby:");
  const searchNearbyOptions = { radius: 8046 };
  console.log(
    await search.searchNearbyPointOfInterest("json", 40.70627, -74.011454, {
      ...searchNearbyOptions,
      ...operationOptions
    })
  );

  console.log(" --- Get search POI:");
  const searchPOIOptions = {
    limit: 5,
    lat: 47.606038,
    lon: -122.333345,
    radius: 8046
  };
  console.log(
    await search.searchPointOfInterest("json", "juice bars", {
      ...searchPOIOptions,
      ...operationOptions
    })
  );

  console.log(" --- Get search POI category:");
  const searchPOICategoryOptions = {
    skip: 5,
    lat: 47.606038,
    lon: -122.333345,
    radiusInMeters: 8046
  };
  console.log(
    await search.searchPointOfInterestCategory("json", "atm", {
      ...searchPOICategoryOptions,
      ...operationOptions
    })
  );

  console.log(" --- Get search POI category tree:");
  console.log(await search.getPointOfInterestCategoryTree("json", operationOptions));

  console.log(" --- Get search polygon:");
  console.log(await search.getPolygon("json", geometries, operationOptions));

  console.log(" --- Post search address batch:");
  const searchAddressBatchRequestBody = {
    batchItems: [
      {
        query: "?query=400 Broad St, Seattle, WA 98109&limit=3"
      },
      {
        query: "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"
      },
      {
        query: "?query=350 5th Ave, New York, NY 10118&limit=1"
      }
    ]
  };
  console.log(
    await search.beginSearchAddressBatchAndWait(
      "json",
      searchAddressBatchRequestBody,
      operationOptions
    )
  );

  console.log(" --- Post search address reverse batch:");
  const searchAddressReverseBatchRequestBody = {
    batchItems: [
      {
        query: "?query=48.858561,2.294911"
      },
      {
        query: "?query=47.639765,-122.127896&radius=5000&limit=2"
      },
      {
        query: "?query=47.621028,-122.348170"
      }
    ]
  };
  console.log(
    await search.beginReverseSearchAddressBatchAndWait(
      "json",
      searchAddressReverseBatchRequestBody,
      operationOptions
    )
  );

  console.log(" --- Post search fuzzy batch:");
  const searchFuzzyBatchRequestBody = {
    batchItems: [
      {
        query: "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"
      },
      {
        query: "?query=Statue Of Liberty&limit=2"
      },
      {
        query: "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"
      }
    ]
  };
  console.log(
    await search.beginFuzzySearchBatchAndWait("json", searchFuzzyBatchRequestBody, operationOptions)
  );

  console.log(" --- Post search along route:");
  const searchAlongRouteOptions = { limit: 2 };
  const searchAlongRouteRequest: SearchAlongRouteRequest = {
    route: {
      type: "LineString",
      coordinates: [
        [-122.143035, 47.653536],
        [-122.187164, 47.617556],
        [-122.114981, 47.570599],
        [-122.132756, 47.654009]
      ]
    }
  };
  console.log(
    await search.searchAlongRoute("json", "burger", 1000, searchAlongRouteRequest, {
      ...searchAlongRouteOptions,
      ...operationOptions
    })
  );

  console.log(" --- Post search inside geometry:");
  const searchInsideGeometryOptions = { limit: 2 };
  const searchInsideGeometryRequest: SearchInsideGeometryRequest = {
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-122.43576049804686, 37.7524152343544],
          [-122.43301391601562, 37.70660472542312],
          [-122.36434936523438, 37.712059855877314],
          [-122.43576049804686, 37.7524152343544]
        ]
      ]
    }
  };
  console.log(
    await search.searchInsideGeometry("json", "burger", searchInsideGeometryRequest, {
      ...searchInsideGeometryOptions,
      ...operationOptions
    })
  );
}

main();
