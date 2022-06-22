let nock = require('nock');

module.exports.hash = "95be6fafb9e067535b1f2e3a904c4d11";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/geometry/json', {"geometry":{"type":"GeometryCollection","geometries":[{"type":"Polygon","coordinates":[[[-122.43576049804686,37.7524152343544],[-122.43301391601562,37.70660472542312],[-122.36434936523438,37.712059855877314],[-122.43576049804686,37.7524152343544]]]},{"type":"Polygon","coordinates":[[[-121.43576049804686,38.7524152343544],[-121.43301391601562,38.70660472542312],[-121.36434936523438,38.712059855877314],[-121.43576049804686,38.7524152343544]]]}]}})
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":42,"numResults":10,"offset":0,"totalResults":21,"fuzzyLevel":1},"results":[{"type":"POI","id":"840069020866687","score":2.1455104351,"info":"search:ta:840069020866687-US","poi":{"name":"Wood Fired Pizza","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Peralta Avenue","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Peralta Avenue, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73537,"lon":-122.41061},"viewport":{"topLeftPoint":{"lat":37.73627,"lon":-122.41175},"btmRightPoint":{"lat":37.73447,"lon":-122.40947}},"entryPoints":[{"type":"main","position":{"lat":37.73524,"lon":-122.41059}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZTQ2YWU0YzQ4M2IwM2QwOTBlMzJmNWM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069009046971","score":2.1454954147,"info":"search:ta:840069009046971-US","poi":{"name":"Pizza Express","phone":"+1 415-282-2333","categorySet":[{"id":7315036}],"url":"pizzaexpresssf.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"919","streetName":"Cortland Avenue","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5632","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"919 Cortland Avenue, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73913,"lon":-122.41367},"viewport":{"topLeftPoint":{"lat":37.74003,"lon":-122.41481},"btmRightPoint":{"lat":37.73823,"lon":-122.41253}},"entryPoints":[{"type":"main","position":{"lat":37.73895,"lon":-122.41365}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0Yjc5YjVkNmY5NjRhNTIwYmQwYzJmZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069000105213","score":2.1454734802,"info":"search:ta:840069000105213-US","poi":{"name":"Ginny Pizzardi MFCC","phone":"+1 415-285-4061","categorySet":[{"id":7315036}],"url":"www.ginnypizzardi.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"4155","streetName":"24th Street","municipalitySubdivision":"Noe Valley","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94114","extendedPostalCode":"94114-3614","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4155 24th Street, San Francisco, CA 94114","localName":"San Francisco"},"position":{"lat":37.75098,"lon":-122.43527},"viewport":{"topLeftPoint":{"lat":37.75188,"lon":-122.43641},"btmRightPoint":{"lat":37.75008,"lon":-122.43413}},"entryPoints":[{"type":"main","position":{"lat":37.75123,"lon":-122.43528}}]},{"type":"POI","id":"840061002330210","score":2.145471096,"info":"search:ta:840061002330210-US","poi":{"name":"Golden Boy Wholesale Pizza Company","phone":"+1 415-334-5700","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"4531","streetName":"Mission Street","municipalitySubdivision":"Mission Terrace","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94112","extendedPostalCode":"94112-2603","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4531 Mission Street, San Francisco, CA 94112","localName":"San Francisco"},"position":{"lat":37.72561,"lon":-122.43376},"viewport":{"topLeftPoint":{"lat":37.72651,"lon":-122.4349},"btmRightPoint":{"lat":37.72471,"lon":-122.43262}},"entryPoints":[{"type":"main","position":{"lat":37.72573,"lon":-122.43402}}]},{"type":"POI","id":"840069009080627","score":2.1454622746,"info":"search:ta:840069009080627-US","poi":{"name":"Pizzeria Classico","phone":"+1 916-339-9244","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3535","streetName":"Elverta Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-4721","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3535 Elverta Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71883,"lon":-121.38094},"viewport":{"topLeftPoint":{"lat":38.71973,"lon":-121.38209},"btmRightPoint":{"lat":38.71793,"lon":-121.37979}},"entryPoints":[{"type":"main","position":{"lat":38.71848,"lon":-121.38091}}]},{"type":"POI","id":"840069019394045","score":2.1454589367,"info":"search:ta:840069019394045-US","poi":{"name":"Round Table Pizza","phone":"+1 916-723-8665","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"https://ordering.roundtablepizza.com/Site/ex12","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"7909","streetName":"Walerga Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-5722","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"7909 Walerga Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71302,"lon":-121.36609},"viewport":{"topLeftPoint":{"lat":38.71421,"lon":-121.36762},"btmRightPoint":{"lat":38.71183,"lon":-121.36456}},"entryPoints":[{"type":"main","position":{"lat":38.71306,"lon":-121.36456}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZTgyOTdkZDVjNWM5NzI4MzYzOGJkODI=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019806542","score":2.1454553604,"info":"search:ta:840069019806542-US","poi":{"name":"Giovanni's Pizza Bistro","phone":"+1 415-647-6122","categorySet":[{"id":7315036}],"url":"www.giovannispizzabistroca.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3839","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5831","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3839 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73548,"lon":-122.42454},"viewport":{"topLeftPoint":{"lat":37.73638,"lon":-122.42568},"btmRightPoint":{"lat":37.73458,"lon":-122.4234}},"entryPoints":[{"type":"main","position":{"lat":37.73552,"lon":-122.42465}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YTYxMTUwMWY5NjRhNTIwY2NjMTFmZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019116268","score":2.1454544067,"info":"search:ta:840069019116268-US","poi":{"name":"Red's Pizzeria","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3839","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5831","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3839 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73548,"lon":-122.42454},"viewport":{"topLeftPoint":{"lat":37.73638,"lon":-122.42568},"btmRightPoint":{"lat":37.73458,"lon":-122.4234}},"entryPoints":[{"type":"main","position":{"lat":37.73552,"lon":-122.42465}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1YzkzMjMzYmNkNDQxYzAwMmM0MzgzNmU=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069002602194","score":2.1454529762,"info":"search:ta:840069002602194-US","poi":{"name":"Round Table Pizza","phone":"+1 415-586-1200","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"https://ordering.roundtablepizza.com/Site/rtsf","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"4523","streetName":"Mission Street","municipalitySubdivision":"Mission Terrace","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94112","extendedPostalCode":"94112-2600","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4523 Mission Street, San Francisco, CA 94112","localName":"San Francisco"},"position":{"lat":37.72572,"lon":-122.43368},"viewport":{"topLeftPoint":{"lat":37.72662,"lon":-122.43482},"btmRightPoint":{"lat":37.72482,"lon":-122.43254}},"entryPoints":[{"type":"main","position":{"lat":37.72585,"lon":-122.43393}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0Yzc5ODcyNjNiYWRiMWY3ODA3ODRmNTQ=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019184903","score":2.1454386711,"info":"search:ta:840069019184903-US","poi":{"name":"Pizza Joint","phone":"+1 415-467-4100","categorySet":[{"id":7315036}],"url":"pizzajointsf.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"2414","streetName":"San Bruno Avenue","municipalitySubdivision":"Portola","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94134","extendedPostalCode":"94134-1503","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2414 San Bruno Avenue, San Francisco, CA 94134","localName":"San Francisco"},"position":{"lat":37.73194,"lon":-122.40576},"viewport":{"topLeftPoint":{"lat":37.73284,"lon":-122.4069},"btmRightPoint":{"lat":37.73104,"lon":-122.40462}},"entryPoints":[{"type":"main","position":{"lat":37.73203,"lon":-122.40543}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YWYxZTUxOGY5NjRhNTIwMzRlNDIxZTM=","sourceName":"Foursquare"}]}}]}, [
  'Content-Length',
  '11579',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding,X-HTTP-Method-Override',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: FBA63A392B0D451C8993BEEDF1457F27 Ref B: TYO01EDGE1812 Ref C: 2022-06-22T02:35:40Z',
  'Date',
  'Wed, 22 Jun 2022 02:35:39 GMT'
]);
