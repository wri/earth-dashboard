import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  reducers as WEReducers,
  middleware as WEmiddleware,
  sagas
} from '@widget-editor/widget-editor';

import * as slices from 'slices';

// REDUCERS
const reducer = combineReducers({
  ...WEReducers,
  ...slices
});

const makeStore = (context) => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(WEmiddleware),
    devTools: process.env.ED_NODE_ENV !== 'production',
    preloadedState: {}
  });

  WEmiddleware.run(sagas);

  return store;
};

export const wrapper = createWrapper(makeStore);
