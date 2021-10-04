import { Children } from "react";
import classnames from "classnames";
import styles from "./section.module.scss";
import PropTypes from "prop-types";

const Section = ({ className, gridClassName, title, bgColour, pb, children }) => (
  <div
    className={classnames(
      className,
      styles["o-page-section"],
      bgColour && styles[`o-page-section--${bgColour}`]
    )}
  >
    <div className={classnames(styles["o-page-section__wrap"], !pb && styles["o-page-section__wrap--pb-none"])}>
      {title && Children.count(children) > 0 && <h1 className={styles["o-page-section__title"]}>{title}</h1>}
      {Children.count(children) > 0 && <div className={classnames(styles["o-page-section__grid"], gridClassName)}>{children}</div>}
    </div>
  </div>
);

Section.propTypes = {
  className: PropTypes.string,
  gridClassName: PropTypes.string,
  title: PropTypes.string,
  bgColour: PropTypes.oneOf(["space", "light-space", "night", "galaxy"]),
  // Padding Bottom
  pb: PropTypes.bool.isRequired
};

Section.defaultProps = {
  bgColour: "space",
  pb: true
};

export default Section;
