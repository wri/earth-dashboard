import classnames from "classnames";
import styles from "./actions.module.scss";
import PropTypes from "prop-types";

const Actions = ({ isMobile, children }) => {
  return <div className={classnames(styles["c-home-actions"], "u-padding-horizontal-l")}>{children}</div>;
};

Actions.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  children: PropTypes.node
};

Actions.defaultProps = {
  children: null
};

export default Actions;
