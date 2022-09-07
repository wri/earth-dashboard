import { render, waitFor } from "test-utils";
import headlines from "../../../../test/headlines.json";
import { GCAAPI } from "../../../../utils/axios";
import MenuOption from "./index";

jest.mock("../../../../utils/axios");

test("<MenuOption /> renders correctly as desktop", async () => {
  GCAAPI.get.mockResolvedValue({ data: headlines });

  const { container, queryAllByTestId } = render(
    <MenuOption
      className={"test-menu-option"}
      title="All Extreme Events"
      description="View all of the latest extreme events"
      buttonText="View All"
      onClick={() => {}}
    />
  );

  await waitFor(() => queryAllByTestId("option"));

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-content-panel__underlay test-menu-option"
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
`);
});
