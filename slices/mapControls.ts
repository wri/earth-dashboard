import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const NAME = "mapControls";

export type MapControlsState = {
  projectionType: string;
  isSettingsOpen: boolean;
  isFetchLocationDisabled: boolean;
  shouldFetchLocation: boolean;
  shouldZoomIn: boolean;
  shouldZoomOut: boolean;
  isDatePickerOpen: boolean;
  isDatePickerDisabled: boolean;
  currentLocation?: any;
  currentScale: string;
  currentScaleBy: number;
};

const initialState: MapControlsState = {
  projectionType: "orthographic",
  isSettingsOpen: false,
  isFetchLocationDisabled: false,
  shouldFetchLocation: false,
  shouldZoomIn: false,
  shouldZoomOut: false,
  isDatePickerOpen: false,
  isDatePickerDisabled: false,
  currentLocation: null,
  currentScale: "default",
  currentScaleBy: 1
};

const mapControlsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setSettingsOpen: (state: any) => {
      state.isSettingsOpen = true;
    },
    setSettingsClose: (state: any) => {
      state.isSettingsOpen = false;
    },
    setIsFetchLocationDisabled: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchLocationDisabled = payload;
    },
    setShouldFetchLocation: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchLocationDisabled = payload;
      state.shouldFetchLocation = payload;
    },
    setGlobe2d: (state: any) => {
      state.projectionType = "equirectangular";
    },
    setGlobe3d: (state: any) => {
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
    setIsDatePickerDisabled: (state, { payload }: PayloadAction<boolean>) => {
      state.isDatePickerDisabled = payload;
    },
    setCurrentLocation: (state, { payload }: PayloadAction<any>) => {
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
  setIsDatePickerDisabled,
  setCurrentLocation,
  setCurrentScale,
  setCurrentScaleBy
} = mapControlsSlice.actions;
export const isSettingsOpen = (state: any) => state[NAME].isSettingsOpen;
export const isFetchLocationDisabled = (state: any) => state[NAME].isFetchLocationDisabled;
export const shouldFetchLocation = (state: any) => state[NAME].shouldFetchLocation;
export const isGlobe2d = (state: any) => state[NAME].projectionType === "equirectangular";
export const shouldZoomOut = (state: any) => state[NAME].shouldZoomOut;
export const shouldZoomIn = (state: any) => state[NAME].shouldZoomIn;
export const isDatePickerOpen = (state: any) => state[NAME].isDatePickerOpen;
export const isDatePickerDisabled = (state: any) => state[NAME].isDatePickerDisabled;
export const currentLocation = (state: any) => state[NAME].currentLocation;
export const currentScale = (state: any) => state[NAME].currentScale;
export const currentScaleBy = (state: any) => state[NAME].currentScaleBy;

export default mapControlsSlice.reducer;
