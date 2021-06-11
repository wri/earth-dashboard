import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-modal';
import Toastr from 'react-redux-toastr';

// Components
import HeadApp from 'layout/head/app';
import Header from 'layout/header';

// constants
import { GDPR_ACCEPTED_KEY } from './constants';

// utils
import { MediaContextProvider, Mobile, Desktop } from 'utils/responsive';

// styles
import styles from './layout-app.module.scss'

function LayoutApp(props) {
  const {
    title,
    description,
    className,
    thumbnail,
    children,
    showHeaderLogo,
    showHeader,
    openHeaderMenu,
    headerTabSelected,
    headerButtonPosition,
    themeColor,
  } = props;
  const [showGDPRBanner, setShowGDPRBanner] = useState(false);
  const isServer = typeof window === 'undefined';

  useEffect(() => {
    // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement(document.getElementById('#main'));

    // Check if GDPR has been accepted
    if (localStorage.getItem(GDPR_ACCEPTED_KEY) !== 'true') {
      setShowGDPRBanner('true');
    }
  }, []);

  const getGDPRContainer = (mobile) =>
    <div className={classnames({
      [styles['gdpr-banner']]: true,
      [styles['-mobile']]: mobile,
      [styles['-desktop']]: !mobile
    })}>
      <div className={styles['text']}>
        This website uses cookies to provide you with an improved user experience. By continuing to browse
        this site, you consent to the use of cookies and similar technologies. Please visit
            our <a className="external-link -white" href="https://resourcewatch.org/privacy-policy" target="_blank">privacy policy</a> for further details.
          </div>
      <button onClick={() => {
        setShowGDPRBanner(false);
        localStorage.setItem(GDPR_ACCEPTED_KEY, 'true');
      }}>
        I agree
      </button>
    </div>;

  return (
    <div
      id="#main"
      className={classnames({
        [styles['c-layout-app']]: true,
        [className]: !!className
      })}
    >
      <HeadApp
        title={title}
        description={description}
        explicitHostname={!isServer && window.location.href}
        {...thumbnail && { thumbnail }}
        themeColor={themeColor}
      />

      {showHeader &&
        <Header
          showLogo={showHeaderLogo}
          selectedTab={headerTabSelected}
          openMenu={openHeaderMenu}
          buttonPosition={headerButtonPosition}
        />
      }

      {/* GDPR BANNER */}
      {showGDPRBanner &&
        <MediaContextProvider>
          <Desktop>{getGDPRContainer(false)}</Desktop>
          <Mobile>{getGDPRContainer(true)}</Mobile>
        </MediaContextProvider>
      }

      {children}

      <Toastr
        preventDuplicates
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>
  );

}

LayoutApp.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  showHeaderLogo: PropTypes.bool,
  showHeader: PropTypes.bool,
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  thumbnail: PropTypes.string,
  isFullScreen: PropTypes.bool.isRequired,
  updateIsLoading: PropTypes.func.isRequired,
  explicitHostname: PropTypes.string,
  themeColor: PropTypes.string,
  headerTabSelected: PropTypes.boolean,
  headerButtonPosition: PropTypes.string
};

LayoutApp.defaultProps = {
  title: null,
  description: null,
  className: null,
  thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg',
  showHeaderLogo: true,
  showHeader: true,
  themeColor: '#1a2128',
  headerButtonPosition: 'center'
};

export default LayoutApp;
