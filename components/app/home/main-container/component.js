import { useState, useEffect, useRef, useCallback } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import menuButtonStyles from "./menuButton.module.scss";
import PropTypes from "prop-types";
import Banner from "../banner";
import { getEarthServer } from "services/iframeBridge";
import Menu from "../menu/component";
import Actions from "../actions";

const MainContainer = ({ isMobile }) => {
  const [hasIntroAndBanner, setHasIntroAndBanner] = useState(true);
  const [hasBanner, setHasBanner] = useState(true);
  const [hasTimeOutReached, setHasTimeoutReached] = useState(false);
  const [hasMenuOpen, setHasMenuOpen] = useState(false);
  const [hasIframe, setHasIframe] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const iframeRef = useRef(null);
  const earthServer = useRef(null);
  const menuRef = useRef(null);

  const setRef = useCallback(node => {
    const connectToNullSchool = async node => {
      const resp = await getEarthServer(node);
      earthServer.current = resp;
    };

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      // connectToNullSchool(node);
      node.onload = () => connectToNullSchool(node);
    }

    // Save a reference to the node
    iframeRef.current = node;
  }, []);

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
      {hasMenuOpen && (
        <Menu isMobile={isMobile} onClose={toggleMenu} id="menu" ref={menuRef} isClosing={isClosingMenu} />
      )}
      <Actions isMobile={isMobile}>
        <button
          className={classnames(
            menuButtonStyles["c-home-menu-toggle"],
            hasMenuOpen && menuButtonStyles["c-home-menu-toggle--open"],
            "u-padding-horizontal-xs"
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
            <span>Lorem ipsum</span>
          </div>
        </button>
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
    </div>
  );
};

MainContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default MainContainer;
