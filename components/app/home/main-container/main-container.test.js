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
      <div
        class="c-layout"
      >
        <div
          class="c-layout__header"
        >
          <div
            class="c-layout__header-content c-layout__header-content--has-globe-icon"
          >
            <h2
              class="c-layout__header-text"
            >
              I'd like to explore
            </h2>
            <button
              aria-label="Close"
              class="c-icon-button medium c-layout__close-button"
            />
          </div>
        </div>
        <div
          class="c-layout__content u-padding-none"
        >
          <div
            class="c-home-menu__scroll-area"
          >
            <div
              class="c-content-panel__underlay c-content-panel__underlay--can-focus c-home-menu__all-events"
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
                  class="c-content-panel__cta"
                >
                  <button
                    class="c-cta-button"
                  >
                    <div
                      class="c-cta-button__content"
                    >
                      <span
                        class="c-cta-button__text"
                      >
                        View All
                      </span>
                      <span
                        class="c-cta-button__icon"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div
              class="c-content-panel__underlay c-content-panel__underlay--can-focus"
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
                  class="c-content-panel__cta"
                >
                  <button
                    class="c-cta-button"
                  >
                    <div
                      class="c-cta-button__content"
                    >
                      <span
                        class="c-cta-button__text"
                      >
                        Learn More
                      </span>
                      <span
                        class="c-cta-button__icon"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div
              class="c-content-panel__underlay c-content-panel__underlay--can-focus"
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
                  class="c-content-panel__cta"
                >
                  <button
                    class="c-cta-button"
                  >
                    <div
                      class="c-cta-button__content"
                    >
                      <span
                        class="c-cta-button__text"
                      >
                        Learn More
                      </span>
                      <span
                        class="c-cta-button__icon"
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
    <div
      class="c-home-actions over-pointer-absolute c-home-menu-action"
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
            I'd like to explore
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
      class="c-mobile-menu-container"
      style="z-index: 0; height: 92px;"
    >
      <div
        class="c-mobile-menu-container__draggable"
        style="position: relative; user-select: auto; width: 100vw; height: 92px; max-width: 100vw; max-height: 635.2px; min-width: 100vw; min-height: 92px; box-sizing: border-box; flex-shrink: 0;"
      >
        <div
          class="c-home-menu-container"
        >
          <div
            class="c-layout"
          >
            <div
              class="c-layout__header"
            >
              <div
                class="c-layout__header-content c-layout__header-content--has-globe-icon"
              >
                <h2
                  class="c-layout__header-text"
                >
                  I'd like to explore
                </h2>
                <button
                  aria-label="Close"
                  class="c-icon-button medium c-layout__close-button"
                />
              </div>
            </div>
            <div
              class="c-layout__content u-padding-none"
            >
              <div
                class="c-home-menu__scroll-area"
              >
                <div
                  class="c-content-panel__underlay c-content-panel__underlay--can-focus c-home-menu__all-events"
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
                      class="c-content-panel__cta"
                    >
                      <button
                        class="c-cta-button"
                      >
                        <div
                          class="c-cta-button__content"
                        >
                          <span
                            class="c-cta-button__text"
                          >
                            View All
                          </span>
                          <span
                            class="c-cta-button__icon"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="c-content-panel__underlay c-content-panel__underlay--can-focus"
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
                      class="c-content-panel__cta"
                    >
                      <button
                        class="c-cta-button"
                      >
                        <div
                          class="c-cta-button__content"
                        >
                          <span
                            class="c-cta-button__text"
                          >
                            Learn More
                          </span>
                          <span
                            class="c-cta-button__icon"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="c-content-panel__underlay c-content-panel__underlay--can-focus"
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
                      class="c-content-panel__cta"
                    >
                      <button
                        class="c-cta-button"
                      >
                        <div
                          class="c-cta-button__content"
                        >
                          <span
                            class="c-cta-button__text"
                          >
                            Learn More
                          </span>
                          <span
                            class="c-cta-button__icon"
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
        <div>
          <div
            class="c-mobile-menu-container__draggable__handle"
            style="position: absolute; user-select: none; width: 100%; height: 50px; top: -42px; left: 0px; cursor: row-resize;"
          />
        </div>
      </div>
    </div>
    <div
      class="c-condensed-menu"
    >
      <div
        class="c-condensed-menu__title-container"
        style="margin-bottom: 0px;"
      >
        <p
          class="title"
        >
          I'd like to explore
        </p>
        <button
          class="c-icon-button small location-icon"
        />
        <button
          class="c-icon-button small expand-icon"
        />
      </div>
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
