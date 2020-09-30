import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

class NameTD extends PureComponent {
  static propTypes = {
    row: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    linkToNewWidget: PropTypes.boolean
  };

  static defaultProps = {
    linkToNewWidget: false
  };

  render() {
    const {
      row: { id },
      value,
      route,
      linkToNewWidget
    } = this.props;

    const params = linkToNewWidget ? 
      {
        tab: 'widgets',
        id: 'new',
        dataset: id,
        application: 'rw'
      } :
      {
        tab: 'datasets',
        id
      };


    return (
      <td className="main">
        <Link
          route={route}
          params={params}
        >
          <a>{value}</a>
        </Link>
      </td>
    );
  }
}

export default NameTD;
