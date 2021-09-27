import IconButton from "components/ui/icon-button";
import { formatDate } from "utils/dates";
import chevronSVG from "public/static/icons/toggle-arrow-down.svg";
import styles from "components/app/home/date-picker/button/styles.module.scss";
import PropTypes from "prop-types";

const DatePickerBtn = ({ dateOfDataShown }) => (
  <div className={styles["c-showing-data-for"]}>
    <button className={styles["c-showing-data-for__button"]} role="button">
      <span className={styles["c-showing-data-for__text"]}>Showing Data for: <span className={styles["c-showing-data-for__date"]}>{formatDate(dateOfDataShown)}</span></span>
      <IconButton className={styles["c-showing-data-for__icon"]} icon={chevronSVG}  />
    </button>
  </div>
);

DatePickerBtn.propTypes = {
  dateOfDataShown: PropTypes.instanceOf(Date).isRequired
};

export default DatePickerBtn;
