import { render } from "test-utils";
import Scale from "./index";

test("<Scale /> renders correctly with default values", async () => {
  const { container } = render(<Scale />);

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-scale"
  >
    <label
      for="scale"
    >
      Scale
    </label>
    <input
      aria-orientation="vertical"
      id="scale"
      max="100"
      min="0"
      orient="vertical"
      readonly=""
      style="--min: \\"0%\\"; --max: \\"100%\\";"
      type="range"
      value="0"
    />
  </div>
</div>
`);
});

test("<Scale /> renders correctly with values", async () => {
  const { container } = render(
    <Scale
      min={-20}
      max={1000}
      scaleUnit="hpa"
      className="c-some-class"
      value="50%"
      scaleGradient={`linear-gradient(180deg, rgba(23,181,254,1) 0%, rgba(17,107,242,1) 100%)`}
    />
  );

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-some-class c-scale"
  >
    <label
      for="scale"
    >
      Scale
    </label>
    <input
      aria-orientation="vertical"
      id="scale"
      max="1000"
      min="-20"
      orient="vertical"
      readonly=""
      style="--min: \\"-20hpa\\"; --max: \\"1000hpa\\"; --gradient: linear-gradient(180deg, rgba(23,181,254,1) 0%, rgba(17,107,242,1) 100%);"
      type="range"
      value="50%"
    />
  </div>
</div>
`);
});
