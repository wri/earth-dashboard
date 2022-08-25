jest.mock("components/ui/logo-link", () => {
  const Logo = () => <a>Logo</a>;
  return Logo;
});

jest.mock("layout/header/header-link", () => {
  const Logo = () => <a>Link</a>;
  return Logo;
});

jest.mock("layout/header/header-options", () => {
  const Logo = () => <div>Options</div>;
  return Logo;
});

describe("Header", () => {
  test.todo("Renders Correctly when mega menu is closed");

  //   test("Renders Correctly when mega menu is closed", () => {
  //     const { container } = render(<Header />);
  //
  //     expect(container).toMatchInlineSnapshot(`
  // <header
  //   class="c-site-header"
  // >
  //   <div
  //     class="c-site-header__logo"
  //   >
  //     <a>Logo</a>
  //   </div>
  //
  //   <div class="c-site-header__links">
  //     <a>Link</a>
  //     <a>Link</a>
  //     <a>Link</a>
  //   </div>
  //
  //   <div>Options</div>
  // </header>
  // `);
  //   });
});

export {};
