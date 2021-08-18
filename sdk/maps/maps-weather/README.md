# Azure Maps Weather client library for JavaScript/TypeScript

Azure Maps Weather services are a set of RESTful APIs that allows developers to integrate highly dynamic historical, real-time, and forecasted weather data and visualizations into their solutions.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Maps Weather client.



[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-weather) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-weather) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/maps-weather) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-weather/samples) |
[Product Information](https://docs.microsoft.com/en-us/azure/azure-maps/weather-services-concepts)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure Maps account](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-account-keys). You can create the resource via [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<account-name>` of your choice, and select a proper [pricing tier](https://docs.microsoft.com/en-us/azure/azure-maps/choose-pricing-tier) based on your needs via the `<sku-name>` parameter. Please refer to [this page](https://docs.microsoft.com/en-us/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create) for more details.

```bash
az maps account create --resource-group <resource-group-name> --account-name <account-name> --sku <sku-name>
```

### Install the `@azure/maps-weather` package

Install the Azure Maps Weather client library with `npm`:

```bash
npm install @azure/maps-weather
```

### Create and authenticate a `WeatherClient`

To create a client object to access the Azure Maps Weather API, you will need a `credential` object. The Azure Maps Weather client can use an Azure Active Directory credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { WeatherClient } = require("@azure/maps-weather");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new WeatherClient(new DefaultAzureCredential());
```

## Key concepts

### WeatherClient

`WeatherClient` is the primary interface for developers using the Azure Maps Weather client library. Explore the methods on this client object to understand the different features of the Azure Maps Weather service that you can access.

## Examples
The following sections provide several code snippets covering some of the most common Azure Maps Weather tasks, including:

- [Request real-time weather data](#request-real-time-weather-data)

- [Request severe weather alerts](#request-severe-weather-alerts)

- [Request daily forecasts](#request-daily-forecasts)
- [Request hourly forecasts](#request-hourly-forecasts)
- [Request minute by minute forecasts](#request-minute-by-minute-forecasts)

### Request real-time weather data
To retrieve current weather conditions at a set of coordinates, you can use the code snippet below.

Detailed weather conditions such as precipitation, temperature, and wind for a given coordinate location will be returned. Also, observations from the past 6 or 24 hours for a particular location can be retrieved. The response includes details like observation date and time, brief description of the weather conditions, weather icon, precipitation indicator flags, and temperature. RealFeel™ Temperature and ultraviolet(UV) index are also returned.

```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const client = new WeatherClient(credential).weather;
  const response = await client.getCurrentConditions("json", "47.641268,-122.125679", operationOptions);

```
Response
```yaml
{
  "results": [
    {
      "dateTime": "2021-08-17T05:29:00.000Z",
      "phrase": "Partly cloudy",
      "iconCode": 35,
      "hasPrecipitation": false,
      "isDayTime": false,
      "temperature": { "value": 15.9, "unit": "C", "unitType": 17 },
      "realFeelTemperature": { "value": 16.4, "unit": "C", "unitType": 17 },
      "realFeelTemperatureShade": { "value": 16.4, "unit": "C", "unitType": 17 },
      "relativeHumidity": 89,
      "dewPoint": { "value": 14.1, "unit": "C", "unitType": 17 },
      "wind": {
        "direction": { "degrees": 0, "localizedDescription": "N" },
        "speed": { "value": 3.6, "unit": "km/h", "unitType": 7 }
      },
      "windGust": { "speed": { "value": 8.8, "unit": "km/h", "unitType": 7 } },
      "uvIndex": 0,
      "uvIndexPhrase": "Low",
      "visibility": { "value": 3.2, "unit": "km", "unitType": 6 },
      "obstructionsToVisibility": "",
      "cloudCover": 46,
      "ceiling": { "value": 12192, "unit": "m", "unitType": 5 },
      "pressure": { "value": 1011.2, "unit": "mb", "unitType": 14 },
      "pressureTendency": { "localizedDescription": "Steady", "code": "S" },
      "past24HourTemperatureDeparture": { "value": -5.1, "unit": "C", "unitType": 17 },
      "apparentTemperature": { "value": 18.9, "unit": "C", "unitType": 17 },
      "windChillTemperature": { "value": 16.1, "unit": "C", "unitType": 17 },
      "wetBulbTemperature": { "value": 14.8, "unit": "C", "unitType": 17 },
      "precipitationSummary": {
        "pastHour": { "value": 0, "unit": "mm", "unitType": 3 },
        "past3Hours": { "value": 0, "unit": "mm", "unitType": 3 },
        "past6Hours": { "value": 0, "unit": "mm", "unitType": 3 },
        "past9Hours": { "value": 0, "unit": "mm", "unitType": 3 },
        "past12Hours": { "value": 0, "unit": "mm", "unitType": 3 },
        "past18Hours": { "value": 0, "unit": "mm", "unitType": 3 },
        "past24Hours": { "value": 0, "unit": "mm", "unitType": 3 }
      },
      "temperatureSummary": {
        "past6Hours": {
          "minimum": { "value": 15.9, "unit": "C", "unitType": 17 },
          "maximum": { "value": 23.3, "unit": "C", "unitType": 17 }
        },
        "past12Hours": {
          "minimum": { "value": 15.9, "unit": "C", "unitType": 17 },
          "maximum": { "value": 24.2, "unit": "C", "unitType": 17 }
        },
        "past24Hours": {
          "minimum": { "value": 15.9, "unit": "C", "unitType": 17 },
          "maximum": { "value": 24.2, "unit": "C", "unitType": 17 }
        }
      }
    }
  ]
}
```
### Request severe weather alerts
The service can return details such as alert type, category, level, and detailed descriptions about the active severe alerts for the requested location, such as hurricanes, thunderstorms, lightning, heat waves or forest fires. As an example, logistics managers can visualize severe weather conditions on a map, along with business locations and planned routes, and coordinate further with drivers and local workers.

To retrieve the severe weather alerts at a given set of coordinates, you can use the code snippet below.

```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const client = new WeatherClient(credential).weather;
  const response = await client.getSevereWeatherAlerts("json", "41.161079,-104.805450", operationOptions);

```
Response
```yaml
{
"results": [
    {
        "countryCode": "US",
        "alertId": 2194734,
        "description": {
            "localized": "Red Flag Warning",
            "english": "Red Flag Warning"
        },
        "category": "FIRE",
        "priority": 54,
        "source": "U.S. National Weather Service",
        "sourceId": 2,
        "alertAreas": [
            {
                "name": "Platte/Goshen/Central and Eastern Laramie",
                "summary": "Red Flag Warning in effect until 7:00 PM MDT.  Source: U.S. National Weather Service",
                "startTime": "2020-10-05T15:00:00+00:00",
                "endTime": "2020-10-06T01:00:00+00:00",
                "latestStatus": {
                    "localized": "Continue",
                    "english": "Continue"
                },
                "alertDetails": "...RED FLAG WARNING REMAINS IN EFFECT FROM 9 AM THIS MORNING TO\n7 PM MDT THIS EVENING FOR STRONG GUSTY WINDS AND LOW HUMIDITY...\n\n* WHERE...Fire weather zones 303, 304, 305, 306, 307, 308, 309,\n  and 310 in southeast Wyoming. Fire weather zone 313 in Nebraska.\n\n* WIND...West to northwest 15 to 30 MPH with gusts around 40 MPH.\n\n* HUMIDITY...10 to 15 percent.\n\n* IMPACTS...Any fires that develop will likely spread rapidly.\n  Outdoor burning is not recommended.\n\nPRECAUTIONARY/PREPAREDNESS ACTIONS...\n\nA Red Flag Warning means that critical fire weather conditions\nare either occurring now...or will shortly. A combination of\nstrong winds...low relative humidity...and warm temperatures can\ncontribute to extreme fire behavior.\n\n&&",
                "alertDetailsLanguageCode": "en"
            }
        ]
        },...
    ]
}
```
### Request daily forecasts
This service provides detailed daily weather forecast such as temperature and wind. 

The request can specify how many days to return: 1, 5, 10, 15, 25, or 45 days for a given coordinate location. The response includes details such as temperature, wind, precipitation, air quality, and UV index. In this example, we request for five days by setting `duration=5`


```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const client = new WeatherClient(credential).weather;
  const dailyForecastOptions = { duration: 5 };
  const response = await client.getDailyForecast("json", "47.60357,-122.32945", {
      ...dailyForecastOptions,
      ...operationOptions
    })
```
Response
```yaml
{
"summary": {
    "startDate": "2020-10-18T17:00:00+00:00",
    "endDate": "2020-10-19T23:00:00+00:00",
    "severity": 2,
    "phrase": "Snow, mixed with rain at times continuing through Monday evening and a storm total of 3-6 cm",
    "category": "snow/rain"
},
"forecasts": [
    {
        "date": "2020-10-19T04:00:00+00:00",
        "temperature": {
            "minimum": {
                "value": -1.1,
                "unit": "C",
                "unitType": 17
            },
            "maximum": {
                "value": 1.3,
                "unit": "C",
                "unitType": 17
            }
        },
        "realFeelTemperature": {
            "minimum": {
                "value": -6.0,
                "unit": "C",
                "unitType": 17
            },
            "maximum": {
                "value": 0.5,
                "unit": "C",
                "unitType": 17
            }
        },
        "realFeelTemperatureShade": {
            "minimum": {
                "value": -6.0,
                "unit": "C",
                "unitType": 17
            },
            "maximum": {
                "value": 0.7,
                "unit": "C",
                "unitType": 17
            }
        },
        "hoursOfSun": 1.8,
        "degreeDaySummary": {
            "heating": {
                "value": 18.0,
                "unit": "C",
                "unitType": 17
            },
            "cooling": {
                "value": 0.0,
                "unit": "C",
                "unitType": 17
            }
        },
        "airAndPollen": [
            {
                "name": "AirQuality",
                "value": 23,
                "category": "Good",
                "categoryValue": 1,
                "type": "Ozone"
            },
            {
                "name": "Grass",
                "value": 0,
                "category": "Low",
                "categoryValue": 1
            },
            {
                "name": "Mold",
                "value": 0,
                "category": "Low",
                "categoryValue": 1
            },
            {
                "name": "Ragweed",
                "value": 0,
                "category": "Low",
                "categoryValue": 1
            },
            {
                "name": "Tree",
                "value": 0,
                "category": "Low",
                "categoryValue": 1
            },
            {
                "name": "UVIndex",
                "value": 0,
                "category": "Low",
                "categoryValue": 1
            }
        ],
        "day": {
            "iconCode": 22,
            "iconPhrase": "Snow",
            "hasPrecipitation": true,
            "precipitationType": "Mixed",
            "precipitationIntensity": "Light",
            "shortPhrase": "Chilly with snow, 2-4 cm",
            "longPhrase": "Chilly with snow, accumulating an additional 2-4 cm",
            "precipitationProbability": 90,
            "thunderstormProbability": 0,
            "rainProbability": 54,
            "snowProbability": 85,
            "iceProbability": 8,
            "wind": {
                "direction": {
                    "degrees": 36.0,
                    "localizedDescription": "NE"
                },
                "speed": {
                    "value": 9.3,
                    "unit": "km/h",
                    "unitType": 7
                }
            },
            "windGust": {
                "direction": {
                    "degrees": 70.0,
                    "localizedDescription": "ENE"
                },
                "speed": {
                    "value": 25.9,
                    "unit": "km/h",
                    "unitType": 7
                }
            },
            "totalLiquid": {
                "value": 4.3,
                "unit": "mm",
                "unitType": 3
            },
            "rain": {
                "value": 0.5,
                "unit": "mm",
                "unitType": 3
            },
            "snow": {
                "value": 2.72,
                "unit": "cm",
                "unitType": 4
            },
            "ice": {
                "value": 0.0,
                "unit": "mm",
                "unitType": 3
            },
            "hoursOfPrecipitation": 9.0,
            "hoursOfRain": 1.0,
            "hoursOfSnow": 9.0,
            "hoursOfIce": 0.0,
            "cloudCover": 96
        },
        "night": {
            "iconCode": 29,
            "iconPhrase": "Rain and snow",
            "hasPrecipitation": true,
            "precipitationType": "Mixed",
            "precipitationIntensity": "Light",
            "shortPhrase": "Showers of rain and snow",
            "longPhrase": "A couple of showers of rain or snow this evening; otherwise, cloudy; storm total snowfall 1-3 cm",
            "precipitationProbability": 65,
            "thunderstormProbability": 0,
            "rainProbability": 60,
            "snowProbability": 54,
            "iceProbability": 4,
            "wind": {
                "direction": {
                    "degrees": 16.0,
                    "localizedDescription": "NNE"
                },
                "speed": {
                    "value": 16.7,
                    "unit": "km/h",
                    "unitType": 7
                }
            },
            "windGust": {
                "direction": {
                    "degrees": 1.0,
                    "localizedDescription": "N"
                },
                "speed": {
                    "value": 35.2,
                    "unit": "km/h",
                    "unitType": 7
                }
            },
            "totalLiquid": {
                "value": 4.3,
                "unit": "mm",
                "unitType": 3
            },
            "rain": {
                "value": 3.0,
                "unit": "mm",
                "unitType": 3
            },
            "snow": {
                "value": 0.79,
                "unit": "cm",
                "unitType": 4
            },
            "ice": {
                "value": 0.0,
                "unit": "mm",
                "unitType": 3
            },
            "hoursOfPrecipitation": 4.0,
            "hoursOfRain": 1.0,
            "hoursOfSnow": 3.0,
            "hoursOfIce": 0.0,
            "cloudCover": 94
        },
        "sources": [
            "AccuWeather"
        ]
    },...
]
}
```
### Request hourly forecasts

The service provides detailed weather forecast by the hour for the next 1, 12, 24 (1 day), 72 (3 days), 120 (5 days), and 240 hours (10 days) for the given coordinate location. The API returns details such as temperature, humidity, wind, precipitation, and UV index.

To retrieve the hourly weather forecast for the next 12 hours at a given set of coordinates, you can use the code snippet below.

```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const client = new WeatherClient(credential).weather;
  const hourlyForecastOptions = { duration: 12 };
  const response = await client.getHourlyForecas("json", "47.60357,-122.32945", {
    ...hourlyForecastOptions,
    ...operationOptions
  })
```
Response
```yaml
{
"forecasts": [
    {
        "date": "2020-10-19T21:00:00+00:00",
        "iconCode": 12,
        "iconPhrase": "Showers",
        "hasPrecipitation": true,
        "precipitationType": "Rain",
        "precipitationIntensity": "Light",
        "isDaylight": true,
        "temperature": {
            "value": 14.7,
            "unit": "C",
            "unitType": 17
        },
        "realFeelTemperature": {
            "value": 13.3,
            "unit": "C",
            "unitType": 17
        },
        "wetBulbTemperature": {
            "value": 12.0,
            "unit": "C",
            "unitType": 17
        },
        "dewPoint": {
            "value": 9.5,
            "unit": "C",
            "unitType": 17
        },
        "wind": {
            "direction": {
                "degrees": 242.0,
                "localizedDescription": "WSW"
            },
            "speed": {
                "value": 9.3,
                "unit": "km/h",
                "unitType": 7
            }
        },
        "windGust": {
            "speed": {
                "value": 14.8,
                "unit": "km/h",
                "unitType": 7
            }
        },
        "relativeHumidity": 71,
        "visibility": {
            "value": 9.7,
            "unit": "km",
            "unitType": 6
        },
        "cloudCover": 100,
        "ceiling": {
            "value": 1128.0,
            "unit": "m",
            "unitType": 5
        },
        "uvIndex": 1,
        "uvIndexPhrase": "Low",
        "precipitationProbability": 51,
        "rainProbability": 51,
        "snowProbability": 0,
        "iceProbability": 0,
        "totalLiquid": {
            "value": 0.3,
            "unit": "mm",
            "unitType": 3
        },
        "rain": {
            "value": 0.3,
            "unit": "mm",
            "unitType": 3
        },
        "snow": {
            "value": 0.0,
            "unit": "cm",
            "unitType": 4
        },
        "ice": {
            "value": 0.0,
            "unit": "mm",
            "unitType": 3
        }
    }...
]
}
```
### Request minute by minute forecasts

The service provides minute-by-minute forecasts for a given location for the next 120 minutes. Users can request weather forecasts in intervals of 1, 5 and 15 minutes. The response includes details such as the type of precipitation (including rain, snow, or a mixture of both), start time, and precipitation intensity value (dBZ).

To retrieve the minute-by-minute weather forecast at a given set of coordinates, you can use the code snippet below.

```javascript
  const credential = new DefaultAzureCredential();
  const operationOptions = {
    requestOptions: {
      customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID }
    }
  };

  const client = new WeatherClient(credential).weather;
  const minuteForecastOptions = { interval: 15 };
  const response = await client.getMinuteForecast("json", "47.632346,-122.138874", {
    ...minuteForecastOptions,
    ...operationOptions
  })

