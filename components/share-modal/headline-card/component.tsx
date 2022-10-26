import classnames from "classnames";
import styles from "./headline-card.module.scss";
import { Headline } from "slices/headlines";
import { formatDatePretty } from "utils/dates";

type HeadlineCardProps = { currentHeadline: Headline };

const HeadlineCard = ({ currentHeadline }: HeadlineCardProps) => {
  return (
    <div className={classnames(styles["c-headline-card"])}>
      <div
        className={classnames(styles["c-headline-card__background-image"])}
        style={{ backgroundImage: `url(${currentHeadline.attributes.thumbnail_image})` }}
      />
      <div className={classnames(styles["c-headline-card__content"])}>
        <h1 className={classnames(styles["title"])}>{currentHeadline.attributes.title}</h1>
        <p className={classnames(styles["date"])}>{formatDatePretty(currentHeadline.attributes.climate_alert_date)}</p>
        <div
          className={classnames(styles["foreground-image"])}
          style={{ backgroundImage: `url(${currentHeadline.attributes.thumbnail_image})` }}
        />
      </div>
    </div>
  );
};

export default HeadlineCard;
