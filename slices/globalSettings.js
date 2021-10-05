import { createSlice } from "@reduxjs/toolkit";
import { ID as showMapGridId } from "schemas/global-settings/show-map-grid";
import { ID as animationsId } from "schemas/global-settings/animations";
import { ID as highDefinitionModeId } from "schemas/global-settings/high-definition-mode";
import { ID as basemapsId } from "schemas/global-settings/basemaps";

export const NAME = "globalSettings";

const initialState = {
  [showMapGridId]: false,
  [animationsId]: true,
  [highDefinitionModeId]: false,
  [basemapsId]: "default"
};

const globalSettingsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setSettingById(state, { payload }) {
      if (!state.hasOwnProperty(payload.id)) return;

      state[payload.id] = payload.newState;
    }
  }
});

export const { setSettingById } = globalSettingsSlice.actions;
export const getSettingValueById = id => state => state[NAME][id];

export default globalSettingsSlice.reducer;
