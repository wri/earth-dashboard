import { useState, useEffect, useMemo, UIEvent } from "react";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { setHeadlines, setCurrentHeadline, Headline as HeadlineType, setCurrentHeadlineId } from "slices/headlines";
import EventCard from "components/app/home/event-card";
import { Mode, setCurrentMode, pagePush } from "slices/modes";
import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import CtaButton from "components/ui/cta-button";
import { PAGE_TYPE_ID } from "../../main-container/component";
import EventCardSkeleton from "../../event-card/event-card-skeleton";

const HEADLINE_BATCH_SIZE = 6;
const SCOLL_THRESHOLD = 180;

type EventsListPanelProps = {
  currentMode?: Mode;
  headlines: HeadlineType[];
  headlinesLoading: boolean;
  forceInfoPage?: boolean;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  setCurrentHeadline: ActionCreatorWithPayload<HeadlineType | undefined, string>;
  pagePush: ActionCreatorWithPayload<string, string>;
  setCurrentHeadlineId: ActionCreatorWithOptionalPayload<number | undefined, string>;
  pageTypeIdStack: string[];
  defaultMode: Mode | undefined;
};

const EventsListPanel = ({
  currentMode,
  headlines,
  headlinesLoading,
  setCurrentHeadline,
  pagePush,
  setCurrentHeadlineId,
  pageTypeIdStack,
  defaultMode,
  setCurrentMode
}: EventsListPanelProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [numHeadlinesToShow, setNumHeadlinesToShow] = useState(HEADLINE_BATCH_SIZE);

  const mostRecentHeadlines = useMemo(() => {
    return headlines.slice(0, numHeadlinesToShow);
  }, [headlines, numHeadlinesToShow]);

  const onSelectHeadline = (headline: HeadlineType) => {
    setCurrentHeadline(headline);
    pagePush(PAGE_TYPE_ID.CURRENT_EVENT_PAGE);
  };

  useEffect(() => {
    setCurrentHeadline(undefined);
    setCurrentHeadlineId(undefined);
    if (pageTypeIdStack.length === 2 && defaultMode) setCurrentMode(defaultMode);
    // eslint-disable-next-line
  }, []);

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
    <div className={styles["c-home-menu__extreme-events"]}>
      {/* Banner */}
      <div className={styles["c-home-menu__extreme-events__header"]}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      {/* Content */}
      <div className={classnames(styles["c-home-menu__content"])} onScroll={onScroll}>
        {/* Events */}
        <div className={styles["c-home-menu__extreme-events__list"]}>
          {headlinesLoading
            ? ["headline-skeleton-1", "headline-skeleton-2", "headline-skeleton-3"].map(item => (
                <EventCardSkeleton key={item} className={styles["c-home-menu__headline"]} />
              ))
            : mostRecentHeadlines.map(headline => (
                <EventCard
                  key={headline.id}
                  headline={headline}
                  className={styles["c-home-menu__headline"]}
                  onClick={() => onSelectHeadline(headline)}
                />
              ))}
        </div>

        {/* CTA */}
        <div className={styles["c-home-menu__extreme-events__controls"]}>
          {!headlinesLoading && headlines.length > numHeadlinesToShow && (
            <CtaButton
              text="Load More"
              className={styles["c-home-menu__cta"]}
              onClick={() => setNumHeadlinesToShow(numHeadlinesToShow + HEADLINE_BATCH_SIZE)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    currentMode: state.modes.currentMode,
    headlines: state.headlines.headlines,
    pageTypeIdStack: state.modes.pageTypeIdStack,
    defaultMode: state.modes.defaultMode
  }),
  { setHeadlines, setCurrentMode, setCurrentHeadline, pagePush, setCurrentHeadlineId }
)(EventsListPanel);
