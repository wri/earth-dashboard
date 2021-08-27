import { render } from "test-utils";
import MainContainer from "./index";

test("<MainContainer /> renders correctly as desktop", () => {
  const { container } = render(<MainContainer isMobile={false} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -desktop"
  >
    <iframe
      frameborder="0"
      height="100%"
      id="nullSchoolIframe"
      src="https://earth.nullschool.net/?kiosk#current/wind/surface/level/orthographic=-330.00,0.00,306"
      title="Null School"
      width="100%"
    />
    <div
      class="text-container -desktop"
    >
      <div
        class="banner -desktop"
      >
        <h1>
          This is not a drill
        </h1>
        <h1>
          It's a 
          <span
            class="gradient"
          >
            Planetary emergency
          </span>
          .
        </h1>
      </div>
    </div>
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
</div>
`);
});

test("<MainContainer /> renders correctly as mobile", () => {
  const { container } = render(<MainContainer isMobile={true} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -mobile"
  >
    <iframe
      frameborder="0"
      height="100%"
      id="nullSchoolIframe"
      src="https://earth.nullschool.net/?kiosk"
      title="Null School"
      width="100%"
    />
    <div
      class="text-container -mobile"
    >
      <div
        class="banner -mobile"
      >
        <h1>
          This is not a drill
        </h1>
        <h1>
          It's a 
          <span
            class="gradient"
          >
            Planetary emergency
          </span>
          .
        </h1>
      </div>
    </div>
    <div
      class="intro-text -mobile"
    >
      <div
        class="topic-links-intro-text -mobile"
      >
        <p>
          What you need to know about Earth's life support systems, the global commons
        </p>
        <img
          alt=""
          role="presentation"
          src="/static/icons/arrow-up-right-homepage.svg"
        />
      </div>
      <div
        class="globe-menu-intro-text -mobile"
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
        class="cog-overlay -mobile"
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
</div>
`);
});