```
Response
```yaml
{
"summary": {
    "briefPhrase60": "No precipitation for at least 60 min",
    "shortPhrase": "No precip for 120 min",
    "briefPhrase": "No precipitation for at least 120 min",
    "longPhrase": "No precipitation for at least 120 min",
    "iconCode": 7
},
"intervalSummaries": [
    {
        "startMinute": 0,
        "endMinute": 119,
        "totalMinutes": 120,
        "shortPhrase": "No precip for %MINUTE_VALUE min",
        "briefPhrase": "No precipitation for at least %MINUTE_VALUE min",
        "longPhrase": "No precipitation for at least %MINUTE_VALUE min",
        "iconCode": 7
    }
],
"intervals": [
    {
        "startTime": "2020-10-19T20:51:00+00:00",
        "minute": 0,
        "dbz": 0.0,
        "shortPhrase": "No Precipitation",
        "iconCode": 7,
        "cloudCover": 100
    },
    {
        "startTime": "2020-10-19T21:06:00+00:00",
        "minute": 15,
        "dbz": 0.0,
        "shortPhrase": "No Precipitation",
        "iconCode": 7,
        "cloudCover": 100
    },
    {
        "startTime": "2020-10-19T21:21:00+00:00",
        "minute": 30,
        "dbz": 0.0,
        "shortPhrase": "No Precipitation",
        "iconCode": 7,
        "cloudCover": 100
    },
    {
        "startTime": "2020-10-19T21:36:00+00:00",
        "minute": 45,
        "dbz": 0.0,
        "shortPhrase": "No Precipitation",
        "iconCode": 7,
        "cloudCover": 100
    },
    {
        "startTime": "2020-10-19T21:51:00+00:00",
        "minute": 60,
        "dbz": 0.0,
        "shortPhrase": "No Precipitation",
        "iconCode": 7,
        "cloudCover": 100
    },
    {
        "startTime": "2020-10-19T22:06:00+00:00",
        "minute": 75,
        "dbz": 0.0,
        "shortPhrase": "No Precipitation",
        "iconCode": 7,
        "cloudCover": 100
    },
    {
        "startTime": "2020-10-19T22:21:00+00:00",
        "minute": 90,
        "dbz": 0.0,
        "shortPhrase": "No Precipitation",
        "iconCode": 7,
        "cloudCover": 100
    },
    {
        "startTime": "2020-10-19T22:36:00+00:00",
        "minute": 105,
        "dbz": 0.0,
        "shortPhrase": "No Precipitation",
        "iconCode": 7,
        "cloudCover": 100
    }
    ]
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-weather/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-weather%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
