/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import { render, fireEvent, waitFor } from "test-utils";
import DatePickerMenu from "./component";

jest.mock("next/image", () => {
  return () => <img />;
});

test("<DatePickerMenu /> fires onClose when close button selected", async () => {
  const mockOnClose = jest.fn();

  const { getByTestId } = render(<DatePickerMenu isOpen isMobile={false} onClose={mockOnClose} setDate={() => {}} />);

  await waitFor(() => getByTestId("close-button"));
  const button = getByTestId("close-button");
  const container = getByTestId("menu");

  expect(mockOnClose.mock.calls.length).toBe(0);

  fireEvent.click(button);

  await waitFor(() => !getByTestId("close-button"));

  expect(mockOnClose.mock.calls.length).toBe(1);
});
