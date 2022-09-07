import { render } from "test-utils";
import ToolTip from "./component";
import { POSITIONS } from "./component";

jest.mock("hooks/useWindowDimensions", () => () => ({ width: 100, height: 100 }));

describe("Tooltip", () => {
  test("renders correctly", () => {
    const { container } = render(
      <ToolTip x={20} y={20}>
        Hello world
      </ToolTip>
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-tooltip c-tooltip--right"
    role="tooltip"
    style="top: calc(20 + 10px); left: calc(20 + 10px);"
  >
    Hello world
  </div>
</div>
`);
  });

  test("renders right arrow correctly", () => {
    const { container } = render(
      <ToolTip x={20} y={20} arrowPosition="right">
        Hello world
      </ToolTip>
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-tooltip c-tooltip--right"
    role="tooltip"
    style="top: calc(20 + 10px); left: calc(20 + 10px);"
  >
    Hello world
  </div>
</div>
`);
  });

  test("renders left arrow correctly", () => {
    const { container } = render(
      <ToolTip x={20} y={20} arrowPosition="left">
        Hello world
      </ToolTip>
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-tooltip c-tooltip--left"
    role="tooltip"
    style="top: calc(20 + 10px); left: calc(20 + 10px);"
  >
    Hello world
  </div>
</div>
`);
  });

  test("renders the globe arrow correctly", () => {
    const { container } = render(
      <ToolTip x={20} y={20} globeToolTip={true}>
        Hello world
      </ToolTip>
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-tooltip c-tooltip--right c-tooltip--globe-tooltip"
    role="tooltip"
    style="top: calc(20 + 10px); right: calc(80px + 26px);"
  >
    Hello world
  </div>
</div>
`);
  });
});
