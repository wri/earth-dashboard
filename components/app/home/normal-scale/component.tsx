import classnames from "classnames";
import styles from "./normal-scale.module.scss";
import { Mode } from "slices/modes";
import { ActionCreatorWithOptionalPayload } from "@reduxjs/toolkit";

export type NormalScaleProps = {
  headlineMode: Mode;
  setInfoMode: ActionCreatorWithOptionalPayload<Mode | undefined, string>;
  value?: number;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
  thermometerStyle?: Object;
};

const NormalScale = ({
  headlineMode,
  setInfoMode,
  value,
  className,
  thermometerStyle,
  minLabel = "0%",
  maxLabel = "100%"
}: NormalScaleProps) => {
  console.log(headlineMode);

  return (
    <div className={classnames(styles["c-normal-scale"], className)} data-testid="normal-scale">
      <span
        className={styles["c-normal-scale__label"]}
        style={!headlineMode.attributes.scale_info_detail ? { minWidth: "auto" } : {}}
      >
        Scale
        {headlineMode.attributes.scale_info_detail && (
          <span className={styles["c-normal-scale__info"]} onClick={() => setInfoMode(headlineMode)} />
        )}
      </span>
      <div className={styles["c-normal-scale__content"]}>
        <div className={styles["c-normal-scale__thermometer"]} style={thermometerStyle}>
          {value ? (
            <span
              className={styles["c-normal-scale__thermometer-value"]}
              style={{ left: `calc(${value}% - (20px * ${value / 100}))` }}
            />
          ) : null}
        </div>
        <div className={styles["c-normal-scale__thermometer-labels"]}>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default NormalScale;
