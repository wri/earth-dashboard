/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import styles from "./event-card.module.scss";
import Image from "next/image";
import { Headline } from "slices/headlines";
import CtaButton from "components/ui/cta-button";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Mode } from "slices/modes";
import { PAGE_TYPE_ID } from "../main-container/component";
import { formatDatePretty } from "utils/dates";

type EventCardProps = {
  headline: Headline;
  onClick: () => void;
  isMobile: boolean;
  pagePush: ActionCreatorWithPayload<string, string>;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  type?: "Default" | "Condensed";
  className?: string;
  gradient?: boolean;
};

const EventCard = ({
  headline,
  onClick,
  isMobile,
  pagePush,
  setCurrentMode,
  type = "Default",
  className = "",
  gradient
}: EventCardProps) => {
  const titleAbove = type === "Default" && !isMobile;

  const handleModeClicked = () => {
    setCurrentMode(headline.attributes.mode);
    pagePush(PAGE_TYPE_ID.DATA_LAYER_PAGE);
  };

  return (
    <button
      className={classnames(styles["c-event-card"], className)}
      onClick={onClick}
      data-testid="headline"
      style={titleAbove ? { height: "auto" } : {}}
    >
      <div
        className={styles["c-event-card__background"]}
        style={{ backgroundImage: `url(${headline.attributes.thumbnail_image})` }}
      />
      <div
        className={classnames(styles["c-event-card__detail"], {
          [styles["c-event-card__detail--gradient"]]: gradient
        })}
      >
        <div className={styles["c-event-card__header"]}>
          {titleAbove && (
            <h3 className={classnames(styles["title"], styles["title-above"])}>{headline.attributes.title}</h3>
          )}
          <div className={styles["thumbnail"]} style={titleAbove ? { minHeight: 192 } : {}}>
            <Image
              src={headline.attributes.thumbnail_image}
              layout={"fill"}
              objectFit={"cover"}
              alt=""
              role="presentation"
            />
          </div>
          {!titleAbove && (
            <h3 className={classnames(styles["title"], styles["title-below"])}>{headline.attributes.title}</h3>
          )}
        </div>
        <div className={styles["c-event-card__footer"]}>
          <p className={styles["date"]}>{formatDatePretty(headline.attributes.climate_alert_date)}</p>
          <CtaButton
            iconUrl={headline.attributes.mode.attributes.icon}
            text={headline.attributes.mode.attributes.title}
            type="Light"
            iconPosition="Left"
            onClick={e => {
              e.stopPropagation();
              handleModeClicked();
            }}
            className={styles["data-button"]}
          />
        </div>
      </div>
    </button>
  );
};

export default EventCard;
