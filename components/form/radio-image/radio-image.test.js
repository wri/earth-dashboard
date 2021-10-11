/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import { render, fireEvent } from "test-utils";
import RadioImage from "./component";
import TestImage from "public/static/images/star-background.jpg";
import * as redux from "react-redux";

const options = [
  { id: "Test", image: TestImage, label: "Test" },
  { id: "Test2", image: TestImage, label: "Test2" }
];

jest.mock("next/image", () => {
  return () => <img />;
});

jest.mock("react-uuid", () => {
  return () => "1";
});

describe("Form Radio Image", () => {
  test("renders correctly", () => {
    const { container } = render(
      <RadioImage
        className="Test"
        label="Test"
        name="Test"
        options={options}
        getSelectedOption={() => () => "Test"}
        handleChange={() => {}}
      />
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-radio-image Test"
  >
    <span
      class="c-radio-image__label"
      id="radio-image-1"
    >
      Test
    </span>
    <div
      aria-labelledby="radio-image-1"
      class="c-radio-image__options"
      role="group"
    >
      <div>
        <input
          checked=""
          class="c-radio-image__input"
          data-testid="Test"
          id="radio-image-Test-Test"
          name="Test"
          type="radio"
          value="Test"
        />
        <label
          class="c-radio-image__input-label"
          for="radio-image-Test-Test"
        >
          <div
            class="c-radio-image__image"
          >
            <img />
          </div>
          <span
            class="c-radio-image__image__label"
          >
            Test
          </span>
        </label>
      </div>
      <div>
        <input
          class="c-radio-image__input"
          data-testid="Test2"
          id="radio-image-Test-Test2"
          name="Test"
          type="radio"
          value="Test2"
        />
        <label
          class="c-radio-image__input-label c-radio-image__input-label--unchecked"
          for="radio-image-Test-Test2"
        >
          <div
            class="c-radio-image__image"
          >
            <img />
          </div>
          <span
            class="c-radio-image__image__label"
          >
            Test2
          </span>
        </label>
      </div>
    </div>
  </div>
</div>
`);
  });

  test("used the selector function to find which radio option is selected", () => {
    const mockGetSelectedOption = jest.fn(() => "Test");
    render(
      <RadioImage
        className="Test"
        label="Test"
        name="Test"
        options={options}
        getSelectedOption={() => mockGetSelectedOption}
        handleChange={() => {}}
      />
    );

    expect(mockGetSelectedOption).toHaveBeenCalled();
  });

  test("fires dispatch event when radio option is changed", () => {
    const mockDispatch = jest.fn();
    const mockHandleChange = jest.fn(id => id);
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    useDispatchSpy.mockReturnValue(mockDispatch);

    const { getByTestId } = render(
      <RadioImage
        className="Test"
        label="Test"
        name="Test"
        options={options}
        getSelectedOption={() => () => "Test"}
        handleChange={mockHandleChange}
      />
    );

    fireEvent.click(getByTestId("Test2"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockHandleChange).toHaveReturnedWith("Test2");
  });
});
