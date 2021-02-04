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
import { logEvent } from 'utils/gtag';

// styles
import styles from './homepage.module.scss';

function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const isServer = typeof window === 'undefined';
  const logClickLinkEvent = (linkName) => {
    logEvent({
      action: 'Click topic on homepage',
      category: 'Homepage',
      label: `/${linkName}`
    });
  };
  const getLink = (name) =>
    <Link href={`/${name}`}>
      <a
        className={`external-link -${name}`}
        onClick={() => logClickLinkEvent(name)}
      >
        {name.toUpperCase()}
      </a>
    </Link>;
  const getBiodiversityLink = () =>
    <>
      <a
        data-tip data-for="comingSoon"
        className={classnames({
          'external-link -biodiversity': true,
          [styles['biodiversity-link']]: true
        })}
      >
        BIODIVERSITY
      </a>
      <ReactTooltip className={styles['biodiversity-tooltip']} id="comingSoon" type="light" effect="float">
        <span>Coming soon...</span>
      </ReactTooltip>
    </>;

  const getTopicLinks = (mobile) =>
    <div className={classnames({
      [styles['topic-links']]: true,
      [styles['-mobile']]: mobile
    })}>
      {!mobile &&
        <>
          {getLink('climate')}
          {getLink('forests')}
          {getLink('freshwater')}
          {getLink('ocean')}
          {getBiodiversityLink()}
        </>
      }
      {mobile &&
        <>
          <div className={styles['first-row']}>
            {getLink('climate')}
            {getLink('forests')}
            {getLink('freshwater')}
          </div>
          <div className={styles['second-row']}>
            {getLink('ocean')}
            {getBiodiversityLink()}
          </div>
        </>
      }
    </div>;

  const getSubtitle = (mobile) => {
    const CustomTag = mobile ? 'h4' : 'h3';
    return (
      <CustomTag>
        Earth HQ: situation room for the global commons.
      </CustomTag>
    );
  }

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
          ambientLightIntensity: 0.7,
          ambientLightColor: '#FFFFFF'
        }}
      />
    </div>;

  const getMainContainer = (mobile) => {
    const CustomHeaderTag = mobile ? 'h2' : 'h1';
    return (
      <div className={classnames({
        [styles['main-container']]: true,
        [styles['-desktop']]: !mobile,
        [styles['-mobile']]: mobile,
      })}
      >
        {!isServer &&
          <>
            {getGlobe(false)}
            <div className={classnames({
              [styles['text-container']]: true,
              [styles['-desktop']]: !mobile,
              [styles['-mobile']]: mobile,
            })}
            >
              <CustomHeaderTag className={styles['first-header']}>The Science is in.{mobile && <br />} This is not a drill.</CustomHeaderTag>
              <CustomHeaderTag className={styles['second-header']}>It's a <span className={styles['highlighted-text']}>Planetary Emergency</span>.</CustomHeaderTag>
              {getSubtitle(mobile)}
              {getTopicLinks(mobile)}
            </div>
          </>
        }
      </div>);
  };

  return (
    <Layout
      title={title}
      description={description}
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg"
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
          {getMainContainer(false)}
        </Desktop>
        <Mobile>
          {getMainContainer(true)}
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
