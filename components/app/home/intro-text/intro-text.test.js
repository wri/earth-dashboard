import { render } from "test-utils";
import IntroText from "./index";

test("<IntroText /> renders correctly with hasIntroAndBanner === true", () => {
  const { container } = render(<IntroText isMobile={false} hasIntroAndBanner={true} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="intro-text -desktop"
  >
    <div
      class="topic-links-intro-text -desktop"
    >
      <img
        alt=""
        role="presentation"
        src="/static/icons/arrow-up-homepage.svg"
      />
      <p>
        What you need to know about Earth's life support systems, the global commons
      </p>
    </div>
    <div
      class="globe-menu-intro-text -desktop"
    >
      <img
        alt=""
        role="presentation"
        src="/static/icons/arrow-down-homepage.svg"
      />
      <p>
        Explore Earth's planetary emergency in near-real-time
      </p>
    </div>
    <div
      class="cog-overlay -desktop"
    >
      <img
        alt=""
        role="presentation"
        src="/static/icons/cog.svg"
      />
      <span>
        Globe
      </span>
    </div>
  </div>
</div>
`);
});

test("<IntroText /> renders correctly with hasIntroAndBanner === false", () => {
  const { container } = render(<IntroText isMobile={false} hasIntroAndBanner={false} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="intro-text -desktop -fade-out"
  >
    <div
      class="topic-links-intro-text -desktop"
    >
      <img
        alt=""
        role="presentation"
        src="/static/icons/arrow-up-homepage.svg"
      />
      <p>
        What you need to know about Earth's life support systems, the global commons
      </p>
    </div>
    <div
      class="globe-menu-intro-text -desktop"
    >
      <img
        alt=""
        role="presentation"
        src="/static/icons/arrow-down-homepage.svg"
      />
      <p>
        Explore Earth's planetary emergency in near-real-time
      </p>
    </div>
    <div
      class="cog-overlay -desktop"
    >
      <img
        alt=""
        role="presentation"
        src="/static/icons/cog.svg"
      />
      <span>
        Globe
      </span>
    </div>
  </div>
</div>
`);
});
