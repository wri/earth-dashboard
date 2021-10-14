/* eslint-disable react/display-name */
import { useState, useEffect } from "react";
import { render, fireEvent, waitFor, act } from "test-utils";
import NewsTopicLayout from "./component";
import useMongabayPosts from "hooks/useMongabayPosts";
import { NEWS_ARTICLES } from "test/topic-articles";
import * as GCAServices from "services/gca";
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
  default: jest.fn()
}));

jest.mock("services/gca", () => {
  const originalModule = jest.requireActual("../../../services/gca");

  return {
    __esModule: true,
    ...originalModule,
    fetchWidgets: jest.fn(() => Promise.resolve(WIDGETS))
  };
});

jest.mock("components/widgets/preview", () => ({ widget }) => <div data-widgetid={widget.id} />);

describe("News Topic Layout", () => {
  const fetchTimeout = 100;
  let fetchWillError;

  const mockUseMongabayPostsBlank = jest.fn(() => ({
    isLoading: false,
    hasErrored: false,
    posts: [],
    canFetchMore: false,
    isFetchingMore: false,
    fetchMore: () => {}
  }));

  let mount;
  let topic;
  const mountComponent = () => {
    mount = render(<NewsTopicLayout topic={topic} />);
    return mount;
  };

  beforeAll(() => {
    useMongabayPosts.mockImplementation(mockUseMongabayPostsBlank);
  });

  beforeEach(() => {
    fetchWillError = false;
    mount = null;
    topic = "climate";
  });

  describe("posts", () => {
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

    afterAll(() => {
      useMongabayPosts.mockImplementation(mockUseMongabayPostsBlank);
    });
  
    const userRequestsMorePosts = () => {
      const { getByRole } = mount;
  
      const loadMoreButton = getByRole("button", { name: /Load More/i });
      fireEvent.click(loadMoreButton);
    };
  
    test("renders the posts", async () => {
      const { findAllByRole } = mountComponent();
  
      const readArticleButtons = await findAllByRole("link", { name: /Read full article/i });
      expect(readArticleButtons).toHaveLength(NEWS_ARTICLES.length);
    });
  
    test("renders more posts when user clicks 'Load More'", async () => {
      const { getAllByRole } = mountComponent();
  
      userRequestsMorePosts();
  
      await waitFor(() => {
        const readArticleButtons = getAllByRole("link", { name: /Read full article/i });
        expect(readArticleButtons).toHaveLength(NEWS_ARTICLES.length + MORE_ARTICLES.length);
      });
    });
  
    test("user can not load more posts when no more posts are available", async () => {
      const { queryByRole } = mountComponent();
  
      userRequestsMorePosts();
  
      // The endpoint will now have no more posts, check if the load more button is removed
      await waitFor(() => {
        const loadMoreButton = queryByRole("button", { name: /Load More/i });
        expect(loadMoreButton).toBeNull();
      });
    });
  
    test("displays a loading message to the user when fetching posts", async () => {
      const { queryAllByText } = mountComponent();
  
      await waitFor(() => {
        const errorMessages = queryAllByText(/Loading/i);
        expect(errorMessages).not.toHaveLength(0);
      });
    });
  
    test("displays an error message to the user when the request fails", async () => {
      fetchWillError = true;
  
      const { queryAllByText } = mountComponent();
  
      // The endpoint will return an error, check for at least one error message
      await waitFor(() => {
        const errorMessages = queryAllByText(/error has occurred/i);
        expect(errorMessages).not.toHaveLength(0);
      });
    });
  });

  describe("widgets", () => {
    const { fetchWidgets } = GCAServices;

    const MockFetchWidgets = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!fetchWillError) {
          resolve(WIDGETS);
        } else {
          reject(new Error("error"));
        }
      }, fetchTimeout);
    });

    beforeAll(() => {
      jest.spyOn(GCAServices, "fetchWidgets").mockImplementation(MockFetchWidgets);
    });

    afterAll(() => {
      fetchWidgets.mockRestore();
    });

    const queryWidgets = () => {
      const { queryByTestId } = mount;

      return {
        firstWidget: queryByTestId("first-widget"),
        secondWidget: queryByTestId("second-widget")
      }
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
        await expect(fetchWidgets).rejects.toThrow('error');
      });

      const { firstWidget, secondWidget } = queryWidgets();

      expect(firstWidget).toBeNull();
      expect(secondWidget).toBeNull();
    });
  });
});
