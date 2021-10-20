/* eslint-disable react/display-name */
import { render, act } from "test-utils";
import { parser } from "hooks/useNowThisVideos";
import NewsTopicLayout from "../index";
import { VIDEOS } from "test/topic-articles";

jest.mock(
  "layout/layout/layout-app",
  () =>
    ({ children }) =>
      children
);

jest.mock("next/image", () => () => <img />);

jest.mock("utils/news", () => () => ({
  NOW_THIS_EARTH_RSS_URL: ""
}));

jest.mock("hooks/useMongabayPosts", () => () => ({
  isLoading: false,
  hasErrored: false,
  posts: [],
  canFetchMore: false,
  isFetchingMore: false,
  fetchMore: () => {}
}));

jest.mock("hooks/useGCAWidgets", () => () => ({
  isLoading: false,
  hasErrored: false,
  widgets: []
}));

describe("News Topic Layout - Videos", () => {
  const fetchTimeout = 100;
  let fetchWillError, mount, topic, parseURLSpy;

  const mockParseURL = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!fetchWillError) {
          resolve(VIDEOS);
        } else {
          reject(new Error("error"));
        }
      }, fetchTimeout);
    });

  beforeAll(() => {
    parseURLSpy = jest.spyOn(parser, "parseURL").mockImplementation(mockParseURL);
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

  test("renders the videos", async () => {
    const { findAllByLabelText } = mountComponent();

    const playVideoButtons = await findAllByLabelText(/play video/i);
    expect(playVideoButtons).toHaveLength(VIDEOS.items.length);
  });

  test("doesn't render any videos if the requests fails", async () => {
    fetchWillError = true;

    const { queryAllByLabelText } = mountComponent();

    await act(async () => {
      await expect(parseURLSpy).rejects.toThrow("error");
    });

    const playVideoButtons = queryAllByLabelText(/play video/i);
    expect(playVideoButtons).toHaveLength(0);
  });
});
