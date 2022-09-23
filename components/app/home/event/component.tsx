import { useState, useRef, UIEvent, useEffect } from "react";
import styles from "./event.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import ContentPanel from "components/app/home/content-panel/component";
import SharePanel from "components/app/home/share-panel/component";
import { Headline as HeadlineType } from "slices/headlines";
import NormalScale from "components/app/home/normal-scale/component";
import moment from "moment";
import Image from "next/image";
import CtaButton from "components/ui/cta-button";
import { setIsShareOpen } from "slices/common";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { fireEvent } from "utils/gtag";
import { EARTH_HQ_VIEWED_EXTREME_EVENT } from "constants/tag-manager";

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
  const articleRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    fireEvent(EARTH_HQ_VIEWED_EXTREME_EVENT, null, {
      extreme_event_title: headline.attributes.title,
      category_name: currentMode?.attributes.title ?? ""
    });
  }, [headline]);

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

  // Scroll to top of article when headline changes
  useEffect(() => {
    if (articleRef.current) {
      articleRef.current.scrollTo({ top: 0 });
    }
  }, [headline]);

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
      <div className={styles["c-event__scroll-area"]} onScroll={onScroll} ref={articleRef}>
        <ContentPanel
          icon={WHAT_IS_HAPPENING_ICON}
          title="How Extreme Is This Event?"
          style={{ marginTop: `${containerHeight + 24}px` }}
        >
          <p>{headline.attributes.mode.attributes.description}</p>
          <NormalScale value={80} />
        </ContentPanel>
        {headline.attributes.sections.map(section => (
          <ContentPanel
            icon={section.attributes.icon_image_url}
            title={section.attributes.title}
            key={section.attributes.title}
          >
            <p>{section.attributes.detail}</p>
            {section.attributes.main_image_url && (
              <div
                className={styles["section-image"]}
                style={{ backgroundImage: `url(${section.attributes.main_image_url})` }}
              />
            )}
          </ContentPanel>
        ))}
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
