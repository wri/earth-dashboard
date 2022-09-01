import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import useWindowDimensions from "./useWindowDimensions";
import { getEarthServer } from "utils/iframeBridge/iframeBridge";
import { EarthClient } from "utils/iframeBridge/earthClient";
import {
  colorAt,
  getIndicatorGeoJson,
  getMarkerProperties,
  getNewProjection,
  getOverlayData,
  getAnnotationData,
  SAMPLE_OVERLAY_INDEX,
  GeoMarker
} from "utils/map";
import { POINT_INDICATOR } from "constants/map";
import { EarthLayer } from "components/app/home/main-container/types";
import { GeoProjection } from "d3-geo";
import { Headline } from "slices/headlines";

type UseIframeBridgeConfig = {
  callback?: () => void;
  allowClickEvents: boolean;
  headlines: Headline[];
};

const useIframeBridge = ({ callback, allowClickEvents, headlines }: UseIframeBridgeConfig) => {
  const [earthClient, setEarthClient] = useState<EarthClient>();
  const [error, setError] = useState<Error>();
  const [layers, setLayers] = useState<EarthLayer[]>([]);
  const [currentProjection, setCurrentProjection] = useState<GeoProjection>();
  const [currentMarker, setCurrentMarker] = useState<GeoMarker>();
  const [toolTipDetails, setToolTipDetails] = useState<{ isVisible?: boolean; x?: number; y?: number; text: string }>();
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [scaleData, setScaleData] = useState({ annotation: null, overlay: null });
  const [toolTipText, setToolTipText] = useState<string>("");
  const [hasIframeConnected, setHasIframeConnected] = useState<boolean>(false);

  const { width } = useWindowDimensions();

  const MAX_NUMBER_OF_HEADLINES = 25;

  const mostRecentHeadlines = useMemo(() => {
    const reversed = [...headlines].reverse();
    return reversed.slice(0, MAX_NUMBER_OF_HEADLINES);
  }, [headlines]);

  // References
  const iframeRef = useRef<any>();
  const earthServer = useRef<any>();

  console.log("---------------");
  console.log(earthClient);

  const currentProjectionFunc = useCallback(() => getNewProjection(currentProjection), [currentProjection]);

  useEffect(() => {
    if (earthServer.current) {
      mostRecentHeadlines.forEach(headline => {
        const marker = getIndicatorGeoJson([headline.attributes.location.lng, headline.attributes.location.lat]);
        earthServer.current.annotate(`indicator-${headline.id}`, marker);
      });
    }
  }, [mostRecentHeadlines]);

  useEffect(() => {
    if (currentProjection && currentMarker && toolTipVisible) {
      const projectionD3Func = currentProjectionFunc();
      setToolTipDetails({ ...getMarkerProperties(currentMarker, projectionD3Func), text: toolTipText });
    } else {
      setToolTipDetails(undefined);
    }
  }, [currentProjectionFunc, currentMarker, currentProjection, toolTipVisible, toolTipText]);

  useEffect(() => {
    if (earthClient) {
      earthClient.allowClickEvents = allowClickEvents;
    }
  }, [earthClient, allowClickEvents]);

  const enableToolTip = useCallback((coords: [number, number], content: string) => {
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
      currentLayers: EarthLayer[] = [];
      allowClickEvents: boolean = true;

      layersChanged(newLayers: EarthLayer[]) {
        const overlayLayer = newLayers.find(layer => layer?.type === "overlay");
        if (overlayLayer && overlayLayer.product) {
          const { scale } = overlayLayer.product;
          const { colors } = scale;

          const height = 100;

          const cssColors: string[] = [];
          for (let i = 0; i < height; i++) {
            const color = String(colorAt(colors, i / (height - 1)));
            cssColors.push(`${color} ${(i / height) * 100}%`);
          }
          const getCss = (deg: number) => `linear-gradient(${deg}deg, ${cssColors.join(", ")})`;
          scale.getCss = getCss;
        }
        setLayers(newLayers);
        this.currentLayers = newLayers;
      }

      async click(point: [number, number], coords: [number, number]) {
        if (this.allowClickEvents) {
          const marker = getIndicatorGeoJson(coords);
          setCurrentMarker(marker);
          earthServer.current?.annotate(POINT_INDICATOR, marker);

          const coordinates = marker.geometry.coordinates;
          const samples = await earthServer.current?.sampleAt(point, coordinates);
          const data = {
            overlay: getOverlayData(samples, this.currentLayers),
            annotation: getAnnotationData(samples, this.currentLayers),
            layer: this.currentLayers[SAMPLE_OVERLAY_INDEX]
          };
          setScaleData(data);
        }
      }

      reorientStep(projection: any) {
        setCurrentProjection(projection);
      }

      reorientEnd(projection: any) {
        setCurrentProjection(projection);
      }
    })();
  }, []);

  const setRef = useCallback(
    (node: any) => {
      const connectToNullSchool = async (node: any) => {
        try {
          setHasIframeConnected(false);
          setError(undefined);
          const resp = await getEarthServer(node, width, createEarthClient);
          earthServer.current = resp.server as any;
          setEarthClient(resp.client);
          setHasIframeConnected(true);
          if (callback) callback();
        } catch (e) {
          setError(e as Error);
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
    error,
    hasIframeConnected
  };
};

export default useIframeBridge;
