import React, { useEffect } from 'react';
import { createWorldTerrain, Viewer } from 'cesium';

// styles
import styles from './cesium-globe.module.scss';

export default () => {
  useEffect(() => {
    const viewer = new Viewer('cesiumContainer', {
      terrainProvider: createWorldTerrain()
    });
  }, []);
  return <div id="cesiumContainer" className={styles['c-cesium-globe']} />;
};