import SettingsMenu from "components/app/home/settings-menu";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Modal from "react-modal";
import Toastr from "react-redux-toastr";

// Components
import HeadApp from "layout/head/app";
import Header from "layout/header";

// constants
import { GDPR_ACCEPTED_KEY, ONBOARDING_COMPLETED, ANALYTICS_ACCEPTED, COOKIES_ACCEPTED } from "./constants";

// utils
import { MediaContextProvider, Mobile, Desktop } from "utils/responsive";

// styles
import styles from "./layout-app.module.scss";

import Icon from "components/ui/Icon";
import OnboardingModal from "layout/onboarding-modal";

function LayoutApp(props) {
  const {
    title,
    description,
    className,
    thumbnail,
    children,
    showHeaderLogo,
    showHeader,
    openHeaderMenu,
    headerTabSelected,
    headerButtonPosition,
    themeColor,
    setSettingsOpen,
    setIsCookieOpen
  } = props;
  const [showGDPRBanner, setShowGDPRBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isServer = typeof window === "undefined";

  useEffect(() => {
    // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement(document.getElementById("#main"));

    // Check if GDPR has been accepted
    if (localStorage.getItem(GDPR_ACCEPTED_KEY) !== "true") {
      setShowGDPRBanner("true");
    }

    // Check if user as completed the onboarding phase
    if (localStorage.getItem(ONBOARDING_COMPLETED) !== "true") {
      setShowModal(true);
    }
  }, []);

  const handleCookie = choice => {
    setShowGDPRBanner(false);
    localStorage.setItem(GDPR_ACCEPTED_KEY, `${choice}`);
    localStorage.setItem(ANALYTICS_ACCEPTED, `${choice}`);
    localStorage.setItem(COOKIES_ACCEPTED, `${choice}`);
  };

  const handleAccept = () => {};

  const handleCookieSettingsOpen = () => {
    setSettingsOpen();
    setIsCookieOpen(true);
  };

  const getGDPRContainer = mobile => (
    <div
      className={classnames({
        [styles["gdpr-banner"]]: true,
        [styles["-mobile"]]: mobile,
        [styles["-desktop"]]: !mobile
      })}
    >
      <div
        className={classnames({
          [styles["main-banner"]]: true,
          [styles["-mobile"]]: mobile,
          [styles["-desktop"]]: !mobile
        })}
      >
        <div className={styles["content"]}>
          <div className={styles["cookie"]}>
            <Icon name="cookie" size={32} type="decorative" className={styles["cookie-icon"]} />
            <h3 className={styles["cookie-text"]}>COOKIES</h3>
          </div>
          <div
            className={classnames({
              [styles["text"]]: true,
              [styles["-desktop"]]: !mobile
            })}
          >
            This website uses cookies to provide you with an improved user experience. By continuing to browse this
            site, you consent to the use of{" "}
            <button className={styles["cookie-banner-link"]} onClick={handleCookieSettingsOpen}>
              cookies
            </button>{" "}
            and similar technologies. Please visit our{" "}
            <a
              className={styles["cookie-banner-link"]}
              href="https://resourcewatch.org/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              privacy policy
            </a>{" "}
            for further details.
          </div>
        </div>
        <div
          className={classnames({
            [styles["button-group"]]: true,
            [styles["-mobile"]]: mobile
          })}
        >
          <button
            className={classnames({
              [styles["rejectButton"]]: true,
              [styles["-mobile"]]: mobile
            })}
            onClick={() => handleCookie(false)}
          >
            REJECT
          </button>
          <button
            className={classnames({
              [styles["acceptButton"]]: true,
              [styles["-mobile"]]: mobile
            })}
            onClick={() => handleCookie(true)}
          >
            ACCEPT ALL COOKIES
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      id="#main"
      className={classnames({
        [styles["c-layout-app"]]: true,
        [className]: !!className
      })}
    >
      <HeadApp
        title={title}
        description={description}
        explicitHostname={!isServer ? window.location.href : ""}
        {...(thumbnail && { thumbnail })}
        themeColor={themeColor}
      />

      {showHeader && (
        <Header
          showLogo={showHeaderLogo}
          selectedTab={headerTabSelected}
          openMenu={openHeaderMenu}
          buttonPosition={headerButtonPosition}
        />
      )}

      {/* GDPR BANNER */}
      {showGDPRBanner && (
        <MediaContextProvider>
          <Desktop>{getGDPRContainer(false)}</Desktop>
          <Mobile>{getGDPRContainer(true)}</Mobile>
        </MediaContextProvider>
      )}

      {/* MODAL BANNER */}
      {showModal && (
        <MediaContextProvider>
          <Desktop>
            <OnboardingModal showModal={showModal} setShowModal={setShowModal} isMobile={false} />
          </Desktop>
          <Mobile>
            <OnboardingModal showModal={showModal} setShowModal={setShowModal} isMobile={true} />
          </Mobile>
        </MediaContextProvider>
      )}

      {children}

      <Toastr preventDuplicates transitionIn="fadeIn" transitionOut="fadeOut" />

      <SettingsMenu />
    </div>
  );
}

LayoutApp.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  showHeaderLogo: PropTypes.bool,
  showHeader: PropTypes.bool,
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  thumbnail: PropTypes.string,
  isFullScreen: PropTypes.bool.isRequired,
  updateIsLoading: PropTypes.func.isRequired,
  explicitHostname: PropTypes.string,
  themeColor: PropTypes.string,
  headerTabSelected: PropTypes.string,
  headerButtonPosition: PropTypes.string
};

LayoutApp.defaultProps = {
  title: null,
  description: null,
  className: null,
  thumbnail:
    "https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg",
  showHeaderLogo: true,
  showHeader: true,
  themeColor: "#D63C00",
  headerButtonPosition: "center"
};

export default LayoutApp;
