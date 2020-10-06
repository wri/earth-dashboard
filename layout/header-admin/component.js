import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import MediaQuery from 'react-responsive';

// components
import HeaderMenu from 'layout/header-admin/header-admin-menu';
import HeaderMenuMobile from 'layout/header-admin/header-admin-menu-mobile';

// utils
import { breakpoints } from 'utils/responsive';

class AdminHeader extends PureComponent {
  static propTypes = {
    header: PropTypes.object.isRequired,
    responsive: PropTypes.object.isRequired,
    pageHeader: PropTypes.bool
  };

  static defaultProps = { pageHeader: false };

  render() {
    const { pageHeader } = this.props;
    const { medium } = breakpoints;
    const headerClass = classnames(
      'l-header',
      { '-transparent': pageHeader }
    );
    const containerClass = classnames(
      'l-container',
      { '-admin': true }
    );

    return (
      <header className={headerClass}>
        <div className={containerClass}>
          <div className="row">
            <div className="column">
              <div className="header-main">
                <div className="header-logo">
                  <Link route="home">
                    <a>
                      <img className="brand-logo" src="/static/images/GCA_logo.png" />
                      <h1 className="brand-title">Resource Watch</h1>
                    </a>
                  </Link>
                </div>

                {/* Mobile header */}
                <MediaQuery
                  maxDeviceWidth={medium - 1}
                  values={{ deviceWidth: 1024 }}
                >
                  <HeaderMenuMobile />
                </MediaQuery>

                {/* Desktop header */}
                <MediaQuery
                  minDeviceWidth={medium}
                  values={{ deviceWidth: 1024 }}
                >
                  <HeaderMenu />
                </MediaQuery>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default AdminHeader;
