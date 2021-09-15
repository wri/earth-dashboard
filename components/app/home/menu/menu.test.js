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
                <li
                  aria-controls="react-tabs-7"
                  aria-disabled="false"
                  aria-selected="false"
                  class="u-display-none"
                  data-testid="tab-4"
                  id="react-tabs-6"
                  role="tab"
                >
                  Info
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
                    Learn more about the top headlines describing the climate emergency. Stay up to date with the news you need to know and the places that are being affected.
                  </p>
                  <div
                    class="c-home-menu__tab-panel-scroll-area"
                  >
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/dicta.png"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          Consequuntur sunt voluptate rerum nemo suscipit et.
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          9th September 2021
                        </p>
                      </div>
                    </div>
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/et.png"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          Minima velit nam sunt.
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          9th September 2021
                        </p>
                      </div>
                    </div>
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/reiciendis.png"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          Praesentium nobis vel necessitatibus.
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          9th September 2021
                        </p>
                      </div>
                    </div>
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/temporibus.png"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          A ea modi id error qui.
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          9th September 2021
                        </p>
                      </div>
                    </div>
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/NacueP1wLLPka4nSGQVDxp2MDdaHUCJAC324EGqz.jpg"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          One of four North Atlantic right whale calves spotted so far this breeding season struck by ship
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          15th September 2021
                        </p>
                      </div>
                    </div>
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
                <div
                  aria-labelledby="react-tabs-6"
                  class="react-tabs__tab-panel"
                  id="react-tabs-7"
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
                  aria-controls="react-tabs-9"
                  aria-disabled="false"
                  aria-selected="true"
                  class="c-home-menu__tab u-margin-right-l react-tabs__tab--selected"
                  data-testid="tab-1"
                  id="react-tabs-8"
                  role="tab"
                  tabindex="0"
                >
                  What’s Happening
                </li>
                <li
                  aria-controls="react-tabs-11"
                  aria-disabled="false"
                  aria-selected="false"
                  class="c-home-menu__tab u-margin-right-l"
                  data-testid="tab-2"
                  id="react-tabs-10"
                  role="tab"
                >
                  Vital Signs
                </li>
                <li
                  aria-controls="react-tabs-13"
                  aria-disabled="false"
                  aria-selected="false"
                  class="c-home-menu__tab"
                  data-testid="tab-3"
                  id="react-tabs-12"
                  role="tab"
                >
                  Dive Into The Data
                </li>
                <li
                  aria-controls="react-tabs-15"
                  aria-disabled="false"
                  aria-selected="false"
                  class="u-display-none"
                  data-testid="tab-4"
                  id="react-tabs-14"
                  role="tab"
                >
                  Info
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
                  aria-labelledby="react-tabs-8"
                  class="c-home-menu__tab-panel react-tabs__tab-panel--selected"
                  data-testid="panel-1"
                  id="react-tabs-9"
                  role="tabpanel"
                >
                  <p
                    class="c-home-menu__tab-description u-margin-none"
                  >
                    Learn more about the top headlines describing the climate emergency. Stay up to date with the news you need to know and the places that are being affected.
                  </p>
                  <div
                    class="c-home-menu__tab-panel-scroll-area"
                  >
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/dicta.png"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          Consequuntur sunt voluptate rerum nemo suscipit et.
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          9th September 2021
                        </p>
                      </div>
                    </div>
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/et.png"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          Minima velit nam sunt.
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          9th September 2021
                        </p>
                      </div>
                    </div>
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/reiciendis.png"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          Praesentium nobis vel necessitatibus.
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          9th September 2021
                        </p>
                      </div>
                    </div>
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/temporibus.png"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          A ea modi id error qui.
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          9th September 2021
                        </p>
                      </div>
                    </div>
                    <div
                      class="c-headline c-home-menu__headline"
                      data-testid="headline"
                    >
                      <img
                        alt=""
                        class="c-headline__image"
                        role="presentation"
                        src="http://localhost:9000/gca-earth-hq/NacueP1wLLPka4nSGQVDxp2MDdaHUCJAC324EGqz.jpg"
                      />
                      <div>
                        <h3
                          class="c-headline__title"
                        >
                          One of four North Atlantic right whale calves spotted so far this breeding season struck by ship
                        </h3>
                        <p
                          class="c-headline__date"
                        >
                          15th September 2021
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  aria-labelledby="react-tabs-10"
                  class="c-home-menu__tab-panel"
                  data-testid="panel-2"
                  id="react-tabs-11"
                  role="tabpanel"
                />
                <div
                  aria-labelledby="react-tabs-12"
                  class="c-home-menu__tab-panel"
                  data-testid="panel-3"
                  id="react-tabs-13"
                  role="tabpanel"
                />
                <div
                  aria-labelledby="react-tabs-14"
                  class="react-tabs__tab-panel"
                  id="react-tabs-15"
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

test("<Menu /> toggles tabs prooperly", async () => {
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
