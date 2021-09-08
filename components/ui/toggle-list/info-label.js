import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./toggle-list.module.scss";

const InfoLabel = ({ title, className }) => {
  return (
    <div>
      <label id={`${title.toLowerCase()}-label`} className={classnames(styles["c-info-label"], className)}>
        <span>{title}</span>
        <button aria-label={`${title} information`} className={styles["c-info-label__button"]}></button>
      </label>
    </div>
  );
};

InfoLabel.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};

InfoLabel.defaultProps = {
  title: ""
};

export default InfoLabel;
