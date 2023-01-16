import { BG_MID_NIGHT } from "constants/section-colours";
import styles from "layout/app/news/earth-hq-cta/earth-hq-cta.module.scss";
import AnchorCTA from "components/ui/anchor-cta";
import classnames from "classnames";
import Icon from "components/ui/Icon";
import Section from "layout/app/news/section";
import Image from "next/image";
import GlobeFires from "public/static/images/globe-fires.png";
import GlobeFiresMobile from "public/static/images/globe-fires-mobile.png";

type EarthHQCTAProps = {
  className?: string;
};

/** CTA with Earth image. */
const EarthHQCTA = ({ className = "" }: EarthHQCTAProps) => (
  <Section
    bgColour={BG_MID_NIGHT}
    className={styles["c-earth-hq-cta__wrapper"]}
    gridClassName={styles["c-earth-hq-cta__wrapper-grid"]}
  >
    <div className={classnames(className, styles["c-earth-hq-cta"])}>
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
          <p className={styles["c-earth-hq-cta__link-text"]}>Explore Earth HQ</p>
          <div className={styles["c-earth-hq-cta__link-icon"]}>
            <Icon name="arrow-right" size={15} type="decorative" />
          </div>
        </AnchorCTA>
      </div>

      {/* Earth Mobile */}
      <div className={classnames(styles["c-earth-hq-cta__globe"], styles["c-earth-hq-cta__globe--mobile"])}>
        <Image
          src={GlobeFiresMobile}
          layout="fill"
          objectFit="cover"
          role="presentation"
          objectPosition="left 24px"
          alt=""
        />

        <div className={styles["c-earth-hq-cta__globe-shadow"]} />
      </div>
    </div>

    {/* Earth Desktop */}
    <div className={classnames(styles["c-earth-hq-cta__globe"], styles["c-earth-hq-cta__globe--desktop"])}>
      <Image src={GlobeFires} layout="fill" objectFit="cover" role="presentation" objectPosition="left" alt="" />

      <div className={styles["c-earth-hq-cta__globe-shadow"]} />
    </div>
  </Section>
);

export default EarthHQCTA;
