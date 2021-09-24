import { useRef, useCallback, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";
import { getEarthServer } from "utils/iframeBridge/iframeBridge";
import { EarthClient } from "utils/iframeBridge/earthClient";

const useIframeBridge = callback => {
  const { width } = useWindowDimensions();
  const iframeRef = useRef(null);
  const earthServer = useRef(null);
  const [earthClient, setEarthClient] = useState(null);
  const [layers, setLayers] = useState([]);

  const createEarthClient = useCallback(() => {
    return new (class EarthClientImpl extends EarthClient {
      layersChanged(layers) {
        console.log(layers);
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
