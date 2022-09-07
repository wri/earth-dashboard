import { useState, useEffect, useMemo } from "react";

import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import ContentPanel from "components/app/home/content-panel/component";
import SharePanel from "components/app/home/share-panel/component";
import EventCard from "components/app/home/event-card";
import { setHeadlines, NAME as headlineSliceName, Headline as HeadlineType } from "slices/headlines";
import { fetchClimateAlerts } from "services/gca";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Link from "next/link";
import NormalScale from "../../normal-scale/component";

type DataIndexProps = {
  currentMode: Mode | undefined;
  headlines: HeadlineType[];
  setHeadlines: ActionCreatorWithPayload<HeadlineType[], string>;
};

const MAX_NUMBER_OF_HEADLINES = 3;

const WHAT_WILL_HAPPEN_ICON = "/static/icons/clock.svg";
const EXTREME_EVENTS_ICON = "/static/icons/extreme-events.svg";
const NEWS_ICON = "/static/icons/mode-news.svg";
const WHAT_IS_HAPPENING_ICON = "/static/icons/question.svg";
const SHARE_ICON = "/static/icons/together.svg";

const DataLayerOverview = ({ currentMode, headlines, setHeadlines }: DataIndexProps) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!currentMode) return;
    setIsFetching(true);
    const getHeadlines = async () => {
      try {
        const resp = await fetchClimateAlerts({ mode_id: currentMode.id });
        // @ts-expect-error
        setHeadlines(resp.data.data);
      } catch (err) {
        console.log("Error fetching headlines", err);
      } finally {
        setIsFetching(false);
      }
    };

    getHeadlines();
  }, [setHeadlines, currentMode]);

  const mostRecentHeadlines = useMemo(() => {
    const reversed = [...headlines].reverse();
    return reversed.slice(0, MAX_NUMBER_OF_HEADLINES);
  }, [headlines]);

  if (currentMode == null) return null;

  const {
    attributes: { icon, title, description, what_is_happening_content, what_will_happen_content, how_to_help_content }
  } = currentMode;

  return (
    <div className={styles["c-home-menu__scroll-area"]}>
      <ContentPanel icon={icon} title={title}>
        <p>{description}</p>
      </ContentPanel>
      <ContentPanel icon={WHAT_IS_HAPPENING_ICON} title="What is happening">
        <p>{what_is_happening_content.detail}</p>
        <NormalScale value={80} />
      </ContentPanel>
      <ContentPanel icon={EXTREME_EVENTS_ICON} title="Extreme events" buttonText="View All" ctaAction={() => {}}>
        {!isFetching ? (
          mostRecentHeadlines.map(headline => (
            <EventCard
              key={headline.id}
              as="button"
              headline={headline}
              className={styles["c-home-menu__headline"]}
              onClick={() => {}}
            />
          ))
        ) : (
          <p>Loading</p>
        )}
      </ContentPanel>
      <ContentPanel icon={WHAT_WILL_HAPPEN_ICON} title="What will happen if we don't take action?">
        <p>{what_will_happen_content.detail}</p>
      </ContentPanel>
      <ContentPanel icon={SHARE_ICON} title="How to help">
        <p>{how_to_help_content.detail}</p>
        <SharePanel ctaAction={() => {}} />
      </ContentPanel>
      <ContentPanel icon={NEWS_ICON} title="News" buttonText="Explore" ctaControl={Link} ctaLink={"/news"}>
        <p>Our partners tell the epic story of what is happening to our planet</p>
      </ContentPanel>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    headlines: state[headlineSliceName].headlines,
    currentMode: state[modesSliceName].currentMode
  }),
  { setHeadlines }
)(DataLayerOverview);
