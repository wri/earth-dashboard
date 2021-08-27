import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import PropTypes from "prop-types";

const IntroText = ({ isMobile, hasIntroAndBanner }) => {
  return (
    <div
      className={classnames({
        [styles["intro-text"]]: true,
        [styles["-mobile"]]: isMobile,
        [styles["-desktop"]]: !isMobile,
        [styles["-fade-out"]]: !hasIntroAndBanner
      })}
    >
      <div
        className={classnames({
          [styles["topic-links-intro-text"]]: true,
          [styles["-mobile"]]: isMobile,
          [styles["-desktop"]]: !isMobile
        })}
      >
        {!isMobile && <img src="/static/icons/arrow-up-homepage.svg" role="presentation" alt="" />}
        <p>What you need to know about Earth&apos;s life support systems, the global commons</p>
        {isMobile && <img src="/static/icons/arrow-up-right-homepage.svg" role="presentation" alt="" />}
      </div>
      <div
        className={classnames({
          [styles["globe-menu-intro-text"]]: true,
          [styles["-mobile"]]: isMobile,
          [styles["-desktop"]]: !isMobile
        })}
      >
        <img src="/static/icons/arrow-down-homepage.svg" role="presentation" alt="" />
        <p>Explore Earth&apos;s planetary emergency in near-real-time</p>
      </div>
      <div
        className={classnames({
          [styles["cog-overlay"]]: true,
          [styles["-mobile"]]: isMobile,
          [styles["-desktop"]]: !isMobile
        })}
      >
        <img src="/static/icons/cog.svg" role="presentation" alt="" />
        <span>Globe</span>
      </div>
    </div>
  );
};

IntroText.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  hasIntroAndBanner: PropTypes.bool.isRequired
};

export default IntroText;
