import { render, fireEvent } from "test-utils";
import Menu from "./index";

test("<Menu /> renders correctly as desktop", () => {
  const { container } = render(<Menu isMobile={false} isClosing={false} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-home-menu-container"
  >
    <div
      class="c-home-menu"
    >
      <div
        class="c-home-menu__header"
      >
        <h2
          class="c-home-menu__header-text"
        >
          Understand the emergency
        </h2>
      </div>
      <div
        class="c-home-menu__content u-padding-none"
      >
        <div
          class="c-home-menu__tabs"
          data-tabs="true"
        >
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
              What’s Happening
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
              Vital Signs
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
              Dive Into The Data
            </li>
          </ul>
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
                class="c-home-menu__tab-description"
              >
                What’s Happening
              </p>
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
`);
});

test("<Menu /> renders correctly as mobile", () => {
  const { container } = render(<Menu isMobile={true} isClosing={true} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-home-menu-container c-home-menu-container--closing"
  >
    <div
      class="c-home-menu c-home-menu--closing"
    >
      <div
        class="c-home-menu__header"
      >
        <h2
          class="c-home-menu__header-text"
        >
          Understand the emergency
        </h2>
      </div>
      <div
        class="c-home-menu__content u-padding-none"
      >
        <div
          class="c-home-menu__tabs"
          data-tabs="true"
        >
          <ul
            class="c-home-menu__tab-list u-padding-top-xs"
            role="tablist"
          >
            <li
              aria-controls="react-tabs-7"
              aria-disabled="false"
              aria-selected="true"
              class="c-home-menu__tab u-margin-right-l react-tabs__tab--selected"
              data-testid="tab-1"
              id="react-tabs-6"
              role="tab"
              tabindex="0"
            >
              What’s Happening
            </li>
            <li
              aria-controls="react-tabs-9"
              aria-disabled="false"
              aria-selected="false"
              class="c-home-menu__tab u-margin-right-l"
              data-testid="tab-2"
              id="react-tabs-8"
              role="tab"
            >
              Vital Signs
            </li>
            <li
              aria-controls="react-tabs-11"
              aria-disabled="false"
              aria-selected="false"
              class="c-home-menu__tab"
              data-testid="tab-3"
              id="react-tabs-10"
              role="tab"
            >
              Dive Into The Data
            </li>
          </ul>
          <div
            class="c-home-menu__tab-container"
          >
            <div
              aria-labelledby="react-tabs-6"
              class="c-home-menu__tab-panel react-tabs__tab-panel--selected"
              data-testid="panel-1"
              id="react-tabs-7"
              role="tabpanel"
            >
              <p
                class="c-home-menu__tab-description"
              >
                What’s Happening
              </p>
            </div>
            <div
              aria-labelledby="react-tabs-8"
              class="c-home-menu__tab-panel"
              data-testid="panel-2"
              id="react-tabs-9"
              role="tabpanel"
            />
            <div
              aria-labelledby="react-tabs-10"
              class="c-home-menu__tab-panel"
              data-testid="panel-3"
              id="react-tabs-11"
              role="tabpanel"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
});

test("<Menu /> toggles tabs prooperly", () => {
  const { getByTestId, queryByTestId } = render(<Menu isMobile={false} isClosing={false} />);

  const tab = getByTestId(`tab-2`);

  let tabContainer = queryByTestId(`panel-2`);
  expect(tabContainer.children.length).toBe(0);

  fireEvent.click(tab);

  tabContainer = queryByTestId(`panel-2`);

  expect(tabContainer.children.length > 0).toBeTruthy();
});
