/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// components
import Layout from "layout/layout/layout-app";

// utils
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

// styles
import styles from "./homepage.module.scss";
import MainContainer from "components/app/home/main-container";

function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  return (
    <Layout
      title={title}
      description={description}
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg"
      className={styles.homepage}
      openHeaderMenu={openHeaderMenu}
      headerTabSelected={headerTabSelected}
      headerButtonPosition="right"
      headerShowTopicLinks={true}
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
