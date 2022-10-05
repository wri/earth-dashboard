/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import styles from "./event.module.scss";
import moment from "moment";
import Image from "next/image";
import { Headline } from "slices/headlines";

type EventCardProps = {
  headline: Headline;
  onClick: () => void;
  type?: "Default" | "Condensed";
  className?: string;
};

const EventCard = ({ headline, onClick, type = "Default", className }: EventCardProps) => {
  if (type === "Default")
    return (
      <button className={classnames(styles["c-event-card"], className)} onClick={onClick} data-testid="headline">
        <div
          className={styles["c-event-card__background"]}
          style={{ backgroundImage: `url(${headline.attributes.thumbnail_image})` }}
        />
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
      </button>
    );
  return <div>Test</div>;
};

export default EventCard;
