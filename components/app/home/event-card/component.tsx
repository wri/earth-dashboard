/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import styles from "./event-card.module.scss";
import moment from "moment";
import Image from "next/image";
import { Headline } from "slices/headlines";
import CtaButton from "components/ui/cta-button";

type EventCardProps = {
  headline: Headline;
  onClick: () => void;
  isMobile: boolean;
  type?: "Default" | "Condensed";
  className?: string;
};

const EventCard = ({ headline, onClick, isMobile, type = "Default", className }: EventCardProps) => {
  const titleAbove = type === "Default" && !isMobile;

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
      <div className={styles["c-event-card__detail"]}>
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
          <p className={styles["date"]}>{moment(headline.attributes.climate_alert_date).format("MMM D YYYY")}</p>
          <CtaButton
            iconUrl={headline.attributes.mode.attributes.icon}
            text={headline.attributes.mode.attributes.title}
            type="Light"
            iconPosition="Left"
          />
        </div>
      </div>
    </button>
  );
};

export default EventCard;