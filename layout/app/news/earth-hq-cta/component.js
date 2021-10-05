import styles from "layout/app/news/earth-hq-cta/earth-hq-cta.module.scss";
import Section from "layout/app/news/section";
import AnchorLink from "components/ui/anchor-cta";
import classnames from "classnames";
import PropTypes from "prop-types";

const EarthHQCTA = ({ className }) => (
  <Section className={classnames(className, styles["c-earth-hq-cta"])}>
    <div className={styles["c-earth-hq-cta__content"]}>
      <h2 className={styles["c-earth-hq-cta__title"]}>Earth HQ</h2>
      <p className={styles["c-earth-hq-cta__text"]}>
        A “Situation Room” for the planet. Earth HQ is an interactive and dynamic platform that tracks the forces
        imperiling the natural systems that support life on earth.{" "}
      </p>
      <AnchorLink className={styles["c-earth-hq-cta__link"]} href="/">
        Explore Earth HQ
      </AnchorLink>
    </div>
  </Section>
);

EarthHQCTA.propTypes = {
  className: PropTypes.string
};

EarthHQCTA.defaultProps = {};

export default EarthHQCTA;
