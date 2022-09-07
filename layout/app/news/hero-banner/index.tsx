import classnames from "classnames";
import styles from "./hero-banner.module.scss";

type HeroBannerProps = {
  title?: string;
  body?: string;
  className?: string;
};

/** Tops section banner for a page with title and body. */
const HeroBanner = ({ title, body, className = "" }: HeroBannerProps) => (
  <div className={classnames(className, "u-text-center", styles["c-hero-banner"])}>
    {title && <h1 className={styles["c-hero-banner__title"]}>{title}</h1>}
    {body && <p className={styles["c-hero-banner__body"]}>{body}</p>}
  </div>
);

export default HeroBanner;
