# Azure Maps Creator Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/maps-creator"
title: CreatorClient
description: Azure Maps Creator Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Creator/preview/2.0/alias.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Creator/preview/2.0/data.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Creator/preview/2.0/dataset.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Creator/preview/2.0/dwgconversion.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Creator/preview/2.0/featurestate.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Creator/preview/1.0/spatial.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Creator/preview/2.0/tileset.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Creator/preview/2.0/wfs.json
# Add credential for now. Will remove this when adding convenience layer
add-credentials: true
credential-default-policy-type: BearerTokenCredentialPolicy
credential-scopes: https://atlas.microsoft.com/.default
# add-credentials: false
override-client-name: GeneratedClient
package-version: 1.0.0-beta.1
disable-async-iterators: true
hide-clients: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.13"
```

## Customization for Track 2 Generator

### RouteDirectionParameters Transform

```yaml
directive:
  - from: swagger-document
    where: $.parameters.SearchGeofenceRequestBody.schema
    transform: >
      $ = {
        "type": "object"
      };
    reason: Autorest TS codegen does not deserialize array of base class objects as an operation parameter properly -> https://github.com/Azure/autorest.typescript/issues/1040
  - from: swagger-document
    where: $.parameters.ClosestPointRequestBody.schema
    transform: >
      $ = {
        "type": "object"
      };
    reason: Autorest TS codegen does not deserialize array of base class objects as an operation parameter properly -> https://github.com/Azure/autorest.typescript/issues/1040
  - from: swagger-document
    where: $.parameters.PointInPolygonRequestBody.schema
    transform: >
      $ = {
        "type": "object"
      };
    reason: Autorest TS codegen does not deserialize array of base class objects as an operation parameter properly -> https://github.com/Azure/autorest.typescript/issues/1040
  - from: swagger-document
    where: $.definitions.BufferRequestBody.properties.geometries
    transform: >
      $ = {
        "description": "A valid `GeoJSON FeatureCollection` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details.",
        "type": "object"
      };
    reason: Autorest TS codegen does not deserialize array of base class objects as an operation parameter properly -> https://github.com/Azure/autorest.typescript/issues/1040
```
