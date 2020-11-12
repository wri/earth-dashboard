import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Progress from 'react-progress-2';
import { withRouter } from 'next/router';

// Utils
import { initGA, logPageView } from 'utils/analytics';
import { checkAuth } from 'services/user';

// Components
import IconsRW from 'components/icons';

// vizzuality-components
import { Icons } from 'vizzuality-components';

import Head from 'layout/head/admin';
import Header from 'layout/header-admin';

import Toastr from 'react-redux-toastr';

class LayoutAdmin extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    toggleTooltip: PropTypes.func.isRequired,
    updateIsLoading: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static defaultProps = { className: null };

  state = {
    loggedIn: !!this.props.user.email,
    loggingIn: false
  }

  UNSAFE_componentWillMount() {
    // When a tooltip is shown and the router navigates to a
    // another page, the tooltip stays in place because it is
    // managed in Redux
    // The way we prevent this is by listening to the router
    // and whenever we navigate, we hide the tooltip
    // NOTE: we can't just call this.props.toggleTooltip here
    // because for some pages, we don't re-mount the LayoutAdmin
    // component. If we listen for events from the router,
    // we're sure to not miss any page.
    this.props.toggleTooltip(false);
  }

  componentDidMount() {
    const { router, setUser } = this.props;
    const { loggedIn } = this.state;
    const isServer = typeof window === 'undefined';

    if (!loggedIn) {
      this.setState({ loggingIn: true });
      checkAuth()
        .then((response) => {
          setUser({
            ...response,
            token: `Bearer ${!isServer && localStorage.getItem('userToken')}`
          });
          this.setState({ loggingIn: false, loggedIn: true });
        })
        .catch(() => {
          this.setState({ loggingIn: false });
          router.push('/sign-in');
        });
    }

    router.onRouteChangeStart = () => {
      if (Progress && Progress.Component.instance) Progress.show();
      this.props.toggleTooltip(false);
      this.props.updateIsLoading(true);
    };
    router.onRouteChangeComplete = () => {
      this.props.updateIsLoading(false);
      if (Progress && Progress.Component.instance) Progress.hideAll();
    };

    // Google Analytics
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    const {
      title,
      description,
      className
    } = this.props;
    const { loggingIn, loggedIn } = this.state;
    const componentClass = classnames('l-page', { [className]: !!className });

    return (
      <div id="#main" className={componentClass}>
        <Head title={title} description={description} />

        {loggingIn && (
          <div>Logging in...</div>
        )}
        {!loggingIn && loggedIn && (
          <>
            <Icons />
            <IconsRW />
            <Progress.Component />
            <Header />
            {this.props.children}
            <Toastr preventDuplicates transitionIn="fadeIn" transitionOut="fadeOut" />
          </>
        )}

      </div>
    );
  }
}

export default withRouter(LayoutAdmin);
