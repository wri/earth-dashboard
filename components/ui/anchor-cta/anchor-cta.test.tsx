/* eslint-disable react/display-name */
import { render, fireEvent } from "test-utils";
import AnchorCTA from "./component";

describe("Anchor CTA", () => {
  test("renders internal link correctly", () => {
    const { container } = render(
      <AnchorCTA className="Test" href="/" data-test="Test">
        Test
      </AnchorCTA>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          class="Test c-anchor-cta"
          data-test="Test"
          href="/"
        >
          Test
        </a>
      </div>
    `);
  });

  test("renders external link correctly", () => {
    const { container } = render(
      <AnchorCTA className="Test" href="www.google.com" external={true} data-test="Test">
        Test
      </AnchorCTA>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          class="Test c-anchor-cta"
          data-test="Test"
          href="www.google.com"
          rel="nofollow noreferrer"
          target="_blank"
        >
          Test
        </a>
      </div>
    `);
  });

  test("renders button correctly", () => {
    const { container } = render(
      <AnchorCTA className="Test" data-test="Test">
        Test
      </AnchorCTA>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="Test c-anchor-cta"
          data-test="Test"
        >
          Test
        </button>
      </div>
    `);
  });

  test("link calls the onClick function when user presses the link", () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <AnchorCTA href="/" external={true} onClick={mockOnClick}>
        Test
      </AnchorCTA>
    );

    fireEvent.click(getByRole("link"));

    expect(mockOnClick).toHaveBeenCalled();
  });

  test("button calls the onClick function when user presses the button", () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(<AnchorCTA onClick={mockOnClick}>Test</AnchorCTA>);

    fireEvent.click(getByRole("button"));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
