import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeSelectedHeadline } from "slices/headlines";
import { setCurrentLocation, setCurrentScale, setCurrentScaleBy, setHasReoriented } from "slices/mapControls";
import { resetPageStack, selectDefaultMode } from "slices/modes";
import { CommonState, ShareType } from "./types";

export * from "./types";

export const NAME = "common";

const initialState: CommonState = {
  hostname: "https://earthhq.org/",
  isMobile: true,
  isShareOpen: false,
  isNewsSearchOpen: false,
  hasAppLoaded: false,
  share: undefined,
  isTippingPointOpen: false
};

const commonSlice = createSlice({
  name: NAME,
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
    },
    setAppLoaded: state => {
      state.hasAppLoaded = true;
    },
    setShare: (state, { payload }: PayloadAction<ShareType>) => {
      state.share = payload;
    },
    setTippingPointOpen: (state, { payload }) => {
      state.isTippingPointOpen = payload;
    }
  }
});

export const resetGlobeToDefault = () => (dispatch: any) => {
  dispatch(selectDefaultMode());
  dispatch(removeSelectedHeadline());
  dispatch(setCurrentScale("default"));
  dispatch(setCurrentScaleBy(1));
  dispatch(resetPageStack());
  dispatch(setCurrentLocation([0, 0]));
  dispatch(setHasReoriented(false));
};

export const {
  setHostname,
  setIsMobile,
  setIsShareOpen,
  setIsNewsSearchOpen,
  setAppLoaded,
  setShare,
  setTippingPointOpen
} = commonSlice.actions;

export default commonSlice.reducer;
