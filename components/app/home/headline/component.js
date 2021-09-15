/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./headline.module.scss";
import moment from "moment";

const HeadlineCard = ({ headline, className, ...rest }) => {
  return (
    <div className={classnames(styles["c-headline"], className)} {...rest}>
      <img
        className={styles["c-headline__image"]}
        src={headline.attributes.thumbnail_image}
        alt=""
        role="presentation"
      />
      <div>
        <h3 className={styles["c-headline__title"]}>{headline.attributes.title}</h3>
        <p className={styles["c-headline__date"]}>{moment(headline.attributes.headline_date).format("Do MMMM YYYY")}</p>
      </div>
    </div>
  );
};

HeadlineCard.propTypes = {
  headline: PropTypes.object.isRequired,
  className: PropTypes.string
};

HeadlineCard.defaultProps = {
  className: ""
};

export default HeadlineCard;
