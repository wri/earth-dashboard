import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {};

const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setRouter: (state, { payload }: PayloadAction<Record<string, string>>) => {
      // @ts-expect-error
      Object.keys(payload).forEach(propertyKey => (state[propertyKey] = payload[propertyKey]));
    }
  },
  extraReducers: {
    [HYDRATE]: (_, { payload }: PayloadAction<{ routes: any }>) => {
      return payload.routes;
    }
  }
});

export const { setRouter } = routesSlice.actions;

export default routesSlice.reducer;
