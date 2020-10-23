import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Utils
import { initGA, logPageView } from 'utils/analytics';
import { browserSupported } from 'utils/browser';

// vizzuality-components
import { Icons } from 'vizzuality-components';

// Components
import HeadApp from 'layout/head/app';
import Header from 'layout/header';
import Footer from 'layout/footer';

import Toastr from 'react-redux-toastr';
import NoBrowserSupport from 'components/app/common/browser';

class LayoutApp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    showHeaderLogo: PropTypes.bool,
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
    thumbnail: 'https://resourcewatch.org/static/images/social-big.jpg',
    explicitHostname: null,
    showHeaderLogo: true,
  }

  state = { modalOpen: false }

  componentDidMount() {
    // // Google Analytics
    // if (!window.GA_INITIALIZED) {
    //   initGA();
    //   window.GA_INITIALIZED = true;
    // }
    // logPageView();
  }

  render() {
    const {
      title,
      description,
      className,
      thumbnail,
      children,
      explicitHostname,
      showHeaderLogo
    } = this.props;
    const componentClass = classnames(
      { [className]: !!className }
    );

    return (
      <div
        id="#main"
        className={componentClass}
      >
        <HeadApp
          title={title}
          description={description}
          explicitHostname={explicitHostname}
          {...thumbnail && { thumbnail }}
        />

        <Header showLogo={showHeaderLogo} />

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
