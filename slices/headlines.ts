import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const NAME = "headlines";

export type DataLayer = {
  type: "DataLayer";
  id: number;
  attributes: {
    title: string;
    description: string;
    default_on: boolean;
    data_key: string;
    category: {
      type: "LayerCategory";
      id: number;
      attributes: {
        title: string;
        description: string;
      };
    };
    source: null;
  };
};

export type Mode = {
  type: "Mode";
  id: number;
  attributes: {
    title: string;
    description: string;
    icon: string;
    source: null;
    data_layers: {
      default: DataLayer[];
      available: DataLayer[];
    };
    visibility: {
      advanced_menu: boolean;
      data_highlights: boolean;
    };
  };
};

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
