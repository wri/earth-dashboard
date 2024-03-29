/* eslint-disable react/display-name */
import { render } from "test-utils";
import MegaMenu from "./component";

jest.mock("layout/header/mega-menu/cta", () => {
  return ({ label }) => <div>{label}</div>;
});

jest.mock("components/ui/social-icon", () => {
  return ({ label }) => <a>{label}</a>;
});

jest.mock("next/link", () => {
  return ({ children }) => children;
});

jest.mock("constants/menu-items", () => ({
  MenuItems: [
    {
      key: "ctaTest",
      label: "CTA Test"
    }
  ],
  QuickLinks: [
    {
      key: "quickLinkTest",
      label: "Quick Link Test"
    }
  ],
  SocialLinks: [
    {
      key: "socialLinkTest",
      label: "Social Link Test"
    }
  ]
}));

describe("Mega Menu", () => {
  test("Render correctly when mega menu is open", () => {
    const { container } = render(<MegaMenu isMegaMenuOpen={true} />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-mega-menu"
  >
    <div
      class="c-mega-menu__scroll"
    >
      <nav
        aria-label="Main Menu"
      >
        <ul
          class="c-mega-menu__ctas"
        >
          <div>
            CTA Test
          </div>
        </ul>
      </nav>
      <div
        class="c-mega-menu__links"
      >
        <nav
          aria-label="Useful Links Menu"
        >
          <ul
            class="c-mega-menu-quick-links"
          >
            <li
              class=""
            >
              <a>
                Quick Link Test
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <div
            class="c-mega-menu-socials"
          >
            <a>
              Social Link Test
            </a>
          </div>
          <span
            class="c-mega-menu__links__copy-right"
          >
            © 
            2022
             Global Commons Alliance. All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
`);
  });

  test("Does not render anything when mega menu is closed", () => {
    const { container } = render(<MegaMenu isMegaMenuOpen={false} />);

    expect(container).toMatchInlineSnapshot(`<div />`);
  });
});
