import { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./date-picker.module.scss";
import useCalendar from "@veccu/react-calendar";
import { format } from "date-fns";
import IconButton from "components/ui/icon-button";
import chevronRightSVG from "public/static/icons/chevron-right.svg";
import chevronLeftSVG from "public/static/icons/chevron-left.svg";
import SelectInput from "components/ui/select";

const MIN_YEAR = 2013;
const MAX_YEAR = new Date(new Date().getFullYear() + 5, 11).getFullYear();

const constructYears = () => {
  const arr = [];
  for (let i = MIN_YEAR; i <= MAX_YEAR; i++) {
    arr.push({ value: i, label: i });
  }

  return arr;
};

const MONTHS = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" }
];

const YEARS = constructYears();

const DatePicker = ({ initialDate, onChange, className }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { cursorDate, headers, body, navigation, view, month, year } = useCalendar();

  const setYear = ({ value }) => navigation.setDate(new Date(value, month));
  const setMonth = ({ value }) => navigation.setDate(new Date(year, value));

  return (
    <div className={classnames(styles["c-date-picker"], className)}>
      <div className={styles["c-date-picker__month-year"]}>
        <SelectInput options={MONTHS} value={MONTHS.find(option => option.value === month)} onChange={setMonth} />
        <SelectInput options={YEARS} value={YEARS.find(option => option.value === year)} onChange={setYear} />
      </div>
      <button onClick={() => navigation.setDate(new Date(3000, 0))}>Set date to October 22</button>
      <div className={styles["c-date-picker__table-with-nav"]}>
        <div className={styles["c-date-picker__month-buttons"]}>
          <IconButton
            onClick={navigation.toPrev}
            className={styles["c-date-picker__month-button"]}
            icon={chevronLeftSVG}
            disabled={month === 0 && year === MIN_YEAR}
          />

          <span> {format(cursorDate, "MMMM yyyy")} </span>
          <IconButton
            onClick={navigation.toNext}
            className={styles["c-date-picker__month-button"]}
            icon={chevronRightSVG}
            disabled={month === 11 && year === MAX_YEAR}
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
