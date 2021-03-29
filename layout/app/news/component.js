import React, { useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from '@apollo/client';

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
      setNewsData(data.posts.nodes.map(async (d) => {
        const location = await getLocationForString(d.locations.edges[d.locations.edges.length - 1]);
        console.log('d', d, );
        return ({
          date: d.date,
          image: d.featuredImage.node.mediaItemUrl,
          title: d.title,
          uri: d.uri,
          lat: location.lat,
          lng: location.lng
        });
      }));
      // getLocationForString()
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
        {!isServer &&
          <div>
            <Globe
              ref={globeEl}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
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
