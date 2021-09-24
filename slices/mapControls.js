import { createSlice } from "@reduxjs/toolkit";

export const NAME = "mapControls";

const initialState = {
  projectionType: "orthographic",
  isSettingsOpen: false,
  shouldFetchLocation: false
};

const mapControlsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setSettingsOpen(state) {
      state.isSettingsOpen = true;
    },
    setSettingsClose(state) {
      state.isSettingsOpen = false;
    },
    setShouldFetchLocation(state, action) {
      state.shouldFetchLocation = action.payload;
    },
    setGlobe2d(state) {
      state.projectionType = "equirectangular";
    },
    setGlobe3d(state) {
      state.projectionType = "orthographic";
    }
  }
});

export const { setSettingsOpen, setSettingsClose, setShouldFetchLocation, setGlobe2d, setGlobe3d } =
  mapControlsSlice.actions;
export const isSettingsOpen = state => state[NAME].isSettingsOpen;
export const shouldFetchLocation = state => state[NAME].shouldFetchLocation;
export const isGlobe3d = state => state[NAME].projectionType === "orthographic";

export default mapControlsSlice.reducer;
