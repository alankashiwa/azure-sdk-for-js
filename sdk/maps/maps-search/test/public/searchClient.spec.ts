// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure/test-utils";
import { Context, Suite } from "mocha";
import { AuthMethod, createRecorder } from "./utils/createClient";

matrix([["SubscriptionKey", "AAD"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] SearchClient`, function(this: Suite) {
    let recorder: Recorder;
    // let client: SearchClient;
    const CLITimeout = this.timeout();
    const fastTimeout = 10000;

    //let getId: () => string;

    beforeEach(function(this: Context) {
      recorder = createRecorder(this);
      //client = createClient(authMethod);
      //let nextId = 0;
      // getId = function() {
      //   nextId += 1;
      //   return nextId.toString();
      // };
    });

    afterEach(async function() {
      await recorder.stop();
    });

    describe("fast tests", function() {
      before(function(this: Context) {
        this.timeout(fastTimeout);
      });
      xdescribe("#listPolygons", function() {});
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
