let nock = require('nock');

module.exports.hash = "dcb5cd425dcc277c92506f2d765801ef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/polygon/json')
  .query(true)
  .reply(200, {"additionalData":[{"providerID":"invalid-geometry-id","error":"Wrong geometry id format. Supported format: UUID (RFC 4122)"}]}, [
  'Content-Length',
  '127',
  'Content-Type',
  'application/json',
  'ETag',
  'B0E2ACCF4B7CF44E018CAE75E0826D67',
  'Vary',
  'Accept-Encoding,accept-encoding,origin,access-control-request-headers,access-control-request-method,accept-encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 0902AD677B6B4A29A68356109B32466E Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:33:48Z',
  'Date',
  'Thu, 10 Mar 2022 06:33:48 GMT'
]);
