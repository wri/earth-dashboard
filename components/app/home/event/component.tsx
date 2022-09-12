import { useState, useEffect, useRef, useMemo, UIEvent } from "react";

import styles from "./event.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import ContentPanel from "components/app/home/content-panel/component";
import SharePanel from "components/app/home/share-panel/component";
import EventCard from "components/app/home/event-card";
import { setHeadlines, NAME as headlineSliceName, Headline as HeadlineType } from "slices/headlines";
import NormalScale from "components/app/home/normal-scale/component";
import moment from "moment";
import Image from "next/image";

type DataLayerOverviewProps = {
  currentMode: Mode;
  headline: HeadlineType;
};

const WHAT_IS_HAPPENING_ICON = "/static/icons/question.svg";
const SHARE_ICON = "/static/icons/together.svg";

const ExtremeEvent = ({ headline, currentMode }: DataLayerOverviewProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const containerHeight = containerRef?.current?.offsetHeight ?? 0;

  useEffect(() => {
    // Just including this triggers re-render when the hero container height changes, which is enough
    // to trigger correct positioning of the lead element
  }, [containerRef]);

  if (!currentMode) return null;

  const {
    attributes: { how_to_help_content }
  } = currentMode;

  const onScroll = (event: UIEvent<HTMLElement>) => {
    setScrollPosition(event.currentTarget.scrollTop);
  };

  return (
    <div className={styles["c-event__container"]}>
      <div className={styles["c-event__hero"]} ref={containerRef} style={{ top: `${-scrollPosition}px` }}>
        <span
          className={styles["c-event__hero--background"]}
          style={{ backgroundImage: `url(${headline.attributes.thumbnail_image})` }}
        />
        <div className={styles["c-event__hero--detail"]}>
          <h3 className={styles["c-event__hero--title"]}>{headline.attributes.title}</h3>
          <p className={styles["c-event__hero--subtitle"]}>
            {moment(headline.attributes.climate_alert_date).format("Do MMMM YYYY")}
          </p>
          <div className={styles["c-event__hero--thumbnail"]}>
            <Image
              src={headline.attributes.thumbnail_image}
              layout={"fill"}
              objectFit={"cover"}
              alt=""
              role="presentation"
            />
          </div>
          <p className={styles["c-event__hero--description"]}>{headline.attributes.content.body}</p>
        </div>
      </div>
      <div
        className={styles["c-event__scroll-area"]}
        style={{ paddingTop: `${containerHeight + 20}px` }}
        onScroll={onScroll}
      >
        <ContentPanel icon={WHAT_IS_HAPPENING_ICON} title="How Extreme Is This Event?">
          <p>{headline.attributes.content.body}</p>
          <NormalScale value={80} />
        </ContentPanel>
        <ContentPanel icon={SHARE_ICON} title="How to help">
          <p>{how_to_help_content.detail}</p>
          <SharePanel ctaAction={() => {}} />
        </ContentPanel>
      </div>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    headlines: state[headlineSliceName].headlines,
    currentMode: state[modesSliceName].currentMode
  }),
  { setHeadlines }
)(ExtremeEvent);
