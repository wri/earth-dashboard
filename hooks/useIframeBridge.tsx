import { useRef, useCallback, useState, useEffect, useContext } from "react";
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
  GeoMarker,
  GeoMarkerOverlayLocation
} from "utils/map";
import { EarthLayer } from "components/app/home/main-container/types";
import { GeoProjection } from "d3-geo";
import { Headline } from "slices/headlines";
import { fetchClimateAlertById, fetchClimateAlerts } from "services/gca";
import {
  ActionCreatorWithOptionalPayload,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload
} from "@reduxjs/toolkit";
import { Mode } from "slices/modes";
import { IframeBridgeContext } from "../context/IframeBridgeProvider";
import { PAGE_TYPE_ID } from "components/app/home/main-container/component";
import { useRouter } from "next/router";
import { ShareType } from "slices/common";

type GeoMarkerOverlayDetails = GeoMarkerOverlayLocation & { headline: Headline };

type UseIframeBridgeConfig = {
  callback?: () => void;
  allowClickEvents: boolean;
  headlines: Headline[];
  currentMode?: Mode;
  defaultMode?: Mode;
  setHeadlines: ActionCreatorWithPayload<Headline[], string>;
  setHeadlinesLoading: ActionCreatorWithPayload<boolean, string>;
  setReoriented: ActionCreatorWithoutPayload<string>;
  pageTypeId: string;
  routePageTypeId: string;
  currentHeadlineId: number | undefined;
  outdatedHeadline: Headline | undefined;
  setOutdatedHeadline: ActionCreatorWithPayload<Headline | undefined, string>;
  setCurrentHeadline: ActionCreatorWithOptionalPayload<Headline | undefined, string>;
  setCurrentHeadlineId: ActionCreatorWithOptionalPayload<number | undefined, string>;
  share: ShareType;
};

type Marker = { id: number; label: string };

export const useIframeBridgeContext = () => {
  return useContext(IframeBridgeContext);
};

