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

  const { container } = utilRender(<MainContainer isMobile={false} />);

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -desktop -has-menu-open"
    data-testid="iframe-container"
  >
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
          class="c-home-menu-toggle__text-container"
        >
          <span>
            This Is A Planetary Emergency...
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
    class="main-container -mobile -has-menu-open"
    data-testid="iframe-container"
  >
    <div
      class="c-mobile-menu-container"
      style="height: 380px; z-index: 1000;"
    >
      <div
        class="c-mobile-menu-container__draggable"
        style="position: relative; user-select: auto; width: 100vw; height: 380px; max-width: 100vw; max-height: 380px; min-width: 100vw; min-height: 263px; box-sizing: border-box; flex-shrink: 0;"
      >
        <div
          class="c-home-menu-container"
        >
          <div
            class="c-layout"
            style="padding-bottom: 56px;"
          >
            <div
              class="c-layout__header"
            >
              <div
                class="c-layout__header-content"
              >
                <h2
                  class="c-layout__header-text"
                >
                  This Is A Planetary Emergency...
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
                class="info-container"
              >
                <div
                  class="carousel-container"
                  style="height: auto;"
                >
                  <button
                    class="c-view-all-card"
                  >
                    <div
                      class="content-container"
                    >
                      <h1
                        class="title"
                      >
                        All Extreme Events
                      </h1>
                      <p
                        class="description"
                      >
                        View all of Mongabay’s latest extreme events
                      </p>
                      <button
                        class="c-cta-button"
                      >
                        <div
                          class="c-cta-button__content"
                        >
                          <span
                            class="c-cta-button__text"
                          >
                            VIEW ALL
                          </span>
                          <span
                            class="c-cta-button__icon"
                          />
                        </div>
                      </button>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="c-mobile-menu-container__draggable__handle c-mobile-menu-container__draggable__handle__open"
            style="position: absolute; user-select: none; width: 100%; height: 50px; top: -42px; left: 0px; cursor: row-resize;"
          />
        </div>
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

  test("menu opens initial on mobile", () => {
    isMobile = true;

    render();

    const container = screen.getByTestId("iframe-container");

    expect(container.classList.contains("-has-menu-open")).toBe(true);
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
