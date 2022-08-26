import { ID as showMapGridId } from "schemas/global-settings/show-map-grid";
import { ID as animationsId } from "schemas/global-settings/animations";
import { ID as highDefinitionModeId } from "schemas/global-settings/high-definition-mode";
import { ID as basemapsId } from "schemas/global-settings/basemaps";

export type GlobalSetting = typeof showMapGridId | typeof animationsId | typeof highDefinitionModeId;

export type GlobalSettingsState = {
  [showMapGridId]: boolean;
  [animationsId]: boolean;
  [highDefinitionModeId]: boolean;
  [basemapsId]: string;
};
