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
        pathname: `/admin/data/layers/${layerID}/edit`, 
        query: {
          dataset: datasetID
        }
      });
    } else {
      router.push('/admin/data/layers');
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
