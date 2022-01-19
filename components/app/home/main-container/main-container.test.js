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
  GCAAPI.get.mockResolvedValue({ data: modes });
  useIframeBridge.mockReturnValue(mockIframeBridge);

  const { container, getByTestId } = utilRender(<MainContainer isMobile={false} />);

  await waitFor(() => getByTestId("labels-arr"));

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -desktop -has-menu-open"
    data-testid="iframe-container"
  >
    <iframe
      allowtransparency="true"
      frameborder="0"
      height="100%"
      id="nullSchoolIframe"
      width="100%"
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
            class="c-home-menu__tabs"
            data-tabs="true"
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
                  Latest Extreme Events
                </h2>
                <button
                  aria-label="Close menu"
                  class="c-home-menu__close-button"
                />
              </div>
              <ul
                class="c-home-menu__tab-list u-padding-top-xs"
                role="tablist"
              >
                <li
                  aria-controls="react-tabs-1"
                  aria-disabled="false"
                  aria-selected="true"
                  class="c-home-menu__tab u-margin-right-l react-tabs__tab--selected"
                  data-testid="tab-1"
                  id="react-tabs-0"
                  role="tab"
                  tabindex="0"
                >
                  Latest Extreme Events
                </li>
                <li
                  aria-controls="react-tabs-3"
                  aria-disabled="false"
                  aria-selected="false"
                  class="c-home-menu__tab u-margin-right-l"
                  data-testid="tab-2"
                  id="react-tabs-2"
                  role="tab"
                >
                  Data Highlights
                </li>
                <li
                  aria-controls="react-tabs-5"
                  aria-disabled="false"
                  aria-selected="false"
                  class="c-home-menu__tab"
                  data-testid="tab-3"
                  id="react-tabs-4"
                  role="tab"
                >
                  Advanced Menu
                </li>
              </ul>
            </div>
            <div
              class="c-home-menu__content u-padding-none"
            >
              <div
                class="c-home-menu__tab-container"
              >
                <div
                  aria-labelledby="react-tabs-0"
                  class="c-home-menu__tab-panel react-tabs__tab-panel--selected"
                  data-testid="panel-1"
                  id="react-tabs-1"
                  role="tabpanel"
                >
                  <p
                    class="c-home-menu__tab-description u-margin-none"
                  >
                    The effects of human-induced climate change can be seen and felt across the planet.
                    <br />
                    Explore the latest alerts from Mongabay below.
                  </p>
                  <div
                    class="c-home-menu__tab-panel-scroll-area c-home-menu__tab-panel-scroll-area--extra-top"
                  >
                    <button
                      class="c-headline-card c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline-card__image"
                        role="presentation"
                      />
                      <div>
                        <h3
                          class="c-headline-card__title"
                        >
                          Air Pollution
                        </h3>
                        <p
                          class="c-headline-card__subtitle"
                        >
                          18th January 2022
                        </p>
                      </div>
                    </button>
                    <button
                      class="c-headline-card c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline-card__image"
                        role="presentation"
                      />
                      <div>
                        <h3
                          class="c-headline-card__title"
                        >
                          Air
                        </h3>
                        <p
                          class="c-headline-card__subtitle"
                        >
                          18th January 2022
                        </p>
                      </div>
                    </button>
                    <button
                      class="c-headline-card c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline-card__image"
                        role="presentation"
                      />
                      <div>
                        <h3
                          class="c-headline-card__title"
                        >
                          Ocean
                        </h3>
                        <p
                          class="c-headline-card__subtitle"
                        >
                          18th January 2022
                        </p>
                      </div>
                    </button>
                    <button
                      class="c-headline-card c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline-card__image"
                        role="presentation"
                      />
                      <div>
                        <h3
                          class="c-headline-card__title"
                        >
                          Atmosphere
                        </h3>
                        <p
                          class="c-headline-card__subtitle"
                        >
                          18th January 2022
                        </p>
                      </div>
                    </button>
                    <button
                      class="c-headline-card c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline-card__image"
                        role="presentation"
                      />
                      <div>
                        <h3
                          class="c-headline-card__title"
                        >
                          Winds
                        </h3>
                        <p
                          class="c-headline-card__subtitle"
                        >
                          18th January 2022
                        </p>
                      </div>
                    </button>
                    <button
                      class="c-headline-card c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline-card__image"
                        role="presentation"
                      />
                      <div>
                        <h3
                          class="c-headline-card__title"
                        >
                          Fires
                        </h3>
                        <p
                          class="c-headline-card__subtitle"
                        >
                          18th January 2022
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
                <div
                  aria-labelledby="react-tabs-2"
                  class="c-home-menu__tab-panel"
                  data-testid="panel-2"
                  id="react-tabs-3"
                  role="tabpanel"
                />
                <div
                  aria-labelledby="react-tabs-4"
                  class="c-home-menu__tab-panel"
                  data-testid="panel-3"
                  id="react-tabs-5"
                  role="tabpanel"
                />
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
      <div
        class="c-map-controls c-home-actions__map-controls"
      />
      <div
        class="c-showing-data-for"
      >
        <button
          class="c-showing-data-for__button"
        >
          <span
            class="c-showing-data-for__text"
          >
            Showing Data for:
            <span
              class="c-showing-data-for__date"
            >
              xxxx-xx-xx
            </span>
          </span>
          <div
            class="c-button c-button--icon c-showing-data-for__icon"
          />
        </button>
      </div>
    </div>
  </div>
</div>
`);
});

test("<MainContainer /> renders correctly as mobile", async () => {
  GCAAPI.get.mockResolvedValue({ data: modes });
  useIframeBridge.mockReturnValue(mockIframeBridge);

  const { container, getByTestId } = utilRender(<MainContainer isMobile={true} />);
  await waitFor(() => getByTestId("labels-arr"));

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -mobile"
    data-testid="iframe-container"
  >
    <div
      class="c-home-actions u-padding-horizontal-l"
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
