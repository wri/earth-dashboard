import { createSlice } from "@reduxjs/toolkit";

export const NAME = "controlBar";

const initialState = {
  isSettingsOpen: false,
  shouldFetchLocation: false
};

const controlBarSlice = createSlice({
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
    }
  }
});

export const { setSettingsOpen, setSettingsClose, setShouldFetchLocation } = controlBarSlice.actions;
export const isSettingsOpen = state => state[NAME].isSettingsOpen;
export const shouldFetchLocation = state => state[NAME].shouldFetchLocation;

export default controlBarSlice.reducer;
