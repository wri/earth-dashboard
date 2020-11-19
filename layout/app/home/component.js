import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';

// components
import Layout from 'layout/layout/layout-app';
import Globe from './globe';

// utils
import { PARTICLES_DEFINITION } from 'utils/particles';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './homepage.module.scss';

function LayoutHome({ openHeaderMenu, headerTabSelected }) {
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const isServer = typeof window === 'undefined';

  const getTopicLinks = () =>
    <div className={styles['topic-links']}>
      <Link href="/climate">
        <a className={styles['climate-link']}>
          CLIMATE
        </a>
      </Link>
      <Link href="/forests">
        <a className={styles['forests-link']}>
          FORESTS
        </a>
      </Link>
      <Link href="/freshwater">
        <a className={styles['freshwater-link']}>
          FRESHWATER
        </a>
      </Link>
      <Link href="/ocean">
        <a className={styles['ocean-link']}>
          OCEAN
        </a>
      </Link>
      <a data-tip data-for="comingSoon" className={styles['biodiversity-link']} >
        BIODIVERSITY
      </a>
      <ReactTooltip className={styles['biodiversity-tooltip']} id="comingSoon" type="light" effect="float">
        <span>Coming soon...</span>
      </ReactTooltip>
    </div>;

  const getSubtitle = () =>
    <h5>Earth HQ provides insight and inspiration to help
    everyone understand and protect our home planet.
    </h5>;

  const getGlobe = (mobile = false) =>
    <div className={classnames({
      [styles.globe]: true,
      [styles['-loaded']]: globeLoaded
    })}>
      <Globe
        width="100vw"
        height={mobile ? '70vh' : '85vh'}
        style={{
          zIndex: -1,
          opacity: globeLoaded ? 1 : 0
        }}
        onLoad={() => setGlobeLoaded(true)}
        options={{
          // pointLightIntensity: 0.8,
          ambientLightIntensity: 1,
          ambientLightColor: '#fff'
          // pointLightColor: '#fff'
        }}
      />
    </div>;

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth HQ provides insight and inspiration to help everyone understand and protect our home planet."
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/homepage.png"
      className={styles.homepage}
      openHeaderMenu={openHeaderMenu}
      headerTabSelected={headerTabSelected}
    >
      <Particles
        className={styles.particles}
        params={PARTICLES_DEFINITION}
      />

      <MediaContextProvider>
        <Desktop>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-desktop']]: true
          })}
          >
            {!isServer && getGlobe(false)}
            <h1 className={styles['first-header']}>This is not a drill.</h1>
            <h1>This is now a <span className={styles['highlighted-text']}>planetary emergency</span>.</h1>
            {getSubtitle()}
            {getTopicLinks()}
          </div>
        </Desktop>
        <Mobile>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-mobile']]: true
          })}
          >
            {!isServer && getGlobe(true)}
            <h1 className={styles['first-header']}>This is not a drill.</h1>
            <h1>This is now a <br /><span className={styles['highlighted-text']}>planetary emergency</span>.</h1>
            {getSubtitle()}
            {getTopicLinks()}
          </div>
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
  headerTabSelected: 'site-navigation'
};

export default LayoutHome;
