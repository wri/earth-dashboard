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

const HEADLINE_BATCH_SIZE = 6;
const MAX_NUMBER_OF_HEADLINES_PER_LAYER = 10;
const SCOLL_THRESHOLD = 180;

type HeadlinesPanerProps = {
  currentMode?: Mode;
  headlines: HeadlineType[];
  setHeadlines: ActionCreatorWithPayload<HeadlineType[], string>;
  forceInfoPage: boolean;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  setCurrentHeadline: ActionCreatorWithPayload<HeadlineType, string>;
  currentHeadline?: HeadlineType;
};

const HeadlinesPanel = ({
  currentMode,
  headlines,
  setHeadlines,
  setCurrentHeadline,
  currentHeadline
}: HeadlinesPanerProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [numHeadlinesToShow, setNumHeadlinesToShow] = useState(HEADLINE_BATCH_SIZE);

  // Filter the headlines so there are no more than 10 of each type
  const filteredHeadlines = useMemo(() => {
    const reversed = [...headlines].reverse();
    const grouped = reversed.reduce((groups, headline) => {
      const modeId = `${headline.attributes.mode.id}`;
      // @ts-expect-error
      groups[modeId] = groups[modeId] ? [headline, ...groups[modeId]] : [headline];
      return groups;
    }, {});
    // @ts-expect-error
    const flattened = Object.keys(grouped).reduce((flatArray, key) => [...flatArray, ...grouped[key].slice(0, 10)], []);
    // @ts-expect-error
    flattened.sort((a, b) => a.attributes.date > b.attributes.date);
    return flattened;
  }, [headlines]);

  const mostRecentHeadlines = useMemo(() => {
    return filteredHeadlines.slice(0, numHeadlinesToShow);
  }, [filteredHeadlines, numHeadlinesToShow]);
  const articleRef = useRef<HTMLDivElement>(null);

  // Fetch Headlines from the GCA CMS
  useEffect(() => {
    setIsFetching(true);
    const getHeadlines = async () => {
      try {
        const resp = await fetchClimateAlerts({ mode_id: currentMode?.id });
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
