import { useRef, useEffect } from "react";
import styles from "./event.module.scss";
import { Mode } from "slices/modes";
import ContentPanel from "components/app/home/content-panel/component";
import SharePanel from "components/app/home/share-panel/component";
import { Headline as HeadlineType } from "slices/headlines";
import NormalScale from "components/app/home/normal-scale";
import moment from "moment";
import Image from "next/image";
import CtaButton from "components/ui/cta-button";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { fireEvent } from "utils/gtag";
import { EARTH_HQ_VIEWED_EXTREME_EVENT } from "constants/tag-manager";
import { EventScaleData } from "slices/mapControls";
import WidgetPreview from "components/widgets/preview";

type ExtremeEventProps = {
  currentMode?: Mode;
  headline: HeadlineType;
  setIsShareOpen: ActionCreatorWithPayload<boolean, string>;
  eventScaleData: EventScaleData | undefined;
  onViewAllEventsClicked: () => any;
};

const WHAT_IS_HAPPENING_ICON = "/static/icons/question.svg";

const ExtremeEvent = ({
  headline,
  currentMode,
  setIsShareOpen,
  eventScaleData,
  onViewAllEventsClicked
}: ExtremeEventProps) => {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headline) return;
    fireEvent(EARTH_HQ_VIEWED_EXTREME_EVENT, null, {
      extreme_event_title: headline.attributes.title,
      category_name: currentMode?.attributes.title ?? ""
    });
    // eslint-disable-next-line
  }, [headline]);

  // Scroll to top of article when headline changes
  useEffect(() => {
    if (articleRef.current) {
      articleRef.current.scrollTo({ top: 0 });
    }
  }, [headline]);

  if (!headline) return null;

  return (
    <div id={`headline-${headline.id}`} className={styles["c-event__container"]}>
      {/* Hero */}
      <div className={styles["c-event__hero"]}>
        {/* Image */}
        <div
          className={styles["c-event__hero--background"]}
          style={{ backgroundImage: `url(${headline.attributes.thumbnail_image})` }}
        />

        {/* Details */}
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

      {/* Content */}
      <div className={styles["c-event__content"]} ref={articleRef}>
        {/* Scale */}
        <ContentPanel icon={WHAT_IS_HAPPENING_ICON} title="How Extreme Is This Event?">
          <p>{headline.attributes.mode.attributes.description}</p>
          <NormalScale
            value={eventScaleData?.value}
            minLabel={eventScaleData?.minLabel}
            maxLabel={eventScaleData?.maxLabel}
            thermometerStyle={{ background: eventScaleData?.gradient ?? "" }}
            headlineMode={headline.attributes.mode}
          />
        </ContentPanel>

        {/* Widget */}
        {headline.attributes.content.media.widget && (
          <div className={styles["c-event__widget"]}>
            <WidgetPreview
              // @ts-ignore attributes not present in type
              widget={{ id: headline.attributes.content.media.widget.attributes.widget_id }}
              widgetShouldBeLoaded
            />
          </div>
        )}

        {/* Sections */}
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

        {/* Share */}
        <SharePanel ctaAction={() => setIsShareOpen(true)} />

        {/* View all */}
        <div className={styles["c-event__view-all-button--container"]}>
          <CtaButton text={"View All Extreme Events"} onClick={onViewAllEventsClicked} iconName="arrow-right" />
        </div>
      </div>
    </div>
  );
};

export default ExtremeEvent;
