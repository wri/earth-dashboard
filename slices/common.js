import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hostname: "https://earthhq.org/",
  isMobile: true
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
    }
  }
});

export const { setHostname, setIsMobile } = commonSlice.actions;
export default commonSlice.reducer;
