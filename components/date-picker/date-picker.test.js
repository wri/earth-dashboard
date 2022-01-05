/* eslint-disable react/display-name */
import React from "react";
import { render as utilRender, fireEvent, screen } from "test-utils";
import DatePicker, { defaultWeekStart } from "components/date-picker";

jest.mock("next/image", () => {
  return () => <img />;
});

describe("DatePicker", () => {
  let initialDate,
    onSubmit,
    onChange,
    ref = React.createRef(),
    props;

  beforeEach(() => {
    initialDate = new Date(2022, 0, 4);
    onSubmit = jest.fn();
    onChange = jest.fn();

    props = {
      initialDate,
      onSubmit,
      onChange,
      ref,
      hasLiveDataButton: false
    };
  });

  const render = () => {
    utilRender(<DatePicker {...props} />);
  };

  const getSelectedDate = () => screen.getByTestId("selectedDate");

  /**
   * Loops over each day in the current month of the given date and checks if
   * a cell for each day is available on the screen.
   * This shows that the correct number of days for the given month has been
   * rendered.
   * @param date The date object that the datepicker is currently displaying
   */
  const expectAllDatesWithinTheCurrentMonthToBeDefined = date => {
    let loopDate = new Date(date),
      loopMonth = loopDate.getMonth();

    loopDate.setDate(1);

    while (loopDate.getMonth() === loopMonth) {
      expect(screen.queryByRole("cell", { name: loopDate.getDate() })).toBeDefined();

      loopDate.setDate(loopDate.getDate() + 1);
    }
  };

  /**
   * Finds the number of next siblings the given element has
   * @param el an element with potential next siblings
   * @returns {number} the number of next siblings
   */
  const findNumOfNextSiblings = el => {
    let numOfNextSiblings = 0,
      sibling = el.nextSibling;

    while (sibling) {
      numOfNextSiblings += 1;
      sibling = sibling.nextSibling;
    }

    return numOfNextSiblings;
  };

  test("the current date is selected", () => {
    render();

    expect(getSelectedDate()).toBeDefined();
  });

  test("the passed reference is the current date", () => {
    render();

    expect(ref.current).toBeDefined();

    const referenceDate = parseInt(ref.current.innerHTML);
    expect(referenceDate).toEqual(initialDate.getDate());
  });

  test("renders the current month for the initial date correctly", () => {
    render();

    expectAllDatesWithinTheCurrentMonthToBeDefined(initialDate);

    // Check the selected date is in the correct column
    // If it is then the assumption is made that the rest of the dates for the
    // month have rendered in the correct columns, otherwise the selected date
    // would have shifted to a wrong column.
    const selectedDateCell = getSelectedDate().parentElement,
      numOfNextSiblings = findNumOfNextSiblings(selectedDateCell);

    // 4th January 2022 is a Tuesday so should be in column 3
    // totalNumOfColumns - correctColumnNum = numOfNextSiblings
    expect(numOfNextSiblings).toEqual(7 - 3);
  });

  test("on user request, renders the next month correctly", () => {
    render();

    fireEvent.click(screen.getByRole("button", { name: "Next Month" }));

    let nextMonthDate = new Date(initialDate);
    // February 2022
    nextMonthDate.setMonth(initialDate.getMonth() + 1);

    expectAllDatesWithinTheCurrentMonthToBeDefined(nextMonthDate);

    // Check the 1st of the Month is in the correct column
    // If it is then the assumption is made that the rest of the dates for the
    // month have rendered in the correct columns.
    const firstDateCell = screen.getByRole("cell", { name: "1" }),
      numOfNextSiblings = findNumOfNextSiblings(firstDateCell);

    // 1st February 2022 is a Tuesday so should be column 3
    // totalNumOfColumns - correctColumnNum = numOfNextSiblings
    expect(numOfNextSiblings).toEqual(7 - 3);
  });

  test("on user request, renders the previous month correctly", () => {
    render();

    fireEvent.click(screen.getByRole("button", { name: "Previous Month" }));

    let previousMonthDate = new Date(initialDate);
    // December 2021
    previousMonthDate.setMonth(initialDate.getMonth() - 1);

    expectAllDatesWithinTheCurrentMonthToBeDefined(previousMonthDate);

    // Check the 1st of the Month is in the correct column
    // If it is then the assumption is made that the rest of the dates for the
    // month have rendered in the correct columns.
    const firstDateCell = screen.getByRole("cell", { name: "1" }),
      numOfNextSiblings = findNumOfNextSiblings(firstDateCell);

    // 1st December 2021 is a Wednesday so should be column 4
    // totalNumOfColumns - correctColumnNum = numOfNextSiblings
    expect(numOfNextSiblings).toEqual(7 - 4);
  });

  test("when user selects a new date, onChange() is called with the selected date passed", () => {
    render();

    // Select the 3rd of January
    fireEvent.click(screen.getByRole("button", { name: "3" }));

    const jan3rdDate = new Date(initialDate);
    jan3rdDate.setDate(3);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(jan3rdDate);
  });

  test("when user presses confirm, onSubmit() is called with the selected date passed", () => {
    render();

    // Select the 3rd of January
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    const jan3rdDate = new Date(initialDate);
    jan3rdDate.setDate(3);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(jan3rdDate);
  });

  describe("Live Data Button", () => {
    test("does not display when prop is false", () => {
      render();

      expect(screen.queryByRole("button", { name: "Live Data" })).toBeNull();
    });

    test("displays when prop is true", () => {
      props = {
        ...props,
        hasLiveDataButton: true
      };

      render();

      expect(screen.queryByRole("button", { name: "Live Data" })).toBeDefined();
    });

    test("when clicked the date picker will switch to the current month and select the current date", () => {
      props = {
        ...props,
        hasLiveDataButton: true
      };

      render();

      fireEvent.click(screen.getByRole("button", { name: "Live Data" }));

      const currentDate = new Date();

      // Selected Date matches the current Date
      const selectedDate = getSelectedDate();
      expect(parseInt(selectedDate.innerHTML)).toEqual(currentDate.getDate());

      expectAllDatesWithinTheCurrentMonthToBeDefined(currentDate);

      // Check the selected date is in the correct column
      // If it is then the assumption is made that the rest of the dates for the
      // month have rendered in the correct columns, otherwise the selected date
      // would have shifted to a wrong column.
      const selectedDateCell = selectedDate.parentElement,
        numOfNextSiblings = findNumOfNextSiblings(selectedDateCell);

      // As we can't be certain what the current date is then we need to work
      // out which day the selected date is and which column that should be in.
      // 0 | 1 | 2 | 3 | 4 | 5 | 6
      const dayOfWeek = currentDate.getDay();

      // In case the week starts on a different day other than Sunday (0)
      let correctColumn = dayOfWeek - defaultWeekStart;
      // If negative
      if (correctColumn < 0) {
        correctColumn += 7;
      }

      // totalNumOfColumns - numOfNextSiblings = columnNum (starting from 0)
      expect(correctColumn).toEqual(6 - numOfNextSiblings);
    });
  });

  describe("Quick Selects", () => {
    test("when the month quick select is changed the date picker will switch to that month", async () => {
      render();

      const monthSelect = screen.getByRole("textbox", { name: "Quick Select Month" });

      fireEvent.focus(monthSelect);
      fireEvent.keyDown(monthSelect, { key: "ArrowDown", code: 40 });
      fireEvent.click(screen.getByText("February"));

      let februaryDate = new Date(initialDate);
      // February 2022
      februaryDate.setMonth(1);

      expectAllDatesWithinTheCurrentMonthToBeDefined(februaryDate);

      // Check the 1st of the Month is in the correct column
      // If it is then the assumption is made that the rest of the dates for the
      // month have rendered in the correct columns.
      const firstDateCell = screen.getByRole("cell", { name: "1" }),
        numOfNextSiblings = findNumOfNextSiblings(firstDateCell);

      // 1st February 2022 is a Tuesday so should be column 3
      // totalNumOfColumns - correctColumnNum = numOfNextSiblings
      expect(numOfNextSiblings).toEqual(7 - 3);
    });

    test("when the year quick select is changed the date picker will switch to that year", async () => {
      render();

      const yearSelect = screen.getByRole("textbox", { name: "Quick Select Year" });

      fireEvent.focus(yearSelect);
      fireEvent.keyDown(yearSelect, { key: "ArrowDown", code: 40 });
      fireEvent.click(screen.getByText("2023"));

      let date2023 = new Date(initialDate);
      // January 2023
      date2023.setFullYear(2023);

      expectAllDatesWithinTheCurrentMonthToBeDefined(date2023);

      // Check the 1st of the Month is in the correct column
      // If it is then the assumption is made that the rest of the dates for the
      // month have rendered in the correct columns.
      const firstDateCell = screen.getByRole("cell", { name: "1" }),
        numOfNextSiblings = findNumOfNextSiblings(firstDateCell);

      // 1st January 2023 is a Sunday so should be column 1
      // totalNumOfColumns - correctColumnNum = numOfNextSiblings
      expect(numOfNextSiblings).toEqual(7 - 1);
    });
  });
});
