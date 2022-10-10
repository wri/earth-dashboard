import styles from "./slider-locator.module.scss";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";

type SlideLocatorProps = {
  setCounter: Dispatch<SetStateAction<number>>;
  progress: number;
};

/** Shows the correct page. */
const SlideLocator = ({ setCounter, progress }: SlideLocatorProps) => {
  /** Gets a smooth slider animation using transformed consine. */
  const __getStyle = (point: number): HTMLAttributes<HTMLDivElement>["style"] => {
    const width = Math.min(Math.max(16 * Math.cos(4 * Math.PI * progress) + 16, 10), 32);

    if (
      (point === 0 && progress < 1 / 4) ||
      (point === 1 && progress >= 1 / 4 && progress < 3 / 4) ||
      (point === 2 && progress >= 3 / 4)
    ) {
      return {
        width,
        backgroundColor: "#D63C00"
      };
    }

    return {
      width: 10,
      backgroundColor: "white",
      opacity: 0.8
    };
  };

  return (
    <div className={styles["c-slider-locator"]}>
      <div className={styles["c-slider-locator__divider"]}>
        {[0, 1, 2].map(point => (
          <div
            key={point}
            className={styles["c-slider-locator__divider__dot"]}
            style={__getStyle(point)}
            onClick={() => setCounter(point)}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideLocator;
