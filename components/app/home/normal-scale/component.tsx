import classnames from "classnames";
import styles from "./normal-scale.module.scss";

export type NormalScaleProps = {
  value?: number;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
  thermometerStyle?: Object;
};

const NormalScale = ({ value, className, thermometerStyle, minLabel = "0%", maxLabel = "100%" }: NormalScaleProps) => {
  return (
    <div className={classnames(styles["c-normal-scale"], className)} data-testid="normal-scale">
      <span className={styles["c-normal-scale__label"]}>Scale</span>
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
