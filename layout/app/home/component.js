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
    <h3>Earth HQ: Situation Room For the Planet.<br />
    Real Facts. Sound Science. Serious Solutions.
    </h3>;

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
          ambientLightIntensity: 1,
          ambientLightColor: '#fff'
        }}
      />
    </div>;

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth HQ provides insight and inspiration to help everyone understand and protect our home planet."
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/homepage.jpg"
      className={styles.homepage}
      openHeaderMenu={openHeaderMenu}
      headerTabSelected={headerTabSelected}
      themeColor="#1a2128"
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
            {!isServer &&
              <>
                {getGlobe(false)}
                <div className={styles['text-container']}>
                  <h1 className={styles['first-header']}>The Science is in. This is not a drill.</h1>
                  <h1 className={styles['second-header']}>It's a <span className={styles['highlighted-text']}>Planetary Emergency</span>.</h1>
                  {getSubtitle()}
                  {getTopicLinks()}
                </div>
              </>
            }
          </div>
        </Desktop>
        <Mobile>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-mobile']]: true
          })}
          >
            {!isServer &&
              <>
                {getGlobe(false)}
                <div className={styles['text-container']}>
                  <h1 className={styles['first-header']}>The Science is in. This is not a drill.</h1>
                  <h1 className={styles['second-header']}>It's a <span className={styles['highlighted-text']}>Planetary Emergency</span>.</h1>
                  {getSubtitle()}
                  {getTopicLinks()}
                </div>
              </>
            }
          </div>
        </Mobile>
      </MediaContextProvider>
    </Layout >
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
