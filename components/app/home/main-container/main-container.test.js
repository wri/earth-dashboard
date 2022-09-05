/* eslint-disable react/display-name */
import { render as utilRender, fireEvent, waitFor, screen } from "test-utils";
import MainContainer from "./index";
import useIframeBridge from "../../../../hooks/useIframeBridge";
import { EarthClient } from "../../../../utils/iframeBridge/earthClient";
import modes from "../../../../test/modes.json";
import headlines from "../../../../test/headlines.json";
import { GCAAPI } from "../../../../utils/axios";
import { earthServer } from "../../../../test/iframeBridge";
import { findByTestId } from "@testing-library/react";

jest.mock("../../../../hooks/useIframeBridge");
jest.mock("../../../../utils/axios");
jest.mock("next/image", () => {
  return () => <></>;
});
jest.mock("../../../../utils/dates", () => {
  const originalModule = jest.requireActual("../../../../utils/dates");

  return {
    __esModule: true,
    ...originalModule,
    formatDate: () => "xxxx-xx-xx"
  };
});

const mockIframeBridge = {
  setRef: () => {},
  earthClient: new EarthClient(),
  earthServer: {
    current: earthServer
  },
  iframeRef: {
    current: null
  },
  layers: [],
  disableToolTip: () => {},
  enableToolTip: () => {}
};

test("<MainContainer /> renders correctly as desktop", async () => {
  GCAAPI.get.mockResolvedValueOnce({ data: modes });
  GCAAPI.get.mockResolvedValueOnce({ data: headlines });
  useIframeBridge.mockReturnValue(mockIframeBridge);

  const { container, getByTestId } = utilRender(<MainContainer isMobile={false} />);

  await waitFor(() => getByTestId("labels-arr"), { timeout: 3000 });

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -desktop -has-menu-open"
    data-testid="iframe-container"
  >
    <iframe
      allowtransparency="true"
      class="c-map-iframe"
      frameborder="0"
      id="nullSchoolIframe"
    />
    <div
      class="c-home-menu-container"
    >
      <div>
        <div
          class="c-home-menu"
          id="menu"
        >
          <div
            class="c-home-menu__header"
          >
            <div
              class="c-home-menu__header-content"
            >
              <h2
                class="c-home-menu__header-text"
              >
                I'd like to explore
              </h2>
              <button
                class="c-icon-button small"
              />
            </div>
          </div>
          <div
            class="c-home-menu__content u-padding-none"
          >
            <div
              class="c-home-menu__scroll-area"
            >
              <div
                class="c-menu-option__underlay c-home-menu__all-events"
                data-testid="option"
              >
                <div
                  class="c-menu-option"
                  tabindex="1"
                >
                  <div
                    class="c-menu-option__header-row"
                  >
                    <h3
                      class="c-menu-option__title"
                    >
                      All Extreme Events
                    </h3>
                  </div>
                  <p
                    class="c-menu-option__subtitle"
                  >
                    View all of the latest extreme events
                  </p>
                  <div
                    class="c-menu-option__row"
                  >
                    <button
                      class="c-menu-option__button"
                    >
                      <span
                        class="c-menu-option__button-text"
                      >
                        View All
                      </span>
                      <span
                        class="c-menu-option__button-icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="c-menu-option__underlay"
                data-testid="option"
              >
                <div
                  class="c-menu-option"
                  tabindex="1"
                >
                  <div
                    class="c-menu-option__header-row"
                  >
                    <h3
                      class="c-menu-option__title"
                    >
                      Fires
                    </h3>
                  </div>
                  <p
                    class="c-menu-option__subtitle"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Source: CAMS / Copernicus / European Commission + ECMWF
                  </p>
                  <div
                    class="c-menu-option__row"
                  >
                    <button
                      class="c-menu-option__button"
                    >
                      <span
                        class="c-menu-option__button-text"
                      >
                        Learn More
                      </span>
                      <span
                        class="c-menu-option__button-icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="c-menu-option__underlay"
                data-testid="option"
              >
                <div
                  class="c-menu-option"
                  tabindex="1"
                >
                  <div
                    class="c-menu-option__header-row"
                  >
                    <h3
                      class="c-menu-option__title"
                    >
                      Air Pollution
                    </h3>
                  </div>
                  <p
                    class="c-menu-option__subtitle"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Source: CAMS / Copernicus / European Commission + ECMWF
                  </p>
                  <div
                    class="c-menu-option__row"
                  >
                    <button
                      class="c-menu-option__button"
                    >
                      <span
                        class="c-menu-option__button-text"
                      >
                        Learn More
                      </span>
                      <span
                        class="c-menu-option__button-icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="c-home-actions u-padding-horizontal-l"
    >
      <button
        aria-controls="menu"
        aria-expanded="true"
        aria-haspopup="true"
        class="c-home-actions__item c-home-menu-toggle c-home-menu-toggle--open"
        data-testid="toggle"
        id="menu-button"
      >
        <div
          class="icon"
        />
        <div
          class="c-home-menu-toggle__text-container"
        >
          <span>
            Latest Extreme Events
          </span>
          <span
            data-testid="labels-arr"
          >
            Fires, Wind, PM2.5, Sfc
          </span>
        </div>
      </button>
    </div>
  </div>
</div>
`);
});

test("<MainContainer /> renders correctly as mobile", async () => {
  GCAAPI.get.mockResolvedValue({ data: modes });
  useIframeBridge.mockReturnValue(mockIframeBridge);

  const { container, getByTestId } = utilRender(<MainContainer isMobile={true} />);
  await waitFor(() => getByTestId("labels-arr"), { timeout: 3000 });

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -mobile"
    data-testid="iframe-container"
  >
    <div
      class="c-home-actions mobile u-padding-horizontal-l"
    >
      <button
        aria-controls="menu"
        aria-expanded="false"
        aria-haspopup="true"
        class="c-home-actions__item c-home-menu-toggle"
        data-testid="toggle"
        id="menu-button"
      >
        <div
          class="icon"
        />
        <div
          class="c-home-menu-toggle__text-container"
        >
          <span>
            Latest Extreme Events
          </span>
          <span
            data-testid="labels-arr"
          >
            Fires, Wind, PM2.5, Sfc
            <br />
             
            xxxx-xx-xx
          </span>
        </div>
      </button>
    </div>
  </div>
</div>
`);
});

describe("<MainContainer />", () => {
  let isMobile;

  beforeEach(() => {
    isMobile = false;

    GCAAPI.get.mockResolvedValueOnce({ data: modes });
    GCAAPI.get.mockResolvedValueOnce({ data: headlines });
  });

  const render = () => {
    utilRender(<MainContainer isMobile={isMobile} />);
  };

  test("menu opens initial on desktop", () => {
    render();

    const container = screen.getByTestId("iframe-container");

    expect(container.classList.contains("-has-menu-open")).toBe(true);
  });

  test("menu is closed initial on mobile", () => {
    isMobile = true;

    render();

    const container = screen.getByTestId("iframe-container");

    expect(container.classList.contains("-has-menu-open")).toBe(false);
  });

  test("menu closes when user clicks the toggle", async () => {
    render();

    const button = screen.getByTestId("toggle");
    const container = screen.getByTestId("iframe-container");

    fireEvent.click(button);

    await waitFor(() => {
      expect(container.classList.contains("-has-menu-open")).toBe(false);
    });
  });
});
