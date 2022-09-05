import { useState, useEffect, useRef, useMemo } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import menuButtonStyles from "./menu-button.module.scss";
import actionStyles from "components/app/home/actions/actions.module.scss";
import Menu from "components/app/home/menu";
import SettingsMenu from "components/app/home/settings-menu";
import Actions from "components/app/home/actions";
import MapControls from "components/app/home/map-controls";
import useWindowDimensions from "hooks/useWindowDimensions";
import { fetchModes } from "services/gca";
import MapIframe from "components/app/home/map";
import Scale from "components/app/home/scale";
import settingsButtonConfig from "constants/control-bar/controls/settings";
import { formatDate } from "utils/dates";
import { UNIT_LABEL_MAP } from "utils/map";
import IconButton from "components/ui/icon-button";
import { Headline } from "slices/headlines";
import { EarthLayer } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { isFetchLocationDisabled, setShouldFetchLocation } from "slices/mapControls";
import useIframeBridge from "hooks/useIframeBridge";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Mode } from "slices/modes";
import Icon from "components/ui/Icon";

type MainContainerProps = {
  isMobile: boolean;
  setIsMobile: ActionCreatorWithPayload<boolean, string>;
  setModes: ActionCreatorWithPayload<Mode[], string>;
  layersLabelArr: string[];
  dateOfDataShown: Date;
  currentHeadline?: Headline;
  currentHeadlineId?: number;
  shouldFadeControls: boolean;
};

const MainContainer = ({
  isMobile,
  setIsMobile,
  setModes,
  layersLabelArr,
  dateOfDataShown,
  shouldFadeControls,
  currentHeadline
}: MainContainerProps) => {
  const [hasMenuOpen, setHasMenuOpen] = useState<boolean>(false);
  const [hasIframe, setHasIframe] = useState<boolean>(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState<boolean>(false);

  const { width: browserWidth } = useWindowDimensions();

  // References
  const menuRef = useRef<HTMLDivElement>();

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
    scaleData: scaleToolTipData,
    hasIframeConnected
  } = useIframeBridge({
    allowClickEvents: !currentHeadline
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
    } else {
      setIsClosingMenu(true);
      setTimeout(() => {
        setIsClosingMenu(false);
        setHasMenuOpen(false);
      }, 400);
    }
  };

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
        `${layersLabelArr.join(", ")} in ${currentHeadline.attributes.location.name}`
      );
    } else {
      disableToolTip();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earthServer.current, currentHeadline, disableToolTip, enableToolTip, layersLabelArr]);

  // When the Globe loads, open the menu on Desktop
  useEffect(() => {
    if (earthServer.current && !isMobile) {
      setHasMenuOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earthServer.current, setHasMenuOpen, isMobile]);

  return (
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
          hasIframeConnected={hasIframeConnected}
        />
      )}
      {overlayLayer && !isMobile && (
        <div className={classnames(styles["right"])}>
          <Scale
            min={scaleData?.min}
            max={scaleData?.max}
            scaleUnit={scaleData?.unitSymbol}
            className={classnames(styles["scale"], shouldFadeControls && "u-opacity-faded")}
            readOnly
            scaleGradient={overlayLayer.product.scale.getCss(0)}
            toolTipData={scaleToolTipData}
            hasSmallLabels={scaleData?.hasSmallLabels}
          />
          <div className={classnames(styles["controls"])}>
            <div className={classnames(styles["zooms"])}>
              <IconButton
                name="zoom-in"
                onClick={() => {
                  earthServer?.current?.reorient({ scaleBy: 1.05 });
                }}
              />
              <IconButton
                name="zoom-out"
                onClick={() => {
                  earthServer?.current?.reorient({ scaleBy: 0.95 });
                }}
              />
            </div>
            <IconButton name="location" onClick={handleToggleLocation} disabled={isLocationDisabled} />
          </div>
        </div>
      )}
      {hasMenuOpen && !isFetchingTemplates && (
        <Menu
          // @ts-expect-error
          isMobile={isMobile}
          onClose={toggleMenu}
          id="menu"
          ref={menuRef}
          isClosing={isClosingMenu}
          earthServer={earthServer.current}
          layers={layers}
        />
      )}

      <Actions isMobile={isMobile} className={classnames(shouldFadeControls && "u-opacity-faded")}>
        {error ? (
          <p role="alert" className="u-text-white">
            There was an error loading the map, please try again later
          </p>
        ) : (
          <>
            {overlayLayer && isMobile && (
              <div className="u-flex u-flex--align-center u-margin-bottom-xs">
                <Scale
                  min={scaleData?.min}
                  max={scaleData?.max}
                  scaleUnit={scaleData?.unitSymbol}
                  className={classnames(styles["scale"], styles["scale--mobile"], "u-flex-1 u-margin-right-l")}
                  value="50%"
                  readOnly
                  scaleGradient={overlayLayer.product.scale.getCss(90)}
                  isHorizontal
                  toolTipData={scaleToolTipData}
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
              <div className={menuButtonStyles["icon"]}>
                <Icon name={hasMenuOpen ? "close" : "layers"} size={28} type="decorative" />
              </div>
              <div className={menuButtonStyles["c-home-menu-toggle__text-container"]}>
                <span>Latest Extreme Events</span>
                {layersLabelArr.length > 0 && (
                  <span data-testid="labels-arr">
                    {layersLabelArr.join(", ")}
                    {isMobile && (
                      <>
                        <br /> {formatDate(dateOfDataShown)}
                      </>
                    )}
                  </span>
                )}
              </div>
            </button>
          </>
        )}
      </Actions>
      {!isFetchingTemplates && <SettingsMenu />}
    </div>
  );
};

export default MainContainer;
