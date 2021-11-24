// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Search API usage. Simple queries are performed.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  SearchClient,
  LatLong,
  GeoJsonLineString,
  GeoJsonPolygon,
  StructuredAddress
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

async function main() {
  let client: SearchClient;

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    const credential = new AzureKeyCredential(process.env.MAPS_SUBSCRIPTION_KEY);
    client = new SearchClient(credential);
  } else {
    // Use Azure AD authentication
    if (process.env.MAPS_CLIENT_ID) {
      const credential = new DefaultAzureCredential();
      const mapsClientId = process.env.MAPS_CLIENT_ID;
      client = new SearchClient(credential, mapsClientId);
    } else {
      throw Error("Cannot authenticate the client.");
    }
  }

  console.log(" --- Geocode address:");
  console.log(await client.searchAddress("400 Broad, Seattle"));

  console.log(" --- Reverse-geocode coordinate to address:");
  const coordinate = new LatLong(47.59118, -122.3327);
  console.log(await client.reverseSearchAddress(coordinate));

  console.log(" --- Reverse-geocode coordinate to cross street address:");
  console.log(await client.reverseSearchCrossStreetAddress(coordinate));

  console.log(" --- Geocode structured address:");
  const structuredAddress: StructuredAddress = {
    countryCode: "US",
    streetNumber: "15127",
    streetName: "NE 24th Street",
    municipality: "Redmond",
    countrySubdivision: "WA",
    postalCode: "98052"
  };
  console.log(await client.searchStructuredAddress(structuredAddress));

  console.log(" --- Perform a fuzzy search:");
  const fuzzyResult = await client.fuzzySearch("pizza", {
    countryFilter: ["Brazil"]
  });
  console.log(fuzzyResult);

  // let's save geometry IDs from the fuzzy search for the getSearchPolygon example
  let geometryIds: string[] = [];
  fuzzyResult.results?.forEach((res) => geometryIds.push(res.dataSources?.geometry?.id!));
  console.log(" --- Search nearby POI:");
  const searchNearbyCoordinate = new LatLong(40.70627, -74.011454);
  const searchNearbyOptions = { radiusInMeters: 8046 };
  console.log(
    await client.searchNearbyPointOfInterest(searchNearbyCoordinate, searchNearbyOptions)
  );

  console.log(" --- Search POI:");
  const searchPOIQuery = "juice bars";
  const searchPOIOptions = {
    top: 5,
    coordinate: new LatLong(47.606038, -122.333345),
    radiusInMeters: 8046
  };
  console.log(await client.searchPointOfInterest(searchPOIQuery, searchPOIOptions));

  console.log(" --- Search POI category:");
  const searchPOICategoryQuery = "atm";
  const searchPOICategoryOptions = {
    skip: 5,
    coordinate: new LatLong(47.606038, -122.333345),
    radiusInMeters: 8046
  };
  console.log(
    await client.searchPointOfInterestCategory(searchPOICategoryQuery, searchPOICategoryOptions)
  );

  console.log(" --- Get search POI category tree:");
  console.log(await client.getPointOfInterestCategoryTree());

  console.log(" --- List polygons by geometry IDs:");
  console.log(await client.listPolygons(geometryIds));

  console.log(" --- Search along route:");
  const searchALongRouteQuery = "burger";
  const maxDetourTime = 1000;

  const searchAlongRoute: GeoJsonLineString = {
    type: "LineString",
    coordinates: [
      [-122.143035, 47.653536],
      [-122.187164, 47.617556],
      [-122.114981, 47.570599],
      [-122.132756, 47.654009]
    ]
  };
  const searchAlongRouteOptions = { top: 2 };
  console.log(
    await client.searchAlongRoute(
      searchALongRouteQuery,
      maxDetourTime,
      searchAlongRoute,
      searchAlongRouteOptions
    )
  );

  console.log(" --- Search inside geometry:");
  const searchInsideGeometryQuery = "burger";
  const searchGeometry: GeoJsonPolygon = {
    type: "Polygon",
    coordinates: [
      [
        [-122.43576049804686, 37.7524152343544],
        [-122.43301391601562, 37.70660472542312],
        [-122.36434936523438, 37.712059855877314],
        [-122.43576049804686, 37.7524152343544]
      ]
    ]
  };
  const searchInsideGeometryOptions = { top: 2 };
  console.log(
    await client.searchInsideGeometry(
      searchInsideGeometryQuery,
      searchGeometry,
      searchInsideGeometryOptions
    )
  );

  const searchAddressBatchRequest = {
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
  console.log(" --- Search address batch:");
  console.log(await client.searchAddressBatchSync(searchAddressBatchRequest));

  console.log(" --- Search address batch (long-running):");
  let poller = await client.beginSearchAddressBatch(searchAddressBatchRequest);
  console.log(await poller.pollUntilDone());

  const searchAddressReverseBatchRequest = {
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

  console.log(" --- Search address reverse batch:");
  console.log(await client.reverseSearchAddressBatchSync(searchAddressBatchRequest));

  console.log(" --- Search address reverse batch (long-running):");
  poller = await client.beginReverseSearchAddressBatch(searchAddressReverseBatchRequest);
  console.log(await poller.pollUntilDone());

  const searchFuzzyBatchRequest = {
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

  console.log(" --- Search fuzzy batch:");
  console.log(await client.fuzzySearchBatchSync(searchFuzzyBatchRequest));

  console.log(" --- Search fuzzy batch (long-running):");
  poller = await client.beginFuzzySearchBatch(searchFuzzyBatchRequest);
  console.log(await poller.pollUntilDone());
}

main();
