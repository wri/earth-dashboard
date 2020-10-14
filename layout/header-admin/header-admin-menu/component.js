import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';

// constants
import { ADMIN_HEADER_ITEMS } from 'layout/header-admin/constants';

class AdminHeaderMenu extends PureComponent {
  static propTypes = { pathname: PropTypes.string.isRequired }

  render() {
    const { pathname } = this.props;

    return (
      <nav className="header-menu">
        <ul>
          {ADMIN_HEADER_ITEMS.map((item) => {
            const activeClassName = classnames({ '-active': item.pathnames && item.pathnames.includes(pathname) });

            return (
              <li
                key={item.label}
                className={activeClassName}
              >
                {item.route &&
                  <Link href={
                    {
                      pathname: item.route,
                      query: item.params
                    }}
                  >
                    <a>{item.label}</a>
                  </Link>
                }

                {item.href &&
                  <a href={item.href}>
                    {item.label}
                  </a>}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default AdminHeaderMenu;

export async function getServerSideProps(context) {
  return {
    props: {
      pathname: context.req.pathname
    }
  }
}
