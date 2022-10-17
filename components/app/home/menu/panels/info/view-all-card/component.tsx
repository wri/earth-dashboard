import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import CtaButton from "components/ui/cta-button";
import { VIEW_ALL_EXTREME_EVENTS } from "constants/tag-manager";
import { fireEvent } from "utils/gtag";
import { PAGE_TYPE_ID } from "../../../../main-container/component";
import styles from "./view-all-card.module.scss";

type ViewAllCardProps = {
  pagePush: ActionCreatorWithPayload<string, string>;
  setRoutePageTypeId: ActionCreatorWithPayload<string, string>;
};

const ViewAllCard = ({ pagePush, setRoutePageTypeId }: ViewAllCardProps) => {
  const handleViewAllCardPress = () => {
    setRoutePageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
    pagePush(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
    fireEvent(VIEW_ALL_EXTREME_EVENTS, "web_earth_hq_carousel");
  };

  return (
    <button className={styles["c-view-all-card"]} onClick={handleViewAllCardPress}>
      <div className={styles["content-container"]}>
        <h1 className={styles["title"]}>All Extreme Events</h1>
        <p className={styles["description"]}>View all of Mongabay’s latest extreme events</p>
        <CtaButton text="VIEW ALL" iconName="arrow-right" onClick={() => {}} />
      </div>
    </button>
  );
};

export default ViewAllCard;
