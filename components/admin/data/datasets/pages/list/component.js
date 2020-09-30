import React, { PureComponent } from 'react';

// components
import DatasetsTable from 'components/datasets/table';

// styles
import './styles.scss';

class DatasetsIndex extends PureComponent {
  render() {
    return (
      <div className="c-datasets-index">
        <div className="datasets-table">
          <h3>EarthHQ datasets</h3>
          <DatasetsTable
            routes={{
              index: 'admin_data',
              detail: 'admin_data_detail'
            }}
            application={process.env.APPLICATIONS}
          />
        </div>
        <div className="datasets-table">
          <h3>RW datasets</h3>
          <DatasetsTable
            routes={{
              index: 'admin_data',
              detail: 'admin_data_detail'
            }}
            application="rw"
            showActions={false}
            showNewDatasetButton={false}
            showRelatedContent={false}
            linkToNewWidgetFromName={true}
          />
        </div>
      </div>
    );
  }
}

export default DatasetsIndex;
