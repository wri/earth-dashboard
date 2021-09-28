/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { render, fireEvent } from "test-utils";
import MapControls from "./index";
import settingControls from "constants/control-bar/controls/settings";
import locationControls from "constants/control-bar/controls/location";
import * as redux from "react-redux";

const controls = [settingControls, locationControls];

jest.mock("next/image", () => {
  return () => <img />;
});

test("<MapControls /> renders correctly", () => {
  const { container } = render(<MapControls controls={controls} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-map-controls"
  >
    <button
      aria-label="Settings"
      class="c-button c-button--icon u-margin-right-xs"
    >
      <img />
    </button>
    <button
      aria-label="Get current location"
      class="c-button c-button--icon u-margin-right-xs"
    >
      <img />
    </button>
  </div>
</div>
`);
});

test("<MapControls /> fires dispatch on button click correctly", () => {
  const useDispatchSpy = jest.spyOn(redux, "useDispatch");
  const mockDispatchFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  const { getByRole } = render(<MapControls controls={controls} />);
  const locationButton = getByRole("button", { name: locationControls["aria-label"] });

  expect(mockDispatchFn).toHaveBeenCalledTimes(0);

  fireEvent.click(locationButton);

  expect(mockDispatchFn).toHaveBeenCalledWith(locationControls.getDispatch()());

  useDispatchSpy.mockClear();
});
