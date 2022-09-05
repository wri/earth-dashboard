export type BasemapType = "geography" | "simple";

export type GlobalSettingsState = {
  showMapGrid: boolean;
  showAnimations: boolean;
  showHighDefinition: boolean;
  basemap: BasemapType;
};

export type GlobalSetting = keyof GlobalSettingsState;
