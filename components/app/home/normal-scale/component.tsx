import styles from "./panel.module.scss";
import Icon from "components/ui/Icon";

export type NormalScaleProps = {
  value: number;
};

const NormalScale = ({ value }: NormalScaleProps) => {
  // TODO: GCAG-210
  // Awaiting input from client, so hide this control for now
  return null;

  return (
    <div className={styles["c-normal-scale"]} data-testid="normal-scale">
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
};

export default NormalScale;
