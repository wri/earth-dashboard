import classnames from "classnames";
import styles from "./headline-card.module.scss";
import { Headline } from "slices/headlines";
import moment from "moment";

type HeadlineCardProps = { currentHeadline: Headline };

const HeadlineCard = ({ currentHeadline }: HeadlineCardProps) => {
  console.log(currentHeadline);
  return (
    <div className={classnames(styles["c-headline-card"])}>
      <div
        className={classnames(styles["c-headline-card__background-image"])}
        style={{ backgroundImage: `url(${currentHeadline.attributes.content.media.body_image})` }}
      />
      <div className={classnames(styles["c-headline-card__content"])}>
        <h1 className={classnames(styles["title"])}>{currentHeadline.attributes.title}</h1>
        <p className={classnames(styles["date"])}>
          {moment(currentHeadline.attributes.climate_alert_date).format("MMM D YYYY")}
        </p>
        <div
          className={classnames(styles["foreground-image"])}
          style={{ backgroundImage: `url(${currentHeadline.attributes.thumbnail_image})` }}
        />
      </div>
    </div>
  );
};

export default HeadlineCard;
