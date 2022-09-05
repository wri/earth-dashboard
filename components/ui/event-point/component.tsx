import React from "react";
import useWindowDimensions from "hooks/useWindowDimensions";

// styles
import styles from "./event-point.module.scss";
import classnames from "classnames";

type EventPointProps = {
  x: number | string;
  y: number | string;
  onClick: () => void;
  className?: string;
};

const EventPoint = ({ x, y, onClick, className }: EventPointProps) => {
  const { width: browserWidth } = useWindowDimensions();
  let style: { top: string; right: string } = {
    top: `calc(${y} - 12px)`,
    right: ""
  };
  let right: string = (browserWidth - Number.parseFloat(x.toString())).toString();
  style.right = `calc(${right + "px"} - 12px)`;

  return (
    <button
      className={classnames(className, styles["c-event-point"])}
      onClick={onClick}
      role="EventPoint"
      style={style}
    >
      <div className={classnames(styles["c-outer-circle"])}>
        <div className={classnames(styles["c-inner-circle"])} />
      </div>
    </button>
  );
};

export default EventPoint;
