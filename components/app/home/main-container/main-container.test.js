/* eslint-disable react/display-name */
import { render as utilRender, fireEvent, waitFor, screen } from "test-utils";
import MainContainer from "./index";
import useIframeBridge from "../../../../hooks/useIframeBridge";
import { EarthClient } from "../../../../utils/iframeBridge/earthClient";
import modes from "../../../../test/modes.json";
import headlines from "../../../../test/headlines.json";
import { GCAAPI } from "../../../../utils/axios";
import { earthServer } from "../../../../test/iframeBridge";

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

  const { container, getAllByTestId } = utilRender(<MainContainer isMobile={false} />);

  await waitFor(() => getAllByTestId("content-panel"), { timeout: 3000 });

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="main-container -desktop -has-menu-open"
        data-testid="iframe-container"
      >
        <div
          class="c-home-menu-container"
        >
          <div>
            <div
              class="c-home-menu"
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
                    aria-label="Close"
                    class="c-icon-button medium"
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
                    class="c-content-panel__underlay c-home-menu__all-events"
                    data-testid="content-panel"
                  >
                    <div
                      class="c-content-panel c-content-panel__focusable"
                      tabindex="0"
                    >
                      <div
                        class="c-content-panel__header-row"
                      >
                        <h3
                          class="c-content-panel__title"
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
                        class="c-content-panel__row"
                      >
                        <button
                          class="c-content-panel__button"
                        >
                          <div
                            class="c-content-panel__button-content"
                          >
                            <span
                              class="c-content-panel__button-text"
                            >
                              View All
                            </span>
                            <span
                              class="c-content-panel__button-icon"
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="c-content-panel__underlay"
                    data-testid="content-panel"
                  >
                    <div
                      class="c-content-panel c-content-panel__focusable"
                      tabindex="0"
                    >
                      <div
                        class="c-content-panel__header-row"
                      >
                        <img
                          alt=""
                          class="c-content-panel__image"
                          role="presentation"
                          src="https://gca-earth-hq-api-test.s3.us-west-1.amazonaws.com/7v0sYUds12E9Y1MBEbkyamiQKIsKHQU7BV0kdFYc.png"
                        />
                        <h3
                          class="c-content-panel__title"
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
                        class="c-content-panel__row"
                      >
                        <button
                          class="c-content-panel__button"
                        >
                          <div
                            class="c-content-panel__button-content"
                          >
                            <span
                              class="c-content-panel__button-text"
                            >
                              Learn More
                            </span>
                            <span
                              class="c-content-panel__button-icon"
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="c-content-panel__underlay"
                    data-testid="content-panel"
                  >
                    <div
                      class="c-content-panel c-content-panel__focusable"
                      tabindex="0"
                    >
                      <div
                        class="c-content-panel__header-row"
                      >
                        <img
                          alt=""
                          class="c-content-panel__image"
                          role="presentation"
                          src="https://gca-earth-hq-api-test.s3.us-west-1.amazonaws.com/T2wLMYnMeegJNFS8mm5QGEsZPJUSkOcF9fotdpAT.png"
                        />
                        <h3
                          class="c-content-panel__title"
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
                        class="c-content-panel__row"
                      >
                        <button
                          class="c-content-panel__button"
                        >
                          <div
                            class="c-content-panel__button-content"
                          >
                            <span
                              class="c-content-panel__button-text"
                            >
                              Learn More
                            </span>
                            <span
                              class="c-content-panel__button-icon"
                            />
                          </div>
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
          class="c-home-actions u-padding-horizontal-l over-pointer-absolute c-home-menu-action"
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

  const { container, getAllByTestId } = utilRender(<MainContainer isMobile={true} />);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="main-container -mobile"
        data-testid="iframe-container"
      >
        <div
          class="c-home-actions mobile u-padding-horizontal-l over-pointer-absolute c-home-menu-action"
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
