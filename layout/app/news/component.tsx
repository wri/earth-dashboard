import classnames from "classnames";
import { useMemo, useState } from "react";
import useMongabayPosts from "hooks/useMongabayPosts";
import Layout from "layout/layout/layout-app";
import AnchorCTA from "components/ui/anchor-cta";
import EarthHQCTA from "layout/app/news/earth-hq-cta";
import NewsArticle from "components/news-article";
import { Desktop, MediaContextProvider } from "utils/responsive";
import TOPICS from "constants/news";
import styles from "./search.module.scss";
import newsStyles from "./news.module.scss";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import IconButton from "components/ui/icon-button";
import Section from "./section";
import { BG_GALAXY, BG_SPACE } from "constants/section-colours";
import SearchBar from "./search-bar";
import SearchEmptyState from "./search-empty-state";
import NewsArticleSkeleton from "components/news-article/news-article-skeleton";
import { scrollWindowToTop } from "utils/browserInterations";

const LIMIT = 12;
const LOAD_MORE_LIMIT = 12;

/** Shows the search bar and its results. */
const NewsSearchLayout = () => {
  const [search, setSearch] = useState<string>();
  const [topic, setTopic] = useState<keyof typeof TOPICS>();

  // Data
  const { isLoading, posts, canFetchMore, isFetchingMore, fetchMore } = useMongabayPosts({
    limit: LIMIT,
    topic,
    search
  });

  const { mostRecent, moreNews } = useMemo(() => {
    if (posts.length <= 3) {
      return {
        mostRecent: posts || [],
        moreNews: []
      };
    }

    const moreNews = [...posts];
    const mostRecent = moreNews.splice(0, 3);

    return {
      mostRecent,
      moreNews
    };
  }, [posts]);

  const hasSearchResults = posts && posts.length > 0;

  return (
    <Layout title="Earth News">
      {/* To top button */}
      <IconButton
        name="arrow-up"
        size={16}
        onClick={scrollWindowToTop}
        className={newsStyles["c-news__top-button"]}
        aria-label="Go to top of the page"
      />

      {/* Search controls */}
      <div className={styles["c-page-search__header"]}>
        <SearchBar
          topic={topic}
          onTopicChange={setTopic}
          onSearch={setSearch}
          filtersClassName={styles["c-page-search__filters"]}
          darkColors
        />
      </div>

      <Section
        gridClassName={classnames(newsArticleStyles["c-page-section-grid-news-articles"], {
          [newsArticleStyles["no-top-margin"]]: !hasSearchResults
        })}
        bgColour={BG_SPACE}
        title="Most Recent"
        noWrap
      >
        {isLoading
          ? [...Array(3)].map(key => <NewsArticleSkeleton key={`skeleton-${key}`} />)
          : mostRecent.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)}
      </Section>
      <Section
        gridClassName={classnames(newsArticleStyles["c-page-section-grid-news-articles"], {
          [newsArticleStyles["no-top-margin"]]: !hasSearchResults
        })}
        bgColour={BG_GALAXY}
        title="More News"
        noWrap
      >
        {isLoading
          ? [...Array(6)].map(key => <NewsArticleSkeleton key={`skeleton-${key}`} />)
          : moreNews.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)}

        {canFetchMore && (
          <div className={newsArticleStyles["c-page-section-grid-news-articles__load-more"]}>
            <AnchorCTA
              className={classnames(
                newsArticleStyles["c-page-section-grid-news-articles__load-more__btn"],
                styles["c-page-search__load-more__btn"]
              )}
              onClick={() => fetchMore(LOAD_MORE_LIMIT)}
            >
              {isFetchingMore ? "Loading..." : "Load More "}
            </AnchorCTA>
          </div>
        )}
      </Section>

      {/* Search results */}
      {/* <Section
        gridClassName={classnames(newsArticleStyles["c-page-section-grid-news-articles"], {
          [newsArticleStyles["no-top-margin"]]: !hasSearchResults
        })}
        bgColour={BG_GALAXY}
        {...(hasSearchResults
          ? {
              title: "All Results"
            }
          : {})}
      >
        {isLoading ? (
          [...Array(9)].map(key => <NewsArticleSkeleton key={`skeleton-${key}`} />)
        ) : !posts || !posts.length ? (
          <SearchEmptyState />
        ) : (
          <>
            {posts.map(({ key, ...articleProps }) => (
              <NewsArticle key={key} {...articleProps} />
            ))}
          </>
        )}
      </Section> */}

      {hasSearchResults && (
        // @ts-expect-error
        <MediaContextProvider>
          <Desktop>
            <EarthHQCTA />
          </Desktop>
        </MediaContextProvider>
      )}
    </Layout>
  );
};

export default NewsSearchLayout;
