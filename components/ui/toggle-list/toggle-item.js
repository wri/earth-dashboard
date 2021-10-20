import PropTypes from "prop-types";
import styles from "./toggle-list.module.scss";
import classnames from "classnames";

const ToggleItem = ({ children, className, ...rest }) => {
  return (
    <label
      className={classnames(
        styles["c-toggle-list__item"],
        rest.checked && styles["c-toggle-list__item--selected"],
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

// So we can identify it in the Toggle list as a toggle
ToggleItem.tagName = "ToggleItem";

export default ToggleItem;
