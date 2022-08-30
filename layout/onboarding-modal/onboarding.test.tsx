import React from "react";
import { render as utilRender, fireEvent, screen } from "test-utils";
import DatePicker, { defaultWeekStart } from "components/date-picker";
import { render } from "@testing-library/react";
import OnboardingModal from "./index";
describe("Onboarding Testing", () => {
  let props: any;

  const render = (show: boolean) => {
    return utilRender(<OnboardingModal {...props} showModal={show} />);
  };

  test("Back button is initially disabled", () => {
    render(true);

    const bacKButton = screen.getByTestId("back-btn");
    expect(bacKButton).toBeDisabled();
  });

  test("Clicking on the continue button should enable back button", () => {
    render(true);

    const continueButton = screen.getByTestId("forward-btn");
    const backButton = screen.getByTestId("back-btn");

    fireEvent.click(continueButton);
    expect(backButton).toBeEnabled();
  });
});
