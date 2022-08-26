import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Record<string, string>>) => {
      // @ts-expect-error
      Object.keys(payload).forEach(propertyKey => (state[propertyKey] = payload[propertyKey]));
    }
  },
  extraReducers: {
    [HYDRATE]: (_, { payload }: PayloadAction<{ user: any }>) => {
      return payload.user;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
