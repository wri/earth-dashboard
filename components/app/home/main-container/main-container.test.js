/* eslint-disable react/display-name */
import { render, fireEvent, waitFor } from "test-utils";
import MainContainer from "./index";
import useIframeBridge from "../../../../hooks/useIframeBridge";
import { EarthClient } from "../../../../utils/iframeBridge/earthClient";
import modes from "../../../../test/modes.json";
import headlines from "../../../../test/headlines.json";
import { GCAAPI } from "../../../../utils/axios";
import { earthServer } from "../../../../test/iframeBridge";

jest.mock("../../../../hooks/useIframeBridge");
jest.mock("../../../../utils/axios");
jest.mock("next/image", () => {
  return () => <></>;
});
jest.mock("../../../../utils/dates", () => {
  const originalModule = jest.requireActual("../../../../utils/dates");

  return {
    __esModule: true,
    ...originalModule,
    formatDate: () => "xxxx-xx-xx"
  };
});

const mockIframeBridge = {
  setRef: () => {},
  earthClient: new EarthClient(),
  earthServer: {
    current: earthServer
  },
  iframeRef: {
    current: null
  },
  layers: []
};

test("<MainContainer /> renders correctly as desktop", async () => {
  GCAAPI.get.mockResolvedValue({ data: modes });
  useIframeBridge.mockReturnValue(mockIframeBridge);

  const { container, getByTestId } = render(<MainContainer isMobile={false} />);

  await waitFor(() => getByTestId("labels-arr"));

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -desktop"
    data-testid="iframe-container"
  >
    <iframe
      allowtransparency="true"
      frameborder="0"
      height="100%"
      id="nullSchoolIframe"
      title="Null School"
      width="100%"
    />
    <div
      class="c-home-actions u-padding-horizontal-l"
    >
      <button
        aria-controls="menu"
        aria-expanded="false"
        aria-haspopup="true"
        class="c-home-actions__item c-home-menu-toggle"
        data-testid="toggle"
        id="menu-button"
      >
        <div
          class="c-home-menu-toggle__text-container"
        >
          <span>
            Understand the emergency
          </span>
          <span
            data-testid="labels-arr"
          >
            Fires
          </span>
        </div>
      </button>
      <div
        class="c-map-controls c-home-actions__map-controls"
      />
      <div
        class="c-showing-data-for"
      >
        <button
          class="c-showing-data-for__button"
        >
          <span
            class="c-showing-data-for__text"
          >
            Showing Data for: 
            <span
              class="c-showing-data-for__date"
            >
              xxxx-xx-xx
            </span>
          </span>
          <div
            class="c-button c-button--icon c-showing-data-for__icon"
          />
        </button>
      </div>
    </div>
  </div>
</div>
`);
});

test("<MainContainer /> renders correctly as mobile", async () => {
  GCAAPI.get.mockResolvedValue({ data: modes });
  useIframeBridge.mockReturnValue(mockIframeBridge);

  const { container, getByTestId } = render(<MainContainer isMobile={true} />);
  await waitFor(() => getByTestId("labels-arr"));

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="main-container -mobile"
    data-testid="iframe-container"
  >
    <div
      class="c-home-actions u-padding-horizontal-l"
    >
      <button
        aria-controls="menu"
        aria-expanded="false"
        aria-haspopup="true"
        class="c-home-actions__item c-home-menu-toggle"
        data-testid="toggle"
        id="menu-button"
      >
        <div
          class="c-home-menu-toggle__text-container"
        >
          <span>
            Understand the emergency
          </span>
          <span
            data-testid="labels-arr"
          >
            Fires
            <br />
             
            xxxx-xx-xx
          </span>
        </div>
      </button>
    </div>
  </div>
</div>
`);
});

test("<MainContainer /> toggle class toggles properly", async () => {
  GCAAPI.get.mockResolvedValue({ data: modes });
  useIframeBridge.mockReturnValue(mockIframeBridge);

  const { getByTestId, queryAllByTestId } = render(<MainContainer isMobile={false} />);
  await waitFor(() => getByTestId("labels-arr"));

  const button = getByTestId("toggle");
  const container = getByTestId("iframe-container");

  expect(container.classList.contains("-has-menu-open")).toBe(false);

  GCAAPI.get.mockResolvedValue({ data: headlines });

  fireEvent.click(button);

  await waitFor(() => queryAllByTestId("headline"));

  expect(container.classList.contains("-has-menu-open")).toBe(true);
});
