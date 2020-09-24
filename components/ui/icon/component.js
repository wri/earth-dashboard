import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import styles from './icon.module.scss';

class Icon extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  static defaultProps = { className: null }

  render() {
    const { className, name } = this.props;
    const componentClass = classnames({ 
      [styles['c-icon']]: true,
      [className]: !!className 
    });

    return (
      <svg className={componentClass}>
        <use xlinkHref={`#${name}`} />
      </svg>
    );
  }
}

export default Icon;
