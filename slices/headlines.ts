import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode } from "./modes";

export const NAME = "headlines";

export type Headline = {
  id: number;
  type: string;
  attributes: {
    climate_alert_date: string;
    content: {};
    location: {};
    mode: Mode;
    title: string;
    summary: string;
    thumbnail_image: string;
    zoom_level: number;
  };
};

export type HeadlinesState = {
  headlines: Headline[];
  currentHeadline?: Headline;
  currentHeadlineId?: number;
};

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
