/* eslint-disable react/display-name */
import { render, fireEvent } from "test-utils";
import MegaMenuBtn from "./component";

jest.mock("components/ui/icon-button", () => {
  return ({ icon, ...props }) => (
    <button data-testid="button" {...props}>
      <img src={icon} />
    </button>
  );
});

jest.mock("public/static/images/hamburger.svg", () => "open.svg");

jest.mock("public/static/images/close.svg", () => "close.svg");

describe("Mega Menu Btn", () => {
  test("Renders correctly when mega menu is closed", () => {
    const { container } = render(<MegaMenuBtn className="Test" isMegaMenuOpen={false} setIsMegaMenuOpen={() => {}} />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <button
    aria-label="Open Main Menu"
    class="Test"
    data-testid="button"
  >
    <img
      src="close.svg"
    />
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
    class="Test"
    data-testid="button"
  >
    <img
      src="close.svg"
    />
  </button>
</div>
`);
  });

  test("fires dispatch event when user clicks the button", () => {
    const mockDispatch = jest.fn(state => state);
    const { getByTestId } = render(<MegaMenuBtn isMegaMenuOpen={true} setIsMegaMenuOpen={mockDispatch} />);

    fireEvent.click(getByTestId("button"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveReturnedWith(false);
  });
});
