// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Search API usage. Simple CRUD operations are performed.
 */

const fs = require("fs");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { SearchClient } = require("@azure/maps-search");
require("dotenv").config();

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

async function main() {
  let credential;
  let mapsClientId;

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    credential = new AzureKeyCredential(process.env.MAPS_SUBSCRIPTION_KEY);
  } else {
    // Use Azure AD authentication
    credential = new DefaultAzureCredential();
    mapsClientId = process.env.MAPS_CLIENT_ID;
  }

  const search = new SearchClient(credential, { xMsClientId: mapsClientId }).search;

  const filePathForPostSearchAddressBatch =
    "../../resources/search_address_batch_request_body.json";
  const filePathForPostSearchAddressReverseBatch =
    "../../resources/search_address_reverse_batch_request_body.json";
  const filePathForPostSearchFuzzyBatch = "../../resources/search_fuzzy_batch_request_body.json";
  const filePathForPostSearchAlongRoute = "../../resources/search_along_route_request_body.json";
  const filePathForPostSearchInsideGeometry =
    "../../resources/search_inside_geometry_request_body.json";

  console.log(" --- Get search address:");
  console.log(await search.getSearchAddress("json", "400 Broad, Seattle"));

  console.log(" --- Get search address reverse:");
  console.log(await search.getSearchAddressReverse("json", "47.591180,-122.332700"));

  console.log(" --- Get search address reverse cross street:");
  console.log(await search.getSearchAddressReverseCrossStreet("json", "47.591180,-122.332700"));

  console.log(" --- Get search address structured:");
  const searchAddressStructuredOptions = {
    countryCode: "US",
    streetNumber: "15127",
    streetName: "NE 24th Street",
    municipality: "Redmond",
    countrySubdivision: "WA",
    postalCode: "98052"
  };
  console.log(await search.getSearchAddressStructured("json", searchAddressStructuredOptions));

  console.log(" --- Get search fuzzy:");
  const fuzzyResult = await search.getSearchFuzzy("json", "pizza", { countrySet: ["Brazil"] });
  console.log(fuzzyResult);

  // let's save geometry IDs from the fuzzy search for the getSearchPolygon example
  let geometries = [];
  fuzzyResult.results.forEach((res) => geometries.push(res.dataSources.geometry.id));

  console.log(" --- Get search nearby:");
  const searchNearbyOptions = { radius: 8046 };
  console.log(await search.getSearchNearby("json", 40.70627, -74.011454, searchNearbyOptions));

  console.log(" --- Get search POI:");
  const searchPOIOptions = {
    limit: 5,
    lat: 47.606038,
    lon: -122.333345,
    radius: 8046
  };
  console.log(await search.getSearchPOI("json", "juice bars", searchPOIOptions));

  console.log(" --- Get search POI category:");
  const searchPOICategoryOptions = {
    limit: 5,
    lat: 47.606038,
    lon: -122.333345,
    radius: 8046
  };
  console.log(await search.getSearchPOICategory("json", "atm", searchPOICategoryOptions));

  console.log(" --- Get search POI category tree:");
  console.log(await search.getSearchPOICategoryTreePreview("json"));

  console.log(" --- Get search polygon:");
  console.log(await search.getSearchPolygon("json", geometries));

  console.log(" --- Post search address batch:");
  const postSearchAddressBatchPayload = JSON.parse(
    fs.readFileSync(filePathForPostSearchAddressBatch, "utf8")
  );
  console.log(
    await search.beginPostSearchAddressBatchAndWait("json", postSearchAddressBatchPayload)
  );

  console.log(" --- Post search address reverse batch:");
  const postSearchAddressReverseBatchPayload = JSON.parse(
    fs.readFileSync(filePathForPostSearchAddressReverseBatch, "utf8")
  );
  console.log(
    await search.beginPostSearchAddressReverseBatchAndWait(
      "json",
      postSearchAddressReverseBatchPayload
    )
  );

  console.log(" --- Post search fuzzy batch:");
  const postSearchFuzzyBatchPayload = JSON.parse(
    fs.readFileSync(filePathForPostSearchFuzzyBatch, "utf8")
  );
  console.log(await search.beginPostSearchFuzzyBatchAndWait("json", postSearchFuzzyBatchPayload));

  console.log(" --- Post search along route:");
  const searchAlongRouteOptions = { limit: 2 };
  const postSearchAlongRoutePayload = JSON.parse(
    fs.readFileSync(filePathForPostSearchAlongRoute, "utf8")
  );
  console.log(
    await search.postSearchAlongRoute(
      "json",
      "burger",
      1000,
      postSearchAlongRoutePayload,
      searchAlongRouteOptions
    )
  );

  console.log(" --- Post search inside geometry:");
  const searchInsideGeometryOptions = { limit: 2 };
  const postSearchInsideGeometryPayload = JSON.parse(
    fs.readFileSync(filePathForPostSearchInsideGeometry, "utf8")
  );
  console.log(
    await search.postSearchInsideGeometry(
      "json",
      "burger",
      postSearchInsideGeometryPayload,
      searchInsideGeometryOptions
    )
  );
}

main();
