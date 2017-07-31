import React from 'react';
import { Link } from 'routes';
import Icon from 'components/ui/Icon';

function Breadcrumbs(props) {
  return (
    <ul className="c-breadcrumbs">
      {props.items.map(item => (
        <li key={item.name} className="item">
          {
            item.route
              ? (
                <Link route={item.route} params={item.params}>
                  <a>
                    {props.items.length === 1 &&
                      <Icon className="c-icon -smaller" name="icon-arrow-left" />
                    }
                    <span>{item.name}</span>
                  </a>
                </Link>
              )
              : (
                <a href={item.href}>
                  {props.items.length === 1 &&
                    <Icon className="c-icon -smaller" name="icon-arrow-left" />
                  }
                  <span>{item.name}</span>
                </a>
              )
          }
        </li>
      ))}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  items: React.PropTypes.array
};

Breadcrumbs.defaultProps = {
  items: []
};

export default Breadcrumbs;
