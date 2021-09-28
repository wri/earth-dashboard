/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";

import PropTypes from "prop-types";

// components
import Layout from "layout/layout/layout-app";

// utils
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

// styles
import styles from "./homepage.module.scss";
import MainContainer from "components/app/home/main-container";
import useWindowDimensions from "hooks/useWindowDimensions";

function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  const { height } = useWindowDimensions();

  useEffect(() => {
    const vh = height * 0.01;

    if (process.browser) {
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ Fix issue with elements hiding behind UI elements on mobile!
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }, [height]);

  return (
    <Layout
      title={title}
      description={description}
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg"
      className={styles.homepage}
      openHeaderMenu={openHeaderMenu}
      headerTabSelected={headerTabSelected}
      headerButtonPosition="right"
      themeColor="#1a2128"
    >
      <MediaContextProvider>
        <Desktop>
          <MainContainer isMobile={false} />
        </Desktop>
        <Mobile>
          <MainContainer isMobile={true} />
        </Mobile>
      </MediaContextProvider>
    </Layout>
  );
}

LayoutHome.propTypes = {
  openHeaderMenu: PropTypes.bool,
  headerTabSelected: PropTypes.string
};

LayoutHome.defaultProps = {
  openHeaderMenu: false,
  headerTabSelected: "site-navigation"
};

export default LayoutHome;
