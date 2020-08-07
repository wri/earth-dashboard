import { handleModule } from 'redux-tools';

import staticPagesModules from './static-pages';

export default {
  staticPages: handleModule(staticPagesModules)
};

