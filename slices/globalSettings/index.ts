import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasemapType, GlobalSetting, GlobalSettingsState } from "./types";
import { RootState } from "store/types";

export * from "./types";

export const NAME = "globalSettings";

const initialState: GlobalSettingsState = {
  showMapGrid: false,
  showAnimations: true,
  showHighDefinition: false,
  basemap: "geography"
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
        newState: boolean | BasemapType;
      }>
    ) => {
      (state[payload.id] as boolean | BasemapType) = payload.newState;
    }
  }
});

export const { setSettingById } = globalSettingsSlice.actions;

export const getSettingValueById = (id: GlobalSetting) => (state: RootState) => state.globalSettings[id];

export default globalSettingsSlice.reducer;
