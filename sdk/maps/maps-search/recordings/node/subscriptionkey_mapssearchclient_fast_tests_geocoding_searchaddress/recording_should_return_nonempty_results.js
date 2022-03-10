let nock = require('nock');

module.exports.hash = "8320d9d7a61d3b78c4a6da5fc64103be";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/json')
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":53,"numResults":10,"offset":0,"totalResults":60,"fuzzyLevel":1},"results":[{"type":"Street","id":"US/STR/p0/4605259","score":2.1169600487,"address":{"streetName":"Pizza Lane","municipality":"Woodville","countrySecondarySubdivision":"Wilkinson","countrySubdivision":"MS","countrySubdivisionName":"Mississippi","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Woodville, MS","localName":"Woodville"},"position":{"lat":31.08642,"lon":-91.30197},"viewport":{"topLeftPoint":{"lat":31.08883,"lon":-91.30422},"btmRightPoint":{"lat":31.08593,"lon":-91.30157}}},{"type":"Street","id":"BR/STR/p0/422172","score":2.0962057114,"address":{"streetName":"Rua Luíz Pizza","municipality":"Assis","countrySubdivision":"São Paulo","postalCode":"19800, 19814","extendedPostalCode":"19800-170, 19814-010, 19814-350, 19814-351","countryCode":"BR","country":"Brasil","countryCodeISO3":"BRA","freeformAddress":"Rua Luíz Pizza, 19800, 19814, Assis","localName":"Assis"},"position":{"lat":-22.65827,"lon":-50.41392},"viewport":{"topLeftPoint":{"lat":-22.65412,"lon":-50.414},"btmRightPoint":{"lat":-22.6616,"lon":-50.41386}}},{"type":"Street","id":"BR/STR/p0/946912","score":2.0962057114,"address":{"streetName":"Rua Toledo Pizza","municipalitySubdivision":"Chácaras Rio-Petrópolis","municipality":"Duque de Caxias","countrySubdivision":"Rio de Janeiro","postalCode":"25041, 25230","extendedPostalCode":"25041-580","countryCode":"BR","country":"Brasil","countryCodeISO3":"BRA","freeformAddress":"Rua Toledo Pizza, 25041-580, Duque de Caxias","localName":"Duque de Caxias"},"position":{"lat":-22.6724,"lon":-43.29262},"viewport":{"topLeftPoint":{"lat":-22.67157,"lon":-43.29272},"btmRightPoint":{"lat":-22.67344,"lon":-43.29204}}},{"type":"Street","id":"BR/STR/p0/1315971","score":2.0962057114,"address":{"streetName":"Rua Toledo Pizza","municipality":"Laguna","countrySubdivision":"Santa Catarina","countryCode":"BR","country":"Brasil","countryCodeISO3":"BRA","freeformAddress":"Rua Toledo Pizza, Laguna","localName":"Laguna"},"position":{"lat":-28.48941,"lon":-48.77317},"viewport":{"topLeftPoint":{"lat":-28.48071,"lon":-48.78341},"btmRightPoint":{"lat":-28.49869,"lon":-48.76294}}},{"type":"Street","id":"IT/STR/p0/1348262","score":2.0959999561,"address":{"streetName":"Strada Pizzà","municipality":"Torricella Verzate","countrySecondarySubdivision":"Pavia","countrySubdivision":"Lombardia","postalCode":"27050","countryCode":"IT","country":"Italia","countryCodeISO3":"ITA","freeformAddress":"Strada Pizzà, 27050 Torricella Verzate","localName":"Torricella Verzate"},"position":{"lat":45.02043,"lon":9.17392},"viewport":{"topLeftPoint":{"lat":45.0206,"lon":9.1726},"btmRightPoint":{"lat":45.02023,"lon":9.17464}}},{"type":"Street","id":"US/STR/p0/6530377","score":2.0959999561,"address":{"streetName":"Pizza Lane","municipality":"Wilson","countrySecondarySubdivision":"Teton","countrySubdivision":"WY","countrySubdivisionName":"Wyoming","postalCode":"83014","extendedPostalCode":"83014-9164","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Wilson, WY 83014","localName":"Wilson"},"position":{"lat":43.51855,"lon":-110.84023},"viewport":{"topLeftPoint":{"lat":43.51882,"lon":-110.84204},"btmRightPoint":{"lat":43.51846,"lon":-110.83869}}},{"type":"Street","id":"US/STR/p1/3917135","score":2.0959999561,"address":{"streetName":"Pizza Lane","municipality":"Eastern","countrySecondarySubdivision":"Pendleton","countrySubdivision":"WV","countrySubdivisionName":"West Virginia","postalCode":"26802","extendedPostalCode":"26802-8016","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Brandywine, WV 26802","localName":"Brandywine"},"position":{"lat":38.62674,"lon":-79.24476},"viewport":{"topLeftPoint":{"lat":38.62697,"lon":-79.2452},"btmRightPoint":{"lat":38.62645,"lon":-79.24399}}},{"type":"Street","id":"US/STR/p2/5295342","score":2.0959999561,"address":{"streetName":"Pizza Lane","municipality":"Dover","countrySecondarySubdivision":"Hillsborough","countrySubdivision":"FL","countrySubdivisionName":"Florida","postalCode":"33527","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Dover, FL 33527","localName":"Dover"},"position":{"lat":27.97313,"lon":-82.24548},"viewport":{"topLeftPoint":{"lat":27.97433,"lon":-82.24578},"btmRightPoint":{"lat":27.97163,"lon":-82.24548}}},{"type":"Street","id":"US/STR/p2/5623486","score":2.0959999561,"address":{"streetName":"Pizza Lane","municipality":"Stambaugh","countrySecondarySubdivision":"Iron","countrySubdivision":"MI","countrySubdivisionName":"Michigan","postalCode":"49935","extendedPostalCode":"49935-8901","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Iron River, MI 49935","localName":"Iron River"},"position":{"lat":46.06282,"lon":-88.71562},"viewport":{"topLeftPoint":{"lat":46.06563,"lon":-88.71685},"btmRightPoint":{"lat":46.06023,"lon":-88.71399}}},{"type":"Street","id":"BR/STR/p0/2070041","score":2.075854063,"address":{"streetName":"Rua Doutor Luiz Pizza","municipality":"Assis","countrySubdivision":"São Paulo","countryCode":"BR","country":"Brasil","countryCodeISO3":"BRA","freeformAddress":"Rua Doutor Luiz Pizza, Assis","localName":"Assis"},"position":{"lat":-22.65898,"lon":-50.4139},"viewport":{"topLeftPoint":{"lat":-22.65658,"lon":-50.41393},"btmRightPoint":{"lat":-22.6591,"lon":-50.4139}}}]}, [
  'Content-Length',
  '5561',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 65C12B23623240749AF1FA7CA8774E5B Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:33:49Z',
  'Date',
  'Thu, 10 Mar 2022 06:33:48 GMT'
]);
