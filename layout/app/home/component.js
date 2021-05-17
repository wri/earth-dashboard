import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Link from 'next/link';

// components
import Layout from 'layout/layout/layout-app';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './homepage.module.scss';

function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  const isServer = typeof window === 'undefined';
  const getLink = name =>
  (
    <Link href={`/${name}`}>
      <a
        className={`external-link -${name}`}
      >
        {name.toUpperCase()}
      </a>
    </Link>);

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

  const getMainContainer = (mobile) => {
    return (
      <div className={classnames({
        [styles['main-container']]: true,
        [styles['-desktop']]: !mobile,
        [styles['-mobile']]: mobile
      })}
      >

        <iframe width="100%" height="100%" src="https://earth.nullschool.net/" title="Null School" />
        <div className={classnames({
          [styles['text-container']]: true,
          [styles['-desktop']]: !mobile,
          [styles['-mobile']]: mobile
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
