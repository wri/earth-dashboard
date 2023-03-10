import { useEffect } from "react";

// components
import Layout from "layout/layout/layout-app";

// utils
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

// styles
import styles from "./homepage.module.scss";
import MainContainer from "components/app/home/main-container";
import useWindowDimensions from "hooks/useWindowDimensions";
import TippingPointModal from "components/app/home/tipping-point-modal";

type LayoutHomeProps = {
  title: string;
  thumbnail: string;
  description: string;
  headerTabSelected?: string;
};

const LayoutHome = ({ title, thumbnail, description, headerTabSelected = "site-navigation" }: LayoutHomeProps) => {
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
      thumbnail={thumbnail}
      className={styles.homepage}
      headerTabSelected={headerTabSelected}
      headerButtonPosition="right"
      themeColor="#D63C00"
    >
      <TippingPointModal />
      {/* @ts-expect-error */}
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
};

export default LayoutHome;
