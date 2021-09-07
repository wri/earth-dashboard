import PropTypes from "prop-types";
import { Children, cloneElement } from "react";
import styles from "./toggle-list.module.scss";
import classnames from "classnames";

const ToggleList = ({ title, selectedValue, onSelect, children, className, ...rest }) => {
  const getChildren = () => {
    const array = Children.toArray(children).filter(element => !!element.type && element.type.name === "ToggleItem");

    const resp = array.map(el => {
      return cloneElement(el, {
        selected: el.props.value === selectedValue,
        name: title,
        onChange: e => onSelect(e.target.value)
      });
    });

    return resp;
  };

  return (
    <fieldset className={classnames(styles["c-toggle-list"], className)} {...rest}>
      <legend>{title}</legend>
      {getChildren()}
    </fieldset>
  );
};

ToggleList.propTypes = {
  title: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

ToggleList.defaultProps = {
  className: ""
};

export default ToggleList;
