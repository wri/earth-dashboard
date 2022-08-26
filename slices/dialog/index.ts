import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogState } from "./types";

export * from "./types";

export const NAME = "dialog";

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
