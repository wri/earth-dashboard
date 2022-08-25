import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ID as showMapGridId } from "schemas/global-settings/show-map-grid";
import { ID as animationsId } from "schemas/global-settings/animations";
import { ID as highDefinitionModeId } from "schemas/global-settings/high-definition-mode";
import { ID as basemapsId } from "schemas/global-settings/basemaps";

export const NAME = "globalSettings";

export type GlobalSetting = typeof showMapGridId | typeof animationsId | typeof highDefinitionModeId;

export type GlobalSettingsState = {
  [showMapGridId]: boolean;
  [animationsId]: boolean;
  [highDefinitionModeId]: boolean;
  [basemapsId]: string;
};

const initialState: GlobalSettingsState = {
  [showMapGridId]: false,
  [animationsId]: true,
  [highDefinitionModeId]: false,
  [basemapsId]: "geography"
};

const globalSettingsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setSettingById: (
      state,
      {
        payload
      }: PayloadAction<{
        id: GlobalSetting;
        newState: boolean;
      }>
    ) => {
      if (!state.hasOwnProperty(payload.id)) return;

      state[payload.id] = payload.newState;
    }
  }
});

export const { setSettingById } = globalSettingsSlice.actions;

export const getSettingValueById = (id: any) => (state: any) => state[NAME][id];

export default globalSettingsSlice.reducer;
