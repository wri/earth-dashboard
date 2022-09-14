import { useState, useRef, useMemo, UIEvent, useEffect } from "react";

import styles from "./event.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import ContentPanel from "components/app/home/content-panel/component";
import SharePanel from "components/app/home/share-panel/component";
import { setHeadlines, NAME as headlineSliceName, Headline as HeadlineType } from "slices/headlines";
import NormalScale from "components/app/home/normal-scale/component";
import moment from "moment";
import Image from "next/image";
import CtaButton from "components/ui/cta-button";
import { setIsShareOpen } from "slices/common";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type DataLayerOverviewProps = {
  currentMode?: Mode;
  headline: HeadlineType;
  setCurrentLocation: ActionCreatorWithPayload<number[], string>;
  setCurrentScale: ActionCreatorWithPayload<number, string>;
  setCurrentScaleBy: ActionCreatorWithPayload<number, string>;
  setDateOfDataShown: ActionCreatorWithPayload<string, string>;
  setIsShareOpen: ActionCreatorWithPayload<boolean, string>;
  onViewAllEventsClicked: () => any;
};

const WHAT_IS_HAPPENING_ICON = "/static/icons/question.svg";
const SHARE_ICON = "/static/icons/together.svg";

const ExtremeEvent = ({
  headline,
  currentMode,
  setCurrentLocation,
  setCurrentScale,
  setCurrentScaleBy,
  setDateOfDataShown,
  setIsShareOpen,
  onViewAllEventsClicked
}: DataLayerOverviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(containerRef?.current?.offsetHeight ?? 0);
  }, [containerRef?.current?.clientHeight, headline?.id]);

  useEffect(() => {
    if (headline?.attributes.location) {
      setCurrentLocation([headline?.attributes.location.lat, headline?.attributes.location.lng]);
      setCurrentScale(headline.attributes.zoom_level);
      setCurrentScaleBy(1);
    }

    if (headline?.attributes.climate_alert_date) {
      setDateOfDataShown(new Date(headline?.attributes.climate_alert_date).toString());
    }
  }, [headline, setCurrentLocation, setCurrentScale, setCurrentScaleBy, setDateOfDataShown]);

  const how_to_help_content = currentMode?.attributes?.how_to_help_content;

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
          <p>{how_to_help_content?.detail}</p>
          <SharePanel ctaAction={() => setIsShareOpen(true)} />
        </ContentPanel>
        <div className={styles["c-event__view-all-button--container"]}>
          <CtaButton text={"View All Extreme Events"} onClick={onViewAllEventsClicked} iconName="arrow-right" />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    currentMode: state[modesSliceName].currentMode
  }),
  { setIsShareOpen }
)(ExtremeEvent);
