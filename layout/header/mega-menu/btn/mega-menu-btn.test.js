/* eslint-disable react/display-name */
import { render, fireEvent } from "test-utils";
import MegaMenuBtn from "./component";

jest.mock("next/image", () => () => <img />);

describe("Mega Menu Btn", () => {
  test("Renders correctly when mega menu is closed", () => {
    const { container } = render(<MegaMenuBtn className="Test" isMegaMenuOpen={false} setIsMegaMenuOpen={() => {}} />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <button
    aria-label="Open Main Menu"
    class="Test c-anchor-cta"
  >
    Breaking News
  </button>
</div>
`);
  });

  test("Renders correctly when mega menu is open", () => {
    const { container } = render(<MegaMenuBtn className="Test" isMegaMenuOpen={true} setIsMegaMenuOpen={() => {}} />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <button
    aria-label="Close Main Menu"
    class="c-button c-button--icon Test"
  >
    <img />
  </button>
</div>
`);
  });

  test("fires dispatch event when user opens the mega menu", () => {
    const mockDispatch = jest.fn(state => state);
    const { getByRole } = render(<MegaMenuBtn isMegaMenuOpen={false} setIsMegaMenuOpen={mockDispatch} />);

    fireEvent.click(getByRole("button"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveReturnedWith(true);
  });

  test("fires dispatch event when user closes the mega menu", () => {
    const mockDispatch = jest.fn(state => state);
    const { getByRole } = render(<MegaMenuBtn isMegaMenuOpen={true} setIsMegaMenuOpen={mockDispatch} />);

    fireEvent.click(getByRole("button"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveReturnedWith(false);
  });
});
