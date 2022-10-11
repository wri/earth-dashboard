import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import CtaButton from "components/ui/cta-button";
import { PAGE_TYPE_ID } from "../../../../main-container/component";
import styles from "./view-all-card.module.scss";

type ViewAllCardProps = { setPageTypeId: ActionCreatorWithPayload<string, string> };

const ViewAllCard = ({ setPageTypeId }: ViewAllCardProps) => {
  const handleViewAllPress = () => {
    setPageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
  };

  return (
    <button className={styles["c-view-all-card"]} onClick={handleViewAllPress}>
      <div className={styles["content-container"]}>
        <h1 className={styles["title"]}>All Extreme Events</h1>
        <p className={styles["description"]}>View all of Mongabay’s latest extreme events</p>
        <CtaButton text="VIEW ALL" iconName="arrow-right" onClick={handleViewAllPress} />
      </div>
    </button>
  );
};

export default ViewAllCard;
