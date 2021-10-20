import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hostname: "https://earthhq.org/",
  isMobile: true,
  isMegaMenuOpen: false
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setHostname(state, action) {
      state.hostname = action.payload;
    },
    setIsMobile(state, { payload }) {
      if (typeof payload !== "boolean") return;

      state.isMobile = payload;
    },
    setIsMegaMenuOpen(state, { payload }) {
      if (typeof payload !== "boolean") return;

      state.isMegaMenuOpen = payload;
    }
  }
});

export const { setHostname, setIsMobile, setIsMegaMenuOpen } = commonSlice.actions;
export default commonSlice.reducer;
