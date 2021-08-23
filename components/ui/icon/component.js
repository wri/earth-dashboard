import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Icon extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  static defaultProps = { className: null }

  render() {
    const { className, name } = this.props;
    const componentClass = classnames({ 
      'c-icon': true,
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
