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
import { UNIT_LABEL_MAP } from "utils/map";
import IconButton from "components/ui/icon-button";
import { Headline } from "slices/headlines";
import { EarthLayer } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { isFetchLocationDisabled, setShouldFetchLocation } from "slices/mapControls";
import useIframeBridge from "hooks/useIframeBridge";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Mode } from "slices/modes";
import ShareModal from "components/share-modal";
import * as d3 from "utils/d3";
import { reorientController } from "utils/iframeBridge/iframeBridge";
import { GlobalSetting } from "slices/globalSettings";

export const MODILE_MENU_HEIGHT_WITH_SCALE = 235;
export const MODILE_MENU_HEIGHT_WITHOUT_SCALE = 148;
export const INFO_PAGE_ID = "InfoPage";
export const EXTREME_EVENTS_PAGE_ID = "ExtremeEventsPage";
export const DATA_LAYER_PAGE_ID = "DataLayerPage";
export const INFO_PAGE_HEADLINE = "I'd like to explore...";
export const EXTREME_EVENTS_PAGE_HEADLINE = "Extreme events";

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
  currentMode?: Mode;
  defaultMode?: Mode;
  pageTypeId: string;
  setPageTypeId: ActionCreatorWithPayload<string, string>;
  setReoriented: ActionCreatorWithoutPayload<string>;
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
  defaultMode,
  currentMode,
  pageTypeId,
  setPageTypeId,
  setReoriented
}: MainContainerProps) => {
  const defaultMobileMenuHeight =
    currentMode?.id === defaultMode?.id ? MODILE_MENU_HEIGHT_WITHOUT_SCALE : MODILE_MENU_HEIGHT_WITH_SCALE;

  const [hasMenuOpen, setHasMenuOpen] = useState<boolean>(false);
  const [hasIframe, setHasIframe] = useState<boolean>(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState<boolean>(false);
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
    currentMode,
    defaultMode,
    setReoriented
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

  const toggleMenu = () => {
    if (!hasMenuOpen) {
      setHasMenuOpen(true);
      setMobileMenuHeight(window.innerHeight * 0.6);
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

  // https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  const browserWidthMutable = useRef(browserWidth);
  useEffect(() => {
    browserWidthMutable.current = browserWidth;
  });

  // Move globe to the right when menu is open
  useEffect(() => {
    if (!earthServer.current || isMobile) return;

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
        setTimeout(loop, translateDuration);
      } else if (!hasMenuOpen) {
        earthServer.current?.reorient({ translate: "default" });
      }
    };

    loop();
  }, [earthServer, hasMenuOpen, isMobile]);

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
    setIsFetchingTemplates(true);
    const getTemplates = async () => {
      try {
        const resp: any = await fetchModes();
        setModes(resp.data.data);
      } catch (err) {
        console.log("Error fetching modes");
      } finally {
        setIsFetchingTemplates(false);
      }
    };

    getTemplates();
  }, [setModes]);

  useEffect(() => {
    if (currentHeadline && earthServer.current) {
      enableToolTip(
        [currentHeadline.attributes.location.lng, currentHeadline.attributes.location.lat],
        currentHeadline.attributes.title
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
      setMobileMenuHeight(window.innerHeight * 0.6);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earthServer.current, setHasMenuOpen]);

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
          />
        )}
        {overlayLayer && !isMobile && (
          <div className={classnames(styles["right"])}>
            <Scale
              hidden={currentMode?.id === defaultMode?.id}
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
        {((hasMenuOpen && !isFetchingTemplates) || isMobile) && (
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
            setPageTypeId={setPageTypeId}
            defaultMobileMenuHeight={defaultMobileMenuHeight}
            handleToggleLocation={handleToggleLocation}
            isLocationDisabled={isLocationDisabled}
            hasMenuOpen={hasMenuOpen}
          />
        )}

        <ShareModal />

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
                  <span>{getMenuTitle(currentHeadline, currentMode, pageTypeId)}</span>
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
