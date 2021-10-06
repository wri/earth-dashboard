import { createSlice } from "@reduxjs/toolkit";

export const NAME = "mapControls";

const initialState = {
  projectionType: "orthographic",
  isSettingsOpen: false,
  shouldFetchLocation: false,
  shouldZoomIn: false,
  shouldZoomOut: false,
  isDatePickerOpen: false,
  isDatePickerDisabled: false
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
    },
    setShouldZoomIn(state, action) {
      state.shouldZoomIn = action.payload;
    },
    setShouldZoomOut(state, action) {
      state.shouldZoomOut = action.payload;
    },
    setIsDatePickerOpen(state, action) {
      state.isDatePickerOpen = action.payload;
    },
    setIsDatePickerDisabled(state, action) {
      state.isDatePickerDisabled = action.payload;
    }
  }
});

export const {
  setSettingsOpen,
  setSettingsClose,
  setShouldFetchLocation,
  setGlobe2d,
  setGlobe3d,
  setShouldZoomIn,
  setShouldZoomOut,
  setIsDatePickerOpen,
  setIsDatePickerDisabled
} = mapControlsSlice.actions;
export const isSettingsOpen = state => state[NAME].isSettingsOpen;
export const shouldFetchLocation = state => state[NAME].shouldFetchLocation;
export const isGlobe2d = state => state[NAME].projectionType === "equirectangular";
export const shouldZoomOut = state => state[NAME].shouldZoomOut;
export const shouldZoomIn = state => state[NAME].shouldZoomIn;
export const isDatePickerOpen = state => state[NAME].isDatePickerOpen;
export const isDatePickerDisabled = state => state[NAME].isDatePickerDisabled;

export default mapControlsSlice.reducer;
