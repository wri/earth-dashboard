import { useState, useEffect } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import PropTypes from "prop-types";
import Banner from "../banner";
import IntroText from "../intro-text";

const MainContainer = ({ isMobile }) => {
  const [hasIntroAndBanner, setHasIntroAndBanner] = useState(true);
  const [hasBanner, setHasBanner] = useState(true);
  const [hasTimeOutReached, setHasTimeoutReached] = useState(false);

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
    return () => window.removeEventListener("click", clickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classnames({
        [styles["main-container"]]: true,
        [styles["-desktop"]]: !isMobile,
        [styles["-mobile"]]: isMobile
      })}
    >
      <iframe
        id="nullSchoolIframe"
        width="100%"
        height="100%"
        src={
          isMobile
            ? "https://earth.nullschool.net/?kiosk"
            : "https://earth.nullschool.net/?kiosk#current/wind/surface/level/orthographic=-330.00,0.00,306"
        }
        title="Null School"
        frameBorder="0"
      />
      {!hasTimeOutReached && (
        <>
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
          <IntroText isMobile={isMobile} hasIntroAndBanner={hasIntroAndBanner} />
        </>
      )}
    </div>
  );
};

MainContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default MainContainer;
