import { useState, useEffect, useMemo, useRef } from "react";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { fetchClimateAlerts } from "services/gca";
import { setHeadlines, setCurrentHeadline, Headline as HeadlineType } from "slices/headlines";
import { Mode, setCurrentMode } from "slices/modes";
import { fireEvent } from "utils/gtag";
import { CLIMATE_ALERT_EVENT_NAME } from "constants/tag-manager";

import HeadlineCard from "components/app/home/headline-card";
import Headline from "components/app/home/headline";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "store/types";

const MAX_NUMBER_OF_HEADLINES = 10;

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
  const mostRecentHeadlines = useMemo(() => {
    const reversed = [...headlines].reverse();
    return reversed.slice(0, MAX_NUMBER_OF_HEADLINES);
  }, [headlines]);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentHeadline) {
      // Set default template
      setCurrentMode(currentHeadline.attributes.mode);
    }
  }, [currentHeadline, setCurrentMode]);

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

  return currentHeadline ? (
    <div
      className={classnames(
        styles["c-home-menu__tab-panel-scroll-area"],
        styles["c-home-menu__tab-panel-scroll-area--slim"]
      )}
      ref={articleRef}
    >
      <Headline headline={currentHeadline} />
    </div>
  ) : (
    <>
      <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
        The effects of human-induced climate change can be seen and felt across the planet.
        <br />
        Explore the latest alerts from Mongabay below.
      </p>
      <div
        className={classnames(
          styles["c-home-menu__tab-panel-scroll-area"],
          styles["c-home-menu__tab-panel-scroll-area--extra-top"]
        )}
      >
        {!isFetching ? (
          mostRecentHeadlines.map(headline => (
            <HeadlineCard
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
