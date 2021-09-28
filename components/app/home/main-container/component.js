import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import menuButtonStyles from "./menuButton.module.scss";
import actionStyles from "components/app/home/actions/actions.module.scss";
import PropTypes from "prop-types";
import Menu from "components/app/home/menu";
import SettingsMenu from "components/app/home/settings-menu";
import Actions from "components/app/home/actions";
import MapControls from "components/app/home/map-controls";
import DatePickerBtn from "components/app/home/date-picker/button";
import useIframeBridge from "hooks/useIframeBridge";
import { fetchTemplates } from "services/gca";
import getHomePageControlBarItems from "schemas/control-bar/home-page";
import MapIframe from "components/app/home/map";
import { formatDate } from "utils/dates";

const MainContainer = ({ isMobile, setIsMobile, setTemplates, layersLabelArr, dateOfDataShown }) => {
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

  // Store the isMobile flag in the redux store
  useEffect(() => setIsMobile(isMobile), [isMobile, setIsMobile]);

  useEffect(() => {
    setTimeout(() => {
      setHasIframe(true);
    }, 1000);
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
      {hasIframe && <MapIframe ref={setRef} earthServer={earthServer} earthClient={earthClient} layers={layers} />}
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
                    <br /> {formatDate(dateOfDataShown)}
                  </>
                )}
              </span>
            )}
          </div>
        </button>
        {!isMobile && (
          <>
            <MapControls controls={homePageMapControlsItems} className={actionStyles["c-home-actions__map-controls"]} />
            <DatePickerBtn />
          </>
        )}
      </Actions>

      {!isFetchingTemplates && <SettingsMenu isMobile={isMobile} />}
    </div>
  );
};

MainContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  setIsMobile: PropTypes.func.isRequired,
  setTemplates: PropTypes.func.isRequired,
  layersLabelArr: PropTypes.array.isRequired,
  dateOfDataShown: PropTypes.instanceOf(Date).isRequired
};

export default MainContainer;
