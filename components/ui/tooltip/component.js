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
      style={{ top: `calc(${y} + 10px)`, left: `calc(${x} + 10px)` }}
    >
      {children}
    </div>
  );
};

ToolTip.propTypes = {
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  arrowPosition: PropTypes.oneOf([POSITIONS.left, POSITIONS.right]),
  children: PropTypes.node
};

ToolTip.defaultProps = {
  children: null,
  arrowPosition: POSITIONS.right
};

export default ToolTip;
