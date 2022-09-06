import { render, fireEvent, waitFor, waitForElementToBeRemoved } from "test-utils";
import headlines from "../../../../test/headlines.json";
import { GCAAPI } from "../../../../utils/axios";
import Menu from "./index";
import { earthServer } from "../../../../test/iframeBridge";

jest.mock("../../../../utils/axios");

test("<Menu /> renders correctly as desktop", async () => {
  GCAAPI.get.mockResolvedValue({ data: headlines });

  const { container, queryAllByTestId, getByText } = render(
    <Menu isMobile={false} isClosing={false} layers={[]} earthServer={earthServer} />
  );

  await waitFor(() => queryAllByTestId("headline"));

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="c-home-menu-container"
      >
        <div>
          <div
            class="c-home-menu c-home-menu--is-info-page"
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
                        <span
                          class="c-content-panel__button-text"
                        >
                          View All
                        </span>
                        <span
                          class="c-content-panel__button-icon"
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
    </div>
  `);
});

test("<Menu /> renders correctly as mobile", async () => {
  GCAAPI.get.mockResolvedValue({ data: headlines });

  const { container, queryAllByTestId, getByText } = render(
    <Menu isMobile={true} isClosing={true} layers={[]} earthServer={earthServer} />
  );

  await waitFor(() => queryAllByTestId("headline"));

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="c-home-menu-container c-home-menu-container--closing"
      >
        <div
          class="c-dialog-panel__draggable"
          style="position: absolute; user-select: auto; width: auto; height: 70vh; max-width: 100vw; max-height: 90vh; min-width: 100vw; min-height: 50vh; box-sizing: border-box; flex-shrink: 0;"
        >
          <div
            class="c-home-menu c-home-menu--closing c-home-menu--is-info-page"
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
                        <span
                          class="c-content-panel__button-text"
                        >
                          View All
                        </span>
                        <span
                          class="c-content-panel__button-icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              class="c-dialog-panel__draggable__handle"
              style="position: absolute; user-select: none; width: 100%; height: 50px; top: -42px; left: 0px; cursor: row-resize;"
            />
          </div>
        </div>
      </div>
    </div>
  `);
});
