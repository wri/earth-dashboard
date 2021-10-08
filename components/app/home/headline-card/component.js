/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./headline.module.scss";
import moment from "moment";

const HeadlineCard = ({ headline, className, as, ...rest }) => {
  const Element = as;
  return (
    <Element className={classnames(styles["c-headline-card"], className)} {...rest} data-testid="headline">
      <img
        className={styles["c-headline-card__image"]}
        src={headline.attributes.thumbnail_image}
        alt=""
        role="presentation"
      />
      <div>
        <h3 className={styles["c-headline-card__title"]}>{headline.attributes.title}</h3>
        <p className={styles["c-headline-card__subtitle"]}>
          {moment(headline.attributes.headline_date).format("Do MMMM YYYY")}
        </p>
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
