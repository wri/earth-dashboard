import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Next components
import Link from 'next/link';

// styles
import styles from './tabs.module.scss';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: props.defaultSelected };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { selected } = nextProps;
    this.setState({ selected });
  }

  /**
   * UI EVENTS
   * - onChangeTab
  */
  onChangeTab(selected) {
    this.setState({ selected }, () => {
      if (this.props.onChange) this.props.onChange(selected);
    });
  }

  render() {
    const { selected } = this.state;
    const { options, className } = this.props;

    return (
      <header
        className={classnames({
          [styles['c-tabs']]: true,
          [className]: !!className
        })}
      >
        <div className="row l-row">
          {options.map((option) => {
            const btnClasses = classnames({
              [styles['tabs-btn']]: true,
              [styles['-active']]: option.value === selected,
              [styles['-desktopOnly']]: option.desktopOnly
            });

            return (
              <div
                key={option.value}
                className="column shrink"
              >
                {option.route &&
                  <Link href={
                    {
                      pathname: option.route,
                      query: option.params
                    }}
                  >
                    <a className={btnClasses}>
                      <span className={styles.title}>{option.label}</span>
                      {!!option.number && <span className={styles.number}>{option.number}</span>}
                    </a>
                  </Link>
                }

                {!option.route &&
                  <button className={btnClasses} onClick={() => this.onChangeTab(option.value)}>
                    <span className={styles.title}>{option.label}</span>
                    {!!option.number && <span className={styles.number}>{option.number}</span>}
                  </button>
                }
              </div>
            );
          })}
        </div>
      </header>
    );
  }
}

Tabs.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.string,
  defaultSelected: PropTypes.string,
  onChange: PropTypes.func
};
