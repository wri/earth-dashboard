import PropTypes from "prop-types";
import classnames from "classnames";

// styles
import styles from "./tooltip.module.scss";

export const POSITIONS = {
  left: "left",
  right: "right"
};

const ToolTip = ({ x, y, children, arrowPosition }) => {
  return (
    <div
      className={classnames(styles["c-tooltip"], styles[`c-tooltip--${arrowPosition}`])}
      role="tooltip"
      style={{ top: y + 10, left: x + 10 }}
    >
      {children}
    </div>
  );
};

ToolTip.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  arrowPosition: PropTypes.oneOf([POSITIONS.left, POSITIONS.right]),
  children: PropTypes.node
};

ToolTip.defaultProps = {
  children: null,
  arrowPosition: POSITIONS.right
};

export default ToolTip;
