import styles from "layout/app/news/earth-hq-cta/earth-hq-cta.module.scss";
import Section from "layout/app/news/section";
import AnchorCTA from "components/ui/anchor-cta";
import classnames from "classnames";
import Icon from "components/ui/Icon";

type EarthHQCTAProps = {
  className?: string;
};

/** CTA with Earth image. */
const EarthHQCTA = ({ className = "" }: EarthHQCTAProps) => (
  <Section className={classnames(className, styles["c-earth-hq-cta"])}>
    <div className={styles["c-earth-hq-cta__content"]}>
      {/* Title */}
      <h2 className={styles["c-earth-hq-cta__title"]}>Earth HQ</h2>

      {/* Description */}
      <p className={styles["c-earth-hq-cta__text"]}>
        A “Situation Room” for the planet. Earth HQ is an interactive and dynamic platform that tracks the forces
        imperiling the natural systems that support life on earth.
      </p>

      {/* Button */}
      <AnchorCTA className={styles["c-earth-hq-cta__link"]} href="/">
        <p className={styles["text"]}>Explore Earth HQ</p>
        <div className={styles["icon"]}>
          <Icon name="arrow-right" size={15} type="decorative" />
        </div>
      </AnchorCTA>
    </div>
  </Section>
);

export default EarthHQCTA;
