/* eslint-disable react/display-name */
import { render } from "test-utils";
import CTA from "./component";

jest.mock("next/image", () => () => <img />);

jest.mock("next/link", () => {
  return ({ children }) => children;
});

jest.mock("react-uuid", () => () => "1");

describe("Mega Menu CTA", () => {
  test("Renders correctly without an image", () => {
    const { container } = render(<CTA className="Test" label="Title" body="Body" link="/" />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <li
    class="Test c-mega-menu-cta"
  >
    <div
      class="c-mega-menu-cta__content"
    >
      <h1
        class="c-mega-menu-cta__title"
        id="mega-menu-cta-title-1"
      >
        Title
      </h1>
      <div
        class="c-mega-menu-cta__body"
      >
        <p
          class="c-mega-menu-cta__body__p"
          id="mega-menu-cta-body-1"
        >
          Body
        </p>
        <a
          aria-describedby="mega-menu-cta-body-1"
          aria-labelledby="mega-menu-cta-title-1"
          class="c-mega-menu-cta__link"
        >
          <img />
        </a>
      </div>
    </div>
  </li>
</div>
`);
  });

  test("Renders correctly with an image", () => {
    const { container } = render(<CTA className="Test" image={new Object()} label="Title" body="Body" link="/" />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <li
    class="Test c-mega-menu-cta c-mega-menu-cta--withImage"
  >
    <div
      class="c-mega-menu-cta__image"
    >
      <img />
    </div>
    <div
      class="c-mega-menu-cta__content"
    >
      <h1
        class="c-mega-menu-cta__title"
        id="mega-menu-cta-title-1"
      >
        Title
      </h1>
      <div
        class="c-mega-menu-cta__body"
      >
        <p
          class="c-mega-menu-cta__body__p"
          id="mega-menu-cta-body-1"
        >
          Body
        </p>
        <a
          aria-describedby="mega-menu-cta-body-1"
          aria-labelledby="mega-menu-cta-title-1"
          class="c-mega-menu-cta__link"
        >
          <img />
        </a>
      </div>
    </div>
  </li>
</div>
`);
  });
});
