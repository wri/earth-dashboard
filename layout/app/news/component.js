import React, { useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from '@apollo/client';
import * as THREE from 'three';

// components
import Layout from 'layout/layout/layout-app';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';
import { GET_NEWS_BY_TOPIC_QUERY, MONGABAY_NEWS_DOMAIN } from 'utils/news';
import { getLocationForString } from 'utils/geo';

// styles
import styles from './news.module.scss';

let Globe = null;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  Globe = require('react-globe.gl').default;
}

function LayoutNews({ openHeaderMenu, headerTabSelected, title, description }) {
  const isServer = typeof window === 'undefined';
  const [newsData, setNewsData] = useState(null);
  const { loading, error, data } =
    useQuery(GET_NEWS_BY_TOPIC_QUERY('forests', 10));

  const globeEl = useRef(null);

  useEffect(() => {
    if (data) {
      setNewsData(data.posts.nodes.map((d) => {
        const signLatitude = Math.random();
        const randomLatitude = Math.random() * 90 * (signLatitude > 0.5 ? 1 : -1);
        const signLongitude = Math.random();
        const randomLongitude = Math.random() * 180 * (signLongitude > 0.5 ? 1 : -1);

        return ({
          date: d.date,
          image: d.featuredImage.node.mediaItemUrl,
          title: d.title,
          uri: d.uri,
          lat: randomLatitude,
          lng: randomLongitude,
          alt: 0,
          radius: 5,
          color: '#ffffff'
        });
      }));
    }
  }, [data]);

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
        {!isServer && !loading &&
          <div>
            <Globe
              ref={globeEl}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              customLayerData={newsData}
              customThreeObjectUpdate={(obj, d) => {
                Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, d.alt));
              }}
              customThreeObject={d => new THREE.Mesh(
                new THREE.SphereBufferGeometry(d.radius),
                new THREE.MeshLambertMaterial({ color: d.color })
              )}
              customLayerLabel={d => (`
                <div>
                  ${d.title}
                  <img src="${d.image}" alt="" />
                </div>`)}
            />
          </div>
        }
      </div>);
  };

  return (
    <Layout
      title={title}
      description={description}
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg"
      className={styles.canvas}
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

LayoutNews.propTypes = {
  openHeaderMenu: PropTypes.bool,
  headerTabSelected: PropTypes.string
};

LayoutNews.defaultProps = {
  openHeaderMenu: false,
  headerTabSelected: 'site-navigation'
};

export default LayoutNews;
