export const DEFAULT_PARTICLE_SYSTEM_OPTIONS = {
  maxParticles: 128 * 128,
  particleHeight: 10000.0,
  fadeOpacity: 0.996,
  dropRate: 0.003,
  dropRateBump: 0.01,
  speedFactor: 0.05,
  lineWidth: 4.0,
  particlesTextureSize: 128
};

export const GLOBE_LAYERS = [
  { name: "NaturalEarthII", type: "NaturalEarthII" },
  { name: "WMS:Rainfall", type: "WMS", layer: "Precipitable_water_entire_atmosphere_single_layer", ColorScaleRange: '0.1,66.8' },
  { name: "WMS:Air Pressure", type: "WMS", layer: "Pressure_surface", ColorScaleRange: '51640,103500' },
  { name: "WMS:Temperature", type: "WMS", layer: "Temperature_surface", ColorScaleRange: '204.1,317.5' },
  { name: "WMS:Wind Speed", type: "WMS", layer: "Wind_speed_gust_surface", ColorScaleRange: '0.1095,35.31' },
  { name: "WorldTerrain", type: "WorldTerrain" },
  // { name: "Fire weather", type: "RWLayer", url: "https://api.resourcewatch.org/v1/layer/fc5ee0ce-1350-4c67-a66e-1257afff5bc7/tile/gee/{z}/{x}/{y}" }
  { name: "RW fine particulate matter", type: "RWLayer", url: "https://api.resourcewatch.org/v1/layer/db8ef3b3-13f4-44ff-915b-d1150b674178/tile/gee/{z}/{x}/{y}" }
  // { name: "RW Satellite Imagery", type: "RWLayer", url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/2021-05-09/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg"}
];

export const DEFAULT_LAYER_OPTIONS = {
  "globeLayer": GLOBE_LAYERS[6],
  "WMS_URL": "https://www.ncei.noaa.gov/thredds/wms/model-gfs-g4-anl-files-old/201809/20180916/gfsanl_4_20180916_0000_000.grb2",
};
