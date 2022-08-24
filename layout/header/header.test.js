/* eslint-disable react/display-name */
import { render } from "test-utils";
import Header from "./component";

jest.mock("components/ui/logo-link", () => {
  return () => <a>Logo</a>;
});

describe("Header", () => {
  test("Renders Correctly when mega menu is closed", () => {
    const { container } = render(<Header />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-mega-menu-wrapper"
    data-testid="header"
  >
    <div
      class="c-mega-menu-wrapper__bg"
    >
      <header
        class="c-site-header"
      >
        <div
          class="c-site-header__logo"
        >
          <a>
            Logo
          </a>
        </div>
        <div>
          Header Title
        </div>
        <button>
          Mega Menu Button
        </button>
      </header>
      <div>
        Mega Menu
      </div>
    </div>
  </div>
</div>
`);
  });

  test("Renders Correctly when mega menu is open", () => {
    const { container } = render(<Header />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-mega-menu-wrapper"
    data-testid="header"
  >
    <div
      class="c-mega-menu-wrapper__bg"
    >
      <header
        class="c-site-header"
      >
        <div
          class="c-site-header__logo"
        >
          <a>
            Logo
          </a>
        </div>
        <button>
          Mega Menu Button
        </button>
      </header>
      <div>
        Mega Menu
      </div>
    </div>
  </div>
</div>
`);
  });
});
