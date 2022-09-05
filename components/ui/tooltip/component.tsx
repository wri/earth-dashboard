import React from "react";
import useWindowDimensions from "hooks/useWindowDimensions";

// styles
import styles from "./tooltip.module.scss";
import classnames from "classnames";

// These refer to the position of the Arrow on the tooltip
// Not the position of the tooltip in relation to the x and y coordinates
export type Positions = "left" | "right" | "bottom" | "none";

type ToolTipProps = {
  x: number | string;
  y: number | string;
  arrowPosition?: Positions;
  children?: React.ReactNode;
  className?: string;
  globeToolTip?: boolean;
};

const ToolTip = ({ x, y, children = null, arrowPosition = "right", className, globeToolTip }: ToolTipProps) => {
  const { width: browserWidth } = useWindowDimensions();
  let style: { top: string; right?: string; left?: string } = {
    top: `calc(${y} + 10px)`
  };

  if (globeToolTip) {
    let right: string = (browserWidth - Number.parseFloat(x.toString())).toString();
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
        styles[`c-tooltip--${globeToolTip ? "right" : arrowPosition}`],
        globeToolTip && styles["c-tooltip--globe-tooltip"]
      )}
      role="tooltip"
      style={style}
    >
      {children}
    </div>
  );
};

export default ToolTip;
