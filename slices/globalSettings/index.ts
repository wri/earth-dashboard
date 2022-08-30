import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ID as showMapGridId } from "schemas/global-settings/show-map-grid";
import { ID as animationsId } from "schemas/global-settings/animations";
import { ID as highDefinitionModeId } from "schemas/global-settings/high-definition-mode";
import { ID as basemapsId } from "schemas/global-settings/basemaps";
import { GlobalSetting, GlobalSettingsState } from "./types";
import { RootState } from "store/types";

export * from "./types";

export const NAME = "globalSettings";

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
        newState: any;
      }>
    ) => {
      if (!state.hasOwnProperty(payload.id)) return;

      state[payload.id] = payload.newState;
    }
  }
});

export const { setSettingById } = globalSettingsSlice.actions;

export const getSettingValueById = (id: GlobalSetting) => (state: RootState) => state.globalSettings[id];

export default globalSettingsSlice.reducer;
