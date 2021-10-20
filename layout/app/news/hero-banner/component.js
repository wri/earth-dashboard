import classnames from "classnames";
import styles from "./hero-banner.module.scss";
import PropTypes from "prop-types";

const HeroBanner = ({ className, title, body }) => (
  <div className={classnames(className, "u-text-center", styles["c-hero-banner"])}>
    <h1 className={styles["c-hero-banner__title"]}>{title}</h1>
    {body && <p className={styles["c-hero-banner__body"]}>{body}</p>}
  </div>
);

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string
};

HeroBanner.defaultProps = {};

export default HeroBanner;
