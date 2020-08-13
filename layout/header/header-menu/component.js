import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';

// components
import HeaderAbout from 'layout/header/header-about';

// constants
import { APP_HEADER_ITEMS } from 'layout/header/constants';

// Utils
import { logEvent } from 'utils/analytics';

class HeaderMenu extends PureComponent {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  headerComponents = {
    about: <HeaderAbout />
  }

  render() {
    const {
      user: { token, role },
      routes
    } = this.props;

    return (
      <nav className="header-menu">
        <ul>
          {APP_HEADER_ITEMS.map((item) => {
            const isUserLogged = !!token;
            const isUserAdmin = isUserLogged && role === 'ADMIN';

            // If admin user is defined and is not equal to the current token
            if (typeof item.admin !== 'undefined' && item.admin !== isUserAdmin) {
              return null;
            } 

            const activeClassName = classnames({ '-active': item.pathnames && item.pathnames.includes(routes.pathname) });
            const component = this.headerComponents[item.id];
            
            return (
              <li
                key={item.label}
                className={activeClassName}
              >
                {!component && item.route &&
                  <Link
                    route={item.route}
                    params={item.params}
                  >
                    <a>{item.label}</a>
                  </Link>
                }

                {!component && item.href &&
                  <a href={item.href}>
                    {item.label}
                  </a>
                }

                {!!component && cloneElement(component, item)}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default HeaderMenu;
