import React, { PureComponent } from 'react';

// components
import DatasetsTable from 'components/datasets/table';

// styles
import styles from './datasets-page-list.module.scss';

class DatasetsIndex extends PureComponent {
  render() {
    return (
      <div className={styles['c-datasets-index']}>
        <div className={styles['datasets-table']}>
          <h3>EarthHQ datasets</h3>
          <DatasetsTable
            routes={{
              index: 'admin_data',
              detail: 'admin_data_detail'
            }}
            application={process.env.APPLICATIONS}
          />
        </div>
        <div className={styles['datasets-table']}>
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
