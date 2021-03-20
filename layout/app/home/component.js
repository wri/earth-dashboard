import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
let Globe = null;
if (typeof window !== 'undefined') {
  Globe = require('react-globe.gl').default;
}

// components
import Layout from 'layout/layout/layout-app';

// utils
import { PARTICLES_DEFINITION } from 'utils/particles';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';
import { logEvent } from 'utils/gtag';

// styles
import styles from './homepage.module.scss';

const TOPICS_DATA = {
  biodiversity: {
    texture: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  },
  freshwater: {
    texture: '//unpkg.com/three-globe/example/img/earth-water.png'
  },
  climate: {
    texture: '//unpkg.com/three-globe/example/img/earth-day.jpg'
  },
  forests: {
    texture: '//unpkg.com/three-globe/example/img/earth-topology.png'
  },
  ocean: {
    texture: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  }
};

// Gen random paths
const N_PATHS = 30;
const MAX_POINTS_PER_LINE = 10000;
const MAX_STEP_DEG = 1;
const MAX_STEP_ALT = 0.015;


function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  const [topicSelected, setTopicSelected] = useState('ocean');
  const isServer = typeof window === 'undefined';

  const PATHS_DATA = useMemo(() => [...Array(N_PATHS).keys()].map(() => {
    let lat = (Math.random() - 0.5) * 90;
    let lng = (Math.random() - 0.5) * 360;
    let alt = 0;

    return [[lat, lng, alt], ...[...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys()].map(() => {
      lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
      lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
      alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
      alt = Math.max(0, alt);

      return [lat, lng, alt];
    })];
  }),
    []
  );

  const getLink = (name) =>
    <a
      className={`external-link -${name}`}
      onClick={() => setTopicSelected(name)}
    >
      {name.toUpperCase()}
    </a>

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
          {getLink('biodiversity')}
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
            {getLink('biodiversity')}
          </div>
        </>
      }
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
          <div>
            <Globe
              globeImageUrl={TOPICS_DATA[topicSelected].texture}
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              {...(topicSelected === 'forests' && {
                pathsData: PATHS_DATA,
                pathColor: () => ['rgba(0,0,255,0.6)', 'rgba(255,0,0,0.6)'],
                pathDashLength: 0.01,
                pathDashGap: 0.004,
                pathDashAnimateTime: 100000
              })}
              {...(topicSelected !== 'forests' && { pathsData: [] })}
            />
          </div>
        }
        <div className={classnames({
          [styles['text-container']]: true,
          [styles['-desktop']]: !mobile,
          [styles['-mobile']]: mobile,
        })}
        >
          {getTopicLinks(mobile)}
        </div>
      </div>);
  };

  console.log('TOPICS_DATA[topicSelected]', TOPICS_DATA[topicSelected]);

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
