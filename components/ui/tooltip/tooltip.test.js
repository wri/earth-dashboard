/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import { render } from "test-utils";
import ToolTip from "./component";
import { POSITIONS } from "./component";

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
    style="top: 30px; left: 30px;"
  >
    Hello world
  </div>
</div>
`);
  });

  test("renders right arrow correctly", () => {
    const { container } = render(
      <ToolTip x={20} y={20} arrowPosition={POSITIONS.RIGHT}>
        Hello world
      </ToolTip>
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-tooltip c-tooltip--right"
    role="tooltip"
    style="top: 30px; left: 30px;"
  >
    Hello world
  </div>
</div>
`);
  });

  test("renders left arrow correctly", () => {
    const { container } = render(
      <ToolTip x={20} y={20} arrowPosition={POSITIONS.LEFT}>
        Hello world
      </ToolTip>
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-tooltip c-tooltip--right"
    role="tooltip"
    style="top: 30px; left: 30px;"
  >
    Hello world
  </div>
</div>
`);
  });
});
