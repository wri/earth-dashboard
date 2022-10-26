import { render } from "test-utils";
import headlines from "test/headlines.json";
import EventCard from "./index";

test("<EventCard /> renders correctly as a Button", async () => {
  const { container } = render(<EventCard headline={headlines.data[0]} as="button" />);

  expect(container).toMatchInlineSnapshot(`
<div>
  <button
    class="c-event-card"
    data-testid="headline"
  >
    <div
      class="c-event-card__background"
      style="background-image: url(https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/eXMDncblKbGWuE4Rrt3Ywa6682IzfGfIPIabGKoq.jpg);"
    />
    <div
      class="c-event-card__detail"
    >
      <div
        class="c-event-card__header"
      >
        <div
          class="thumbnail"
        >
          <span
            style="box-sizing: border-box; display: block; overflow: hidden; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px;"
          >
            <img
              alt=""
              data-nimg="fill"
              decoding="async"
              role="presentation"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; box-sizing: border-box; padding: 0px; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"
            />
            <noscript />
          </span>
        </div>
        <h3
          class="title title-below"
        >
          Rerum illo excepturi nobis quam earum corrupti at.
        </h3>
      </div>
      <div
        class="c-event-card__footer"
      >
        <p
          class="date"
        >
          Sept 14 2021
        </p>
        <button
          class="c-cta-button data-button"
        >
          <div
            class="c-cta-button__content light"
          >
            <span
              class="c-cta-button__icon"
              style="background-image: url(https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/XbGLgZ4VVEuy4pu1o0K6KlEWZpoYqbpVzHqdDfPP.png); background-size: 24px;"
            />
            <span
              class="c-cta-button__text"
            >
              Fires
            </span>
          </div>
        </button>
      </div>
    </div>
  </button>
</div>
`);
});

test("<EventCard /> renders correctly by default", async () => {
  const { container } = render(<EventCard headline={headlines.data[0]} />);

  expect(container).toMatchInlineSnapshot(`
<div>
  <button
    class="c-event-card"
    data-testid="headline"
  >
    <div
      class="c-event-card__background"
      style="background-image: url(https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/eXMDncblKbGWuE4Rrt3Ywa6682IzfGfIPIabGKoq.jpg);"
    />
    <div
      class="c-event-card__detail"
    >
      <div
        class="c-event-card__header"
      >
        <div
          class="thumbnail"
        >
          <span
            style="box-sizing: border-box; display: block; overflow: hidden; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px;"
          >
            <img
              alt=""
              data-nimg="fill"
              decoding="async"
              role="presentation"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; box-sizing: border-box; padding: 0px; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"
            />
            <noscript />
          </span>
        </div>
        <h3
          class="title title-below"
        >
          Rerum illo excepturi nobis quam earum corrupti at.
        </h3>
      </div>
      <div
        class="c-event-card__footer"
      >
        <p
          class="date"
        >
          Sept 14 2021
        </p>
        <button
          class="c-cta-button data-button"
        >
          <div
            class="c-cta-button__content light"
          >
            <span
              class="c-cta-button__icon"
              style="background-image: url(https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/XbGLgZ4VVEuy4pu1o0K6KlEWZpoYqbpVzHqdDfPP.png); background-size: 24px;"
            />
            <span
              class="c-cta-button__text"
            >
              Fires
            </span>
          </div>
        </button>
      </div>
    </div>
  </button>
</div>
`);
});
