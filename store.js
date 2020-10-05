import { combineReducers } from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import {
  reducers as WEReducers,
  middleware as WEmiddleware,
  sagas
} from '@widget-editor/widget-editor';

import * as redactions from 'redactions';

// REDUCERS
const reducer = combineReducers({
  ...WEReducers,
  ...redactions
});

const makeStore = () => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(WEmiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {}
});

export const wrapper = createWrapper(makeStore, {});
