import styles from "./slider-locator.module.scss";
import classnames from "classnames";
import { Dispatch, SetStateAction } from "react";

type SlideLocatorProps = {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
  isMobile: boolean;
};

/** Shows the correct page. */
const SlideLocator = ({ counter, setCounter, isMobile }: SlideLocatorProps) => {
  return (
    <div className={styles["c-slider-locator"]}>
      <div
        className={classnames({
          [styles["c-slider-locator__divider"]]: true,
          [styles["c-slider-locator__divider--mobile"]]: isMobile
        })}
      >
        {[0, 1, 2].map(point => (
          <div
            key={point}
            className={classnames({
              [styles["c-slider-locator__divider--unselected"]]: counter !== point,
              [styles["c-slider-locator__divider--selected"]]: counter === point
            })}
            onClick={() => setCounter(point)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SlideLocator;
