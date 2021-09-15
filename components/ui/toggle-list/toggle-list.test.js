import { render, fireEvent } from "test-utils";
import ToggleList from "./component";
import ToggleItem from "./toggle-item";
import { useState } from "react";

const ToggleExample = ({ onSelectCallback }) => {
  const [toggleValue, setToggleValue] = useState("wildfires");

  return (
    <ToggleList
      selectedValue={toggleValue}
      onSelect={value => {
        setToggleValue(value);
        if (onSelectCallback) {
          onSelectCallback(value);
        }
      }}
      title="Templates"
      data-testid="toggle-list"
    >
      <ToggleItem value="wildfires" className="u-margin-right-xxs" data-testid="toggle-1">
        Wildfires
      </ToggleItem>
      <ToggleItem value="winds" className="u-margin-right-xxs" data-testid="toggle-2">
        Winds
      </ToggleItem>
      <ToggleItem value="atmosphere" className="u-margin-right-xxs" data-testid="toggle-3">
        Atmosphere
      </ToggleItem>
      <ToggleItem value="ocean" data-testid="toggle-4">
        Ocean
      </ToggleItem>
    </ToggleList>
  );
};

test("<ToggleList /> renders correctly", () => {
  const { container } = render(<ToggleExample />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <fieldset
    class="c-toggle-list"
    data-testid="toggle-list"
  >
    <legend>
      Templates
    </legend>
    <label
      class="c-toggle-list__item c-toggle-list__item--selected u-margin-right-xxs"
    >
      Wildfires
       
      <input
        checked=""
        data-testid="toggle-1"
        name="Templates"
        type="radio"
        value="wildfires"
      />
    </label>
    <label
      class="c-toggle-list__item u-margin-right-xxs"
    >
      Winds
       
      <input
        data-testid="toggle-2"
        name="Templates"
        type="radio"
        value="winds"
      />
    </label>
    <label
      class="c-toggle-list__item u-margin-right-xxs"
    >
      Atmosphere
       
      <input
        data-testid="toggle-3"
        name="Templates"
        type="radio"
        value="atmosphere"
      />
    </label>
    <label
      class="c-toggle-list__item"
    >
      Ocean
       
      <input
        data-testid="toggle-4"
        name="Templates"
        type="radio"
        value="ocean"
      />
    </label>
  </fieldset>
</div>
`);
});

test("<ToggleList />  fires callback and toggles properly", () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<ToggleExample onSelectCallback={mockFn} />);

  const toggle1 = getByTestId("toggle-1");
  const toggle2 = getByTestId("toggle-2");
  expect(mockFn.mock.calls.length).toBe(0);
  expect(toggle1.checked).toBeTruthy();
  expect(toggle1.parentElement.classList.contains("c-toggle-list__item--selected")).toBeTruthy();
  expect(toggle2.checked).toBeFalsy();
  expect(toggle2.parentElement.classList.contains("c-toggle-list__item--selected")).toBeFalsy();

  // Click
  fireEvent.click(toggle2);
  expect(mockFn.mock.calls.length).toBe(1);
  expect(mockFn.mock.calls[0][0]).toBe("winds");
  expect(toggle1.checked).toBeFalsy();
  expect(toggle1.parentElement.classList.contains("c-toggle-list__item--selected")).toBeFalsy();
  expect(toggle2.checked).toBeTruthy();
  expect(toggle2.parentElement.classList.contains("c-toggle-list__item--selected")).toBeTruthy();
});
