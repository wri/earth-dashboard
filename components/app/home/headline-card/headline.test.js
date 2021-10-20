import { render } from "test-utils";
import headlines from "test/headlines.json";
import HeadlineCard from "./component";

test("<HeadlineCard /> renders correctly as a Button", async () => {
  const { container } = render(<HeadlineCard headline={headlines.data[0]} as="button" />);

  expect(container).toMatchInlineSnapshot(`
<div>
  <button
    class="c-headline-card"
    data-testid="headline"
  >
    <img
      alt=""
      class="c-headline-card__image"
      role="presentation"
      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/eXMDncblKbGWuE4Rrt3Ywa6682IzfGfIPIabGKoq.jpg"
    />
    <div>
      <h3
        class="c-headline-card__title"
      >
        Rerum illo excepturi nobis quam earum corrupti at.
      </h3>
      <p
        class="c-headline-card__subtitle"
      >
        14th September 2021
      </p>
    </div>
  </button>
</div>
`);
});

test("<HeadlineCard /> renders correctly by default", async () => {
  const { container } = render(<HeadlineCard headline={headlines.data[0]} />);

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="c-headline-card"
    data-testid="headline"
  >
    <img
      alt=""
      class="c-headline-card__image"
      role="presentation"
      src="https://gca-earth-hq-api-production.s3.us-west-1.amazonaws.com/eXMDncblKbGWuE4Rrt3Ywa6682IzfGfIPIabGKoq.jpg"
    />
    <div>
      <h3
        class="c-headline-card__title"
      >
        Rerum illo excepturi nobis quam earum corrupti at.
      </h3>
      <p
        class="c-headline-card__subtitle"
      >
        14th September 2021
      </p>
    </div>
  </div>
</div>
`);
});
