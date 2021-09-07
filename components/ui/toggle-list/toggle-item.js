import PropTypes from "prop-types";
import styles from "./toggle-list.module.scss";
import classnames from "classnames";

const ToggleItem = ({ children, className, ...rest }) => {
  return (
    <label
      className={classnames(
        styles["c-toggle-list__item"],
        rest.selected && styles["c-toggle-list__item--selected"],
        className
      )}
    >
      {children} <input type="radio" {...rest} />
    </label>
  );
};

ToggleItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

ToggleItem.defaultProps = {
  className: ""
};

export default ToggleItem;
