import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { EventScaleData, MapControlsState } from "./types";

export * from "./types";

export const NAME = "mapControls";

const initialState: MapControlsState = {
  projectionType: "orthographic",
  isSettingsOpen: false,
  isFetchLocationDisabled: false,
  shouldFetchLocation: false,
  shouldZoomIn: false,
  shouldZoomOut: false,
  isDatePickerOpen: false,
  isCookieOpen: false,
  isDatePickerDisabled: false,
  currentLocation: undefined,
  currentScale: "default",
  currentScaleBy: 1,
  hasReoriented: false,
  eventScaleData: undefined
};

const mapControlsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setSettingsOpen: state => {
      state.isSettingsOpen = true;
    },
    setSettingsClose: state => {
      state.isSettingsOpen = false;
    },
    setIsFetchLocationDisabled: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchLocationDisabled = payload;
    },
    setShouldFetchLocation: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchLocationDisabled = payload;
      state.shouldFetchLocation = payload;
    },
    setGlobe2d: state => {
      state.projectionType = "equirectangular";
    },
    setGlobe3d: state => {
      state.projectionType = "orthographic";
    },
    setShouldZoomIn: (state, { payload }: PayloadAction<boolean>) => {
      state.shouldZoomIn = payload;
    },
    setShouldZoomOut: (state, { payload }: PayloadAction<boolean>) => {
      state.shouldZoomOut = payload;
    },
    setIsDatePickerOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isDatePickerOpen = payload;
    },
    setIsCookieOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isCookieOpen = payload;
    },
    setIsDatePickerDisabled: (state, { payload }: PayloadAction<boolean>) => {
      state.isDatePickerDisabled = payload;
    },
    setCurrentLocation: (state, { payload }: PayloadAction<[number, number]>) => {
      state.currentLocation = payload;

      if ((Array.isArray(payload) && payload.length === 2) || payload === null) {
        state.currentLocation = payload;
      }
    },
    setCurrentScale: (state, { payload }: PayloadAction<string>) => {
      state.currentScale = payload;
    },
    setCurrentScaleBy: (state, { payload }: PayloadAction<number>) => {
      state.currentScaleBy = payload;
    },
    setHasReoriented: (state, { payload }: PayloadAction<boolean>) => {
      state.hasReoriented = payload;
    },
    setEventScaleData: (state, { payload }: PayloadAction<EventScaleData | undefined>) => {
      state.eventScaleData = payload;
    }
  }
});

export const {
  setSettingsOpen,
  setSettingsClose,
  setIsFetchLocationDisabled,
  setShouldFetchLocation,
  setGlobe2d,
  setGlobe3d,
  setShouldZoomIn,
  setShouldZoomOut,
  setIsDatePickerOpen,
  setIsCookieOpen,
  setIsDatePickerDisabled,
  setCurrentLocation,
  setCurrentScale,
  setCurrentScaleBy,
  setHasReoriented,
  setEventScaleData
} = mapControlsSlice.actions;
export const isSettingsOpen = (state: RootState) => state[NAME].isSettingsOpen;
export const isFetchLocationDisabled = (state: RootState) => state[NAME].isFetchLocationDisabled;
export const shouldFetchLocation = (state: RootState) => state[NAME].shouldFetchLocation;
export const isGlobe2d = (state: RootState) => state[NAME].projectionType === "equirectangular";
export const shouldZoomOut = (state: RootState) => state[NAME].shouldZoomOut;
export const shouldZoomIn = (state: RootState) => state[NAME].shouldZoomIn;
export const isDatePickerOpen = (state: RootState) => state[NAME].isDatePickerOpen;
export const isCookieOpen = (state: RootState) => state[NAME].isCookieOpen;
export const isDatePickerDisabled = (state: RootState) => state[NAME].isDatePickerDisabled;
export const currentLocation = (state: RootState) => state[NAME].currentLocation;
export const currentScale = (state: RootState) => state[NAME].currentScale;
export const currentScaleBy = (state: RootState) => state[NAME].currentScaleBy;
export const hasReoriented = (state: RootState) => state[NAME].hasReoriented;
export const eventScaleData = (state: RootState) => state[NAME].eventScaleData;

export default mapControlsSlice.reducer;
