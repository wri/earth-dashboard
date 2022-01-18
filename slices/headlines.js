import { createSlice } from "@reduxjs/toolkit";

export const NAME = "headlines";

const initialState = {
  headlines: [],
  currentHeadline: null,
  currentHeadlineId: null
};

const headlinesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setHeadlines(state, action) {
      state.headlines = action.payload;

      if (state.currentHeadlineId) {
        const headline = action.payload.find(headline => headline.id === state.currentHeadlineId);

        if (headline) {
          state.currentHeadline = headline;
        } else {
          state.currentHeadlineId = undefined;
        }
      }
    },
    setCurrentHeadline(state, action) {
      state.currentHeadline = action.payload;

      if (action.payload) {
        state.currentHeadlineId = action.payload.id;
      }
    },
    setCurrentHeadlineId(state, action) {
      state.currentHeadlineId = action.payload;
    }
  }
});

export const { setHeadlines, setCurrentHeadline, setCurrentHeadlineId } = headlinesSlice.actions;
export default headlinesSlice.reducer;
