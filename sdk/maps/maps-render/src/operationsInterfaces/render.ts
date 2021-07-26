/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  RasterTileFormat,
  RenderGetMapStaticImageOptionalParams,
  RenderGetMapStaticImageResponse,
  TileFormat,
  MapTileLayer,
  MapTileStyle,
  RenderGetMapTileOptionalParams,
  RenderGetMapTileResponse,
  RenderGetMapStateTilePreviewOptionalParams,
  RenderGetMapStateTilePreviewResponse,
  TextFormat,
  RenderGetCopyrightCaptionOptionalParams,
  RenderGetCopyrightCaptionResponse,
  MapImageryStyle,
  RenderGetMapImageryTileOptionalParams,
  RenderGetMapImageryTileResponse,
  RenderGetCopyrightFromBoundingBoxOptionalParams,
  RenderGetCopyrightFromBoundingBoxResponse,
  RenderGetCopyrightForTileOptionalParams,
  RenderGetCopyrightForTileResponse,
  RenderGetCopyrightForWorldOptionalParams,
  RenderGetCopyrightForWorldResponse
} from "../models";

/** Interface representing a Render. */
export interface Render {
  /**
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * The static image service renders a user-defined, rectangular image containing a map section using a
   * zoom level from 0 to 20. The static image service renders a user-defined, rectangular image
   * containing a map section using a zoom level from 0 to 20. The supported resolution range for the map
   * image is from 1x1 to 8192x8192. If you are deciding when to use the static image service over the
   * map tile service, you may want to consider how you would like to interact with the rendered map. If
   * the map contents will be relatively unchanging, a static map is a good choice. If you want to
   * support a lot of zooming, panning and changing of the map content, the map tile service would be a
   * better choice.
   *
   * Service also provides Image Composition functionality to get a static image back with additional
   * data like; pushpins and geometry overlays with following S0 and S1 capabilities.
   *
   * In S0 you can:
   * - Render up to 5 pushpins specified in the request
   * - Provide one custom image for the pins referenced in the request
   * - Add labels to the pushpins
   *
   * In S1 you can:
   * - Render pushpins through [Azure Maps Data Service](https://aka.ms/AzureMapsMapDataService)
   * - Specify multiple pushpin styles
   * - Provide custom pushpin images stored in [Azure Maps Data
   * Service](https://aka.ms/AzureMapsMapDataService)
   * - Render circle, polyline and polygon geometry types.
   * - Render of supported GeoJSON geometry types uploaded through [Azure Maps Data
   * Service](https://aka.ms/AzureMapsMapDataService)
   *
   * Please see [How-to-Guide](https://aka.ms/AzureMapsHowToGuideImageCompositor) for detailed examples.
   *
   * _Note_ : Either **center** or **bbox** parameter must be supplied to the
   * API.
   * <br><br>
   * The supported Lat and Lon ranges when using the **bbox** parameter, are as follows:
   * <br><br>
   *
   *   |Zoom Level | Max Lon Range   | Max Lat Range|
   *   |:----------|:----------------|:-------------|
   *   |0          | 360.0           | 170.0        |
   *   |1          | 360.0           | 170.0        |
   *   |2          | 360.0           | 170.0        |
   *   |3          | 360.0           | 170.0        |
   *   |4          | 360.0           | 170.0        |
   *   |5          | 180.0           | 85.0         |
   *   |6          | 90.0            | 42.5         |
   *   |7          | 45.0            | 21.25        |
   *   |8          | 22.5            | 10.625       |
   *   |9          | 11.25           | 5.3125       |
   *   |10         | 5.625           | 2.62625      |
   *   |11         | 2.8125          | 1.328125     |
   *   |12         | 1.40625         | 0.6640625    |
   *   |13         | 0.703125        | 0.33203125   |
   *   |14         | 0.3515625       | 0.166015625  |
   *   |15         | 0.17578125      | 0.0830078125 |
   *   |16         | 0.087890625     | 0.0415039063 |
   *   |17         | 0.0439453125    | 0.0207519531 |
   *   |18         | 0.0219726563    | 0.0103759766 |
   *   |19         | 0.0109863281    | 0.0051879883 |
   *   |20         | 0.0054931641    | 0.0025939941 |
   * @param format Desired format of the response. Possible value: png.
   * @param options The options parameters.
   */
  getMapStaticImage(
    format: RasterTileFormat,
    options?: RenderGetMapStaticImageOptionalParams
  ): Promise<RenderGetMapStaticImageResponse>;
  /**
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * Fetches map tiles in vector or raster format typically to be integrated into a new map control or
   * SDK. By default, Azure uses vector map tiles for its web map control (see [Zoom Levels and Tile
   * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid))
   *
   * **Note**: Weather tiles are only available via [Get Map Tile V2
   * API](https://aka.ms/AzureMapsWeatherTiles). We recommend to start to use the new [Get Map Tile V2
   * API](https://aka.ms/GetMapTileV2).
   * @param format Desired format of the response. Possible values are png & pbf.
   * @param layer Map layer requested. Possible values are basic, hybrid, labels and terra.
   * @param style Map style to be returned. Possible values are main, dark, and shaded_relief.
   * @param zoom Zoom level for the desired tile. For _raster_ tiles, value must be in the range: 0-18
   *             (inclusive). Terra raster tiles, values must be in the range 0-6 (inclusive). For _vector_ tiles,
   *             value must be in the range: 0-22 (inclusive).
   *             Please see [Zoom Levels and Tile
   *             Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *             details.
   * @param xTileIndex X coordinate of the tile on zoom grid. Value must be in the range [0,
   *                   2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile
   *                   Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *                   details.
   * @param yTileIndex Y coordinate of the tile on zoom grid. Value must be in the range [0,
   *                   2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile
   *                   Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *                   details.
   * @param options The options parameters.
   */
  getMapTile(
    format: TileFormat,
    layer: MapTileLayer,
    style: MapTileStyle,
    zoom: number,
    xTileIndex: number,
    yTileIndex: number,
    options?: RenderGetMapTileOptionalParams
  ): Promise<RenderGetMapTileResponse>;
  /**
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * Fetches state tiles in vector format typically to be integrated into indoor maps module of map
   * control or SDK. The map control will call this API after user turns on dynamic styling (see [Zoom
   * Levels and Tile
   * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid))
   * @param zoom Zoom level for the desired tile. Zoom value must be in the range: 0-20 (inclusive).
   *
   * Please see [Zoom Levels and Tile
   *             Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *             details.
   * @param xTileIndex X coordinate of the tile on zoom grid. Value must be in the range [0,
   *                   2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile
   *                   Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *                   details.
   * @param yTileIndex Y coordinate of the tile on zoom grid. Value must be in the range [0,
   *                   2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile
   *                   Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *                   details.
   * @param statesetId The stateset id.
   * @param options The options parameters.
   */
  getMapStateTilePreview(
    zoom: number,
    xTileIndex: number,
    yTileIndex: number,
    statesetId: string,
    options?: RenderGetMapStateTilePreviewOptionalParams
  ): Promise<RenderGetMapStateTilePreviewResponse>;
  /**
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   *
   * Copyrights API is designed to serve copyright information for Render Tile
   * service. In addition to basic copyright for the whole map, API is serving
   * specific groups of copyrights for some countries.
   *
   * As an alternative to copyrights for map request, one can receive captions
   * for displaying the map provider information on the map.
   * @param format Desired format of the response. Value can be either _json_ or _xml_.
   * @param options The options parameters.
   */
  getCopyrightCaption(
    format: TextFormat,
    options?: RenderGetCopyrightCaptionOptionalParams
  ): Promise<RenderGetCopyrightCaptionResponse>;
  /**
   * **Applies to:** S1 pricing tier.
   *
   *
   * This service returns a map image tile with size 256x256, given the x and y coordinates and zoom
   * level. Zoom level ranges from 1 to 19. The current available style value is 'satellite' which
   * provides satellite
   * imagery alone.
   *
   *
   * **Note**: We recommend to start to use the new [Get Map Tile V2 API](https://aka.ms/GetMapTileV2).
   * @param format Desired format of the response. Possible value: png.
   * @param style Map style to be returned. __Possible values:__ satellite.
   * @param zoom Zoom level for the desired tile. Zoom value must be in the range: 1-19 (inclusive).
   *             Please see [Zoom Levels and Tile
   *             Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *             details.
   * @param xTileIndex X coordinate of the tile on zoom grid. Value must be in the range [0,
   *                   2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile
   *                   Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *                   details.
   * @param yTileIndex Y coordinate of the tile on zoom grid. Value must be in the range [0,
   *                   2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile
   *                   Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *                   details.
   * @param options The options parameters.
   */
  getMapImageryTile(
    format: RasterTileFormat,
    style: MapImageryStyle,
    zoom: number,
    xTileIndex: number,
    yTileIndex: number,
    options?: RenderGetMapImageryTileOptionalParams
  ): Promise<RenderGetMapImageryTileResponse>;
  /**
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * Returns copyright information for a given bounding box. Bounding-box requests should specify the
   * minimum and maximum longitude and latitude (EPSG-3857) coordinates
   * @param format Desired format of the response. Value can be either _json_ or _xml_.
   * @param mincoordinates Minimum coordinates of bounding box in latitude longitude coordinate system.
   *                       E.g. 52.41064,4.84228
   * @param maxcoordinates Maximum coordinates of bounding box in latitude longitude coordinate system.
   *                       E.g. 52.41064,4.84228
   * @param options The options parameters.
   */
  getCopyrightFromBoundingBox(
    format: TextFormat,
    mincoordinates: string,
    maxcoordinates: string,
    options?: RenderGetCopyrightFromBoundingBoxOptionalParams
  ): Promise<RenderGetCopyrightFromBoundingBoxResponse>;
  /**
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   *
   * Copyrights API is designed to serve copyright information for Render Tile  service. In addition to
   * basic copyright for the whole map, API is serving  specific groups of copyrights for some countries.
   * Returns the copyright information for a given tile. To obtain the copyright information for a
   * particular tile, the request should specify the tile's zoom level and x and y coordinates (see: Zoom
   * Levels and Tile Grid).
   * @param format Desired format of the response. Value can be either _json_ or _xml_.
   * @param zoom Zoom level for the desired tile. Zoom value must be in the range: 0-18 (inclusive).
   *
   * Please see [Zoom Levels and Tile
   *             Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *             details.
   * @param xTileIndex X coordinate of the tile on zoom grid. Value must be in the range [0,
   *                   2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile
   *                   Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *                   details.
   * @param yTileIndex Y coordinate of the tile on zoom grid. Value must be in the range [0,
   *                   2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile
   *                   Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid) for
   *                   details.
   * @param options The options parameters.
   */
  getCopyrightForTile(
    format: TextFormat,
    zoom: number,
    xTileIndex: number,
    yTileIndex: number,
    options?: RenderGetCopyrightForTileOptionalParams
  ): Promise<RenderGetCopyrightForTileResponse>;
  /**
   * **Applies to**: S0 and S1 pricing tiers.
   *
   *
   * Copyrights API is designed to serve copyright information for Render Tile  service. In addition to
   * basic copyright for the whole map, API is serving  specific groups of copyrights for some countries.
   * Returns the copyright information for the world. To obtain the default copyright information for the
   * whole world, do not specify a tile or bounding box.
   * @param format Desired format of the response. Value can be either _json_ or _xml_.
   * @param options The options parameters.
   */
  getCopyrightForWorld(
    format: TextFormat,
    options?: RenderGetCopyrightForWorldOptionalParams
  ): Promise<RenderGetCopyrightForWorldResponse>;
}
