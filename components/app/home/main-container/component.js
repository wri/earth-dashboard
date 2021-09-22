import { useState, useEffect, useRef, useCallback } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import menuButtonStyles from "./menuButton.module.scss";
import PropTypes from "prop-types";
import Banner from "../banner";
import Menu from "../menu";
import SettingsMenu from "components/app/home/settings-menu";
import Actions from "../actions";
import ControlBar from "components/app/home/control-bar";
import useIframeBridge from "hooks/useIframeBridge";
import { fetchTemplates } from "services/gca";
import { DATA_LAYER_MAP, DATA_LAYER_TYPES } from "constants/datalayers";
import HomePageControlBarItems from "constants/control-bar/homePage";

const MainContainer = ({
  isMobile,
  setTemplates,
  currentTemplate,
  resetValues,
  setAnimationValue,
  setDatasetValue,
  setMonitorValue,
  animationValue,
  datasetValue,
  monitorValue,
  isSettingsOpen
}) => {
  const [hasIntroAndBanner, setHasIntroAndBanner] = useState(true);
  const [hasBanner, setHasBanner] = useState(true);
  const [hasTimeOutReached, setHasTimeoutReached] = useState(false);
  const [hasMenuOpen, setHasMenuOpen] = useState(false);
  const [hasIframe, setHasIframe] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState(null);
  const menuRef = useRef(null);
  const [layersLabelArr, setLayersLabelArr] = useState([]);

  const { setRef, earthClient, earthServer, iframeRef, layers } = useIframeBridge();

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

  const clickHandler = () => {
    setHasIntroAndBanner(false);
    window.removeEventListener("click", clickHandler);
    setTimeout(() => setHasTimeoutReached(true), 500);
  };

  useEffect(() => {
    window.addEventListener("click", clickHandler);
    setTimeout(() => {
      if (hasIntroAndBanner && hasBanner) {
        setHasBanner(false);
      }
    }, 10000);
    setTimeout(() => {
      setHasIframe(true);
    }, 1000);
    return () => window.removeEventListener("click", clickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasMenuOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [hasMenuOpen]);

  // Fetch Templates from the GCA CMS
  useEffect(() => {
    setIsFetchingTemplates(true);
    const getTemplates = async () => {
      try {
        const resp = await fetchTemplates();
        setTemplates(resp.data.data);
      } catch (err) {
        console.log("Error fetching templates");
      } finally {
        setIsFetchingTemplates(false);
      }
    };

    getTemplates();
  }, [setTemplates]);

  // if the current template changes, and there is an earth client, set the data layer values
  useEffect(() => {
    if (currentTemplate && earthClient) {
      setLayersLabelArr([]);
      resetValues();
      const defaults = currentTemplate.attributes.data_layers.filter(layer => layer.attributes.default_on);
      defaults.forEach(layer => {
        let setter = () => {};
        switch (layer.attributes.category.attributes.title) {
          case DATA_LAYER_TYPES.animation:
            setter = setAnimationValue;
            break;
          case DATA_LAYER_TYPES.dataset:
            setter = setDatasetValue;
            break;
          case DATA_LAYER_TYPES.monitor:
            setter = setMonitorValue;
            break;
        }
        setLayersLabelArr(arr => [...arr, layer.attributes.title]);
        setter(layer.attributes.data_key);
      });
    }
  }, [currentTemplate, earthClient, resetValues, setAnimationValue, setDatasetValue, setMonitorValue]);

  // Send the correct state to the iframe when data layer values change.
  useEffect(() => {
    if (earthServer.current) {
      setLayersLabelArr([]);
      currentTemplate?.attributes?.data_layers.forEach(layer => {
        if (
          layer.attributes.data_key === animationValue ||
          layer.attributes.data_key === monitorValue ||
          layer.attributes.data_key === datasetValue
        ) {
          setLayersLabelArr(arr => [...arr, layer.attributes.title]);
        }
      });
      const animation = DATA_LAYER_MAP[animationValue] || { animation_enabled: false };
      const monitor = DATA_LAYER_MAP[monitorValue] || { annotation_type: "none" };
      const dataset = DATA_LAYER_MAP[datasetValue] || { overlay_type: "none", z_level: "surface" };

      earthServer.current.saveState({ ...animation, ...monitor, ...dataset });
    }
  }, [animationValue, datasetValue, monitorValue, currentTemplate?.attributes?.data_layers, earthServer]);

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
        <iframe
          id="nullSchoolIframe"
          width="100%"
          height="100%"
          src={process.env.NULL_SCHOOL_IFRAME_BASE}
          title="Null School"
          frameBorder="0"
          allowtransparency="true"
          ref={setRef}
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
      <Actions isMobile={isMobile}>
        <div className="u-flex-1">
          <button
            className={classnames(
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
                      <br /> 21/10/2021
                    </>
                  )}
                </span>
              )}
            </div>
          </button>
        </div>
        <ControlBar controls={HomePageControlBarItems} />
        <div className="u-flex-1">{/* SHOWING DATA FROM Button */}</div>
      </Actions>
      {!hasTimeOutReached && (
        <div
          className={classnames({
            [styles["text-container"]]: true,
            [styles["-desktop"]]: !isMobile,
            [styles["-mobile"]]: isMobile,
            [styles["-fade-out"]]: !hasIntroAndBanner || !hasBanner
          })}
        >
          <Banner isMobile={isMobile} />
        </div>
      )}

      {isSettingsOpen && !isFetchingTemplates && <SettingsMenu />}
    </div>
  );
};

MainContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default MainContainer;
