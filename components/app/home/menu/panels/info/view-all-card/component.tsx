import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import classnames from "classnames";
import CtaButton from "components/ui/cta-button";
import { PAGE_TYPE_ID } from "../../../../main-container/component";
import styles from "./view-all-card.module.scss";

type ViewAllCardProps = { setPageTypeId: ActionCreatorWithPayload<string, string> };

const ViewAllCard = ({ setPageTypeId }: ViewAllCardProps) => {
  const handleViewAllPress = () => {
    setPageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
  };

  return (
    <button className={classnames(styles["c-view-all-card"])} onClick={handleViewAllPress}>
      <h1 className={classnames(styles["title"])}>All Extreme Events</h1>
      <p className={classnames(styles["description"])}>View all of Mongabay’s latest extreme events</p>
      <CtaButton text="VIEW ALL" iconName="arrow-right" onClick={handleViewAllPress} />
    </button>
  );
};

export default ViewAllCard;
