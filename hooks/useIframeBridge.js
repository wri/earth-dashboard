import { useRef, useCallback, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";
import { getEarthServer } from "utils/iframeBridge/iframeBridge";
import { EarthClient } from "utils/iframeBridge/earthClient";
import * as d3 from "utils/d3";

function colorAt(colors, t) {
  const n = colors.length / 4;
  const j = Math.round(t * (n - 1)) * 4;
  return d3.rgb(colors[j], colors[j + 1], colors[j + 2], colors[j + 3] / 255);
}

const useIframeBridge = callback => {
  const { width } = useWindowDimensions();
  const iframeRef = useRef(null);
  const earthServer = useRef(null);
  const [earthClient, setEarthClient] = useState(null);
  const [layers, setLayers] = useState([]);

  const createEarthClient = useCallback(() => {
    return new (class EarthClientImpl extends EarthClient {
      layersChanged(layers) {
        const overlayLayer = layers.find(layer => layer.type === "overlay");
        earthServer.current.getState().then(console.log);
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

        setLayers(layers);
      }
    })();
  }, []);

  const setRef = useCallback(
    node => {
      const connectToNullSchool = async node => {
        const resp = await getEarthServer(node, width, createEarthClient);
        earthServer.current = resp.server;
        setEarthClient(resp.client);
        callback();
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

  return { setRef, iframeRef, earthClient, earthServer, layers };
};

export default useIframeBridge;
