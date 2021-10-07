import { createSlice } from "@reduxjs/toolkit";

export const NAME = "modes";

const initialState = {
  currentMode: null,
  allModes: null,
  animationValue: "",
  datasetValue: "",
  monitorValue: "",
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
    },
    setModes(state, action) {
      state.allModes = action.payload;
      if (!state.currentMode) {
        state.currentMode = action.payload[0];
      }
    },
    setCurrentMode(state, action) {
      state.currentMode = action.payload;
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
  resetValues,
  setLayersLabelArr,
  setDateOfDataShown
} = modesSlice.actions;
export default modesSlice.reducer;
