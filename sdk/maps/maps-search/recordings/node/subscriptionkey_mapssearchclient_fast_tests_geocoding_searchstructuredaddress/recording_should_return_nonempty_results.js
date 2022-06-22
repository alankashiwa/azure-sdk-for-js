let nock = require('nock');

module.exports.hash = "3314d69f0a0499813305c8bb6833ffbd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/structured/json')
  .query(true)
  .reply(200, {"summary":{"query":"ne 24th street 15127 redmond 98052 wa","queryType":"NON_NEAR","queryTime":42,"numResults":10,"offset":0,"totalResults":30,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p0/14797947","score":14.1640310287,"address":{"streetNumber":"15127","streetName":"Northeast 24th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5544","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15127 Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63096,"lon":-122.13814},"viewport":{"topLeftPoint":{"lat":47.63186,"lon":-122.13947},"btmRightPoint":{"lat":47.63006,"lon":-122.13681}},"entryPoints":[{"type":"main","position":{"lat":47.63149,"lon":-122.13853}},{"type":"minor","position":{"lat":47.6308,"lon":-122.1385}}]},{"type":"Cross Street","id":"US/XSTR/p1/2973855","score":10.7666654587,"address":{"streetName":"Northeast 24th Street & Bel Red Road, Bellevue Redmond Road","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Northeast 24th Street & Bel Red Road, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.63162,"lon":-122.13401},"viewport":{"topLeftPoint":{"lat":47.63252,"lon":-122.13534},"btmRightPoint":{"lat":47.63072,"lon":-122.13268}}},{"type":"Cross Street","id":"US/XSTR/p1/2973856","score":10.6782073975,"address":{"streetName":"Bel Red Road, Bellevue Redmond Road & Northeast 24th Street","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Bel Red Road & Northeast 24th Street, Bellevue, WA 98052","localName":"Bellevue"},"position":{"lat":47.63162,"lon":-122.13401},"viewport":{"topLeftPoint":{"lat":47.63252,"lon":-122.13534},"btmRightPoint":{"lat":47.63072,"lon":-122.13268}}},{"type":"Cross Street","id":"US/XSTR/p0/3077280","score":10.4268474579,"address":{"streetName":"186th Avenue Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"186th Avenue Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63111,"lon":-122.09087},"viewport":{"topLeftPoint":{"lat":47.63201,"lon":-122.0922},"btmRightPoint":{"lat":47.63021,"lon":-122.08954}}},{"type":"Cross Street","id":"US/XSTR/p0/3077283","score":10.4268474579,"address":{"streetName":"Northeast 24th Street & West Lake Sammamish Parkway Northeast","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Northeast 24th Street & West Lake Sammamish Parkway Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63115,"lon":-122.08847},"viewport":{"topLeftPoint":{"lat":47.63205,"lon":-122.0898},"btmRightPoint":{"lat":47.63025,"lon":-122.08714}}},{"type":"Cross Street","id":"US/XSTR/p0/3077284","score":10.4268474579,"address":{"streetName":"185th Place Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"185th Place Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63112,"lon":-122.09299},"viewport":{"topLeftPoint":{"lat":47.63202,"lon":-122.09432},"btmRightPoint":{"lat":47.63022,"lon":-122.09166}}},{"type":"Cross Street","id":"US/XSTR/p0/3077287","score":10.4268474579,"address":{"streetName":"Northeast 24th Street & 184th Avenue Northeast","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Northeast 24th Street & 184th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63113,"lon":-122.09434},"viewport":{"topLeftPoint":{"lat":47.63203,"lon":-122.09567},"btmRightPoint":{"lat":47.63023,"lon":-122.09301}}},{"type":"Cross Street","id":"US/XSTR/p0/3077288","score":10.4268474579,"address":{"streetName":"183rd Court Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"183rd Court Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63112,"lon":-122.09543},"viewport":{"topLeftPoint":{"lat":47.63202,"lon":-122.09676},"btmRightPoint":{"lat":47.63022,"lon":-122.0941}}},{"type":"Cross Street","id":"US/XSTR/p0/3077290","score":10.4268474579,"address":{"streetName":"182nd Avenue Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"182nd Avenue Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63113,"lon":-122.09751},"viewport":{"topLeftPoint":{"lat":47.63203,"lon":-122.09884},"btmRightPoint":{"lat":47.63023,"lon":-122.09618}}},{"type":"Cross Street","id":"US/XSTR/p0/3077292","score":10.4268474579,"address":{"streetName":"180th Place Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"180th Place Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63115,"lon":-122.09968},"viewport":{"topLeftPoint":{"lat":47.63205,"lon":-122.10101},"btmRightPoint":{"lat":47.63025,"lon":-122.09835}}}]}, [ 'Content-Length',
  '6884',
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
  'Ref A: 715711823C8E4CEEBE876A26A934B5B9 Ref B: TYAEDGE0916 Ref C: 2022-06-22T06:18:11Z',
  'Date',
  'Wed, 22 Jun 2022 06:18:11 GMT' ]);
