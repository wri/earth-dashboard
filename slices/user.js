import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      Object.keys(action.payload).forEach(propertyKey => (state[propertyKey] = action.payload[propertyKey]));
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return action.payload.user;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
