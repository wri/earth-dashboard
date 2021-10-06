/* eslint-disable react/display-name */
import { render, fireEvent } from "test-utils";
import Header from "./component";

jest.mock("components/ui/logo-link", () => {
  return () => <a>Logo</a>;
});

jest.mock("layout/header/header-title", () => {
  return () => <div>Header Title</div>;
});

jest.mock("layout/header/mega-menu", () => {
  return () => <div>Mega Menu</div>;
});

jest.mock("layout/header/mega-menu/btn", () => {
  return () => <button>Mega Menu Button</button>;
});

describe("Header", () => {
  test("Renders Correctly when mega menu is closed", () => {
    const { container } = render(<Header isMegaMenuOpen={false} setIsMegaMenuOpen={() => {}} />);

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
                class="logo-container"
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
    const { container } = render(<Header isMegaMenuOpen={true} setIsMegaMenuOpen={() => {}} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="c-mega-menu-wrapper c-mega-menu-wrapper--open"
          data-testid="header"
        >
          <div
            class="c-mega-menu-wrapper__bg"
          >
            <header
              class="c-site-header"
            >
              <div
                class="logo-container"
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

  test("fires dispatch event when user clicks away", () => {
    const mockDispatch = jest.fn(state => state);
    const { getByTestId } = render(<Header isMegaMenuOpen={true} setIsMegaMenuOpen={mockDispatch} />);

    // https://github.com/focus-trap/focus-trap/blob/428de79c53ea1612c85494b2097a77c590474eba/index.js#L282
    fireEvent.mouseDown(getByTestId("header"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveReturnedWith(false);
  });

  test("fires dispatch event when Escape key is pressed", () => {
    const mockDispatch = jest.fn(state => state);
    const { getByTestId } = render(<Header isMegaMenuOpen={true} setIsMegaMenuOpen={mockDispatch} />);

    fireEvent.keyDown(getByTestId("header"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveReturnedWith(false);
  });
});
