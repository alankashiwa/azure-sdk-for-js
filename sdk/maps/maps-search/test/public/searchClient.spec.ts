// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure/test-utils";
import { assert } from "chai";
import { Context, Suite } from "mocha";
import { SearchClient } from "src/searchClient";
import { AuthMethod, createClient, createRecorder } from "./utils/createClient";

matrix([["SubscriptionKey", "AAD"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] SearchClient`, function(this: Suite) {
    let recorder: Recorder;
    let client: SearchClient;
    const CLITimeout = this.timeout();
    const fastTimeout = 10000;

    beforeEach(function(this: Context) {
      recorder = createRecorder(this);
      client = createClient(authMethod);
    });

    afterEach(async function() {
      await recorder.stop();
    });

    describe("fast tests", function() {
      before(function(this: Context) {
        this.timeout(fastTimeout);
      });
      describe("#listPolygons", function() {
        it("throws error on empty geometryIds array", async function() {
          return assert.isRejected(client.listPolygons([]), /non-empty array/);
        });
        it("accepts string[]", async function() {
          // TODO: Come up with test data
          const geometryId: string[] = [];
          const results = await client.listPolygons(geometryId);
          assert.equal(results.polygons?.length, geometryId.length);
          // TODO: Assert the OK results
        });
      });
      xdescribe("#fuzzySearch", function() {});
      xdescribe("#searchPointOfInterest", function() {});
      xdescribe("#searchNearbyPointOfInterest", function() {});
      xdescribe("#searchPointOfInterestCategory", function() {});
      xdescribe("#getPointOfInterestCategoryTree", function() {});
      xdescribe("#searchAddress", function() {});
      xdescribe("#reverseSearchAddress", function() {});
      xdescribe("#reverseSearchCrossStreetAddress", function() {});
      xdescribe("#searchStructuredAddress", function() {});
      xdescribe("#searchInsideGeometry", function() {});
      xdescribe("#searchAlongRoute", function() {});
      xdescribe("#fuzzySearchBatchSync", function() {});
      xdescribe("#searchAddressBatchSync", function() {});
      xdescribe("#reverseSearchAddressBatchSync", function() {});
    });
    describe("LROs", function() {
      //const pollingInterval = isPlaybackMode() ? 0 : 2000;

      before(function(this: Context) {
        this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
      });
      xdescribe("#beginFuzzySearchBatch", function() {});
      xdescribe("#beginSearchAddressBatch", function() {});
      xdescribe("#beginReverseSearchAddressBatch", function() {});
    });
  });
});
