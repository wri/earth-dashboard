export const DEFAULT_PARTICLE_SYSTEM_OPTIONS = {
  maxParticles: 64 * 64,
  particleHeight: 10000.0,
  fadeOpacity: 0.996,
  dropRate: 0.003,
  dropRateBump: 0.01,
  speedFactor: 1.0,
  lineWidth: 4.0,
  particlesTextureSize: 64
};

export const GLOBE_LAYERS = [
  { name: "NaturalEarthII", type: "NaturalEarthII" },
  { name: "WMS:Rainfall", type: "WMS", layer: "Precipitable_water_entire_atmosphere_single_layer", ColorScaleRange: '0.1,66.8' },
  { name: "WMS:Air Pressure", type: "WMS", layer: "Pressure_surface", ColorScaleRange: '51640,103500' },
  { name: "WMS:Temperature", type: "WMS", layer: "Temperature_surface", ColorScaleRange: '204.1,317.5' },
  { name: "WMS:Wind Speed", type: "WMS", layer: "Wind_speed_gust_surface", ColorScaleRange: '0.1095,35.31' },
  { name: "WorldTerrain", type: "WorldTerrain" }
];

export const DEFAULT_LAYER_OPTIONS = {
  "globeLayer": GLOBE_LAYERS[5],
  "WMS_URL": "https://www.ncei.noaa.gov/thredds/wms/model-gfs-g4-anl-files-old/201809/20180916/gfsanl_4_20180916_0000_000.grb2",
};
