import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Layout from 'layout/layout/layout-app';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './homepage.module.scss';

function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  const [showIntroAndBanner, setShowIntroAndBanner] = useState(true);
  const [timeOutReached, setTimeoutReached] = useState(false);

  const clickHandler = () => {
    setShowIntroAndBanner(false);
    window.removeEventListener('click', clickHandler);
    setTimeout(() => setTimeoutReached(true), 500)
  }

  useEffect(() => {
    window.addEventListener('click', clickHandler);
    return () => window.removeEventListener('click', clickHandler);
  }, []);

  const getBanner = mobile =>
  (<div className={classnames({
    [styles['banner']]: true,
    [styles['-mobile']]: mobile,
    [styles['-desktop']]: !mobile,
  })}>
    <h1>This is not a drill</h1>
    <h1>It's a <span className={styles.gradient}>Planetary emergency</span>.</h1>
  </div>);

  const getIntroText = mobile =>
  (<div className={classnames({
    [styles['intro-text']]: true,
    [styles['-mobile']]: mobile,
    [styles['-desktop']]: !mobile,
    [styles['-fade-out']]: !showIntroAndBanner,
  })}>
    <div className={classnames({
      [styles['topic-links-intro-text']]: true,
      [styles['-mobile']]: mobile,
      [styles['-desktop']]: !mobile,
    })}>
      <img src="/static/icons/arrow-up-homepage.svg" />
      <p>What you need to know about Earth's life support systems, the global commons</p>
    </div>
    <div className={classnames({
      [styles['globe-menu-intro-text']]: true,
      [styles['-mobile']]: mobile,
      [styles['-desktop']]: !mobile,
    })}>
      <img src="/static/icons/arrow-down-homepage.svg" />
      <p>Explore Earth's planetary emergency in near-real-time</p>
    </div>
  </div>);

  const getMainContainer = (mobile) => {
    return (
      <div className={classnames({
        [styles['main-container']]: true,
        [styles['-desktop']]: !mobile,
        [styles['-mobile']]: mobile
      })}
      >
        <iframe id="nullSchoolIframe" width="100%" height="100%" src="https://earth.nullschool.net/?kiosk#current/wind/surface/level/orthographic=-330.00,0.00,306" title="Null School" frameBorder="0" />
        {!timeOutReached &&
          <>
            <div className={classnames({
              [styles['text-container']]: true,
              [styles['-desktop']]: !mobile,
              [styles['-mobile']]: mobile,
              [styles['-fade-out']]: !showIntroAndBanner,
            })}
            >
              {getBanner(mobile)}
            </div>
            {getIntroText(mobile)}
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
      headerButtonPosition="right"
      headerShowTopicLinks={true}
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
