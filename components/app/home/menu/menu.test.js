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
  await waitForElementToBeRemoved(() => getByText(/Loading/i));

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
                Understand the emergency
              </h2>
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
                Climate Alerts
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/p2qlispRhUW2G6pMaV4xPeRO9tLODNREChXAo901.jpg"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        After surge, Amazon deforestation slows for second straight month
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        10th September 2021
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/gNIuBNcbSCvyqleVuLNA5OwpOU8YeWvSZ2dxr9dp.png"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        Air Quality Widget Example
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        14th September 2021
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/Gnx6T2S0oyiq5YCKmrfNJpe0K5fwrWcdKV2H0kqo.png"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        Another Widget Example
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        14th September 2021
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/qtPyJsfODBzLyWbi2ekjlMY8dqNJChePahN8JJNj.png"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        Repellat quasi quia quasi dolorem provident sed.
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        14th September 2021
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/eXMDncblKbGWuE4Rrt3Ywa6682IzfGfIPIabGKoq.jpg"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        Rerum illo excepturi nobis quam earum corrupti at.
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        14th September 2021
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
</div>
`);
});

test("<Menu /> renders correctly as mobile", async () => {
  GCAAPI.get.mockResolvedValue({ data: headlines });

  const { container, queryAllByTestId, getByText } = render(
    <Menu isMobile={true} isClosing={true} layers={[]} earthServer={earthServer} />
  );

  await waitForElementToBeRemoved(() => getByText(/Loading/i));

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
        class="c-home-menu c-home-menu--closing"
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
                Understand the emergency
              </h2>
            </div>
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
                Climate Alerts
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
                Data Highlights
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
                aria-labelledby="react-tabs-6"
                class="c-home-menu__tab-panel react-tabs__tab-panel--selected"
                data-testid="panel-1"
                id="react-tabs-7"
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/p2qlispRhUW2G6pMaV4xPeRO9tLODNREChXAo901.jpg"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        After surge, Amazon deforestation slows for second straight month
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        10th September 2021
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/gNIuBNcbSCvyqleVuLNA5OwpOU8YeWvSZ2dxr9dp.png"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        Air Quality Widget Example
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        14th September 2021
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/Gnx6T2S0oyiq5YCKmrfNJpe0K5fwrWcdKV2H0kqo.png"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        Another Widget Example
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        14th September 2021
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/qtPyJsfODBzLyWbi2ekjlMY8dqNJChePahN8JJNj.png"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        Repellat quasi quia quasi dolorem provident sed.
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        14th September 2021
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
                      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/eXMDncblKbGWuE4Rrt3Ywa6682IzfGfIPIabGKoq.jpg"
                    />
                    <div>
                      <h3
                        class="c-headline-card__title"
                      >
                        Rerum illo excepturi nobis quam earum corrupti at.
                      </h3>
                      <p
                        class="c-headline-card__subtitle"
                      >
                        14th September 2021
                      </p>
                    </div>
                  </button>
                </div>
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

test("<Menu /> toggles tabs properly", async () => {
  GCAAPI.get.mockResolvedValue({ data: headlines });

  const { getByTestId, queryByTestId, queryAllByTestId, getByText } = render(
    <Menu isMobile={false} isClosing={false} layers={[]} earthServer={earthServer} />
  );

  await waitForElementToBeRemoved(() => getByText(/Loading/i));

  await waitFor(() => queryAllByTestId("headline"));

  const tab = getByTestId(`tab-2`);

  let tabContainer = queryByTestId(`panel-2`);
  expect(tabContainer.children.length).toBe(0);

  fireEvent.click(tab);

  tabContainer = queryByTestId(`panel-2`);

  expect(tabContainer.children.length > 0).toBeTruthy();
});
