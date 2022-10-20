import IframeBridgeProvider from "../../../../context/IframeBridgeProvider";
import { useState, useEffect, useRef, useMemo } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import menuButtonStyles from "./menu-button.module.scss";
import actionStyles from "components/app/home/actions/actions.module.scss";
import Menu from "components/app/home/menu";
import Actions from "components/app/home/actions";
import MapControls from "components/app/home/map-controls";
import useWindowDimensions from "hooks/useWindowDimensions";
import { fetchModes, getMenuTitle } from "services/gca";
import MapIframe from "components/app/home/map";
import Scale from "components/app/home/scale";
import settingsButtonConfig from "constants/control-bar/controls/settings";
import { getIndicatorGeoJson, getOverlayData, UNIT_LABEL_MAP } from "utils/map";
import IconButton from "components/ui/icon-button";
import { Headline } from "slices/headlines";
import { EarthLayer } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { EventScaleData, isFetchLocationDisabled, setShouldFetchLocation } from "slices/mapControls";
import useIframeBridge from "hooks/useIframeBridge";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Mode } from "slices/modes";
import ShareModal from "components/share-modal";
import * as d3 from "utils/d3";
import { reorientController } from "utils/iframeBridge/iframeBridge";
import { SCALE_TYPES } from "constants/map";
import moment from "moment";
import InfoModal from "../normal-scale/info-modal";
import { useRouter } from "next/router";

export const MODILE_MENU_HEIGHT_WITH_SCALE = 235;
export const MODILE_MENU_HEIGHT_WITHOUT_SCALE = 148;
export const INFO_PAGE_HEADLINE = "This Is A Planetary Emergency...";
export const DATA_INFO_PAGE_HEADLINE = "I'd like to explore...";
export const EXTREME_EVENTS_PAGE_HEADLINE = "Extreme events";

export const PAGE_TYPE_ID = {
  INFO_PAGE: "InfoPage",
  EXTREME_EVENTS_LIST_PAGE: "ExtremeEventsPage",
  DATA_LAYER_PAGE: "DataLayerPage",
  CURRENT_EVENT_PAGE: "CurrentEventPage"
};

type MainContainerProps = {
  isMobile: boolean;
  setIsMobile: ActionCreatorWithPayload<boolean, string>;
  setModes: ActionCreatorWithPayload<Mode[], string>;
  layersLabelArr: string[];
  headlines: Headline[];
  currentHeadline?: Headline;
  currentHeadlineId?: number;
  shouldFadeControls: boolean;
  setHeadlines: ActionCreatorWithPayload<Headline[], string>;
  setHeadlinesLoading: ActionCreatorWithPayload<boolean, string>;
  currentMode?: Mode;
  defaultMode?: Mode;
  pageTypeId: string;
  pagePush: ActionCreatorWithPayload<string, string>;
  setReoriented: ActionCreatorWithoutPayload<string>;
  setEventScaleData: ActionCreatorWithPayload<EventScaleData | undefined, string>;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  setDateOfDataShown: ActionCreatorWithPayload<string, string>;
  setCurrentLocation: ActionCreatorWithPayload<[number, number], string>;
  setCurrentScale: ActionCreatorWithPayload<string, string>;
  setCurrentScaleBy: ActionCreatorWithPayload<number, string>;
  setCurrentVisibleMode: ActionCreatorWithPayload<Mode, string>;
  setModesLoading: ActionCreatorWithPayload<boolean, string>;
  modesLoading: boolean;
  routePageTypeId: string;
};

