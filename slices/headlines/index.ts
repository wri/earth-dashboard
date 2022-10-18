import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Headline, HeadlinesState } from "./types";

export * from "./types";

export const NAME = "headlines";

const initialState: HeadlinesState = {
  headlines: [],
  currentHeadline: undefined,
  currentHeadlineId: undefined,
  headlinesLoading: false
};

const headlinesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    removeSelectedHeadline: state => {
      state.currentHeadline = undefined;
      state.currentHeadlineId = undefined;
    },
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
    setCurrentHeadline: (state, { payload }: PayloadAction<Headline | undefined>) => {
      state.currentHeadline = payload;

      if (payload) {
        state.currentHeadlineId = payload.id;
      }
    },
    setCurrentHeadlineId: (state, { payload }: PayloadAction<number | undefined>) => {
      state.currentHeadlineId = payload;
    },
    setHeadlinesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.headlinesLoading = payload;
    }
  }
});

export const { removeSelectedHeadline, setHeadlines, setCurrentHeadline, setCurrentHeadlineId, setHeadlinesLoading } =
  headlinesSlice.actions;

export default headlinesSlice.reducer;
