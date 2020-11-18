import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-modal';

// Utils
import { initGA, logPageView } from 'utils/analytics';
import { browserSupported } from 'utils/browser';

// Components
import HeadApp from 'layout/head/app';
import Header from 'layout/header';

import Toastr from 'react-redux-toastr';

class LayoutApp extends Component {
  static propTypes = {
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
    explicitHostname: PropTypes.string
  };

  static defaultProps = {
    title: null,
    description: null,
    className: null,
    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/homepage.png',
    explicitHostname: null,
    showHeaderLogo: true,
    showHeader: true
  }

  state = { modalOpen: false }

  componentDidMount() {
    // // Google Analytics
    // if (!window.GA_INITIALIZED) {
    //   initGA();
    //   window.GA_INITIALIZED = true;
    // }
    // logPageView();
    // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement(document.getElementById('#main'));
  }

  render() {
    const {
      title,
      description,
      className,
      thumbnail,
      children,
      explicitHostname,
      showHeaderLogo,
      showHeader
    } = this.props;
    const componentClass = classnames(
      { [className]: !!className }
    );
    const isServer = typeof window === 'undefined';
    
    return (
      <div
        id="#main"
        className={componentClass}
      >
        <HeadApp
          title={title}
          description={description}
          explicitHostname={!isServer && window.location.href}
          {...thumbnail && { thumbnail }}
        />

        {showHeader && <Header showLogo={showHeaderLogo} />}

        {children}

        <Toastr
          preventDuplicates
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />

      </div>
    );
  }
}

export default LayoutApp;
