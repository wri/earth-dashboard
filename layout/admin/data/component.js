import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Layout from 'layout/layout/layout-admin';
import Tabs from 'components/ui/tabs';
import DatasetsIndex from 'components/admin/data/datasets/pages/list';
import WidgetsIndex from 'components/admin/data/widgets/pages/list';
import LayersIndex from 'components/admin/data/layers/pages/list';

// constants
import { DATA_TABS } from './constants';

class LayoutAdminData extends PureComponent {
  static propTypes = { query: PropTypes.object.isRequired }

  render() {
    const { query } = this.props;
    const currentTab = (query && query.tab) || 'datasets';

    return (
      <Layout
        title="Data"
        // TO-DO: fill description
        description="Data description..."
      >
        <div className="c-admin-page-header">
          <div className="l-container -admin">
            <div className="row">
              <div className="column small-12">
                <div className="page-header-content -with-tabs">
                  <h1>Data</h1>
                  <Tabs
                    options={DATA_TABS}
                    defaultSelected={currentTab}
                    selected={currentTab}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="c-page-section">
          <div className="l-container -admin">
            <div className="row">
              <div className="column small-12">
                {(currentTab === 'datasets') && (<DatasetsIndex />)}
                {(currentTab === 'widgets') && (<WidgetsIndex />)}
                {(currentTab === 'layers') && (<LayersIndex />)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default LayoutAdminData;
