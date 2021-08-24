import { useEffect, useState } from "react";

import ParticleSystem from "utils/cesium/particleSystem";

// utils
import { loadData } from "utils/cesium/dataProcess";
import { viewRectangleToLonLatRange } from "utils/cesium/util";

// constants
import { DEFAULT_PARTICLE_SYSTEM_OPTIONS, DEFAULT_LAYER_OPTIONS } from "./constants";

// styles
import styles from "./cesium-globe.module.scss";

let Cesium;

let viewerParameters;
let globeBoundingSphere;
let particleSystem;
let camera;
let scene;
let viewer;
let imageryLayers;

const CesiumGlobe = ({ mode }) => {
  const [layerInputText, setLayerInputText] = useState(null);

  const updateViewerParameters = () => {
    const viewRectangle = camera.computeViewRectangle(scene.globe.ellipsoid);
    const lonLatRange = viewRectangleToLonLatRange(viewRectangle);
    viewerParameters.lonRange.x = lonLatRange.lon.min;
    viewerParameters.lonRange.y = lonLatRange.lon.max;
    viewerParameters.latRange.x = lonLatRange.lat.min;
    viewerParameters.latRange.y = lonLatRange.lat.max;

    const pixelSize = camera.getPixelSize(globeBoundingSphere, scene.drawingBufferWidth, scene.drawingBufferHeight);

    if (pixelSize > 0) {
      viewerParameters.pixelSize = pixelSize;
    }
  };

  const addPrimitives = () => {
    // the order of primitives.add() should respect the dependency of primitives
    scene.primitives.add(particleSystem.particlesComputing.primitives.calculateSpeed);
    scene.primitives.add(particleSystem.particlesComputing.primitives.updatePosition);
    scene.primitives.add(particleSystem.particlesComputing.primitives.postProcessingPosition);

    scene.primitives.add(particleSystem.particlesRendering.primitives.segments);
    scene.primitives.add(particleSystem.particlesRendering.primitives.trails);
    scene.primitives.add(particleSystem.particlesRendering.primitives.screen);
  };

  const addGlobeLayer = url => {
    viewer.imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url
      })
    );
  };

  const setGlobeLayer = userInput => {
    viewer.imageryLayers.removeAll();
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();

    const globeLayer = userInput.globeLayer;
    switch (globeLayer.type) {
      case "NaturalEarthII": {
        viewer.imageryLayers.addImageryProvider(
          new Cesium.TileMapServiceImageryProvider({ url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII") })
        );
        break;
      }
      case "WMS": {
        viewer.imageryLayers.addImageryProvider(
          new Cesium.WebMapServiceImageryProvider({
            url: userInput.WMS_URL,
            layers: globeLayer.layer,
            parameters: { ColorScaleRange: globeLayer.ColorScaleRange }
          })
        );
        break;
      }
      case "WorldTerrain": {
        viewer.imageryLayers.addImageryProvider(Cesium.createWorldImagery());
        viewer.terrainProvider = Cesium.createWorldTerrain();
        break;
      }
      case "RWLayer": {
        viewer.imageryLayers.addImageryProvider(
          new Cesium.UrlTemplateImageryProvider({
            url: globeLayer.url
          })
        );
      }
      case "ArcGIS": {
        viewer.imageryLayers.addImageryProvider(
          new Cesium.ArcGisMapServerImageryProvider({
            url: globeLayer.url
          })
        );
      }
      default: {
        return;
      }
    }

    // Fire weather layer
    viewer.imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: "https://api.resourcewatch.org/v1/layer/fc5ee0ce-1350-4c67-a66e-1257afff5bc7/tile/gee/{z}/{x}/{y}"
      })
    );
  };

  const setupEventListeners = () => {
    camera.moveStart.addEventListener(function () {
      scene.primitives.show = false;
    });

    camera.moveEnd.addEventListener(function () {
      updateViewerParameters();
      particleSystem.applyViewerParameters(viewerParameters);
      scene.primitives.show = true;
    });

    var resized = false;
    window.addEventListener("resize", function () {
      resized = true;
      scene.primitives.show = false;
      scene.primitives.removeAll();
    });

    scene.preRender.addEventListener(function () {
      if (resized) {
        particleSystem.canvasResize(scene.context);
        resized = false;
        addPrimitives();
        scene.primitives.show = true;
      }
    });
  };

  useEffect(() => {
    // Init Cesium var
    Cesium = window.Cesium; // eslint-disable-line prefer-destructuring

    const options = {
      baseLayerPicker: true,
      geocoder: true,
      infoBox: true,
      fullscreenElement: "cesiumContainer",
      scene3DOnly: true,
      skyAtmosphere: false
    };

    viewer = new Cesium.Viewer("cesiumContainer", options);
    camera = viewer.camera;
    scene = viewer.scene;

    if (mode.debug) {
      options.useDefaultRenderLoop = false;
    }

    viewerParameters = {
      lonRange: new Cesium.Cartesian2(),
      latRange: new Cesium.Cartesian2(),
      pixelSize: 0.0
    };
    // use a smaller earth radius to make sure distance to camera > 0
    globeBoundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, 0.99 * 6378137.0);
    updateViewerParameters();

    loadData().then(data => {
      particleSystem = new ParticleSystem(scene.context, data, DEFAULT_PARTICLE_SYSTEM_OPTIONS, viewerParameters);
      addPrimitives();

      setupEventListeners();

      if (mode.debug) {
        debug();
      }
    });

    imageryLayers = viewer.imageryLayers;
    setGlobeLayer(DEFAULT_LAYER_OPTIONS);
  }, []);

  return (
    <div id="cesiumContainer" className={styles["c-cesium-globe"]}>
      <div className={styles["add-layer-container"]}>
        <input onChange={event => setLayerInputText(event.target.value)} />
        <button onClick={() => addGlobeLayer(layerInputText)}>Add layer</button>
      </div>
    </div>
  );
};

export default CesiumGlobe;
