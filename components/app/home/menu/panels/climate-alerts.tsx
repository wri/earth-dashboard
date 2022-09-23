import { useState, useEffect, useMemo, useRef, UIEvent } from "react";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { setHeadlines, setCurrentHeadline, Headline as HeadlineType } from "slices/headlines";
import EventCard from "components/app/home/event-card";
import { Mode, setCurrentMode } from "slices/modes";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import CtaButton from "components/ui/cta-button";

const HEADLINE_BATCH_SIZE = 6;
const SCOLL_THRESHOLD = 180;

type HeadlinesPanerProps = {
  currentMode?: Mode;
  headlines: HeadlineType[];
  forceInfoPage: boolean;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  setCurrentHeadline: ActionCreatorWithPayload<HeadlineType | undefined, string>;
  currentHeadline?: HeadlineType;
};

const HeadlinesPanel = ({ currentMode, headlines, setCurrentHeadline, currentHeadline }: HeadlinesPanerProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [numHeadlinesToShow, setNumHeadlinesToShow] = useState(HEADLINE_BATCH_SIZE);

  const mostRecentHeadlines = useMemo(() => {
    return headlines.slice(0, numHeadlinesToShow);
  }, [headlines, numHeadlinesToShow]);

  const articleRef = useRef<HTMLDivElement>(null);

  const onSelectHeadline = (headline: HeadlineType) => {
    setCurrentHeadline(headline);
  };

  // Scroll to top of article when headline changes
  useEffect(() => {
    if (articleRef.current) {
      articleRef.current.scrollTo({ top: 0 });
    }
  }, [currentHeadline]);

  const onScroll = (event: UIEvent<HTMLElement>) => {
    if (event.currentTarget.scrollTop > SCOLL_THRESHOLD && scrollPosition > SCOLL_THRESHOLD) {
      return;
    }
    setScrollPosition(event.currentTarget.scrollTop);
  };

  const title =
    currentMode && currentMode.attributes.title !== "Default" ? currentMode.attributes.title : "All Extreme Events";

  const description =
    currentMode && currentMode.attributes.title !== "Default"
      ? "View the latest Extreme Events"
      : "View all of the latest Extreme Events";

  return (
    <>
      <div className={styles["c-home-menu__extreme-events--header"]} style={{ top: `${-scrollPosition}px` }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div
        className={classnames(styles["c-home-menu__scroll-area"], styles["c-home-menu__extreme-events--scroll"])}
        ref={articleRef}
        onScroll={onScroll}
      >
        <div className={styles["c-home-menu__extreme-events"]}>
          {mostRecentHeadlines.map(headline => (
            <EventCard
              key={headline.id}
              as="button"
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
    headlines: state.headlines.headlines,
    currentHeadline: state.headlines.currentHeadline
  }),
  { setHeadlines, setCurrentMode, setCurrentHeadline }
)(HeadlinesPanel);
