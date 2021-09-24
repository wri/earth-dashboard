import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import menuButtonStyles from "./menuButton.module.scss";
import actionStyles from "components/app/home/actions/actions.module.scss";
import PropTypes from "prop-types";
import Banner from "components/app/home/banner";
import Menu from "components/app/home/menu";
import SettingsMenu from "components/app/home/settings-menu";
import Actions from "components/app/home/actions";
import MapControls from "components/app/home/map-controls";
import useIframeBridge from "hooks/useIframeBridge";
import { fetchTemplates } from "services/gca";
import getHomePageControlBarItems from "constants/control-bar/home-page";
import MapIframe from "components/app/home/map";

const MainContainer = ({ isMobile, setTemplates, isSettingsOpen, layersLabelArr }) => {
  const [hasIntroAndBanner, setHasIntroAndBanner] = useState(true);
  const [hasBanner, setHasBanner] = useState(true);
  const [hasTimeOutReached, setHasTimeoutReached] = useState(false);
  const [hasMenuOpen, setHasMenuOpen] = useState(false);
  const [hasIframe, setHasIframe] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState(null);
  const [homePageMapControlsItems, setHomePageControlBarItems] = useState([]);
  const menuRef = useRef(null);

  const { setRef, earthClient, earthServer, layers } = useIframeBridge(() => {
    setHomePageControlBarItems(getHomePageControlBarItems(earthServer));
  });

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
      {hasIframe && <MapIframe ref={setRef} earthServer={earthServer} earthClient={earthClient} />}
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
                    <br /> 21/10/2021
                  </>
                )}
              </span>
            )}
          </div>
        </button>
        {!isMobile && (
          <>
            <MapControls controls={homePageMapControlsItems} className={actionStyles["c-home-actions__map-controls"]} />
            <div>Date picker here</div>
          </>
        )}
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
  isMobile: PropTypes.bool.isRequired,
  isSettingsOpen: PropTypes.bool.isRequired,
  setTemplates: PropTypes.func.isRequired,
  layersLabelArr: PropTypes.array.isRequired
};

export default MainContainer;
