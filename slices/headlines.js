import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headlines: [],
  currentHeadline: null
};

const headlinesSlice = createSlice({
  name: "headlines",
  initialState,
  reducers: {
    setHeadlines(state, action) {
      state.headlines = action.payload;
    },
    setCurrentHeadline(state, action) {
      state.currentHeadline = action.payload;
    }
  }
});

export const { setHeadlines, setCurrentHeadline } = headlinesSlice.actions;
export default headlinesSlice.reducer;
