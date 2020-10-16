import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// components
import LayersForm from 'components/admin/data/layers/form';

// styles
import styles from './layers-new.module.scss';

function LayersNew(props) {
  const {
    user: { token },
    dataset
  } = props;
  const router = useRouter();
  const handleSubmit = (layerID, datasetID) => {
    if (layerID && datasetID) {
      router.push({
        pathname: '/admin/data/[tab]/[id]/[subtab]', 
        query: { 
          tab: 'layers',
          id: layerID,
          subtab: 'edit',
          dataset: datasetID
        }
      });
    } else {
      router.push({
        pathname: '/admin/data/[tab]', 
        query: { tab: 'layers' }
      });
    }
  }

  return (
    <div className={styles['c-layers-new']}>
      <LayersForm
        application={[process.env.APPLICATIONS]}
        authorization={token}
        onSubmit={handleSubmit}
        dataset={dataset}
      />
    </div>
  );
}

LayersNew.propTypes = {
  dataset: PropTypes.string,
  user: PropTypes.object.isRequired
};

LayersNew.defaultProps = { dataset: null };

export default LayersNew;
