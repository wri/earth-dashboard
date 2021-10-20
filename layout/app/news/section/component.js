import { Children } from "react";
import classnames from "classnames";
import sectionBgColours, { BG_SPACE } from "constants/section-colours";
import styles from "./section.module.scss";
import PropTypes from "prop-types";

const Section = ({ className, gridClassName, title, bgColour, paddingBottom, children }) => (
  <div
    className={classnames(
      className,
      styles["o-page-section"],
      !paddingBottom && styles["o-page-section--pb-none"],
      bgColour && styles[`o-page-section--${bgColour}`]
    )}
  >
    {Children.count(children) > 0 && (
      <div className={styles["o-page-section__wrap"]}>
        {title && <h2 className={styles["o-page-section__title"]}>{title}</h2>}
        <div className={classnames(styles["o-page-section__grid"], gridClassName)}>{children}</div>
      </div>
    )}
  </div>
);

Section.propTypes = {
  className: PropTypes.string,
  gridClassName: PropTypes.string,
  title: PropTypes.string,
  bgColour: PropTypes.oneOf(sectionBgColours),
  paddingBottom: PropTypes.bool.isRequired
};

Section.defaultProps = {
  className: "",
  gridClassName: "",
  bgColour: BG_SPACE,
  paddingBottom: true
};

export default Section;
