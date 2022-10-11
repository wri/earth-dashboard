import classnames from "classnames";
import { useEffect, useState } from "react";
import useMongabayPosts from "hooks/useMongabayPosts";
import Layout from "layout/layout/layout-app";
import AnchorCTA from "components/ui/anchor-cta";
import EarthHQCTA from "layout/app/news/earth-hq-cta";
import NewsArticle from "components/news-article";
import { Desktop, MediaContextProvider } from "utils/responsive";
import TOPICS from "constants/news";
import styles from "./search.module.scss";
import newsStyles from "../news.module.scss";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import IconButton from "components/ui/icon-button";
import Section from "../section";
import { BG_GALAXY } from "constants/section-colours";
import NewsSearch from "./news-search/component";
import SearchEmptyState from "./search-empty-state";
import NewsArticleSkeleton from "components/news-article/news-article-skeleton";

const LIMIT = 12;
const LOAD_MORE_LIMIT = 12;

type NewsSearchLayoutProps = {
  topic: keyof typeof TOPICS;
  isMobile?: boolean;
  setIsMobile: ActionCreatorWithPayload<boolean, string>;
};

/** Shows the search bar and its results. */
const NewsSearchLayout = ({ isMobile, setIsMobile }: NewsSearchLayoutProps) => {
  const [search, setSearch] = useState<string>();
  const [topic, setTopic] = useState<keyof typeof TOPICS>();

  // Data
  const { isLoading, posts, canFetchMore, isFetchingMore, fetchMore } = useMongabayPosts({
    limit: LIMIT,
    topic,
    search
  });

  // Store the isMobile flag in the redux store
  useEffect(() => {
    setIsMobile(!!isMobile);
  }, [isMobile, setIsMobile]);

  /** Scrolls to top. */
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const hasSearchResults = posts && posts.length > 0;

  return (
    <Layout title="News">
      {/* To top button */}
      <IconButton name="arrow-up" size={16} onClick={handleScrollToTop} className={newsStyles["c-news__top-button"]} />

      {/* Search controls */}
      <div className={styles["c-page-search__top"]}>
        <h2 className={styles["title"]}>Search News</h2>
        <NewsSearch topic={topic} setTopic={setTopic} setSearch={setSearch} filtersClassName={styles["filters"]} />
      </div>

      {/* Search results */}
      <Section
        gridClassName={classnames(newsArticleStyles["c-page-section-grid-news-articles"], {
          [newsArticleStyles["no-top-margin"]]: !hasSearchResults
        })}
        bgColour={BG_GALAXY}
        {...(hasSearchResults
          ? {
              title: "All Results",
              subtext: "Showing..."
            }
          : {})}
      >
        {isLoading ? (
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(key => <NewsArticleSkeleton key={`skeleton-${key}`} />)
        ) : !posts || !posts.length ? (
          <SearchEmptyState />
        ) : (
          posts.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)
        )}
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
