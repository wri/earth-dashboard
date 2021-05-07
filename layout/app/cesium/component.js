import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Layout from 'layout/layout/layout-app';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './cesium.module.scss';

const CesiumGlobe = dynamic(() => import('components/cesium-globe'), { ssr: false });

function LayoutCesium({ openHeaderMenu, headerTabSelected, title, description }) {
  const isServer = typeof window === 'undefined';

  useEffect(() => {
  }, []);


  const getMainContainer = (mobile) => {
    return (
      <div
        id="main-container"
        className={classnames({
          [styles['main-container']]: true,
          [styles['-desktop']]: !mobile,
          [styles['-mobile']]: mobile
        })}
      >
        {!isServer &&
          <CesiumGlobe />
        }
      </div>);
  };

  return (
    <Layout
      title={title}
      description={description}
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg"
      className={styles.cesium}
      openHeaderMenu={openHeaderMenu}
      headerTabSelected={headerTabSelected}
      themeColor="#1a2128"
    >
      <MediaContextProvider>
        <Desktop>
          {getMainContainer(false)}
        </Desktop>
        <Mobile>
          {getMainContainer(true)}
        </Mobile>
      </MediaContextProvider>
    </Layout >
  );
}

LayoutCesium.propTypes = {
  openHeaderMenu: PropTypes.bool,
  headerTabSelected: PropTypes.string
};

LayoutCesium.defaultProps = {
  openHeaderMenu: false,
  headerTabSelected: 'site-navigation'
};

export default LayoutCesium;
