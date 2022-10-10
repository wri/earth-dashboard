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
  type?: "Default" | "Condensed";
  className?: string;
};

const EventCard = ({ headline, onClick, type = "Default", className }: EventCardProps) => {
  const getEventCardContent = () => {
    if (type === "Default")
      return (
        <div className={styles["c-event-card__detail"]}>
          <h3 className={styles["c-event-card__title"]}>{headline.attributes.title}</h3>
          <p className={styles["c-event-card__subtitle"]}>
            {moment(headline.attributes.climate_alert_date).format("Do MMMM YYYY")}
          </p>
          <div className={styles["c-event-card__thumbnail"]}>
            <Image
              src={headline.attributes.thumbnail_image}
              layout={"fill"}
              objectFit={"cover"}
              alt=""
              role="presentation"
            />
          </div>
        </div>
      );
    return (
      <div className={styles["c-event-card-condensed__detail"]}>
        <div className={styles["c-event-card-condensed__header"]}>
          <div className={styles["thumbnail"]}>
            <Image
              src={headline.attributes.thumbnail_image}
              layout={"fill"}
              objectFit={"cover"}
              alt=""
              role="presentation"
            />
          </div>
          <h3 className={styles["title"]}>{headline.attributes.title}</h3>
        </div>
        <div className={styles["c-event-card-condensed__footer"]}>
          <p className={styles["date"]}>{moment(headline.attributes.climate_alert_date).format("MMM D YYYY")}</p>
          <CtaButton
            iconUrl={headline.attributes.mode.attributes.icon}
            text={headline.attributes.mode.attributes.title}
            type="Light"
            iconPosition="Left"
          />
        </div>
      </div>
    );
  };

  return (
    <button
      className={classnames(styles[type === "Default" ? "c-event-card" : "c-event-card-condensed"], className)}
      onClick={onClick}
      data-testid="headline"
    >
      <div
        className={styles["c-event-card__background"]}
        style={{ backgroundImage: `url(${headline.attributes.thumbnail_image})` }}
      />
      {getEventCardContent()}
    </button>
  );
};

export default EventCard;
