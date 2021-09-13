export const LEVELS = {
  surface: "surface",
  jetstream: "250hPa",
  polarVortex: "10hPa"
};
export const DATA_LAYER_MAP = {
  // Animations
  vdma9i9h: { animation_type: "currents", animation_enabled: true },
  sze2a0gf: { animation_type: "wind", animation_enabled: true },
  // End Aminations
  // Monitor
  jvafhah4: { annotation_type: "fires" },
  // End Monitor
  // Datasets
  "13xvafxz": { overlay_type: "pm2.5", z_level: LEVELS.surface }, // Particulate matter (less than 2.5 micron)
  riqtkkov: { overlay_type: "sea_surface_temp_anomaly", z_level: LEVELS.surface }, // Sea surface temp anomaly (SSTA),
  hrb7qlk9: { overlay_type: "sea_surface_temp", z_level: LEVELS.surface }, // Sea surface temp anomaly (SST)
  f6fcp2ev: { overlay_type: "total_precipitable_water", z_level: LEVELS.surface }, // Total precipitable Water (TWP)
  "7jb2seh1": { overlay_type: "misery_index", z_level: LEVELS.surface }, // Misery Index (MI)
  kotzxwzb: { overlay_type: "relative_humidity", z_level: LEVELS.surface }, // Relative Humidity (RH)
  "0hzxvexv": { overlay_type: "uv_index", z_level: LEVELS.surface }, // UV index (UVI)
  tcvntrxq: { overlay_type: "temp", z_level: LEVELS.surface }, // Temperature
  krcrjvpg: { overlay_type: "wind", z_level: LEVELS.polarVortex }, // Wind at polar vortex
  xpo1gqgs: { overlay_type: "wind", z_level: LEVELS.surface }, // Wind at surface
  "6mffa36d": { overlay_type: "wind", z_level: LEVELS.jetstream }, // Wind at jet stream
  f6fcp2ev: { overlay_type: "none", z_level: LEVELS.surface }, // Smoke TBD
  zbwzorpj: { overlay_type: "cosc", z_level: LEVELS.surface }, // Carbon Monoxide
  f6fcp2ev: { overlay_type: "", z_level: LEVELS.surface }
  // End Datasets
};

export const DATA_LAYER_TYPES = {
  animation: "Animation",
  monitor: "Monitor",
  dataset: "Data Set"
};
