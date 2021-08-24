import { useState, useEffect, useRef, useCallback } from "react";
import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import PropTypes from "prop-types";
import Banner from "../banner";
import IntroText from "../intro-text";
import { getEarthClient } from "services/iframeBridge";

const MainContainer = ({ isMobile }) => {
  const [hasIntroAndBanner, setHasIntroAndBanner] = useState(true);
  const [hasBanner, setHasBanner] = useState(true);
  const [hasTimeOutReached, setHasTimeoutReached] = useState(false);
  const [earthClient, setEarthClient] = useState(null);
  const iframeRef = useRef(null);

  const setRef = useCallback(node => {
    const connectToNullSchool = async node => {
      const resp = await getEarthClient(node);
      console.log({ resp });
      setEarthClient(resp);
    };

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      connectToNullSchool(node);
      node.onload = () => console.log("loaded iframe");
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
    return () => window.removeEventListener("click", clickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={classnames({
          [styles["main-container"]]: true,
          [styles["-desktop"]]: !isMobile,
          [styles["-mobile"]]: isMobile
        })}
      >
        <div style={{ position: "absolute", top: 500, left: 10 }}>
          <button
            onClick={() => {
              console.log(earthClient);
              // earthClient.reorient({ scaleBy: 1.05 });
            }}
            style={{ background: "white" }}
          >
            +
          </button>
          <button
            onClick={() => {
              earthClient.reorient({ scaleBy: 0.95 });
            }}
            style={{ background: "white" }}
          >
            -
          </button>
        </div>

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
    </>
  );
};

MainContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default MainContainer;
