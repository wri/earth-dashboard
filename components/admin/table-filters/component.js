import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import RadioGroup from 'components/form/RadioGroup';

// utils
import { USER_TYPES, USER_OPTIONS } from './constants.js';

// styles
import styles from './table-filters.module.scss';

class TableFiltersComponent extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    filtersChange: PropTypes.func.isRequired
  };

  static defaultProps = { className: null };

  onOwnerChange = (value) => {
    this.props.filtersChange({ key: 'user.role', value });
  }

  render() {
    const { className, application } = this.props;
    const classNameValue = classnames({
      [styles['c-table-filters']]: true,
      [className]: !!className
    });
    return (
      <div
        className={classNameValue}
      >
        <RadioGroup
          name={`${application}-owner-filter`}
          className={styles['c-radio-box']}
          properties={{ default: USER_TYPES.ADMIN }}
          options={USER_OPTIONS}
          onChange={this.onOwnerChange}
        />
      </div>
    );
  }
}

export default TableFiltersComponent;
