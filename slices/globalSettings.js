import { createSlice } from "@reduxjs/toolkit";
import globalSettings from "constants/globalSettings";

export const NAME = "globalSettings";

const initialState = {
  ...globalSettings.reduce((accumulator, setting) => ({ [setting.id]: setting.initialState, ...accumulator }), {})
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
