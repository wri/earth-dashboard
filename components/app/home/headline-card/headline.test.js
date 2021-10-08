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
      src="http://localhost:9000/gca-earth-hq/dicta.png"
    />
    <div>
      <h3
        class="c-headline-card__title"
      >
        Consequuntur sunt voluptate rerum nemo suscipit et.
      </h3>
      <p
        class="c-headline-card__subtitle"
      >
        9th September 2021
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
      src="http://localhost:9000/gca-earth-hq/dicta.png"
    />
    <div>
      <h3
        class="c-headline-card__title"
      >
        Consequuntur sunt voluptate rerum nemo suscipit et.
      </h3>
      <p
        class="c-headline-card__subtitle"
      >
        9th September 2021
      </p>
    </div>
  </div>
</div>
`);
});
