import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload
    }
  },
  extraReducers: {
		[HYDRATE]: (state, action) => action.payload.user
	}
});

export const { setUser } = userSlice.actions
export default userSlice.reducer
