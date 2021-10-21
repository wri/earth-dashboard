import { createSlice } from "@reduxjs/toolkit";

export const NAME = "modes";

const initialState = {
  currentModeId: null,
  currentMode: null,
  loadDefaultModeValues: true,
  allModes: null,
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
    setModes(state, action) {
      state.allModes = action.payload;
      if (!state.currentMode && !state.currentModeId) {
        state.loadDefaultModeValues = true;
        state.currentMode = action.payload[0];
        state.currentModeId = action.payload[0].id;
      }

      if (state.currentModeId) {
        state.loadDefaultModeValues = false;
        const newMode = action.payload.find(mode => mode.id === state.currentModeId);
        if (newMode) {
          state.currentMode = newMode;
        }
      }

      if (!state.allModes) {
        state.currentMode = null;
      }
    },
    setCurrentModeId(state, action) {
      state.currentModeId = action.payload;
    },
    setCurrentMode(state, action) {
      state.loadDefaultModeValues = true;
      state.currentMode = action.payload;
      state.currentModeId = action.payload.id;
    },
    setAnimation(state, action) {
      state.animationValue = action.payload;
    },
    setDataset(state, action) {
      state.datasetValue = action.payload;
    },
    setMonitor(state, action) {
      state.monitorValue = action.payload;
    },
    setHeight(state, action) {
      state.heightValue = action.payload;
    },
    setLayersLabelArr(state, action) {
      state.layersLabelArr = action.payload;
    },
    setDateOfDataShown(state, { payload }) {
      // Make sure only serialisable data is stored in the redux state.
      // Can't store a Date Object in the state for example.
      if (typeof payload !== "string") return;

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
