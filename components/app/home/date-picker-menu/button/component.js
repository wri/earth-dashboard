import classnames from "classnames";
import IconButton from "components/ui/icon-button";
import { formatDate } from "utils/dates";
import chevronDownSVG from "public/static/icons/toggle-arrow-down.svg";
import chevronRightSVG from "public/static/icons/chevron-right.svg";
import styles from "components/app/home/date-picker-menu/button/styles.module.scss";
import PropTypes from "prop-types";

const showingDateForText = "Showing Data for: ";

const DatePickerBtn = ({ isMobile, dateOfDataShown, setIsDatePickerOpen }) => {
  const handleClick = () => {
    setIsDatePickerOpen(true);
  };

  return (
    <div className={styles["c-showing-data-for"]}>
      {isMobile ? (
        <>
          <div className={styles["c-showing-data-for__text"]}>{showingDateForText}</div>
          <button
            className={classnames(styles["c-showing-data-for__button"], styles["c-showing-data-for__button--mobile"])}
            onClick={handleClick}
          >
            <span className={styles["c-showing-data-for__date"]}>{formatDate(dateOfDataShown) || "\u2026"}</span>
            <IconButton el="div" className={styles["c-showing-data-for__icon"]} icon={chevronRightSVG} />
          </button>
        </>
      ) : (
        <button className={styles["c-showing-data-for__button"]} onClick={handleClick}>
          <span className={styles["c-showing-data-for__text"]}>
            {showingDateForText}
            <span className={styles["c-showing-data-for__date"]}>{formatDate(dateOfDataShown) || "\u2026"}</span>
          </span>
          <IconButton el="div" className={styles["c-showing-data-for__icon"]} icon={chevronDownSVG} />
        </button>
      )}
    </div>
  );
};

DatePickerBtn.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  setIsDatePickerOpen: PropTypes.func.isRequired,
  dateOfDataShown: PropTypes.instanceOf(Date).isRequired
};

export default DatePickerBtn;
