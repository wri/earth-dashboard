/* eslint-disable react/display-name */
import { render } from "test-utils";
import Section from "./component";
import { BG_GALAXY } from "constants/section-colours";

describe("Page Section", () => {
  test("renders correctly", () => {
    const { container } = render(
      <Section className="Test" gridClassName="Test" title="Test" bgColour={BG_GALAXY} paddingBottom={false}>
        <div>child</div>
      </Section>
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="Test o-page-section o-page-section--pb-none o-page-section--galaxy"
  >
    <div
      class="o-page-section__wrap"
    >
      <h2
        class="o-page-section__title"
      >
        Test
      </h2>
      <div
        class="o-page-section__grid Test"
      >
        <div>
          child
        </div>
      </div>
    </div>
  </div>
</div>
`);
  });

  test("renders no additional children when no children are passed", () => {
    const { container } = render(<Section></Section>);
    expect(container.firstChild.children.length).toBe(0);
  });
});
