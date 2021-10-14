/* eslint-disable react/display-name */

/* eslint-disable react/display-name */
import { render, waitFor, act } from "test-utils";
import NewsTopicLayout from "../component";
import { fetchWidgets } from "services/gca";

const WIDGETS = [
  {
    attributes: { widget_id: "1", order: 1 }
  },
  {
    attributes: { widget_id: "2", order: 0 }
  }
];

jest.mock(
  "layout/layout/layout-app",
  () =>
    ({ children }) =>
      children
);

jest.mock("next/image", () => () => <img />);

jest.mock("hooks/useMongabayPosts", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLoading: false,
    hasErrored: false,
    posts: [],
    canFetchMore: false,
    isFetchingMore: false,
    fetchMore: () => {}
  }))
}));

jest.mock("services/gca", () => {
  const originalModule = jest.requireActual("../../../../services/gca");

  return {
    __esModule: true,
    ...originalModule,
    fetchWidgets: jest.fn()
  };
});

jest.mock("components/widgets/preview", () => ({ widget }) => <div data-widgetid={widget.id} />);

jest.mock("hooks/useNowThisVideos", () => () => ({
  videos: []
}));

describe("News Topic Layout - Widgets", () => {
  const fetchTimeout = 100;
  let fetchWillError, mount, topic;

  const MockFetchWidgets = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!fetchWillError) {
          resolve(WIDGETS);
        } else {
          reject(new Error("error"));
        }
      }, fetchTimeout);
    });

  beforeAll(() => {
    fetchWidgets.mockImplementation(MockFetchWidgets);
  });

  beforeEach(() => {
    fetchWillError = false;
    mount = null;
    topic = "climate";
  });

  const mountComponent = () => {
    mount = render(<NewsTopicLayout topic={topic} />);
    return mount;
  };

  const queryWidgets = () => {
    const { queryByTestId } = mount;

    return {
      firstWidget: queryByTestId("first-widget"),
      secondWidget: queryByTestId("second-widget")
    };
  };

  test("renders the widgets", async () => {
    mountComponent();

    await waitFor(() => {
      const { firstWidget, secondWidget } = queryWidgets();

      expect(firstWidget).not.toBeNull();
      expect(secondWidget).not.toBeNull();
    });
  });

  test("renders the widgets in order", async () => {
    mountComponent();

    await waitFor(() => {
      const { firstWidget, secondWidget } = queryWidgets();

      // See the order in the WIDGETS constant at the top.
      expect(firstWidget.querySelector('[data-widgetid="2"]')).not.toBeNull();
      expect(secondWidget.querySelector('[data-widgetid="1"]')).not.toBeNull();
    });
  });

  test("doesn't render any widgets if the requests fails", async () => {
    fetchWillError = true;

    mountComponent();

    await act(async () => {
      await expect(fetchWidgets).rejects.toThrow("error");
    });

    const { firstWidget, secondWidget } = queryWidgets();

    expect(firstWidget).toBeNull();
    expect(secondWidget).toBeNull();
  });
});
