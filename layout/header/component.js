import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';
import MediaQuery from 'react-responsive';

// components
import HeaderMenu from 'layout/header/header-menu';
import HeaderMenuMobile from 'layout/header/header-menu-mobile';

// utils
import { breakpoints } from 'utils/responsive';

// styles
import styles from './header.module.scss';

class Header extends PureComponent {
  static propTypes = {
    header: PropTypes.object.isRequired,
    pageHeader: PropTypes.bool
  };

  static defaultProps = { pageHeader: false };

  render() {
    const {
      pageHeader,
    } = this.props;
    const { medium } = breakpoints;
    const headerClass = classnames({
      [styles['l-header']]: true,
      '-transparent': pageHeader
    });
    const containerClass = classnames(
      'l-container',
      { '-admin': false }
    );

    return (
      <header className={headerClass}>
        <div className={containerClass}>
          <div className="row">
            <div className="column">
              <div className={styles['header-main']}>
                <div className={styles['header-logo']}>
                  <Link href="/">
                    <a>
                      <img className={styles['brand-logo']} src="/static/images/GCA_logo.png" />
                      <h1 className={styles['brand-title']}>Earth Dashboard</h1>
                    </a>
                  </Link>
                </div>

                {/* Mobile header */}
                <MediaQuery
                  maxDeviceWidth={medium - 1}
                  values={{ deviceWidth: 1000 }}
                >
                  <HeaderMenuMobile />
                </MediaQuery>

                {/* Desktop header */}
                <MediaQuery
                  minDeviceWidth={medium}
                  values={{ deviceWidth: 1000 }}
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

export default Header;
