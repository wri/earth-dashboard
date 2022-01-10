import { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./date-picker.module.scss";
import useCalendar from "@veccu/react-calendar";
import { format } from "date-fns";
import IconButton from "components/ui/icon-button";
import chevronRightSVG from "public/static/icons/chevron-right.svg";
import liveSVG from "public/static/icons/live.svg";
import SelectInput from "components/ui/select";
import Image from "next/image";

// 0 | 1 | 2 | 3 | 4 | 5 | 6
export const defaultWeekStart = 0;
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

const DatePicker = forwardRef(({ initialDate, onChange, onSubmit, hasLiveDataButton, className }, ref) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { cursorDate, headers, body, navigation, view, month, year } = useCalendar({ defaultWeekStart });

  const setYear = ({ value }) => navigation.setDate(new Date(value, month));
  const setMonth = ({ value }) => navigation.setDate(new Date(year, value));

  const handleDateChange = value => {
    setSelectedDate(value);
    onChange(value);
  };

  const handleSubmit = () => {
    onSubmit(selectedDate);
  };

  const handleLiveDate = () => {
    navigation.setDate(new Date());
    setSelectedDate(new Date());
  };

  useEffect(() => {
    navigation.setDate(new Date(initialDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classnames(styles["c-date-picker"], className)}>
      <div className={styles["c-date-picker__month-year"]}>
        <SelectInput
          options={MONTHS}
          value={MONTHS.find(option => option.value === month)}
          onChange={setMonth}
          className={styles["c-date-picker__dropdown"]}
          aria-label="Quick Select Month"
        />
        <SelectInput
          options={YEARS}
          value={YEARS.find(option => option.value === year)}
          onChange={setYear}
          className={styles["c-date-picker__dropdown"]}
          aria-label="Quick Select Year"
        />
      </div>
      <div className={styles["c-date-picker__table-with-nav"]}>
        <div className={styles["c-date-picker__month-buttons"]}>
          <IconButton
            aria-label="Previous Month"
            onClick={navigation.toPrev}
            className={classnames(styles["c-date-picker__month-button"], styles["c-date-picker__month-button--rotate"])}
            icon={chevronRightSVG}
            disabled={month === 0 && year === MIN_YEAR}
          />

          <span> {format(cursorDate, "MMMM yyyy")} </span>
          <IconButton
            aria-label="Next Month"
            onClick={navigation.toNext}
            className={styles["c-date-picker__month-button"]}
            icon={chevronRightSVG}
            disabled={month === 11 && year === MAX_YEAR}
          />
        </div>
        <table className={styles["c-date-picker__table"]}>
          <thead className={styles["c-date-picker__table-head"]}>
            <tr className={styles["c-date-picker__table-header-row"]}>
              {headers.weekDays.map(({ key, value }) => (
                <th key={key} scope="col" abbr={format(value, "EEEE")}>
                  {format(value, "E")}
                </th>
              ))}
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
                          onClick={() => handleDateChange(value)}
                          ref={isSelected ? ref : undefined}
                          data-testid={isSelected ? "selectedDate" : undefined}
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
        {hasLiveDataButton && (
          <div className={classnames(styles["c-date-picker__live"], "u-margin-top-s")}>
            <button onClick={handleLiveDate}>
              <Image src={liveSVG} role="presentation" alt="" /> <span className="u-margin-left-xs">Live Data</span>
            </button>
          </div>
        )}
        {onSubmit && (
          <div className={classnames(styles["c-date-picker__submit-container"], "u-text-right")}>
            <button className="c-button c-button--new-style c-button--flame" onClick={handleSubmit}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

DatePicker.displayName = "DatePicker";

DatePicker.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  hasLiveDataButton: PropTypes.bool
};

DatePicker.defaultProps = {
  initialDate: new Date(),
  onChange: () => {},
  className: "",
  onSubmit: null,
  hasLiveDataButton: false
};

export default DatePicker;
