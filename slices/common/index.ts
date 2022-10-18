import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeSelectedHeadline } from "slices/headlines";
import { setCurrentScale, setCurrentScaleBy } from "slices/mapControls";
import { resetPageStack, selectDefaultMode } from "slices/modes";
import { CommonState } from "./types";

export * from "./types";

const initialState: CommonState = {
  hostname: "https://earthhq.org/",
  isMobile: true,
  isShareOpen: false,
  isNewsSearchOpen: false
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setHostname: (state, { payload }: PayloadAction<string>) => {
      state.hostname = payload;
    },
    setIsMobile: (state, { payload }: PayloadAction<boolean>) => {
      state.isMobile = payload;
    },
    setIsShareOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isShareOpen = payload;
    },
    setIsNewsSearchOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isNewsSearchOpen = payload;
    }
  }
});

export const resetGlobeToDefault = () => (dispatch: any) => {
  dispatch(selectDefaultMode());
  dispatch(removeSelectedHeadline());
  dispatch(setCurrentScale("default"));
  dispatch(setCurrentScaleBy(1));
  dispatch(resetPageStack());
};

export const { setHostname, setIsMobile, setIsShareOpen, setIsNewsSearchOpen } = commonSlice.actions;

export default commonSlice.reducer;
