import { Children } from "react";
import classnames from "classnames";
import styles from "./section.module.scss";
import PropTypes from "prop-types";

const Section = ({ classname, title, bgColour, pb, children }) => (
  <div
    className={classnames(
      classname,
      styles["o-page-section"],
      !pb && styles["o-page-section--pb-none"],
      bgColour && styles[`o-page-section--${bgColour}`]
    )}
  >
    {title && Children.count(children) > 0 && <h1 className={styles["o-page-section__title"]}>{title}</h1>}
    {Children.count(children) > 0 && <div className={styles["o-page-section__grid"]}>{children}</div>}
  </div>
);

Section.propTypes = {
  classname: PropTypes.string,
  title: PropTypes.string,
  bgColour: PropTypes.oneOf(["space", "night", "galaxy"]),
  // Padding Bottom
  pb: PropTypes.bool.isRequired
};

Section.defaultProps = {
  bgColour: "space",
  pb: true
};

export default Section;
