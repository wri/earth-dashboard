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
      />
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
    class="c-mobile-menu-container"
  >
    <div
      class="c-mobile-menu-container__draggable"
      style="position: relative; user-select: auto; width: 100vw; max-width: 100vw; max-height: 635.2px; min-width: 100vw; min-height: undefinedpx; box-sizing: border-box; flex-shrink: 0;"
    >
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
            Extreme Events
          </p>
          <button
            class="c-icon-button small location-icon"
          />
          <button
            class="c-icon-button small expand-icon"
          />
        </div>
      </div>
      <div>
        <div
          class="c-mobile-menu-container__draggable__handle c-mobile-menu-container__draggable__handle__closed"
          style="position: absolute; user-select: none; width: 100%; height: 50px; top: -42px; left: 0px; cursor: row-resize;"
        />
      </div>
    </div>
  </div>
</div>
`);
});
