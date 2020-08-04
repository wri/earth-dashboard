import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { handleModule } from 'redux-tools';
import {
  reducers as WEReducers,
  middleware as WEmiddleware,
  sagas
} from '@widget-editor/widget-editor';

// TO-DO: move redactions to modules
import * as reducers from 'redactions';
import modules from 'modules';

// Layout
import * as header from 'layout/header';
import * as headerAdmin from 'layout/header-admin';

// Search
import * as search from 'layout/search';

// Share
import * as shareModal from 'components/modal/share-modal';

// Dashboard
import * as widgetBlockModule from 'components/wysiwyg/widget-block';

// Dataset
import * as datasetListItem from 'components/datasets/list/list-item';
import * as similarDatasets from 'components/datasets/similar-datasets/similar-datasets';
import * as trySubscriptionModal from 'components/datasets/form/try-subscription-modal';

// Tools
import * as relatedTools from 'components/tools/related-tools';

// Admin Interactions
import * as adminInteractions from 'components/admin/data/layers/form/interactions';
import * as adminLayerPreview from 'components/admin/data/layers/form/layer-preview';

// React responsive redux
import { reducer as responsiveReducer } from 'react-responsive-redux';

// REDUCERS
const reducer = combineReducers({
  ...reducers,
  ...WEReducers,
  ...modules,

  // React responsive
  responsive: responsiveReducer,

  // Header
  header: handleModule(header),
  headerAdmin: handleModule(headerAdmin),

  // Search
  search: handleModule(search),

  // Share
  shareModal: handleModule(shareModal),

  // Dashboards
  widgetBlock: handleModule(widgetBlockModule),

  // Dataset
  datasetListItem: handleModule(datasetListItem),
  similarDatasets: handleModule(similarDatasets),
  trySubscriptionModal: handleModule(trySubscriptionModal),

  // Tools
  relatedTools: handleModule(relatedTools),

  // Admin interactions
  interactions: handleModule(adminInteractions),

  // Admin layer preview
  adminLayerPreview: handleModule(adminLayerPreview)
});

export const initStore = (initialState = {}) => {
  const middlewares = applyMiddleware(thunk, WEmiddleware);
  const enhancers = composeWithDevTools(middlewares);
  // create store
  const store = createStore(reducer, initialState, enhancers);

  WEmiddleware.run(sagas);

  return store;
};
