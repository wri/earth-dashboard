import { createSlice } from "@reduxjs/toolkit";

export const NAME = "controlBar";

const initialState = {
  isSettingsOpen: false
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
    }
  }
});

export const { setSettingsOpen, setSettingsClose } = controlBarSlice.actions;
export default controlBarSlice.reducer;

export const isSettingsOpen = state => state[NAME].isSettingsOpen;
