import React, { useEffect } from 'react';
import { createWorldTerrain, Viewer } from 'cesium';

export default () => {
  useEffect(() => {
    const viewer = new Viewer('cesiumContainer', {
      terrainProvider: createWorldTerrain()
    });
  }, []);
  return <div id="cesiumContainer" />;
};