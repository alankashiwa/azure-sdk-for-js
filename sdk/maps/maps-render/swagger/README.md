# Azure Maps Render Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/maps-render"
title: RenderClient
description: Azure Maps Render Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Render/preview/1.0/render.json
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
