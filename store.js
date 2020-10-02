import { combineReducers } from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import {
  reducers as WEReducers,
  middleware as WEmiddleware,
  sagas
} from '@widget-editor/widget-editor';

// TO-DO: move redactions to modules
import * as reducers from 'redactions';

// REDUCERS
const reducer = combineReducers({
  ...reducers,
  ...WEReducers,
});

const makeStore = () => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(WEmiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {}
});

export const wrapper = createWrapper(makeStore, {});
