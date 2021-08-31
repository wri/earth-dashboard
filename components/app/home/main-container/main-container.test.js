import { render, fireEvent } from "test-utils";
import MainContainer from "./index";
import { getEarthServer } from "../../../../services/iframeBridge";

jest.mock("services/iframeBridge");

test("<MainContainer /> renders correctly as desktop", () => {
  const { container } = render(<MainContainer isMobile={false} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -desktop"
    data-testid="iframe-container"
  >
    <div
      class="c-home-actions u-padding-horizontal-l"
    >
      <div>
        <button
          aria-controls="menu"
          aria-expanded="false"
          aria-haspopup="true"
          class="c-home-menu-toggle u-padding-horizontal-xs"
          data-testid="toggle"
          id="menu-button"
        >
          <div
            class="c-home-menu-toggle__text-container"
          >
            <span>
              Understand the emergency
            </span>
            <span>
              Lorem ipsum
            </span>
          </div>
        </button>
      </div>
    </div>
    <div
      class="text-container -desktop"
    >
      <div
        class="banner -desktop"
      >
        <h1>
          This is not a drill
        </h1>
        <h1>
          It's a 
          <span
            class="gradient"
          >
            Planetary emergency
          </span>
          .
        </h1>
      </div>
    </div>
  </div>
</div>
`);
});

test("<MainContainer /> renders correctly as mobile", () => {
  const { container } = render(<MainContainer isMobile={true} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -mobile"
    data-testid="iframe-container"
  >
    <div
      class="c-home-actions u-padding-horizontal-l"
    >
      <div>
        <button
          aria-controls="menu"
          aria-expanded="false"
          aria-haspopup="true"
          class="c-home-menu-toggle u-padding-horizontal-xs"
          data-testid="toggle"
          id="menu-button"
        >
          <div
            class="c-home-menu-toggle__text-container"
          >
            <span>
              Understand the emergency
            </span>
            <span>
              Lorem ipsum
            </span>
          </div>
        </button>
      </div>
    </div>
    <div
      class="text-container -mobile"
    >
      <div
        class="banner -mobile"
      >
        <h1>
          This is not a drill
        </h1>
        <h1>
          It's a 
          <span
            class="gradient"
          >
            Planetary emergency
          </span>
          .
        </h1>
      </div>
    </div>
  </div>
</div>
`);
});

test("<MainContainer /> toggle class toggles properly", () => {
  const { getByTestId } = render(<MainContainer isMobile={false} />);

  const button = getByTestId("toggle");
  const container = getByTestId("iframe-container");

  expect(container.classList.contains("-has-menu-open")).toBe(false);

  fireEvent.click(button);

  expect(container.classList.contains("-has-menu-open")).toBe(true);
});
