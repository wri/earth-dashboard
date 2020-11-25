import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-modal';
import Toastr from 'react-redux-toastr';

// Utils
import { initGA, logPageView } from 'utils/analytics';
import { browserSupported } from 'utils/browser';

// Components
import HeadApp from 'layout/head/app';
import Header from 'layout/header';

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
    themeColor
  } = props;
  const isServer = typeof window === 'undefined';

  useEffect(() => {
    // // Google Analytics
    // if (!window.GA_INITIALIZED) {
    //   initGA();
    //   window.GA_INITIALIZED = true;
    // }
    // logPageView();
    // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement(document.getElementById('#main'));
  }, []);

  return (
    <div
      id="#main"
      className={classnames(
        { [className]: !!className }
      )}
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
        />
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
  themeColor: PropTypes.string
};

LayoutApp.defaultProps = {
  title: null,
  description: null,
  className: null,
  thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/homepage.jpg',
  showHeaderLogo: true,
  showHeader: true,
  themeColor: '#1a2128'
};

export default LayoutApp;
