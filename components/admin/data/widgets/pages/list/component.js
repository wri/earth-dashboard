import { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import WidgetsTable from 'components/admin/data/widgets/table';

// styles
import styles from './widgets-index.module.scss';

class WidgetsIndex extends PureComponent {
  static propTypes = { dataset: PropTypes.string }

  static defaultProps = { dataset: null }

  render() {
    const { dataset } = this.props;

    return (
      <div className={styles['c-widgets-index']}>
        <WidgetsTable dataset={dataset} />
      </div>
    );
  }
}

export default WidgetsIndex;
