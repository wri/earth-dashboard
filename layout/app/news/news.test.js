/* eslint-disable react/display-name */
import { useState, useEffect } from "react";
import { render, fireEvent, waitFor } from "test-utils";
import NewsTopicLayout from "./component";
import useMongabayPosts from "hooks/useMongabayPosts";
import { NEWS_ARTICLES } from "test/topic-articles";
import TestImage from "public/static/images/star-background.jpg";

const MORE_ARTICLES = [
  {
    key: "8",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  }
];

jest.mock(
  "layout/layout/layout-app",
  () =>
    ({ children }) =>
      children
);

jest.mock("next/image", () => () => <img />);

jest.mock("utils/dates", () => {
  const originalModule = jest.requireActual("../../../utils/dates");

  return {
    __esModule: true,
    ...originalModule,
    formatDate: () => "xxxx-xx-xx"
  };
});

jest.mock("hooks/useMongabayPosts", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn()
}));

describe("News Topic Layout", () => {
  const fetchTimeout = 100;
  let fetchWillError;

  const MockUseMongabayPosts = topic => {
    const [posts, setPosts] = useState([]);
    const [hasErrored, setHasErrored] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [canFetchMore, setCanFetchMore] = useState(true);

    const fetch = () => {
      return setTimeout(() => {
        if (!fetchWillError) {
          setPosts(NEWS_ARTICLES);
        } else {
          setHasErrored(true);
          setCanFetchMore(false);
        }
      }, fetchTimeout);
    };

    const fetchMore = () => {
      setIsFetchingMore(true);

      setTimeout(() => {
        setIsFetchingMore(false);
        setCanFetchMore(false);

        if (!fetchWillError) {
          setPosts([...NEWS_ARTICLES, ...MORE_ARTICLES]);
        } else {
          setHasErrored(true);
        }
      }, fetchTimeout);
    };

    useEffect(() => {
      const timeoutID = fetch();

      return () => clearTimeout(timeoutID);
    }, [topic]);

    return {
      isLoading: !posts.length,
      hasErrored,
      posts,
      canFetchMore,
      isFetchingMore,
      fetchMore
    };
  };

  beforeAll(() => {
    useMongabayPosts.mockImplementation(MockUseMongabayPosts);
  });

  let mount;
  beforeEach(() => {
    fetchWillError = false;
    mount = render(<NewsTopicLayout topic="climate" />);
  });

  const userRequestsMorePosts = () => {
    const { getByRole } = mount;

    const loadMoreButton = getByRole("button", { name: /Load More/i });
    fireEvent.click(loadMoreButton);
  };

  test("renders the posts from the Mongabay endpoint", async () => {
    const { findAllByRole } = mount;

    const readArticleButtons = await findAllByRole("link", { name: /Read full article/i });
    expect(readArticleButtons).toHaveLength(NEWS_ARTICLES.length);
  });

  test("renders more posts from the Mongabay endpoint when user clicks 'Load More'", async () => {
    const { getAllByRole } = mount;

    userRequestsMorePosts();

    await waitFor(() => {
      const readArticleButtons = getAllByRole("link", { name: /Read full article/i });
      expect(readArticleButtons).toHaveLength(NEWS_ARTICLES.length + MORE_ARTICLES.length);
    });
  });

  test("user can not load more posts when no more posts are available from the Mongabay endpoint", async () => {
    const { queryByRole } = mount;

    userRequestsMorePosts();

    // The endpoint will now have no more posts, check if the load more button is removed
    await waitFor(() => {
      const loadMoreButton = queryByRole("button", { name: /Load More/i });
      expect(loadMoreButton).toBeNull();
    });
  });

  test("displays a loading message to the user when fetching posts from the Mongabay endpoint", async () => {
    const { queryAllByText } = mount;

    await waitFor(() => {
      const errorMessages = queryAllByText(/Loading/i);
      expect(errorMessages).not.toHaveLength(0);
    });
  });

  test("displays an error message to the user when the Mongabay endpoint request fails", async () => {
    // As the fetch takes x amount of time to respond,
    // setting this flag here will still mean it will error
    // even though the "call" has already been made when the
    // component was first mounted.
    fetchWillError = true;

    const { queryAllByText } = mount;

    // The endpoint will return an error, check for at least one error message
    await waitFor(() => {
      const errorMessages = queryAllByText(/error has occurred/i);
      expect(errorMessages).not.toHaveLength(0);
    });
  });
});
