import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Utils
import { initGA, logPageView } from 'utils/analytics';
import { browserSupported } from 'utils/browser';

// vizzuality-components
import { Icons } from 'vizzuality-components';

// Components
import { Router } from 'routes';
import HeadApp from 'layout/head/app';
import Header from 'layout/header';
import Footer from 'layout/footer';

import IconsRW from 'components/icons';
import Tooltip from 'components/ui/tooltip';
import Modal from 'components/ui/modal';
import Toastr from 'react-redux-toastr';
import NoBrowserSupport from 'components/app/common/browser';

class LayoutApp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    pageHeader: PropTypes.bool,
    className: PropTypes.string,
    modal: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    thumbnail: PropTypes.string,
    isFullScreen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    setModalOptions: PropTypes.func.isRequired,
    updateIsLoading: PropTypes.func.isRequired,
    explicitHostname: PropTypes.string
  };

  static defaultProps = {
    title: null,
    description: null,
    className: null,
    pageHeader: false,
    thumbnail: 'https://resourcewatch.org/static/images/social-big.jpg',
    explicitHostname: null
  }

  state = { modalOpen: false }

  componentDidMount() {
    // Google Analytics
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.state.modalOpen !== newProps.modal.open) {
      this.setState({ modalOpen: newProps.modal.open });
    }
  }

  render() {
    const {
      title,
      description,
      pageHeader,
      modal,
      className,
      thumbnail,
      isFullScreen,
      children,
      toggleModal,
      setModalOptions,
      explicitHostname
    } = this.props;
    const { modalOpen } = this.state;
    const componentClass = classnames(
      'l-page',
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

        {!browserSupported() &&
          <Modal
            open
            canClose={false}
          >
            <NoBrowserSupport />
          </Modal>
        }

        {children}

        <Tooltip />

        <Modal
          open={modalOpen}
          options={modal.options}
          loading={modal.loading}
          toggleModal={toggleModal}
          setModalOptions={setModalOptions}
        />

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
