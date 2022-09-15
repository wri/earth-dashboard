import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Headline, HeadlinesState } from "./types";

export * from "./types";

export const NAME = "headlines";

const initialState: HeadlinesState = {
  headlines: [],
  currentHeadline: undefined,
  currentHeadlineId: undefined
};

const MAX_NUMBER_OF_HEADLINES_PER_LAYER = 10;
const MAX_NUMBER_OF_HEADLINES_IN_TOTAL = 25;

const headlinesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setHeadlines: (state, { payload }: PayloadAction<Headline[]>) => {
      state.headlines = filterHeadlines(payload);

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

const filterHeadlines = (headlines: Headline[]) => {
  const countsByMode = {};
  let totalHeadlines = 0;
  return headlines.filter(headline => {
    if (totalHeadlines >= MAX_NUMBER_OF_HEADLINES_IN_TOTAL) return false;
    const modeId = `${headline.attributes.mode.id}`;
    // @ts-expect-error
    countsByMode[modeId] = countsByMode[modeId] ? countsByMode[modeId] + 1 : 1;
    // @ts-expect-error
    const include = countsByMode[modeId] <= MAX_NUMBER_OF_HEADLINES_PER_LAYER;
    if (include) totalHeadlines++;
    return include;
  });
};

export const { setHeadlines, setCurrentHeadline, setCurrentHeadlineId } = headlinesSlice.actions;

export default headlinesSlice.reducer;
