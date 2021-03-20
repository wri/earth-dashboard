import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as THREE from "three";
import * as d3 from 'd3';
import indexBy from 'index-array-by';

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

// constants
import { POPULATION } from './constants';

const TOPICS_DATA = {
  biodiversity: {
    texture: '//unpkg.com/three-globe/example/img/earth-night.jpg'
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
    texture: '//unpkg.com/three-globe/example/img/earth-day.jpg'
  }
};

const COUNTRY = 'United States';
const OPACITY = 0.22;

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});

// Gen random paths
const N_PATHS = 30;
const MAX_POINTS_PER_LINE = 10000;
const MAX_STEP_DEG = 1;
const MAX_STEP_ALT = 0.015;

const polygonsMaterial = new THREE.MeshLambertMaterial({ color: 'darkslategrey', side: THREE.DoubleSide });


function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  const [topicSelected, setTopicSelected] = useState('ocean');
  const [landPolygons, setLandPolygons] = useState([]);
  const [airports, setAirports] = useState([]);
  const [routes, setRoutes] = useState([]);
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
  }), []);

  useEffect(() => {
    // load data arcs
    Promise.all([
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
        .then(d => d3.csvParseRows(d, airportParse)),
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat').then(res => res.text())
        .then(d => d3.csvParseRows(d, routeParse))
    ]).then(([airports, routes]) => {

      const byIata = indexBy(airports, 'iata', false);

      const filteredRoutes = routes
        .filter(d => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // exclude unknown airports
        .filter(d => d.stops === '0') // non-stop flights only
        .map(d => Object.assign(d, {
          srcAirport: byIata[d.srcIata],
          dstAirport: byIata[d.dstIata]
        }))
        .filter(d => d.srcAirport.country === COUNTRY && d.dstAirport.country !== COUNTRY); // international routes from country

      setAirports(airports);
      setRoutes(filteredRoutes);
    });
  }, []);

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

const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
.domain([0, 1e7]);

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
              {...(topicSelected !== 'climate' && { hexBinPointsData: [] })}
              {...(topicSelected !== 'biodiversity' && { arcsData: [], pointsData: [] })}

              {...(topicSelected === 'climate' && {
                hexBinPointsData: POPULATION,
                hexBinPointWeight: 'pop',
                hexAltitude: d => d.sumWeight * 6e-8,
                hexBinResolution: 4,
                hexTopColor: d => weightColor(d.sumWeight),
                hexSideColor: d => weightColor(d.sumWeight),
                hexBinMerge: true
              })}

              {...(topicSelected === 'biodiversity' && {
                arcsData: routes,
                arcLabel: d => `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`,
                arcStartLat: d => +d.srcAirport.lat,
                arcStartLng: d => +d.srcAirport.lng,
                arcEndLat: d => +d.dstAirport.lat,
                arcEndLng: d => +d.dstAirport.lng,
                arcDashLength: 0.25,
                arcDashGap: 1,
                arcDashInitialGap: () => Math.random(),
                arcDashAnimateTime: 4000,
                arcColor: () => [`rgba(0, 255, 0, ${OPACITY})`, `rgba(255, 0, 0, ${OPACITY})`],
                arcsTransitionDuration: 0,
                pointsData: airports,
                pointColor: () => 'orange',
                pointAltitude: 0,
                pointRadius: 0.02,
                pointsMerge: true
              })}
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
