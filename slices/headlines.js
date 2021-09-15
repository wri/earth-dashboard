import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headlines: []
};

const headlinesSlice = createSlice({
  name: "headlines",
  initialState,
  reducers: {
    setHeadlines(state, action) {
      state.headlines = action.payload;
    }
  }
});

export const { setHeadlines } = headlinesSlice.actions;
export default headlinesSlice.reducer;
