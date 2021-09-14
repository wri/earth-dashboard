import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTemplate: null,
  allTemplates: null,
  animationValue: "",
  datasetValue: "",
  monitorValue: ""
};

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
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
    }
  }
});

export const { setTemplates, setCurrentTemplate, setAnimation, setDataset, setMonitor } = templatesSlice.actions;
export default templatesSlice.reducer;
