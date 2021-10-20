import classnames from "classnames";
import styles from "./random-placeholder.module.scss";

const RandomPlaceholder = () => {
  const number = Math.round(Math.random() * 2);
  if (number === 1) {
    return (
      <div className={styles["c-loading-placeholder"]}>
        In parts of the Amazon,{" "}
        <span
          className={classnames({
            [topic]: true,
            [styles["highlighted-text"]]: true
          })}
        >
          dry spells are expected to double
        </span>{" "}
        in 2080 compared to 2006, leading to a potential increase in fires and decrease in species habitats and carbon
        storage.
      </div>
    );
  } else if (number === 2) {
    return (
      <div className={styles["c-loading-placeholder"]}>
        In Amazon,{" "}
        <span
          className={classnames({
            [topic]: true,
            [styles["highlighted-text"]]: true
          })}
        >
          dry spells are expectaaed to double in 2080
        </span>{" "}
        in 2080 compared to 2006.
      </div>
    );
  }
};

export default RandomPlaceholder;
