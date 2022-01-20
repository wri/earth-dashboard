import PropTypes from "prop-types";
import classnames from "classnames";
import useWindowDimensions from "hooks/useWindowDimensions";

// styles
import styles from "./tooltip.module.scss";

// These refer to the position of the Arrow on the tooltip
// Not the position of the tooltip in relation to the x and y coordinates
export const POSITIONS = {
  left: "left",
  right: "right",
  bottom: "bottom",
  none: "none"
};

const ToolTip = ({ x, y, children, arrowPosition, className, globeToolTip }) => {
  const { width: browserWidth } = useWindowDimensions();
  let style = {
    top: `calc(${y} + 10px)`
  };

  if (globeToolTip) {
    let right = browserWidth - Number.parseFloat(x);
    right += "px";

    style.right = `calc(${right} + 26px)`;
  } else {
    style.left = `calc(${x} + 10px)`;
  }

  return (
    <div
      className={classnames(
        className,
        styles["c-tooltip"],
        styles[`c-tooltip--${globeToolTip ? POSITIONS.right : arrowPosition}`],
        globeToolTip && styles["c-tooltip--globe-tooltip"]
      )}
      role="tooltip"
      style={style}
    >
      {children}
    </div>
  );
};

ToolTip.propTypes = {
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  arrowPosition: PropTypes.oneOf([POSITIONS.left, POSITIONS.right, POSITIONS.bottom, POSITIONS.none]),
  children: PropTypes.node,
  className: PropTypes.string,
  globeToolTip: PropTypes.bool
};

ToolTip.defaultProps = {
  children: null,
  arrowPosition: POSITIONS.right,
  className: "",
  globeToolTip: false
};

export default ToolTip;
