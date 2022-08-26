import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode, ModesState } from "./types";

export * from "./types";

export const NAME = "modes";

const initialState: ModesState = {
  currentModeId: undefined,
  currentMode: undefined,
  loadDefaultModeValues: true,
  allModes: undefined,
  animationValue: "",
  datasetValue: "",
  monitorValue: "",
  heightValue: "",
  layersLabelArr: [],
  dateOfDataShown: new Date().toString()
};

const modesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    resetValues(state) {
      state.animationValue = "";
      state.datasetValue = "";
      state.monitorValue = "";
      state.heightValue = "";
    },
    setModes: (state, { payload }: PayloadAction<Mode[]>) => {
      state.allModes = payload;

      if (!state.currentMode && !state.currentModeId) {
        state.loadDefaultModeValues = true;
        state.currentMode = payload[0];
        state.currentModeId = payload[0].id;
      } else if (state.currentModeId) {
        state.loadDefaultModeValues = false;
        const newMode = payload.find(mode => mode.id === state.currentModeId);

        if (newMode) {
          state.currentMode = newMode;
        } else {
          state.currentMode = payload[0];
          state.currentModeId = payload[0].id;
        }
      }

      if (!state.allModes) {
        state.currentMode = undefined;
      }
    },
    setCurrentModeId: (state, { payload }: PayloadAction<number>) => {
      state.currentModeId = payload;
    },
    setCurrentMode: (state, { payload }: PayloadAction<Mode>) => {
      state.loadDefaultModeValues = true;
      state.currentMode = payload;
      state.currentModeId = payload.id;
    },
    setAnimation: (state, { payload }: PayloadAction<string>) => {
      state.animationValue = payload;
    },
    setDataset: (state, { payload }: PayloadAction<string>) => {
      state.datasetValue = payload;
    },
    setMonitor: (state, { payload }: PayloadAction<string>) => {
      state.monitorValue = payload;
    },
    setHeight: (state, { payload }: PayloadAction<string>) => {
      state.heightValue = payload;
    },
    setLayersLabelArr: (state, { payload }: PayloadAction<string[]>) => {
      state.layersLabelArr = payload;
    },
    setDateOfDataShown: (state, { payload }: PayloadAction<string>) => {
      // Make sure only serialisable data is stored in the redux state.
      // Can't store a Date Object in the state for example.
      if (typeof payload !== "string") return;
      if (isNaN(new Date(payload).getTime())) return;

      state.dateOfDataShown = payload;
    }
  }
});

export const {
  setModes,
  setCurrentMode,
  setAnimation,
  setDataset,
  setMonitor,
  setHeight,
  resetValues,
  setLayersLabelArr,
  setDateOfDataShown,
  setCurrentModeId
} = modesSlice.actions;

export default modesSlice.reducer;
