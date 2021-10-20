import PropTypes from "prop-types";
import classnames from "classnames";

// utils
import { MediaContextProvider, Desktop, Mobile } from "utils/responsive";

// styles
import styles from "./ocean-current-box.module.scss";

function OceanCurrentBox({ title, style, direction, className }) {
  const getTitle = mobile => (
    <div
      className={classnames({
        [styles.title]: true,
        [styles["-mobile"]]: mobile,
        [styles["-desktop"]]: !mobile
      })}
    >
      {title}
    </div>
  );
  const getCurrentContainer = mobile => (
    <div
      className={classnames({
        [styles["current-container"]]: true,
        [styles["-mobile"]]: mobile,
        [styles["-desktop"]]: !mobile
      })}
    >
      <div
        className={classnames({
          [styles.bottle]: true,
          [styles["-mobile"]]: mobile,
          [styles["-desktop"]]: !mobile
        })}
      >
        <img src="/static/images/scrolly-telling/ocean/bottle.svg" />
      </div>
      {direction === "south" && (
        <img
          className={styles["south-arrow"]}
          src="/static/images/scrolly-telling/ocean/arrow-south-anticlockwise.svg"
        />
      )}
      {direction === "north" && (
        <img className={styles["north-arrow"]} src="/static/images/scrolly-telling/ocean/arrow-north-clockwise.svg" />
      )}
    </div>
  );

  return (
    <div
      className={classnames({
        [styles["c-ocean-current-box"]]: true,
        [className]: !!className
      })}
      style={style}
    >
      <MediaContextProvider>
        <Desktop
          className={classnames({
            [styles["main-container"]]: true,
            [styles["-desktop"]]: true
          })}
        >
          {getTitle(false)}
          {getCurrentContainer(false)}
        </Desktop>
        <Mobile
          className={classnames({
            [styles["main-container"]]: true,
            [styles["-mobile"]]: true
          })}
        >
          {getTitle(true)}
          {getCurrentContainer(true)}
        </Mobile>
      </MediaContextProvider>
    </div>
  );
}

OceanCurrentBox.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  direction: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default OceanCurrentBox;
