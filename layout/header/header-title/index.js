import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./header-title.module.scss";

const HeaderTitle = ({ className, ...rest }) => {
  return (
    <div className={classnames("u-text-center", className, styles["c-header-title"])} {...rest}>
      <h1 className={styles["c-header-title__title"]}>This is a planetary emergency</h1>
      <p className={styles["c-header-title__subtitle"]}>Explore real-time data</p>
    </div>
  );
};

HeaderTitle.propTypes = {
  className: PropTypes.string
};

HeaderTitle.defaultProps = {
  className: ""
};

export default HeaderTitle;
