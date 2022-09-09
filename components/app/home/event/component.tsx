import { useState, useEffect, useMemo } from "react";

import styles from "./event.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import ContentPanel from "components/app/home/content-panel/component";
import SharePanel from "components/app/home/share-panel/component";
import EventCard from "components/app/home/event-card";
import { setHeadlines, NAME as headlineSliceName, Headline as HeadlineType } from "slices/headlines";
import NormalScale from "components/app/home/normal-scale/component";

type DataLayerOverviewProps = {
  currentMode: Mode;
  headline: HeadlineType;
};

const WHAT_IS_HAPPENING_ICON = "/static/icons/question.svg";
const SHARE_ICON = "/static/icons/together.svg";

const DataLayerOverview = ({ headline, currentMode }: DataLayerOverviewProps) => {
  const [isFetching, setIsFetching] = useState(true);

  const {
    attributes: { how_to_help_content }
  } = currentMode;

  return (
    <div className={styles["c-event__scroll-area"]}>
      <EventCard key={headline.id} as="button" headline={headline} className={styles["c-home-menu__headline"]} />
      <ContentPanel icon={WHAT_IS_HAPPENING_ICON} title="How Extreme Is This Event?">
        <p>{headline.attributes.content.body}</p>
        <NormalScale value={80} />
      </ContentPanel>
      <ContentPanel icon={SHARE_ICON} title="How to help">
        <p>{how_to_help_content.detail}</p>
        <SharePanel ctaAction={() => {}} />
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
