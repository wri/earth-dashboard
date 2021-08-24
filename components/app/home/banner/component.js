import classnames from "classnames";
import styles from "layout/app/home/homepage.module.scss";
import PropTypes from "prop-types";

const Banner = ({ isMobile }) => {
  return (
    <div
      className={classnames({
        [styles["banner"]]: true,
        [styles["-mobile"]]: isMobile,
        [styles["-desktop"]]: !isMobile
      })}
    >
      <h1>This is not a drill</h1>
      <h1>
        It&apos;s a <span className={styles.gradient}>Planetary emergency</span>.
      </h1>
    </div>
  );
};

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default Banner;
