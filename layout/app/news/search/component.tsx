import { useEffect } from "react";
import useMongabayPosts from "hooks/useMongabayPosts";
import Layout from "layout/layout/layout-app";
import AnchorCTA from "components/ui/anchor-cta";
import EarthHQCTA from "layout/app/news/earth-hq-cta";
import NewsArticle from "components/news-article";
import { Desktop, MediaContextProvider } from "utils/responsive";
import TOPICS from "constants/news";
import styles from "../news.module.scss";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import IconButton from "components/ui/icon-button";
import Section from "../section";
import { BG_GALAXY } from "constants/section-colours";

const LIMIT = 9;
const LOAD_MORE_LIMIT = 9;

type NewsSearchLayoutProps = {
  topic: keyof typeof TOPICS;
  isMobile?: boolean;
  setIsMobile: ActionCreatorWithPayload<boolean, string>;
};

/** Shows the search bar and its results. */
const NewsSearchLayout = ({ isMobile, setIsMobile }: NewsSearchLayoutProps) => {
  // Data
  const { isLoading, posts, canFetchMore, isFetchingMore, fetchMore } = useMongabayPosts(LIMIT);

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

  return (
    <Layout title="News">
      {/* To top button */}
      <IconButton name="arrow-up" size={16} onClick={handleScrollToTop} className={styles["c-news__top-button"]} />

      {/* Search results */}
      <Section
        title="All Results"
        gridClassName={newsArticleStyles["c-page-section-grid-news-articles"]}
        bgColour={BG_GALAXY}
      >
        {/* More News */}
        {posts || isLoading ? (
          posts.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)
        ) : (
          <div>Loading...</div>
        )}
        {canFetchMore && (
          <div className={newsArticleStyles["c-page-section-grid-news-articles__load-more"]}>
            <AnchorCTA
              className={newsArticleStyles["c-page-section-grid-news-articles__load-more__btn"]}
              onClick={() => fetchMore(LOAD_MORE_LIMIT)}
            >
              {isFetchingMore ? "Loading..." : "Load More "}
            </AnchorCTA>
          </div>
        )}
      </Section>

      {/* @ts-expect-error */}
      <MediaContextProvider>
        <Desktop>
          <EarthHQCTA />
        </Desktop>
      </MediaContextProvider>
    </Layout>
  );
};

export default NewsSearchLayout;
