import { useState, useEffect, useRef, useMemo } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import menuButtonStyles from "./menuButton.module.scss";
import actionStyles from "components/app/home/actions/actions.module.scss";
import PropTypes from "prop-types";
import Menu from "components/app/home/menu";
import SettingsMenu from "components/app/home/settings-menu";
import Actions from "components/app/home/actions";
import MapControls from "components/app/home/map-controls";
import DatePickerBtn from "components/app/home/date-picker-menu/button";
import useIframeBridge from "hooks/useIframeBridge";
import useWindowDimensions from "hooks/useWindowDimensions";
import { fetchModes } from "services/gca";
import getHomePageControlBarItems from "schemas/control-bar/home-page";
import MapIframe from "components/app/home/map";
import Scale from "components/app/home/scale";
import settingsButtonConfig from "constants/control-bar/controls/settings";
import { formatDate } from "utils/dates";
import DatePickerMenu from "../date-picker-menu";

const MainContainer = ({
  isMobile,
  setIsMobile,
  setModes,
  layersLabelArr,
  dateOfDataShown,
  shouldFadeControls,
  currentHeadline
}) => {
  const [hasMenuOpen, setHasMenuOpen] = useState(false);
  const [hasIframe, setHasIframe] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState(null);
  const [homePageMapControlsItems, setHomePageControlBarItems] = useState([]);
  const { width: browserWidth } = useWindowDimensions();

  const menuRef = useRef(null);

  const { setRef, earthClient, earthServer, layers, error, toolTipDetails, enableToolTip, disableToolTip } =
    useIframeBridge(() => {
      setHomePageControlBarItems(getHomePageControlBarItems(earthServer));
    });

  const overlayLayer = useMemo(() => {
    return layers.find(layer => layer.type === "overlay");
  }, [layers]);

  const scaleData = useMemo(() => {
    if (overlayLayer?.product) {
      const { units } = overlayLayer.product;
      const [unitSymbol, [lo, hi]] = Object.entries(overlayLayer.product.scale.range)[0];
      const precision = units[unitSymbol]?.precision ?? 4;

      return {
        min: lo.toFixed(precision),
        max: hi.toFixed(precision),
        unitSymbol
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
  useEffect(() => setIsMobile(isMobile), [isMobile, setIsMobile]);

  useEffect(() => {
    setTimeout(() => {
      setHasIframe(true);
    }, 1000);
  }, []);

  // Move globe to the right when menu is open
  useEffect(() => {
    if (!earthServer.current || isMobile) return;

    const animationDuration = 300;
    const translateDuration = 25;
    const totalDistance = browserWidth * 0.2;

    const distanceInterval = totalDistance / (animationDuration / translateDuration);
    const translateInterval = hasMenuOpen ? distanceInterval : distanceInterval * -1;

    let translateDistance = 0;

    const loop = () => {
      translateDistance += distanceInterval;

      if (translateDistance <= totalDistance) {
        earthServer.current.reorient({ translateBy: [translateInterval, 0] });
        setTimeout(loop, translateDuration);
      } else if (!hasMenuOpen) {
        earthServer.current.reorient({ translate: "default" });
      }
    };

    loop();
  }, [browserWidth, earthServer, hasMenuOpen, isMobile]);

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
        const resp = await fetchModes();
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
    if (currentHeadline) {
      enableToolTip(
        [currentHeadline.attributes.location.lng, currentHeadline.attributes.location.lat],
        `${layersLabelArr.join(", ")} in ${currentHeadline.attributes.location.name}`
      );
    } else {
      disableToolTip();
    }
  }, [currentHeadline, disableToolTip, enableToolTip, layersLabelArr]);

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
          earthServer={earthServer}
          earthClient={earthClient}
          layers={layers}
          toolTipDetails={toolTipDetails}
        />
      )}
      {overlayLayer && !isMobile && (
        <Scale
          min={scaleData.min}
          max={scaleData.max}
          scaleUnit={scaleData.unitSymbol}
          className={classnames(styles["scale"], shouldFadeControls && "u-opacity-faded")}
          value="50%"
          readOnly
          scaleGradient={overlayLayer.product.scale.getCss(180)}
        />
      )}
      {hasMenuOpen && !isFetchingTemplates && (
        <Menu
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
                  min={scaleData.min}
                  max={scaleData.max}
                  scaleUnit={scaleData.unitSymbol}
                  className={classnames(styles["scale"], styles["scale--mobile"], "u-flex-1 u-margin-right-l")}
                  value="50%"
                  readOnly
                  scaleGradient={overlayLayer.product.scale.getCss(90)}
                  isHorizontal
                />
                <MapControls
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
                <span>Understand the emergency</span>
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
            {!isMobile && (
              <>
                <MapControls
                  controls={homePageMapControlsItems}
                  className={actionStyles["c-home-actions__map-controls"]}
                />
                <DatePickerBtn />
              </>
            )}
          </>
        )}
      </Actions>

      {!isFetchingTemplates && <SettingsMenu isMobile={isMobile} />}
      {!isFetchingTemplates && <DatePickerMenu isMobile={isMobile} />}
    </div>
  );
};

MainContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  setIsMobile: PropTypes.func.isRequired,
  setModes: PropTypes.func.isRequired,
  layersLabelArr: PropTypes.array.isRequired,
  dateOfDataShown: PropTypes.instanceOf(Date).isRequired
};

export default MainContainer;
