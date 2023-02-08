import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Icon from "components/ui/Icon";
import styles from "./tipping-point.module.scss";

type TippingPointProps = {
  setTippingPointOpen: ActionCreatorWithPayload<any, string>;
};

/** A banner to open the tipping point video. */
const TippingPoint = ({ setTippingPointOpen }: TippingPointProps) => {
  const handleOpen = () => {
    setTippingPointOpen(true);
  };

  return (
    <>
      <button className={styles["c-tipping-point"]} onClick={handleOpen}>
        {/* Pill */}
        <div className={styles["c-tipping-point__pill"]}>
          <div className={styles["c-tipping-point__pill__icon"]}>
            <Icon name="play" type="decorative" />
          </div>
          <p className={styles["c-tipping-point__pill__text"]}>Video</p>
        </div>

        {/* Banner text*/}
        <p className={styles["c-tipping-point__text"]}>Earth Commission’s New Science On Dangerous Tipping Points</p>
      </button>
    </>
  );
};

export default TippingPoint;
