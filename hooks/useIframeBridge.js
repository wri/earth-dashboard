import { useRef, useCallback, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";
import { getEarthServer } from "utils/iframeBridge/iframeBridge";
import { EarthClient } from "utils/iframeBridge/earthClient";
import {
  colorAt,
  getIndicatorGeoJson,
  getMarkerProperties,
  getNewProjection,
  getOverlayData,
  getAnnotationData
} from "utils/map";
import { POINT_INDICATOR } from "constants/map";
import { useEffect } from "react/cjs/react.development";

const useIframeBridge = callback => {
  const { width } = useWindowDimensions();
  const iframeRef = useRef(null);
  const earthServer = useRef(null);
  const [earthClient, setEarthClient] = useState(null);
  const [err, setErr] = useState(null);
  const [layers, setLayers] = useState([]);
  const [currentProjection, setCurrentProjection] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [toolTipDetails, setToolTipDetails] = useState(null);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [scaleData, setScaleData] = useState({ annotation: null, overlay: null });
  const [toolTipText, setToolTipText] = useState("");
  const currentProjectionFunc = useCallback(() => getNewProjection(currentProjection), [currentProjection]);

  useEffect(() => {
    if (currentProjection && currentMarker && toolTipVisible) {
      const projectionD3Func = currentProjectionFunc();
      setToolTipDetails({ ...getMarkerProperties(currentMarker, projectionD3Func), text: toolTipText });
    } else {
      setToolTipDetails(null);
    }
  }, [currentProjectionFunc, currentMarker, currentProjection, toolTipVisible, toolTipText]);

  const enableToolTip = useCallback((coords, content) => {
    if (earthServer.current) {
      setToolTipText(content);
      setToolTipVisible(true);
      const marker = getIndicatorGeoJson(coords);
      setCurrentMarker(marker);
      earthServer.current.annotate(POINT_INDICATOR, marker);
    }
  }, []);

  const disableToolTip = useCallback(() => {
    if (earthServer.current) {
      setToolTipVisible(false);
      setToolTipText("");
      earthServer.current.annotate(POINT_INDICATOR, null);
    }
  }, []);

  const createEarthClient = useCallback(() => {
    return new (class EarthClientImpl extends EarthClient {
      currentLayers = [];

      layersChanged(newLayers) {
        console.log(newLayers);
        const overlayLayer = newLayers.find(layer => layer?.type === "overlay");
        if (overlayLayer && overlayLayer.product) {
          const { scale } = overlayLayer.product;
          const { colors } = scale;

          const height = 100;

          const cssColors = [];
          for (let i = 0; i < height; i++) {
            const color = String(colorAt(colors, i / (height - 1)));
            cssColors.push(`${color} ${(i / height) * 100}%`);
          }
          const getCss = deg => `linear-gradient(${deg}deg, ${cssColors.join(", ")})`;
          scale.getCss = getCss;
        }
        setLayers(newLayers);
        this.currentLayers = newLayers;
      }

      async click(point, coords) {
        const marker = getIndicatorGeoJson(coords);
        setCurrentMarker(marker);
        earthServer.current.annotate(POINT_INDICATOR, marker);

        const coordinates = marker.geometry.coordinates;
        const samples = await earthServer.current.sampleAt(point, coordinates);
        const data = {
          overlay: getOverlayData(samples, this.currentLayers),
          annotation: getAnnotationData(samples, this.currentLayers)
        };
        setScaleData(data);
      }

      reorientStep(projection) {
        setCurrentProjection(projection);
      }

      reorientEnd(projection) {
        setCurrentProjection(projection);
      }
    })();
  }, []);

  const setRef = useCallback(
    node => {
      const connectToNullSchool = async node => {
        try {
          setErr(null);
          const resp = await getEarthServer(node, width, createEarthClient);
          earthServer.current = resp.server;
          setEarthClient(resp.client);
          callback();
        } catch (err) {
          setErr(err);
        }
      };

      if (node) {
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.
        // connectToNullSchool(node);
        node.onload = () => connectToNullSchool(node);
      }

      // Save a reference to the node
      iframeRef.current = node;
    },
    [width, createEarthClient, callback]
  );

  return {
    setRef,
    iframeRef,
    earthClient,
    earthServer,
    layers,
    toolTipDetails,
    scaleData,
    enableToolTip,
    disableToolTip,
    error: err
  };
};

export default useIframeBridge;