const MainContainer = ({
  isMobile,
  setIsMobile,
  setModes,
  layersLabelArr,
  headlines,
  shouldFadeControls,
  currentHeadline,
  setHeadlines,
  setHeadlinesLoading,
  defaultMode,
  currentMode,
  pageTypeId,
  setReoriented,
  setEventScaleData,
  setCurrentMode,
  setDateOfDataShown,
  setCurrentLocation,
  setCurrentScale,
  setCurrentScaleBy,
  setCurrentVisibleMode,
  currentHeadlineId,
  setModesLoading,
  modesLoading,
  pagePush,
  routePageTypeId
}: MainContainerProps) => {
  const router = useRouter();

  const defaultMobileMenuHeight =
    pageTypeId === PAGE_TYPE_ID.INFO_PAGE
      ? router?.pathname === "/"
        ? MODILE_MENU_HEIGHT_WITH_SCALE + 28
        : MODILE_MENU_HEIGHT_WITH_SCALE + 68
      : currentMode?.id === defaultMode?.id
      ? MODILE_MENU_HEIGHT_WITHOUT_SCALE
      : MODILE_MENU_HEIGHT_WITH_SCALE;

  const [hasMenuOpen, setHasMenuOpen] = useState<boolean>(false);
  const [hasIframe, setHasIframe] = useState<boolean>(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [mobileMenuHeight, setMobileMenuHeight] = useState<number>(defaultMobileMenuHeight);

  const { width: browserWidth } = useWindowDimensions();

  // References
  const menuRef = useRef<HTMLDivElement>();
  const zoomInRef = useRef<HTMLButtonElement>();
  const zoomOutRef = useRef<HTMLButtonElement>();

  // Redux
  const dispatch = useDispatch();
  const isLocationDisabled = useSelector(isFetchLocationDisabled);

  /** Toggles the current location setting. */
  const handleToggleLocation = () => {
    dispatch((() => setShouldFetchLocation(true))());
  };

  const getOpenMenuHeight = () => {
    return pageTypeId === PAGE_TYPE_ID.INFO_PAGE ? (router?.pathname === "/" ? 404 : 480) : window.innerHeight * 0.6;
  };

  const {
    setRef,
    earthClient,
    earthServer,
    layers,
    error,
    toolTipDetails,
    enableToolTip,
    disableToolTip,
    scaleToolTipData,
    hasIframeConnected,
    extremeEventLocations
  } = useIframeBridge({
    allowClickEvents: !currentHeadline,
    headlines,
    setHeadlines,
    setHeadlinesLoading,
    currentMode,
    defaultMode,
    setReoriented,
    pageTypeId,
    currentHeadlineId,
    pagePush,
    routePageTypeId
  });

  const overlayLayer = useMemo(() => {
    return (layers as EarthLayer[]).find(layer => layer?.type === "overlay");
  }, [layers]);

  const scaleData = useMemo(() => {
    if (overlayLayer?.product) {
      const { units } = overlayLayer.product;
      const [unitSymbol, [lo, hi]] = Object.entries(overlayLayer.product.scale.range)[0];
      const precision = units[unitSymbol]?.precision ?? 0;

      let alternateSymbol;
      if (UNIT_LABEL_MAP[unitSymbol]) {
        alternateSymbol = UNIT_LABEL_MAP[unitSymbol];
      }

      return {
        min: lo.toFixed(precision),
        max: hi.toFixed(precision),
        unitSymbol: alternateSymbol ? alternateSymbol : unitSymbol,
        hasSmallLabels: alternateSymbol ? alternateSymbol.length >= 10 : false
      };
    }
  }, [overlayLayer?.product]);

  useEffect(() => {
    const getEventScaleValue = async () => {
      if (!currentHeadline || !overlayLayer) {
        return null;
      }

      const marker = getIndicatorGeoJson([
        currentHeadline.attributes.location.lng,
        currentHeadline.attributes.location.lat
      ]);

      const coordinates = marker.geometry.coordinates;
      const samples = await earthServer.current?.sampleAt(null, coordinates);
      const data = getOverlayData(samples, [overlayLayer]);

      if (data) {
        return data.value;
      } else {
        return undefined;
      }
    };

    const getEventScaleData = async () => {
      if (!currentHeadline || !overlayLayer?.product) {
        return setEventScaleData(undefined);
      }

      const { units } = overlayLayer.product;
      const [unitSymbol, [lo, hi]] = Object.entries(overlayLayer.product.scale.range)[0];
      const precision = units[unitSymbol]?.precision ?? 0;

      const min = parseFloat(lo.toFixed(precision));
      const max = parseFloat(hi.toFixed(precision));
      let value = await getEventScaleValue();
      const gradient = overlayLayer.product.scale.getCss(90);

      let percent: number | undefined = 0;

      if (value) {
        const scaleType = overlayLayer.product.scale.type;
        const linearPercent = ((value - min) * 100) / (max - min);
        const logPercent = ((Math.log(value) - Math.log(min)) * 100) / (Math.log(max) - Math.log(min));
        percent = scaleType === SCALE_TYPES.log ? logPercent : linearPercent;
        if (percent > 100) {
          percent = 100;
        }
        if (percent < 0) {
          percent = 0;
        }
      } else percent = undefined;

      if (typeof percent !== "undefined" && isNaN(percent)) percent = undefined;

      const minLabel = `${min} ${scaleData?.unitSymbol}`;
      const maxLabel = `${max} ${scaleData?.unitSymbol}`;

      const eventScaleData: EventScaleData = {
        gradient,
        value: percent,
        minLabel,
        maxLabel
      };

      setEventScaleData(eventScaleData);
    };

    getEventScaleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHeadline, overlayLayer]);

  const toggleMenu = () => {
    if (!hasMenuOpen) {
      setHasMenuOpen(true);
      setMobileMenuHeight(getOpenMenuHeight());
    } else {
      setIsClosingMenu(true);
      setTimeout(() => {
        setIsClosingMenu(false);
        setHasMenuOpen(false);
      }, 400);
      setMobileMenuHeight(defaultMobileMenuHeight);
    }
  };

  // Set menu open when mobile menu height changes
  useEffect(() => {
    if (mobileMenuHeight > defaultMobileMenuHeight) return setHasMenuOpen(true);
    setHasMenuOpen(false);
  }, [mobileMenuHeight]);

  // Store the isMobile flag in the redux store
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  useEffect(() => {
    setTimeout(() => {
      setHasIframe(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!currentHeadline && currentMode) {
      setCurrentMode(currentMode);
    }
  }, [currentHeadline]);

  // https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  const browserWidthMutable = useRef(browserWidth);
  useEffect(() => {
    browserWidthMutable.current = browserWidth;
  });

  // Move globe to the right when menu is open
  useEffect(() => {
    if (!earthServer.current || isMobile || !hasIframeConnected) return;

    const animationDuration = 300;
    const translateDuration = 25;
    const totalDistance = browserWidthMutable.current * 0.2;

    const distanceInterval = totalDistance / (animationDuration / translateDuration);
    const translateInterval = hasMenuOpen ? distanceInterval : distanceInterval * -1;

    let translateDistance = 0;

    const loop = () => {
      translateDistance += distanceInterval;

      if (translateDistance <= totalDistance) {
        earthServer.current?.reorient({ translateBy: [translateInterval, 0] });
        setTimeout(() => window.requestAnimationFrame(loop), translateDuration);
      } else if (!hasMenuOpen) {
        earthServer.current?.reorient({ translate: "default" });
      }
    };

    loop();
  }, [earthServer, hasMenuOpen, isMobile, hasIframeConnected]);

  useEffect(() => {
    if (hasMenuOpen) {
      menuRef.current?.focus();
    }
  }, [hasMenuOpen]);

  useEffect(() => {
    reorientController(d3.select(zoomInRef.current), () => earthServer?.current?.reorient({ scaleBy: 1.05 }));
    reorientController(d3.select(zoomOutRef.current), () => earthServer?.current?.reorient({ scaleBy: 0.95 }));
  }, [earthServer, zoomInRef?.current, zoomOutRef?.current]);

  // Fetch Templates from the GCA CMS
  useEffect(() => {
    const getTemplates = async () => {
      setModesLoading(true);
      try {
        const { data } = await fetchModes();

        // Checks if current mode is valid else show 404
        const query = new URLSearchParams(window.location.search);
        const queryMode = query.get("mode");

        if (queryMode && !data.data.map(mode => mode.id.toString()).includes(queryMode)) router.push("/404");

        setModes(data.data);
      } catch (err) {
        console.log("Error fetching modes");
      } finally {
        setModesLoading(false);
      }
    };

    getTemplates();
  }, [setModes]);

  useEffect(() => {
    if (!currentHeadline) setDateOfDataShown(new Date().toString());
  }, [currentHeadline]);

  useEffect(() => {
    if (currentHeadline && earthServer.current) {
      enableToolTip(
        [currentHeadline.attributes.location.lng, currentHeadline.attributes.location.lat],
        moment(currentHeadline.attributes.climate_alert_date).format("Do MMMM YYYY")
      );
    } else {
      disableToolTip();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earthServer.current, currentHeadline, disableToolTip, enableToolTip, layersLabelArr]);

  // When the Globe loads, open the menu
  useEffect(() => {
    if (earthServer.current) {
      setHasMenuOpen(true);
      setMobileMenuHeight(getOpenMenuHeight());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earthServer.current, setHasMenuOpen]);

  // When enter info page, set height as is different to others
  useEffect(() => {
    if (pageTypeId === PAGE_TYPE_ID.INFO_PAGE) setMobileMenuHeight(getOpenMenuHeight());
  }, [pageTypeId]);

  useEffect(() => {
    if (!currentHeadline) return;

    setCurrentVisibleMode(currentHeadline.attributes.mode);

    setCurrentLocation([currentHeadline.attributes.location.lat, currentHeadline.attributes.location.lng]);
    setCurrentScale(currentHeadline.attributes.zoom_level.toString());
    setCurrentScaleBy(1);

    setDateOfDataShown(new Date(currentHeadline.attributes.climate_alert_date).toString());
  }, [currentHeadline, setCurrentLocation, setCurrentScale, setCurrentScaleBy, setDateOfDataShown]);

  return (
    <IframeBridgeProvider scaleData={scaleData} scaleToolTipData={scaleToolTipData} overlayLayer={overlayLayer}>
      <div
        className={classnames({
          [styles["main-container"]]: true,
          [styles["-desktop"]]: !isMobile,
          [styles["-mobile"]]: isMobile,
          [styles["-has-menu-open"]]: hasMenuOpen
        })}
        data-testid="iframe-container"
      >
        {hasIframe && (
          <MapIframe
            ref={setRef}
            // @ts-expect-error
            earthServer={earthServer}
            earthClient={earthClient}
            layers={layers}
            toolTipDetails={toolTipDetails}
            extremeEventLocations={extremeEventLocations}
            setHasMenuOpen={setHasMenuOpen}
            setMobileMenuHeight={setMobileMenuHeight}
            hasIframeConnected={hasIframeConnected}
            mobileMenuHeight={isMobile && mobileMenuHeight}
            isMobile={isMobile}
            menuRef={menuRef}
          />
        )}
        {overlayLayer && !isMobile && (
          <div className={classnames(styles["right"])}>
            <Scale
              hidden={currentMode?.id === defaultMode?.id || !!currentHeadline}
              className={classnames(styles["scale"], styles["over-pointer"], shouldFadeControls && "u-opacity-faded")}
            />
            <div className={classnames(styles["controls"])}>
              <div className={classnames(styles["zooms"], styles["over-pointer"])}>
                <IconButton name="zoom-in" ref={zoomInRef} />
                <IconButton name="zoom-out" ref={zoomOutRef} />
              </div>
              <IconButton
                name="location"
                onClick={handleToggleLocation}
                disabled={isLocationDisabled}
                className={classnames(styles["over-pointer"])}
              />
            </div>
          </div>
        )}
        {((hasMenuOpen && !modesLoading) || isMobile) && (
          <Menu
            // @ts-expect-error
            isMobile={isMobile}
            onClose={toggleMenu}
            id="menu"
            ref={menuRef}
            isClosing={isClosingMenu}
            earthServer={earthServer.current}
            layers={layers}
            mobileMenuHeight={mobileMenuHeight}
            setMobileMenuHeight={setMobileMenuHeight}
            pageTypeId={pageTypeId}
            defaultMobileMenuHeight={defaultMobileMenuHeight}
            handleToggleLocation={handleToggleLocation}
            isLocationDisabled={isLocationDisabled}
            hasMenuOpen={hasMenuOpen}
          />
        )}

        <ShareModal />
        <InfoModal />

        <Actions
          isMobile={isMobile}
          className={classnames(
            shouldFadeControls && "u-opacity-faded",
            styles["over-pointer-absolute"],
            menuButtonStyles["c-home-menu-action"]
          )}
        >
          {error ? (
            <p role="alert" className="u-text-white">
              There was an error loading the map, please try again later
            </p>
          ) : (
            <>
              {overlayLayer && isMobile && (
                <div className="u-flex u-flex--align-center u-margin-bottom-xs">
                  <Scale
                    className={classnames(styles["scale"], styles["scale--mobile"], "u-flex-1 u-margin-right-l")}
                    value="50%"
                    isHorizontal
                  />
                  <MapControls
                    // @ts-expect-error
                    controls={[{ ...settingsButtonConfig, forceDark: true, className: "u-margin-right-none" }]}
                    className="u-margin-top-none"
                  />
                </div>
              )}
              <button
                className={classnames(
                  actionStyles["c-home-actions__item"],
                  menuButtonStyles["c-home-menu-toggle"],
                  hasMenuOpen && menuButtonStyles["c-home-menu-toggle--open"]
                )}
                onClick={toggleMenu}
                aria-haspopup="true"
                aria-expanded={hasMenuOpen}
                aria-controls="menu"
                id="menu-button"
                data-testid="toggle"
              >
                <div className={menuButtonStyles["c-home-menu-toggle__text-container"]}>
                  <span>{getMenuTitle(currentHeadline, currentMode, pageTypeId, router?.pathname)}</span>
                </div>
              </button>
            </>
          )}
        </Actions>
      </div>
    </IframeBridgeProvider>
  );
};

export default MainContainer;
