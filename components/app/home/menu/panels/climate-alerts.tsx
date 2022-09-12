import { useState, useEffect, useMemo, useRef, UIEvent } from "react";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { fetchClimateAlerts } from "services/gca";
import { setHeadlines, setCurrentHeadline, Headline as HeadlineType } from "slices/headlines";
import EventCard from "components/app/home/event-card";
import { Mode, setCurrentMode } from "slices/modes";
import { fireEvent } from "utils/gtag";
import { CLIMATE_ALERT_EVENT_NAME } from "constants/tag-manager";

import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import CtaButton from "components/ui/cta-button";

const MAX_NUMBER_OF_HEADLINES = 10;
const SCOLL_THRESHOLD = 180;

type HeadlinesPanerProps = {
  headlines: HeadlineType[];
  setHeadlines: ActionCreatorWithPayload<HeadlineType[], string>;
  forceInfoPage: boolean;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  setCurrentHeadline: ActionCreatorWithPayload<HeadlineType, string>;
  currentHeadline?: HeadlineType;
};

const HeadlinesPanel = ({
  headlines,
  setHeadlines,
  setCurrentMode,
  setCurrentHeadline,
  currentHeadline
}: HeadlinesPanerProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [numHeadlinesToShow, setNumHeadlinesToShow] = useState(MAX_NUMBER_OF_HEADLINES);

  const mostRecentHeadlines = useMemo(() => {
    const reversed = [...headlines].reverse();
    return reversed.slice(0, numHeadlinesToShow);
  }, [headlines, numHeadlinesToShow]);
  const articleRef = useRef<HTMLDivElement>(null);

  // Fetch Headlines from the GCA CMS
  useEffect(() => {
    setIsFetching(true);
    const getHeadlines = async () => {
      try {
        const resp = await fetchClimateAlerts();
        // @ts-expect-error
        setHeadlines(resp.data.data);
      } catch (err) {
        console.log("Error fetching modes");
      } finally {
        setIsFetching(false);
      }
    };

    getHeadlines();
  }, [setHeadlines]);

  const onSelectHeadline = (headline: HeadlineType) => {
    setCurrentHeadline(headline);

    fireEvent(CLIMATE_ALERT_EVENT_NAME, headline.attributes?.title);
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

  return (
    <>
      <div className={styles["c-home-menu__extreme-events--header"]} style={{ top: `${-scrollPosition}px` }}>
        <h3>All Extreme Events</h3>
        <p>View all of the latest Extreme Events</p>
      </div>
      <div
        className={classnames(styles["c-home-menu__scroll-area"], styles["c-home-menu__extreme-events--scroll"])}
        ref={articleRef}
        onScroll={onScroll}
      >
        <div className={styles["c-home-menu__extreme-events"]}>
          {!isFetching ? (
            mostRecentHeadlines.map(headline => (
              <EventCard
                key={headline.id}
                as="button"
                headline={headline}
                className={styles["c-home-menu__headline"]}
                onClick={() => onSelectHeadline(headline)}
              />
            ))
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className={styles["c-home-menu__extreme-events--controls"]}>
          {headlines.length > numHeadlinesToShow && (
            <CtaButton
              text="View More"
              iconName="arrow-right"
              iconSize={15}
              onClick={() => setNumHeadlinesToShow(numHeadlinesToShow + 10)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default connect(
  (state: RootState) => ({
    headlines: state.headlines.headlines,
    currentHeadline: state.headlines.currentHeadline
  }),
  { setHeadlines, setCurrentMode, setCurrentHeadline }
)(HeadlinesPanel);
