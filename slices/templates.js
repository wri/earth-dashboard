import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTemplate: null,
  allTemplates: null
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
    }
  }
});

export const { setTemplates, setCurrentTemplate } = templatesSlice.actions;
export default templatesSlice.reducer;
