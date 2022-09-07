/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./event.module.scss";
import moment from "moment";
import Image from "next/image";

const HeadlineCard = ({ headline, className, as, ...rest }) => {
  const Element = as;
  return (
    <Element className={classnames(styles["c-event-card"], className)} {...rest} data-testid="headline">
      <img
        className={styles["c-event-card__background"]}
        src={headline.attributes.thumbnail_image}
        alt=""
        role="presentation"
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
    </Element>
  );
};

HeadlineCard.propTypes = {
  headline: PropTypes.object.isRequired,
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string])
};

HeadlineCard.defaultProps = {
  className: "",
  as: "div"
};

export default HeadlineCard;
