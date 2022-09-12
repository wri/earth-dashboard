import { render, waitFor } from "test-utils";
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
              </div>
            </div>
            <div
              class="c-layout__content u-padding-none"
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
        <div>
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
              </div>
            </div>
            <div
              class="c-layout__content u-padding-none"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
