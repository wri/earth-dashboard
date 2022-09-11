import classnames from "classnames";
import styles from "./normal-scale.module.scss";

export type NormalScaleProps = {
  value: number;
  className?: string;
};

const NormalScale = ({ value, className }: NormalScaleProps) => (
  <div className={classnames(styles["c-normal-scale"], className)} data-testid="normal-scale">
    <span className={styles["c-normal-scale__label"]}>Normal Scale</span>
    <div className={styles["c-normal-scale__content"]}>
      <div className={styles["c-normal-scale__thermometer"]}>
        <span className={styles["c-normal-scale__normal-range"]} />
        <span className={styles["c-normal-scale__thermometer-value"]} style={{ right: `${value}%` }}>
          {value}%
        </span>
      </div>
      <div className={styles["c-normal-scale__thermometer-labels"]}>
        <span>0%</span>
        <span>Normal</span>
        <span>100%</span>
      </div>
    </div>
  </div>
);

export default NormalScale;
