import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Headline, HeadlinesState } from "./types";

export * from "./types";

export const NAME = "headlines";

const initialState: HeadlinesState = {
  headlines: [],
  currentHeadline: undefined,
  currentHeadlineId: undefined
};

const headlinesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setHeadlines: (state, { payload }: PayloadAction<Headline[]>) => {
      state.headlines = payload;

      if (state.currentHeadlineId) {
        const headline = payload.find(headline => headline.id === state.currentHeadlineId);

        if (headline) {
          state.currentHeadline = headline;
        } else {
          state.currentHeadlineId = undefined;
        }
      }
    },
    setCurrentHeadline: (state, { payload }: PayloadAction<Headline>) => {
      state.currentHeadline = payload;

      if (payload) {
        state.currentHeadlineId = payload.id;
      }
    },
    setCurrentHeadlineId: (state, { payload }: PayloadAction<number>) => {
      state.currentHeadlineId = payload;
    }
  }
});

export const { setHeadlines, setCurrentHeadline, setCurrentHeadlineId } = headlinesSlice.actions;
export default headlinesSlice.reducer;
