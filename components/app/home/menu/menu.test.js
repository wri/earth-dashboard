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
    style="z-index: 0;"
  >
    <div
      class="c-mobile-menu-container__draggable"
      style="position: relative; user-select: auto; width: 100vw; max-width: 100vw; max-height: 635.2px; min-width: 100vw; min-height: undefinedpx; box-sizing: border-box; flex-shrink: 0;"
    >
      <div
        style="opacity: 0; transition: all 400ms;"
      >
        <div
          class="c-home-menu-container c-home-menu-container--closing"
        />
      </div>
      <div>
        <div
          class="c-mobile-menu-container__draggable__handle"
          style="position: absolute; user-select: none; width: 100%; height: 50px; top: -42px; left: 0px; cursor: row-resize;"
        />
      </div>
    </div>
  </div>
</div>
`);
});
