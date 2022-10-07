import styles from "layout/app/news/earth-hq-cta/earth-hq-cta.module.scss";
import AnchorCTA from "components/ui/anchor-cta";
import classnames from "classnames";
import Icon from "components/ui/Icon";
import Image from "next/image";
import GlobeFires from "public/static/images/globe-fires.png";
import GlobeFiresMobile from "public/static/images/globe-fires-mobile.png";

type EarthHQCTAProps = {
  className?: string;
  isMobile: boolean;
};

/** CTA with Earth image. */
const EarthHQCTA = ({ className = "", isMobile }: EarthHQCTAProps) => (
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
        <p className={styles["text"]}>Explore Earth HQ</p>
        <div className={styles["icon"]}>
          <Icon name="arrow-right" size={15} type="decorative" />
        </div>
      </AnchorCTA>
    </div>

    {/* Earth */}
    <div className={styles["c-earth-hq-cta__globe"]}>
      <Image
        src={isMobile ? GlobeFiresMobile : GlobeFires}
        layout="fill"
        objectFit="cover"
        role="presentation"
        alt=""
      />
      <div className={styles["shadow"]} />
    </div>
  </div>
);

export default EarthHQCTA;
