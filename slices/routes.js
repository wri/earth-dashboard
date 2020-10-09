import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRouter(state, action) {
      Object.keys(action.payload).forEach(
        propertyKey => state[propertyKey] = action.payload[propertyKey]);
    }
  },
  extraReducers: {
		[HYDRATE]: (state, action) => {
      return action.payload.routes;
    }
	}
});

export const { setRouter } = routesSlice.actions
export default routesSlice.reducer
