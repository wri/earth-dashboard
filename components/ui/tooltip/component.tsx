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
  // The tooltip will try not to go beyond this X coordinate
  boundingX?: number;
};

const ToolTip = ({
  x,
  y,
  children = null,
  arrowPosition = "right",
  className,
  globeToolTip,
  boundingX
}: ToolTipProps) => {
  const { width: browserWidth } = useWindowDimensions();
  let style: { top: string; right?: string; left?: string; maxWidth?: string; minWidth?: string } = {
    top: `calc(${y} + 10px)`
  };

  if (globeToolTip) {
    let right = browserWidth - Number.parseFloat(x.toString());

    style.right = `calc(${right}px + 26px)`;

    if (boundingX) {
      style.maxWidth = `${Number.parseFloat(x.toString()) - (boundingX + 40)}px`;
    }
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
