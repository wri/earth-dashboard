import PropTypes from "prop-types";
import classnames from "classnames";

// styles
import styles from "./spinner.module.scss";

function Spinner({ isLoading, className, style }) {
  const loading = isLoading ? "-loading" : "";
  return (
    <div
      className={classnames({
        [styles["c-spinner"]]: true,
        "-loading": isLoading,
        [className]: !!className
      })}
    >
      <div className="spinner-box" style={style}>
        <div className="icon" />
      </div>
    </div>
  );
}

Spinner.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Spinner;
