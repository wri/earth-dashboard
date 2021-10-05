import { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./date-picker.module.scss";
import useCalendar from "@veccu/react-calendar";
import { format } from "date-fns";
import IconButton from "components/ui/icon-button";
import chevronRightSVG from "public/static/icons/chevron-right.svg";
import chevronLeftSVG from "public/static/icons/chevron-left.svg";

const DatePicker = ({ initialDate, onChange, className }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { cursorDate, headers, body, navigation, view } = useCalendar();

  return (
    <div className={classnames(styles["c-date-picker"], className)}>
      <div className={styles["c-date-picker__month-year"]}>Month Year picker here</div>
      <div className={styles["c-date-picker__table-with-nav"]}>
        <div className={styles["c-date-picker__month-buttons"]}>
          <IconButton
            onClick={navigation.toPrev}
            className={styles["c-date-picker__month-button"]}
            icon={chevronLeftSVG}
          />

          <span> {format(cursorDate, "MMMM yyyy")} </span>
          <IconButton
            onClick={navigation.toNext}
            className={styles["c-date-picker__month-button"]}
            icon={chevronRightSVG}
          />
        </div>
        <table className={styles["c-date-picker__table"]}>
          <thead className={styles["c-date-picker__table-head"]}>
            <tr className={styles["c-date-picker__table-header-row"]}>
              {headers.weekDays.map(({ key, value }) => {
                return <th key={key}>{format(value, "E")}</th>;
              })}
            </tr>
          </thead>
          <tbody className={styles["c-date-picker__table-body"]}>
            {body.value.map(week => {
              const { key, value: days } = week;

              return (
                <tr key={key} className={styles["c-date-picker__table-row"]}>
                  {days.map(day => {
                    const { key, date, isCurrentDate, isCurrentMonth, isWeekend, value } = day;
                    console.log(day);

                    const isSelected =
                      selectedDate.getFullYear() === value.getFullYear() &&
                      selectedDate.getMonth() === value.getMonth() &&
                      selectedDate.getDate() === value.getDate();

                    return (
                      <td className={styles["c-date-picker__table-cell"]} key={key}>
                        <button
                          className={classnames(
                            styles["c-date-picker__date-button"],
                            isSelected && styles["c-date-picker__date-button--selected"]
                          )}
                          disabled={!isCurrentMonth}
                          onClick={() => setSelectedDate(value)}
                        >
                          {isCurrentMonth && date}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  initialDate: PropTypes.date,
  onChange: PropTypes.func,
  className: PropTypes.string
};

DatePicker.defaultProps = {
  initialDate: new Date(),
  onChange: () => {},
  className: ""
};

export default DatePicker;
