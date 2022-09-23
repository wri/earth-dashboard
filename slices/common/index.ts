import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeSelectedHeadline } from "slices/headlines";
import { setCurrentScale, setCurrentScaleBy } from "slices/mapControls";
import { selectDefaultMode } from "slices/modes";
import { CommonState } from "./types";

export * from "./types";

const initialState: CommonState = {
  hostname: "https://earthhq.org/",
  isMobile: true,
  isShareOpen: false
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setHostname: (state, { payload }: PayloadAction<string>) => {
      state.hostname = payload;
    },
    setIsMobile: (state, { payload }: PayloadAction<boolean>) => {
      if (typeof payload !== "boolean") return;

      state.isMobile = payload;
    },
    setIsShareOpen: (state, { payload }: PayloadAction<boolean>) => {
      if (typeof payload !== "boolean") return;

      state.isShareOpen = payload;
    }
  }
});

export const resetGlobeToDefault = () => (dispatch: any) => {
  dispatch(selectDefaultMode());
  dispatch(removeSelectedHeadline());
  dispatch(setCurrentScale("default"));
  dispatch(setCurrentScaleBy(1));
};

export const { setHostname, setIsMobile, setIsShareOpen } = commonSlice.actions;

export default commonSlice.reducer;
