import { render, fireEvent } from "test-utils";
import Switch from "./component";
import * as redux from "react-redux";

describe("Form switch", () => {
  test("renders correctly", () => {
    const { container } = render(
      <Switch className="Test" label="Test" isActiveSelector={() => () => false} handleChange={() => {}} />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <label
          class="c-custom-styled-switch Test"
        >
          <span
            class="c-custom-styled-switch__label u-margin-bottom-none"
          >
            Test
          </span>
          <div
            class="fresnel-container fresnel-greaterThanOrEqual-md "
          >
            <div
              style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 22px; transition: opacity 0.25s; user-select: none;"
            >
              <div
                class="react-switch-bg"
                style="height: 44px; width: 80px; margin: 0px; position: relative; background: rgb(56, 68, 79); border-radius: 22px; cursor: pointer; transition: background 0.25s;"
              />
              <div
                class="react-switch-handle"
                style="height: 32px; width: 32px; background: rgb(255, 255, 255); display: inline-block; cursor: pointer; border-radius: 50%; position: absolute; transform: translateX(6px); top: 6px; outline: 0; border: 0px; transition: background-color 0.25s, transform 0.25s, box-shadow 0.15s;"
              />
              <input
                aria-checked="false"
                data-testid="test-switch"
                role="switch"
                style="border: 0px; height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px;"
                type="checkbox"
              />
            </div>
          </div>
          <div
            class="fresnel-container fresnel-lessThan-md "
          >
            <div
              style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 16px; transition: opacity 0.25s; user-select: none;"
            >
              <div
                class="react-switch-bg"
                style="height: 32px; width: 58px; margin: 0px; position: relative; background: rgb(56, 68, 79); border-radius: 16px; cursor: pointer; transition: background 0.25s;"
              />
              <div
                class="react-switch-handle"
                style="height: 24px; width: 24px; background: rgb(255, 255, 255); display: inline-block; cursor: pointer; border-radius: 50%; position: absolute; transform: translateX(4px); top: 4px; outline: 0; border: 0px; transition: background-color 0.25s, transform 0.25s, box-shadow 0.15s;"
              />
              <input
                aria-checked="false"
                data-testid="test-switch"
                role="switch"
                style="border: 0px; height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px;"
                type="checkbox"
              />
            </div>
          </div>
        </label>
      </div>
    `);
  });

  test("used the selector function to find the state of the switch", () => {
    const mockActiveSelector = jest.fn(() => false);
    render(
      <Switch className="Test" label="Test" isActiveSelector={() => mockActiveSelector} handleChange={() => {}} />
    );
    expect(mockActiveSelector).toHaveBeenCalled();
  });

  test("fires dispatch event when switched", () => {
    const mockDispatch = jest.fn();
    const mockHandleChange = jest.fn(checked => checked);
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    useDispatchSpy.mockReturnValue(mockDispatch);

    const { getAllByTestId } = render(
      <Switch className="Test" label="Test" isActiveSelector={() => () => false} handleChange={mockHandleChange} />
    );

    fireEvent.click(getAllByTestId("test-switch")[0]);
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockHandleChange).toHaveReturnedWith(true);
  });
});
