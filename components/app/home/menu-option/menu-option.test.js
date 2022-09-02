import { render, fireEvent, waitFor, waitForElementToBeRemoved } from "test-utils";
import headlines from "../../../../test/headlines.json";
import { GCAAPI } from "../../../../utils/axios";
import MenuOption from "./index";
import { earthServer } from "../../../../test/iframeBridge";

jest.mock("../../../../utils/axios");

test("<MenuOption /> renders correctly as desktop", async () => {
  GCAAPI.get.mockResolvedValue({ data: headlines });

  const { container, queryAllByTestId } = render(
    <MenuOption
      className={"test-menu-option-class"}
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
    class="c-menu-option__underlay test-menu-option-class"
    data-testid="option"
  >
    <button
      class="c-menu-option"
    >
      <div
        class="c-menu-option__header-row"
      >
        <h3
          class="c-menu-option__title"
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
        class="c-menu-option__row"
      >
        <button
          class="c-menu-option__button"
        >
          <span
            class="c-menu-option__button-text"
          >
            View All
          </span>
          <span
            class="c-menu-option__button-icon"
          />
        </button>
      </div>
    </button>
  </div>
</div>
`);
});
