import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const NAME = "dialog";

export type DialogState = {
  dialogHeight: string;
};

const initialState: DialogState = {
  dialogHeight: "70vh"
};

const dialogSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setDialogHeight: (state, { payload }: PayloadAction<{ height: string }>) => {
      state.dialogHeight = payload.height;
    }
  }
});

export const { setDialogHeight } = dialogSlice.actions;

export default dialogSlice.reducer;
