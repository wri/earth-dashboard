import { useState, useEffect, useMemo } from "react";
import styles from "../menu.module.scss";
import dataLayerStyles from "./data-layer.module.scss";
import panelStyles from "components/app/home/content-panel/panel.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import ContentPanel from "components/app/home/content-panel/component";
import SharePanel from "components/app/home/share-panel/component";
import EventCard from "components/app/home/event-card";
import {
  setHeadlines,
  NAME as headlineSliceName,
  Headline as HeadlineType,
  setCurrentHeadline,
  Headline
} from "slices/headlines";
import { fetchClimateAlerts } from "services/gca";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Link from "next/link";
import { setIsShareOpen } from "slices/common";
import { fireEvent } from "utils/gtag";
import { EARTH_HQ_EXPLORED_NEWS, EARTH_HQ_SHARED_CATEGORY } from "constants/tag-manager";

type DataIndexProps = {
  currentMode: Mode | undefined;
  headlines: HeadlineType[];
  setHeadlines: ActionCreatorWithPayload<HeadlineType[], string>;
  setCurrentHeadline: ActionCreatorWithPayload<HeadlineType | undefined, string>;
  setIsShareOpen: ActionCreatorWithPayload<boolean, string>;
  onClickExtremeEvents: () => {};
};

const MAX_NUMBER_OF_HEADLINES = 3;

const EXTREME_EVENTS_ICON = "/static/icons/extreme-events.svg";
const NEWS_ICON = "/static/icons/mode-news.svg";

const DataLayerOverview = ({
  currentMode,
  headlines,
  setHeadlines,
  setCurrentHeadline,
  setIsShareOpen,
  onClickExtremeEvents
}: DataIndexProps) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!currentMode) return;
    setIsFetching(true);
    const getHeadlines = async () => {
      try {
        const resp = await fetchClimateAlerts();

        const filteredHeadlines =
          // @ts-expect-error
          resp.data.data
            .reverse()
            .slice(0, 25)
            .filter((headline: Headline) => headline.attributes.mode.id === currentMode.id);

        setHeadlines(filteredHeadlines);
      } catch (err) {
        console.log("Error fetching headlines", err);
      } finally {
        setIsFetching(false);
      }
    };

    getHeadlines();
  }, [setHeadlines, currentMode]);

  const mostRecentHeadlines = useMemo(() => {
    return headlines.slice(0, MAX_NUMBER_OF_HEADLINES);
  }, [headlines]);

  if (currentMode == null) return null;

  const {
    attributes: { icon, title, description }
  } = currentMode;

  return (
    <div className={styles["c-home-menu__scroll-area"]}>
      <ContentPanel icon={icon} title={title}>
        <p className={dataLayerStyles["c-data-layer-menu-panel__card-desc"]}>{description}</p>
      </ContentPanel>
      <ContentPanel
        icon={EXTREME_EVENTS_ICON}
        title="Extreme events"
        buttonText="View All"
        ctaAction={
          currentMode.attributes.extreme_event_count <= MAX_NUMBER_OF_HEADLINES ? undefined : onClickExtremeEvents
        }
      >
        <p className={dataLayerStyles["c-data-layer-menu-panel__card-desc"]}>
          View the latest {currentMode.attributes.title.toLowerCase()} extreme events.
        </p>
        <div className={styles["c-home-menu__events-list"]}>
          {!isFetching ? (
            mostRecentHeadlines.map(headline => (
              <EventCard key={headline.id} headline={headline} onClick={() => setCurrentHeadline(headline)} />
            ))
          ) : (
            <p>Loading</p>
          )}
        </div>
      </ContentPanel>
      {currentMode.attributes.sections.map(section => (
        <ContentPanel
          icon={section.attributes.icon_image_url}
          title={section.attributes.title}
          key={section.attributes.title}
        >
          <p className={styles["section-text"]}>{section.attributes.detail}</p>
          {section.attributes.main_image_url && (
            <div
              className={styles["section-image"]}
              style={{ backgroundImage: `url(${section.attributes.main_image_url})` }}
            />
          )}
        </ContentPanel>
      ))}
      <SharePanel
        ctaAction={() => {
          fireEvent(EARTH_HQ_SHARED_CATEGORY, title);
          setIsShareOpen(true);
        }}
      />
      <ContentPanel
        className={panelStyles["c-content-panel__underlay--can-focus"]}
        icon={NEWS_ICON}
        title="News"
        buttonText="Explore"
        ctaControl={Link}
        ctaLink={"/news"}
        ctaAction={() => fireEvent(EARTH_HQ_EXPLORED_NEWS, title)}
      >
        <p className={dataLayerStyles["c-data-layer-menu-panel__card-desc"]}>
          Our partners tell the epic story of what is happening to our planet
        </p>
      </ContentPanel>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    headlines: state[headlineSliceName].headlines,
    currentMode: state[modesSliceName].currentMode
  }),
  { setHeadlines, setCurrentHeadline, setIsShareOpen }
)(DataLayerOverview);
