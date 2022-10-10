import styles from "../onboarding-modal.module.scss";
import classnames from "classnames";
import { Dispatch, SetStateAction } from "react";

type SlideLocatorProps = {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
  isMobile: boolean;
};

/** Shows the correct page. */
const SlideLocator = ({ counter, setCounter, isMobile }: SlideLocatorProps) => (
  <div className={styles["modal__content__controls__box"]}>
    <div
      className={classnames({
        [styles["modal__content__controls__box__divider"]]: true,
        [styles["modal__content__controls__box__divider__mobile"]]: isMobile
      })}
    >
      {[0, 1, 2].map(point => (
        <div
          key={point}
          className={classnames({
            [styles["modal__content__controls__box__divider--unselected"]]: counter !== point,
            [styles["modal__content__controls__box__divider--selected"]]: counter === point
          })}
          onClick={() => setCounter(point)}
        ></div>
      ))}
    </div>
  </div>
);

export default SlideLocator;
