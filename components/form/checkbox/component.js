import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "components/ui/icon";

import FormElement from "../FormElement";

// styles
import styles from "./checkbox.module.scss";

export default class Checkbox extends FormElement {
  /**
   * UI EVENTS
   * - triggerChange
   */
  triggerChange(evt) {
    const { value } = this.props.properties;

    this.props.onChange &&
      this.props.onChange({
        value,
        checked: evt.currentTarget.checked
      });
  }

  render() {
    const { name, value, title, className } = this.props.properties;

    return (
      <div
        className={classnames({
          [styles["c-checkbox"]]: true,
          [className]: !!className
        })}
      >
        <input
          {...this.props.properties}
          type="checkbox"
          id={`checkbox-${name}-${value}`}
          onChange={this.triggerChange}
        />
        <label htmlFor={`checkbox-${name}-${value}`}>
          <span className={styles["checkbox-icon"]}>
            <Icon name="icon-checkbox" />
          </span>
          <span className={styles["item-title"]}>{title}</span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  properties: PropTypes.object,
  onChange: PropTypes.func
};
