import { useEffect } from "react";

// components
import Layout from "layout/layout/layout-app";

// utils
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

// styles
import styles from "./homepage.module.scss";
import MainContainer from "components/app/home/main-container";
import useWindowDimensions from "hooks/useWindowDimensions";

type LayoutHomeProps = {
  headerTabSelected: string;
  title: string;
  description: string;
};

const LayoutHome = ({ headerTabSelected = "site-navigation", title, description }: LayoutHomeProps) => {
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
      headerTabSelected={headerTabSelected}
      headerButtonPosition="right"
      themeColor="#1a2128"
    >
      {/* TODO: convert to TS so no need for expect error */}
      {/* @ts-expect-error */}
      <MediaContextProvider>
        {/* @ts-expect-error */}
        <Desktop>
          <MainContainer />
        </Desktop>
        <Mobile>
          <MainContainer />
        </Mobile>
      </MediaContextProvider>
    </Layout>
  );
};

export default LayoutHome;
