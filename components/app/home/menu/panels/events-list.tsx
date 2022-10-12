import { useState, useEffect, useMemo, useRef, UIEvent } from "react";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import {
  setHeadlines,
  setCurrentHeadline,
  Headline as HeadlineType,
  Headline,
  setCurrentHeadlineId
} from "slices/headlines";
import EventCard from "components/app/home/event-card";
import { Mode, setCurrentMode, setPageTypeId, setPreviousPageTypeId } from "slices/modes";
import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import CtaButton from "components/ui/cta-button";
import { PAGE_TYPE_ID } from "../../main-container/component";

const HEADLINE_BATCH_SIZE = 6;
const SCOLL_THRESHOLD = 180;

type EventsListPanelProps = {
  currentMode?: Mode;
  headlines: HeadlineType[];
  forceInfoPage: boolean;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  setCurrentHeadline: ActionCreatorWithPayload<HeadlineType | undefined, string>;
  setPageTypeId: ActionCreatorWithPayload<string, string>;
  setPreviousPageTypeId: ActionCreatorWithPayload<string, string>;
  setCurrentHeadlineId: ActionCreatorWithOptionalPayload<number | undefined, string>;
};

const EventsListPanel = ({
  currentMode,
  headlines,
  setCurrentHeadline,
  setPageTypeId,
  setPreviousPageTypeId,
  setCurrentHeadlineId
}: EventsListPanelProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bannerHeight, setBannerHeight] = useState<number>(150);
  const [numHeadlinesToShow, setNumHeadlinesToShow] = useState(HEADLINE_BATCH_SIZE);

  const mostRecentHeadlines = useMemo(() => {
    return headlines.slice(0, numHeadlinesToShow);
  }, [headlines, numHeadlinesToShow]);

  const bannerRef = useRef<HTMLDivElement>(null);

  const onSelectHeadline = (headline: HeadlineType) => {
    setCurrentHeadline(headline);
    setPageTypeId(PAGE_TYPE_ID.CURRENT_EVENT_PAGE);
    setPreviousPageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
  };

  useEffect(() => {
    setCurrentHeadline(undefined);
    setCurrentHeadlineId(undefined);
    setPreviousPageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
  }, []);

  useEffect(() => {
    if (bannerRef.current) setBannerHeight(bannerRef.current.offsetHeight);
  }, [bannerRef.current]);

  const onScroll = (event: UIEvent<HTMLElement>) => {
    if (event.currentTarget.scrollTop > SCOLL_THRESHOLD && scrollPosition > SCOLL_THRESHOLD) {
      return;
    }
    setScrollPosition(event.currentTarget.scrollTop);
  };

  const title =
    currentMode && currentMode.attributes.title !== "Default" ? currentMode.attributes.title : "All Extreme Events";

  const description =
    "Stay up to date with Mongabay’s latest extreme events and the places being affected. Learn more about the planetary emergency with real-time data.";

  return (
    <>
      <div
        ref={bannerRef}
        className={styles["c-home-menu__extreme-events--header"]}
        style={{ top: `${-scrollPosition}px` }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div
        className={classnames(styles["c-home-menu__scroll-area"], styles["c-home-menu__extreme-events--scroll"])}
        onScroll={onScroll}
      >
        <div className={styles["c-home-menu__extreme-events"]} style={{ marginTop: bannerHeight }}>
          {mostRecentHeadlines.map(headline => (
            <EventCard
              key={headline.id}
              headline={headline}
              className={styles["c-home-menu__headline"]}
              onClick={() => onSelectHeadline(headline)}
            />
          ))}
        </div>
        <div className={styles["c-home-menu__extreme-events--controls"]}>
          {headlines.length > numHeadlinesToShow && (
            <CtaButton
              text="Load More"
              className={styles["c-home-menu__cta"]}
              onClick={() => setNumHeadlinesToShow(numHeadlinesToShow + HEADLINE_BATCH_SIZE)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default connect(
  (state: RootState) => ({
    currentMode: state.modes.currentMode,
    headlines: state.headlines.headlines
  }),
  { setHeadlines, setCurrentMode, setCurrentHeadline, setPageTypeId, setPreviousPageTypeId, setCurrentHeadlineId }
)(EventsListPanel);
