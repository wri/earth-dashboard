import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const { setHostname, setIsMobile, setIsShareOpen } = commonSlice.actions;

export default commonSlice.reducer;
