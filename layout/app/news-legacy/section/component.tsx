import { Children, ReactNode } from "react";
import classnames from "classnames";
import { BG_SPACE } from "constants/section-colours";
import styles from "./section.module.scss";

type SectionProps = {
  children: ReactNode;
  id?: string;
  paddingBottom?: boolean;
  className?: string;
  gridClassName?: string;
  title?: string;
  subtext?: string;
  bgColour?: string;
  noWrap?: boolean;
};

const Section = ({
  id,
  className = "",
  gridClassName = "",
  title,
  subtext,
  bgColour = BG_SPACE,
  paddingBottom = true,
  noWrap,
  children
}: SectionProps) => (
  <div
    id={id}
    className={classnames(
      className,
      styles["o-page-section"],
      !paddingBottom && styles["o-page-section--pb-none"],
      bgColour && styles[`o-page-section--${bgColour}`]
    )}
  >
    {Children.count(children) > 0 && (
      <div className={noWrap ? styles["o-page-section__nowrap"] : styles["o-page-section__wrap"]}>
        {title && <h2 className={styles["o-page-section__title"]}>{title}</h2>}
        {subtext && <p className={styles["o-page-section__subtext"]}>{subtext}</p>}
        <div className={classnames(styles["o-page-section__grid"], gridClassName)}>{children}</div>
      </div>
    )}
  </div>
);

export default Section;
