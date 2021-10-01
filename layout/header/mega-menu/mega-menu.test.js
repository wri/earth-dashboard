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

jest.mock("constants/mega-menu-items", () => ({
  MegaMenuCTAs: [
    {
      key: "ctaTest",
      label: "CTA Test"
    }
  ],
  MegaMenuQuickLinks: [
    {
      key: "quickLinkTest",
      label: "Quick Link Test"
    }
  ],
  MegaMenuSocialLinks: [
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
      class="c-mega-menu__ctas"
    >
      <div>
        CTA Test
      </div>
    </div>
    <div
      class="c-mega-menu__links"
    >
      <div>
        <ul
          class="c-mega-menu-quick-links"
        >
          <li>
            <a>
              Quick Link Test
            </a>
          </li>
        </ul>
      </div>
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
          2021
           Global Commons Alliance. All Rights Reserved
        </span>
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
