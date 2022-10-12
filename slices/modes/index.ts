import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INFO_PAGE_ID } from "components/app/home/main-container/component";
import { Mode, ModesState } from "./types";

export * from "./types";

export const NAME = "modes";

const initialState: ModesState = {
  defaultModeId: undefined,
  defaultMode: undefined,
  currentModeId: undefined,
  currentMode: undefined,
  currentVisibleMode: undefined,
  loadDefaultModeValues: true,
  allModes: undefined,
  animationValue: "",
  datasetValue: "",
  monitorValue: "",
  heightValue: "",
  layersLabelArr: [],
  dateOfDataShown: new Date().toString(),
  pageTypeId: "InfoPage",
  infoMode: undefined
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
    selectDefaultMode: state => {
      state.loadDefaultModeValues = true;
      state.currentMode = state.defaultMode;
      state.currentVisibleMode = state.defaultMode;
      state.currentModeId = state.defaultModeId;
      state.pageTypeId = initialState.pageTypeId;
    },
    setModes: (state, { payload }: PayloadAction<Mode[]>) => {
      state.allModes = payload;

      state.defaultMode = payload.find(p => p.attributes.title === "Default") ?? payload[0];
      state.defaultModeId = state.defaultMode.id;

      if (!state.currentMode && !state.currentModeId) {
        state.loadDefaultModeValues = true;
        state.currentMode = state.defaultMode;
        state.currentVisibleMode = state.defaultMode;
        state.currentModeId = state.defaultModeId;
      } else if (state.currentModeId) {
        const newMode = payload.find(mode => mode.id === state.currentModeId);

        if (newMode && newMode.attributes.title !== "Default") {
          state.loadDefaultModeValues = false;
          state.currentMode = newMode;
          state.currentVisibleMode = newMode;
        } else {
          state.loadDefaultModeValues = true;
          state.currentMode = state.defaultMode;
          state.currentVisibleMode = state.defaultMode;
          state.currentModeId = state.defaultModeId;
        }
      }

      if (!state.allModes) {
        state.currentMode = undefined;
        state.currentVisibleMode = undefined;
      }
    },
    setCurrentModeId: (state, { payload }: PayloadAction<number>) => {
      state.currentModeId = payload;
    },
    setCurrentMode: (state, { payload }: PayloadAction<Mode>) => {
      state.loadDefaultModeValues = true;
      state.currentMode = payload;
      state.currentVisibleMode = payload;
      state.currentModeId = payload?.id;
    },
    setCurrentVisibleMode: (state, { payload }: PayloadAction<Mode>) => {
      state.loadDefaultModeValues = true;
      state.currentVisibleMode = payload;
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
    },
    setPageTypeId: (state, { payload }: PayloadAction<string>) => {
      state.pageTypeId = payload;
    },
    setInfoMode: (state, { payload }: PayloadAction<Mode | undefined>) => {
      state.infoMode = payload;
    }
  }
});

export const {
  setModes,
  setCurrentMode,
  setCurrentVisibleMode,
  setAnimation,
  setDataset,
  setMonitor,
  setHeight,
  resetValues,
  setLayersLabelArr,
  setDateOfDataShown,
  setCurrentModeId,
  setPageTypeId,
  selectDefaultMode,
  setInfoMode
} = modesSlice.actions;

export default modesSlice.reducer;
