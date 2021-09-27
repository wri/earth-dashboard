import classnames from "classnames";
import IconButton from "components/ui/icon-button";
import { formatDate } from "utils/dates";
import chevronDownSVG from "public/static/icons/toggle-arrow-down.svg";
import chevronRightSVG from "public/static/icons/chevron-right.svg";
import styles from "components/app/home/date-picker/button/styles.module.scss";
import PropTypes from "prop-types";

const showingDateForText = "Showing Data for: ";

const DatePickerBtn = ({ isMobile, dateOfDataShown }) => (
  <div className={styles["c-showing-data-for"]}>
    {isMobile ? (
      <>
        <div className={styles["c-showing-data-for__text"]}>{showingDateForText}</div>
        <button
          className={classnames(styles["c-showing-data-for__button"], styles["c-showing-data-for__button--mobile"])}
          role="button"
        >
          <span className={styles["c-showing-data-for__date"]}>{formatDate(dateOfDataShown) || "..."}</span>
          <IconButton el="div" className={styles["c-showing-data-for__icon"]} icon={chevronRightSVG} />
        </button>
      </>
    ) : (
      <button className={styles["c-showing-data-for__button"]} role="button">
        <span className={styles["c-showing-data-for__text"]}>
          {showingDateForText}
          <span className={styles["c-showing-data-for__date"]}>{formatDate(dateOfDataShown) || "..."}</span>
        </span>
        <IconButton el="div" className={styles["c-showing-data-for__icon"]} icon={chevronDownSVG} />
      </button>
    )}
  </div>
);

DatePickerBtn.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  dateOfDataShown: PropTypes.instanceOf(Date).isRequired
};

export default DatePickerBtn;