const useIframeBridge = ({
  callback,
  allowClickEvents,
  headlines,
  setHeadlinesLoading,
  currentMode,
  defaultMode,
  setHeadlines,
  setReoriented,
  pageTypeId,
  currentHeadlineId,
  routePageTypeId,
  outdatedHeadline,
  setOutdatedHeadline,
  setCurrentHeadline,
  setCurrentHeadlineId,
  share
}: UseIframeBridgeConfig) => {
  const [earthClient, setEarthClient] = useState<EarthClient>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [error, setError] = useState<Error>();
  const [layers, setLayers] = useState<EarthLayer[]>([]);
  const [currentProjection, setCurrentProjection] = useState<GeoProjection>();
  const [currentMarker, setCurrentMarker] = useState<GeoMarker>();
  const [toolTipDetails, setToolTipDetails] = useState<{ isVisible?: boolean; x?: number; y?: number; text: string }>();
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [scaleToolTipData, setScaleToolTipData] = useState({ annotation: null, overlay: null });
  const [toolTipText, setToolTipText] = useState<string>("");
  const [hasIframeConnected, setHasIframeConnected] = useState<boolean>(false);
  const [extremeEventLocations, setExtremeEventLocations] = useState<GeoMarkerOverlayDetails[]>([]);

  const { width } = useWindowDimensions();

  const router = useRouter();

  // References
  const iframeRef = useRef<any>();
  const earthServer = useRef<any>();

  const currentProjectionFunc = useCallback(() => getNewProjection(currentProjection), [currentProjection]);

  // Set headlines redux if mobile
  useEffect(() => {
    (async () => {
      setHeadlinesLoading(true);
      try {
        const mode_id = currentMode?.id === defaultMode?.id ? undefined : currentMode?.id;

        let numberOfHeadlines = mode_id
          ? 10
          : pageTypeId === PAGE_TYPE_ID.CURRENT_EVENT_PAGE
          ? routePageTypeId === PAGE_TYPE_ID.INFO_PAGE
            ? 10
            : 25
          : pageTypeId === PAGE_TYPE_ID.INFO_PAGE
          ? 10
          : 25;

        const isExplore = router.pathname === "/explore";

        // Fetches all or mode specific events for explore page
        const resp = await fetchClimateAlerts({
          count: 25,
          in_top_events: 25,
          mode_id: isExplore ? mode_id : undefined
        });

        if (currentHeadlineId) {
          resp.data.data.forEach((headline: Headline, index: number) => {
            if (headline.id === currentHeadlineId) {
              if (index >= 10 && index < 25) {
                numberOfHeadlines = 25;
              }
            }
          });

          // Shows single shared event
          if (
            share === "event" &&
            !(resp.data.data as Headline[]).map(headline => headline.id).includes(currentHeadlineId)
          ) {
            const singleResp = await fetchClimateAlertById(currentHeadlineId.toString());
            setOutdatedHeadline(singleResp.data.data);
          }
        }

        const filteredHeadlines = (resp.data.data as Headline[]).slice(0, numberOfHeadlines);

        setHeadlines(filteredHeadlines);
      } catch (err) {
        console.log("Error fetching modes");
      } finally {
        setHeadlinesLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [setHeadlines, currentMode, pageTypeId]);

  // Set the extreme event points
  useEffect(() => {
    if (earthServer.current) {
      if (outdatedHeadline) {
        const marker = getIndicatorGeoJson([
          outdatedHeadline.attributes.location.lng,
          outdatedHeadline.attributes.location.lat
        ]);
        const annotationId = `indicator-${outdatedHeadline.id}`;
        earthServer.current.annotate(annotationId, marker);
        return setMarkers([{ id: outdatedHeadline.id, label: annotationId }]);
      }

      const markersToRemove = markers.filter(marker => !headlines.find(headline => headline.id === marker.id));
      markersToRemove.forEach(marker => earthServer.current.annotate(marker.label, null));

      // Removes all markers only on explore info page
      if (router.pathname === "/explore" && pageTypeId === PAGE_TYPE_ID.INFO_PAGE) {
        markers.forEach(marker => earthServer.current.annotate(marker.label, null));
        return setMarkers([]);
      }

      const newMarkers: Marker[] = [];
      headlines.forEach(headline => {
        const annotationId = `indicator-${headline.id}`;
        newMarkers.push({ id: headline.id, label: annotationId });
        if (!markers.find(marker => marker.id === headline.id)) {
          const marker = getIndicatorGeoJson([headline.attributes.location.lng, headline.attributes.location.lat]);
          earthServer.current.annotate(annotationId, marker);
        }
      });
      setMarkers(newMarkers);
    }

    // eslint-disable-next-line
  }, [headlines, earthServer.current, pageTypeId, outdatedHeadline]);

  // Set locations for extreme event buttons (overlay)
  useEffect(() => {
    if (earthServer.current) {
      let extremeEventLocations: GeoMarkerOverlayDetails[] = [];

      (outdatedHeadline ? [outdatedHeadline] : headlines).forEach(headline => {
        const projectionD3Func = currentProjectionFunc();
        const marker = getIndicatorGeoJson([headline.attributes.location.lng, headline.attributes.location.lat]);
        const location = getMarkerProperties(marker, projectionD3Func);
        if (location) extremeEventLocations.push({ ...location, headline: headline });
      });
      setExtremeEventLocations(extremeEventLocations);

      if (outdatedHeadline) {
        setCurrentHeadline(outdatedHeadline);
        setCurrentHeadlineId(outdatedHeadline.id);
      }
    }

    // eslint-disable-next-line
  }, [headlines, currentProjectionFunc, currentProjection, earthServer.current, outdatedHeadline]);

  // Set details for the tool tip on extreme event
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
    }
  }, []);

  const disableToolTip = useCallback(() => {
    if (earthServer.current) {
      setToolTipVisible(false);
      setToolTipText("");
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

          const coordinates = marker.geometry.coordinates;
          const samples = await earthServer.current?.sampleAt(point, coordinates);
          const data = {
            overlay: getOverlayData(samples, this.currentLayers),
            annotation: getAnnotationData(samples, this.currentLayers),
            layer: this.currentLayers[SAMPLE_OVERLAY_INDEX]
          };
          setScaleToolTipData(data);
        }
      }

      reorientStart() {
        setReoriented();
      }

      reorientStep(projection: any) {
        setCurrentProjection(projection);
      }

      reorientEnd(projection: any) {
        setCurrentProjection(projection);
      }
    })();

    // eslint-disable-next-line
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
    extremeEventLocations,
    scaleToolTipData,
    enableToolTip,
    disableToolTip,
    error,
    hasIframeConnected
  };
};

export default useIframeBridge;
