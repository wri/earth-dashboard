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
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
});
