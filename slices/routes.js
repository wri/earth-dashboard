import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRouter(state, action) {
      state = action.payload
    }
  }
});

export const { setRouter } = routesSlice.actions
export default routesSlice.reducer
