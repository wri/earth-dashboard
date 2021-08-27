import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hostname: "https://earthhq.org/"
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setHostname(state, action) {
      state.hostname = action.payload;
    }
  }
});

export const { setHostname } = commonSlice.actions;
export default commonSlice.reducer;
