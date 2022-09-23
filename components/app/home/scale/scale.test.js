import { render } from "test-utils";
import Scale from "./index";
import * as useIframeBridge from "hooks/useIframeBridge";

test("<Scale /> renders correctly with default values", async () => {
  const useIframeBridgeContextSpy = jest.spyOn(useIframeBridge, "useIframeBridgeContext");
  useIframeBridgeContextSpy.mockReturnValue({});

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
    <div
      class="c-scale__input-container"
    >
      <div
        class="c-scale__gradient"
        style="--min: \\"0%\\"; --max: \\"100%\\";"
      />
      <input
        aria-orientation="vertical"
        class="u-visually-hidden"
        id="scale"
        max="100"
        min="0"
        orient="vertical"
        readonly=""
        type="range"
        value="0"
      />
    </div>
  </div>
</div>
`);
});

test("<Scale /> renders correctly with values", async () => {
  const useIframeBridgeContextSpy = jest.spyOn(useIframeBridge, "useIframeBridgeContext");
  useIframeBridgeContextSpy.mockReturnValue({
    scaleData: {
      min: -20,
      max: 1000,
      unitSymbol: "hpa"
    },
    overlayLayer: {
      product: { scale: { getCss: () => "linear-gradient(180deg, rgba(23,181,254,1) 0%, rgba(17,107,242,1) 100%)" } }
    }
  });

  const { container } = render(<Scale className="c-some-class" value="50%" />);

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
    <div
      class="c-scale__input-container"
    >
      <div
        class="c-scale__gradient"
        style="--min: \\"-20hpa\\"; --max: \\"1000hpa\\"; --gradient: linear-gradient(180deg, rgba(23,181,254,1) 0%, rgba(17,107,242,1) 100%);"
      />
      <input
        aria-orientation="vertical"
        class="u-visually-hidden"
        id="scale"
        max="1000"
        min="-20"
        orient="vertical"
        readonly=""
        type="range"
        value="50"
      />
    </div>
  </div>
</div>
`);
});

test("<Scale /> renders correctly horizontal", async () => {
  const useIframeBridgeContextSpy = jest.spyOn(useIframeBridge, "useIframeBridgeContext");
  useIframeBridgeContextSpy.mockReturnValue({
    scaleData: {
      min: -20,
      max: 1000,
      unitSymbol: "hpa"
    },
    overlayLayer: {
      product: { scale: { getCss: () => "linear-gradient(0deg, rgba(23,181,254,1) 0%, rgba(17,107,242,1) 100%)" } }
    }
  });

  const { container } = render(<Scale className="c-some-class" value="50%" isHorizontal />);

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-some-class c-scale c-scale--horizontal"
  >
    <label
      for="scale"
    >
      Scale
    </label>
    <div
      class="c-scale__input-container"
    >
      <div
        class="c-scale__gradient"
        style="--min: \\"-20hpa\\"; --max: \\"1000hpa\\"; --gradient: linear-gradient(0deg, rgba(23,181,254,1) 0%, rgba(17,107,242,1) 100%);"
      />
      <input
        aria-orientation="horizontal"
        class="u-visually-hidden"
        id="scale"
        max="1000"
        min="-20"
        orient="horizontal"
        readonly=""
        type="range"
        value="50"
      />
    </div>
  </div>
</div>
`);
});
