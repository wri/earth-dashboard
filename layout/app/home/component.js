import React, { useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as THREE from "three";
import * as d3 from 'd3';
import indexBy from 'index-array-by';

// components
import Layout from 'layout/layout/layout-app';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './homepage.module.scss';

// constants
import { POPULATION } from './constants';

let Globe = null;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  Globe = require('react-globe.gl').default;
}

const TOPICS_DATA = {
  biodiversity: { texture: '//unpkg.com/three-globe/example/img/earth-night.jpg' },
  freshwater: { texture: '//unpkg.com/three-globe/example/img/earth-dark.jpg' },
  climate: { texture: '//unpkg.com/three-globe/example/img/earth-day.jpg' },
  forests: { texture: '//unpkg.com/three-globe/example/img/earth-topology.png' },
  ocean: { texture: '//unpkg.com/three-globe/example/img/earth-dark.jpg' }
};

const COUNTRY = 'United States';
const OPACITY = 0.22;

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment });

// Gen random paths
const N_PATHS = 30;
const MAX_POINTS_PER_LINE = 10000;
const MAX_STEP_DEG = 1;
const MAX_STEP_ALT = 0.015;

function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  const [topicSelected, setTopicSelected] = useState('forests');
  const [airports, setAirports] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [countries, setCountries] = useState({ features: [] });
  const [altitude, setAltitude] = useState(0.1);
  const [transitionDuration, setTransitionDuration] = useState(1000);
  const [cablePaths, setCablePaths] = useState([]);
  const isServer = typeof window === 'undefined';
  const globeEl = useRef();

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


  // GLOBE TESTS COMMENTED OUT 
  // useEffect(() => {

  //   // from https://github.com/telegeography/www.submarinecablemap.com
  //   fetch('//raw.githubusercontent.com/telegeography/www.submarinecablemap.com/master/public/api/v2/cable/cable-geo.json')
  //     .then(r => r.json())
  //     .then((cablesGeo) => {
  //       let cablePaths = [];
  //       cablesGeo.features.forEach(({ geometry, properties }) => {
  //         geometry.coordinates.forEach(coords => cablePaths.push({ coords, properties }));
  //       });

  //       setCablePaths(cablePaths);
  //     });

  //   // load countries data
  //   fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson').then(res => res.json())
  //     .then(countriesValue => {
  //       setCountries(countriesValue);
  //     });

  //   // load data arcs
  //   Promise.all([
  //     fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
  //       .then(d => d3.csvParseRows(d, airportParse)),
  //     fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat').then(res => res.text())
  //       .then(d => d3.csvParseRows(d, routeParse))
  //   ]).then(([airportsValue, routesValue]) => {

  //     const byIata = indexBy(airportsValue, 'iata', false);

  //     const filteredRoutes = routesValue
  //       .filter(d => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // exclude unknown airportsValue
  //       .filter(d => d.stops === '0') // non-stop flights only
  //       .map(d => Object.assign(d, {
  //         srcAirport: byIata[d.srcIata],
  //         dstAirport: byIata[d.dstIata]
  //       }))
  //       .filter(d => d.srcAirport.country === COUNTRY && d.dstAirport.country !== COUNTRY); // international routes from country

  //     setAirports(airportsValue);
  //     setRoutes(filteredRoutes);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (topicSelected === 'ocean') {
  //     setTimeout(() => {
  //       setTransitionDuration(4000);
  //       setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5));
  //     }, 3000);
  //     // Auto-rotate
  //     globeEl.current.controls().autoRotate = true;
  //     globeEl.current.controls().autoRotateSpeed = 0.3;
  //   }
  // }, [topicSelected]);

  const getLink = name =>
  (<a
    className={`external-link -${name}`}
    onClick={() => setTopicSelected(name)}
  >
    {name.toUpperCase()}
  </a>);

  const getTopicLinks = mobile =>
  (<div className={classnames({
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
  </div>);

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
        <iframe width="100%" height="100%" src="https://earth.nullschool.net/?kiosk" title="Null School" frambeborder="0" />
        {!isServer &&
          <div>
            {/* <Globe
              ref={globeEl}
              globeImageUrl={TOPICS_DATA[topicSelected].texture}
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              {...(topicSelected === 'forests' && {
                pathsData: PATHS_DATA,
                pathColor: () => ['rgba(0,0,255,0.6)', 'rgba(255,0,0,0.6)'],
                pathDashLength: 0.01,
                pathDashGap: 0.004,
                pathDashAnimateTime: 100000
              })}
              {...(!['forests', 'freshwater'].includes(topicSelected) && { pathsData: [] })}
              {...(topicSelected !== 'climate' && { hexBinPointsData: [] })}
              {...(topicSelected !== 'biodiversity' && { arcsData: [], pointsData: [] })}
              {...(topicSelected !== 'ocean' && { polygonsData: [] })}

              {...(topicSelected === 'climate' && {
                hexBinPointsData: POPULATION,
                hexBinPointWeight: 'pop',
                hexAltitude: d => d.sumWeight * 6e-8,
                hexBinResolution: 4,
                hexTopColor: d => weightColor(d.sumWeight),
                hexSideColor: d => weightColor(d.sumWeight),
                hexBinMerge: false,
                hexLabel: data => `<div><strong>Population:</strong>${data.points[0].pop}</div>`,
                onHexHover: (data) => {
                  console.log('data', data);
                }
              })}

              {...(topicSelected === 'freshwater' && {
                pathsData: cablePaths,
                pathPoints: 'coords',
                pathPointLat: p => p[1],
                pathPointLng: p => p[0],
                pathColor: path => path.properties.color,
                pathLabel: path => path.properties.slug,
                pathDashLength: 0.1,
                pathDashGap: 0.008,
                pathDashAnimateTime: 12000
              })}

              {...(topicSelected === 'ocean' && {
                polygonsData: countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'),
                polygonAltitude: altitude,
                polygonCapColor: () => 'rgba(200, 0, 0, 0.6)',
                polygonSideColor: () => 'rgba(0, 100, 0, 0.15)',
                polygonLabel: ({ properties: d }) => `
                  <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
                  Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
                `,
                polygonsTransitionDuration: transitionDuration
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
            /> */}
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
