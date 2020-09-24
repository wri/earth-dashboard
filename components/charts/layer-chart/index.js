import React from 'react';
import PropTypes from 'prop-types';
import MapThumbnail from 'components/ui/map/map-thumbnail';

// styles
import './layer-chart.module.scss';

function DatasetLayerChart(props) {
  const { layer } = props;

  return (
    <div className={styles['c-layer-chart']}>
      <div className="c-we-chart">
        <MapThumbnail
          layerSpec={layer}
        />
      </div>
    </div>
  );
};

DatasetLayerChart.propTypes = {
  layer: PropTypes.object
};

export default DatasetLayerChart;
