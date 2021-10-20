import { createSlice } from "@reduxjs/toolkit";

export const NAME = "dialog";

const initialState = {
  dialogHeight: "70vh"
};

const dialogSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setDialogHeight(state, { payload }) {
      state.dialogHeight = payload.height;
    }
  }
});

export const { setDialogHeight } = dialogSlice.actions;

export default dialogSlice.reducer;
