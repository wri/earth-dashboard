import { render, fireEvent } from "test-utils";
import { WIDGET_SUBTABS } from "../../admin/data/widgets/pages/show/constants";
import Aside from "./index";

test("<Aside /> renders correctly", () => {
  const { container } = render(<Aside />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <aside
    class="c-aside"
  >
    <nav>
      <ul />
    </nav>
  </aside>
</div>
`);
});

test("<Aside /> renders correctly with tabs", () => {
  const { container } = render(<Aside items={WIDGET_SUBTABS} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <aside
    class="c-aside"
  >
    <nav>
      <ul>
        <li>
          <a
            class=""
            href="/admin/data/widgets/%7B%7Bid%7D%7D/edit"
          >
            Edit widget
          </a>
        </li>
        <li>
          <a
            class=""
            href="/admin/data/widgets/%7B%7Bid%7D%7D/metadata"
          >
            Metadata
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</div>
`);
});
