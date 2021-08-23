import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

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

    const newRoute = linkToNewWidget ? `${route}/widgets/new` : `${route}/datasets/${id}`;

    const params = linkToNewWidget ? 
      {
        dataset: id,
        application: 'rw'
      } :
      {};

    return (
      <td className="main">
        <Link href={
          {
            pathname: newRoute,
            query: params
          }}
        >
          <a>{value}</a>
        </Link>
      </td>
    );
  }
}

export default NameTD;
