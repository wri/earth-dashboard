import PropTypes from "prop-types";
import classnames from "classnames";

// styles
import styles from "./pulsating-item.module.scss";

function PulsatingItem({ level, useDrop, active, style }) {
  return (
    <div className={styles["c-pulsating-item"]} style={style}>
      <div
        className={classnames({
          [styles["pulsating-container"]]: true,
          [styles[`-level-${level}`]]: true,
          [styles["-active"]]: active
        })}
      />
      {!useDrop && (
        <div
          className={classnames({
            [styles.dot]: true,
            [styles[`-level-${level}`]]: true
          })}
        />
      )}
      {useDrop && (
        <div
          className={classnames({
            [styles.drop]: true,
            [styles["-active"]]: active
          })}
        >
          <img src={`/static/images/scrolly-telling/freshwater/drop-map-marker${active ? "-active" : ""}.svg`} />
        </div>
      )}
    </div>
  );
}

PulsatingItem.propTypes = {
  color: PropTypes.string.isRequired,
  useDrop: PropTypes.bool,
  active: PropTypes.bool,
  style: PropTypes.object
};

PulsatingItem.defaultProps = {
  useDrop: false,
  active: true
};

export default PulsatingItem;
