import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTemplate: null,
  allTemplates: null,
  animationValue: "",
  datasetValue: "",
  monitorValue: "",
  layersLabelArr: [],
  dateOfDataShown: new Date().toString()
};

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    resetValues(state) {
      state.animationValue = "";
      state.datasetValue = "";
      state.monitorValue = "";
    },
    setTemplates(state, action) {
      state.allTemplates = action.payload;
      if (!state.currentTemplate) {
        state.currentTemplate = action.payload[0];
      }
    },
    setCurrentTemplate(state, action) {
      state.currentTemplate = action.payload;
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
  setTemplates,
  setCurrentTemplate,
  setAnimation,
  setDataset,
  setMonitor,
  resetValues,
  setLayersLabelArr,
  setDateOfDataShown
} = templatesSlice.actions;
export default templatesSlice.reducer;
