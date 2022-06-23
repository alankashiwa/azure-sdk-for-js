let nock = require('nock');

module.exports.hash = "391e9fe4dc5cd69077aee369c8743c07";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/alongRoute/json', {"route":{"type":"LineString","coordinates":[[-122.143035,47.653536],[-122.187164,47.617556],[-122.114981,47.570599],[-122.132756,47.654009]]}})
  .query(true)
  .reply(200, {"summary":{"query":"burger","queryType":"NON_NEAR","queryTime":247,"numResults":10,"offset":0,"totalResults":10,"fuzzyLevel":1},"results":[{"type":"POI","id":"840539003143944","score":2.8276119232,"dist":269.1682087059635,"query":"burger","info":"search:ta:840539003143944-US","poi":{"name":"Burgers","categorySet":[{"id":7315069}],"categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"hamburgers"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"15701","streetName":"Northeast 39th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15701 Northeast 39th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64376,"lon":-122.1281},"viewport":{"topLeftPoint":{"lat":47.64491,"lon":-122.12981},"btmRightPoint":{"lat":47.64261,"lon":-122.12639}},"entryPoints":[{"type":"main","position":{"lat":47.64491,"lon":-122.1281}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1OWE1YmZlZDc1YTZlYTdmYTAxM2EyZmY=","sourceName":"Foursquare"}]},"detourTime":-307,"detourDistance":-20124},{"type":"POI","id":"840539000983176","score":2.7718887329,"dist":482.496255757968,"query":"burger","info":"search:ta:840539000983176-US","poi":{"name":"Gulliver's Burgers & Subs","phone":"+1 425-562-5115","categorySet":[{"id":7315015}],"categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"fast food"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"3080","streetName":"148th Avenue Southeast","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","extendedPostalCode":"98007-6410","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3080 148th Avenue Southeast, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.58202,"lon":-122.14049},"viewport":{"topLeftPoint":{"lat":47.58319,"lon":-122.14222},"btmRightPoint":{"lat":47.58085,"lon":-122.13876}},"entryPoints":[{"type":"main","position":{"lat":47.58104,"lon":-122.14143}}],"detourTime":-194,"detourDistance":-13373},{"type":"POI","id":"840539003094440","score":2.7635157108,"dist":2584.704932906075,"query":"burger","info":"search:ta:840539003094440-US","poi":{"name":"Burgers N Gyros","categorySet":[{"id":7315023}],"categories":["indian","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"indian"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-4435","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.67332,"lon":-122.11982},"viewport":{"topLeftPoint":{"lat":47.67422,"lon":-122.12116},"btmRightPoint":{"lat":47.67242,"lon":-122.11848}},"entryPoints":[{"type":"main","position":{"lat":47.67339,"lon":-122.11979}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1OTc1NjU3ZjI4NmZkYTM3YjllOWRjZDM=","sourceName":"Foursquare"}]},"detourTime":-187,"detourDistance":-15758},{"type":"POI","id":"840539003111665","score":2.7932035923,"dist":1954.6986877881363,"query":"burger","info":"search:ta:840539003111665-US","poi":{"name":"Burger Hut","phone":"+1 425-643-3985","categorySet":[{"id":7315069}],"categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"hamburgers"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"14603","streetName":"Northeast 20th Street","municipalitySubdivision":"Bel Red","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","extendedPostalCode":"98007-3712","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"14603 Northeast 20th Street, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.62697,"lon":-122.14497},"viewport":{"topLeftPoint":{"lat":47.62787,"lon":-122.1463},"btmRightPoint":{"lat":47.62607,"lon":-122.14364}},"entryPoints":[{"type":"main","position":{"lat":47.62783,"lon":-122.14496}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1ZTA0MDA1ODVhMWYzYTAwMDg5ZDc2ZmM=","sourceName":"Foursquare"}]},"detourTime":83,"detourDistance":-7129},{"type":"POI","id":"840531000533803","score":2.7693781853,"dist":1127.9399853212014,"query":"burger","info":"search:ta:840531000533803-US","poi":{"name":"Wibbley's Gourmet Burgers","phone":"+1 425-747-7818","categorySet":[{"id":7315069}],"url":"wibbleys.com","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"hamburgers"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"2255","streetName":"140th Avenue Northeast","municipalitySubdivision":"Bel Red","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","extendedPostalCode":"98005-1819","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2255 140th Avenue Northeast, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.63066,"lon":-122.15504},"viewport":{"topLeftPoint":{"lat":47.63156,"lon":-122.15637},"btmRightPoint":{"lat":47.62976,"lon":-122.15371}},"entryPoints":[{"type":"main","position":{"lat":47.63066,"lon":-122.15374}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YTRkMGI3MWY5NjRhNTIwN2ZhZDFmZTM=","sourceName":"Foursquare"}]},"detourTime":156,"detourDistance":-6042},{"type":"POI","id":"840539000634040","score":2.7678313255,"dist":1519.0817019821163,"query":"burger","info":"search:ta:840539000634040-US","poi":{"name":"Wayback Burgers","phone":"+1 425-644-1300","brands":[{"name":"Wayback Burgers"}],"categorySet":[{"id":7315015}],"url":"www.waybackburgers.com","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"fast food"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"1645","streetName":"140th Avenue Northeast","municipalitySubdivision":"Bel Red","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1645 140th Avenue Northeast, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.62626,"lon":-122.15487},"viewport":{"topLeftPoint":{"lat":47.62716,"lon":-122.1562},"btmRightPoint":{"lat":47.62536,"lon":-122.15354}},"entryPoints":[{"type":"minor","position":{"lat":47.62645,"lon":-122.15446}},{"type":"main","position":{"lat":47.62579,"lon":-122.15377}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NDVlODdlOTQ5OGUzNmVlNTQ4MDhlODY=","sourceName":"Foursquare"}]},"detourTime":182,"detourDistance":-6089},{"type":"POI","id":"840531000465150","score":2.8922464848,"dist":1748.7957271682615,"query":"burger","info":"search:ta:840531000465150-US","poi":{"name":"BURGER KING","phone":"+1 425-746-7508","brands":[{"name":"BURGER KING"}],"categorySet":[{"id":7315015}],"url":"burgerking.com/store-locator/store/restaurant_490","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"fast food"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"14620","streetName":"Northeast 24th Street","municipalitySubdivision":"Bridle Trails","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","extendedPostalCode":"98007-3723","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"14620 Northeast 24th Street, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.63187,"lon":-122.14472},"viewport":{"topLeftPoint":{"lat":47.63277,"lon":-122.14605},"btmRightPoint":{"lat":47.63097,"lon":-122.14339}},"entryPoints":[{"type":"minor","position":{"lat":47.63188,"lon":-122.14458}},{"type":"main","position":{"lat":47.63155,"lon":-122.14461}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjBhZmIwZGY5NjRhNTIwMGMyYjIzZTM=","sourceName":"Foursquare"}]},"detourTime":184,"detourDistance":-5827},{"type":"POI","id":"840531000465149","score":2.898733139,"dist":161.17565489389224,"query":"burger","info":"search:ta:840531000465149-US","poi":{"name":"BURGER KING","phone":"+1 425-453-5775","brands":[{"name":"BURGER KING"}],"categorySet":[{"id":7315015}],"url":"burgerking.com/store-locator/store/restaurant_2700","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"fast food"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"11723","streetName":"Northeast 8th Street","municipalitySubdivision":"Willburton","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","extendedPostalCode":"98005-3003","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"11723 Northeast 8th Street, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.61683,"lon":-122.18338},"viewport":{"topLeftPoint":{"lat":47.61773,"lon":-122.18471},"btmRightPoint":{"lat":47.61593,"lon":-122.18205}},"entryPoints":[{"type":"main","position":{"lat":47.61723,"lon":-122.1834}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjM2NzQyMmY5NjRhNTIwY2UzNTI1ZTM=","sourceName":"Foursquare"}]},"detourTime":198,"detourDistance":309},{"type":"POI","id":"840539002288639","score":2.7890250683,"dist":2963.10210231557,"query":"burger","info":"search:ta:840539002288639-US","poi":{"name":"Burgermaster","phone":"+1 425-827-9566","categorySet":[{"id":7315069}],"url":"burgermaster.biz","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"hamburgers"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"10606","streetName":"Northup Way","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98004","extendedPostalCode":"98004-1418","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"10606 Northup Way, Bellevue, WA 98004","localName":"Bellevue"},"position":{"lat":47.64224,"lon":-122.19906},"viewport":{"topLeftPoint":{"lat":47.64314,"lon":-122.20039},"btmRightPoint":{"lat":47.64134,"lon":-122.19773}},"entryPoints":[{"type":"main","position":{"lat":47.64205,"lon":-122.19927}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0NjRhM2MxMmY5NjRhNTIwYWQ0NjFmZTM=","sourceName":"Foursquare"}]},"detourTime":209,"detourDistance":1473},{"type":"POI","id":"840539003043271","score":2.7946410179,"dist":1600.029196161281,"query":"burger","info":"search:ta:840539003043271-US","poi":{"name":"Burger Brawler","phone":"+1 425-362-6071","categorySet":[{"id":9379006}],"categories":["cocktail bar","nightlife"],"classifications":[{"code":"NIGHTLIFE","names":[{"nameLocale":"en-US","name":"nightlife"},{"nameLocale":"en-US","name":"cocktail bar"}]}]},"address":{"streetNumber":"500","streetName":"Bellevue Way Northeast","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98004","extendedPostalCode":"98004-5015","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"500 Bellevue Way Northeast, Bellevue, WA 98004","localName":"Bellevue"},"position":{"lat":47.61464,"lon":-122.20125},"viewport":{"topLeftPoint":{"lat":47.61554,"lon":-122.20258},"btmRightPoint":{"lat":47.61374,"lon":-122.19992}},"entryPoints":[{"type":"main","position":{"lat":47.61463,"lon":-122.20158}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1YTY0MmY4MmI5YTVhODJlOTVmMGUwMzI=","sourceName":"Foursquare"}]},"detourTime":237,"detourDistance":1147}]}, [ 'Content-Length',
  '12528',
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
  'Ref A: DDDA5AF2703343A1986511AD26AF3629 Ref B: TYO01EDGE3415 Ref C: 2022-06-23T09:21:56Z',
  'Date',
  'Thu, 23 Jun 2022 09:21:56 GMT' ]);
