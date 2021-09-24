import { createSlice } from "@reduxjs/toolkit";

export const NAME = "mapControls";

const initialState = {
  isSettingsOpen: false,
  shouldFetchLocation: false,
  shouldZoomIn: false,
  shouldZoomOut: false
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
    setShouldZoomIn(state, action) {
      state.shouldZoomIn = action.payload;
    },
    setShouldZoomOut(state, action) {
      state.shouldZoomOut = action.payload;
    }
  }
});

export const { setSettingsOpen, setSettingsClose, setShouldFetchLocation, setShouldZoomIn, setShouldZoomOut } =
  mapControlsSlice.actions;
export const isSettingsOpen = state => state[NAME].isSettingsOpen;
export const shouldFetchLocation = state => state[NAME].shouldFetchLocation;
export const shouldZoomOut = state => state[NAME].shouldZoomOut;
export const shouldZoomIn = state => state[NAME].shouldZoomIn;

export default mapControlsSlice.reducer;
