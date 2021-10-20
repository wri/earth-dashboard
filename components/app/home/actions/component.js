import classnames from "classnames";
import styles from "./actions.module.scss";
import PropTypes from "prop-types";

const Actions = ({ className, children }) => {
  return <div className={classnames(styles["c-home-actions"], "u-padding-horizontal-l", className)}>{children}</div>;
};

Actions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Actions.defaultProps = {
  children: null,
  className: ""
};

export default Actions;
