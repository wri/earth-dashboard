import classnames from "classnames";
import useCMSVideos from "hooks/useCMSVideos";
import { useMemo, useState } from "react";
import useMongabayPosts from "hooks/useMongabayPosts";
import Layout from "layout/layout/layout-app";
import AnchorCTA from "components/ui/anchor-cta";
import EarthHQCTA from "layout/app/news/earth-hq-cta";
import NewsArticle from "components/news-article";
import VideoArticle from "components/video-article";
import TOPICS from "constants/news";
import styles from "./search.module.scss";
import newsStyles from "./news.module.scss";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import videoArticleStyles from "components/video-article/video-article.module.scss";
import IconButton from "components/ui/icon-button";
import Section from "./section";
import { BG_GALAXY, BG_SPACE } from "constants/section-colours";
import SearchBar from "./search-bar";
import SearchEmptyState from "./search-empty-state";
import NewsArticleSkeleton from "components/news-article/news-article-skeleton";
import SkeletonVideo from "components/ui/skeleton/skeleton-video";
import { scrollWindowToTop } from "utils/browserInterations";

const LIMIT = 12;
const LOAD_MORE_LIMIT = 12;

const FetchMoreButton = ({
  canFetchMore,
  fetchMore,
  isFetchingMore
}: {
  canFetchMore: boolean;
  fetchMore: (amount: number) => void;
  isFetchingMore: boolean;
}) => {
  return canFetchMore ? (
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
  ) : null;
};

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

  // Videos
  const { videos: allCMSVideos, isLoading: isVideosLoading } = useCMSVideos();
  let availableVideos = [...allCMSVideos],
    videos = availableVideos.splice(0, 3);

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

  const hasResults = posts && posts.length > 0;
  const isSearch = Boolean(search?.length);

  return (
    <Layout title="Earth News">
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

      {isSearch ? (
        <Section
          gridClassName={newsArticleStyles["c-page-section-grid-news-articles"]}
          bgColour={BG_SPACE}
          title={hasResults ? "All Results" : ""}
          noWrap
        >
          {isLoading
            ? [...Array(9)].map((a, index) => <NewsArticleSkeleton key={`skeleton-${index}`} />)
            : posts.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)}

          {!isLoading && !hasResults && <SearchEmptyState />}
          <FetchMoreButton canFetchMore={canFetchMore} fetchMore={fetchMore} isFetchingMore={isFetchingMore} />
        </Section>
      ) : (
        <>
          <Section
            gridClassName={newsArticleStyles["c-page-section-grid-news-articles"]}
            bgColour={BG_SPACE}
            title="Most Recent"
            noWrap
          >
            {isLoading
              ? [...Array(3)].map((a, index) => <NewsArticleSkeleton key={`skeleton-${index}`} />)
              : mostRecent.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} featured />)}
          </Section>
          <Section
            gridClassName={newsArticleStyles["c-page-section-grid-news-articles"]}
            bgColour={BG_GALAXY}
            title="More News"
            noWrap
          >
            {isLoading
              ? [...Array(6)].map((a, index) => <NewsArticleSkeleton key={`skeleton-${index}`} />)
              : moreNews.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)}
            <FetchMoreButton canFetchMore={canFetchMore} fetchMore={fetchMore} isFetchingMore={isFetchingMore} />
          </Section>
        </>
      )}

      {hasResults && (
        <>
          <EarthHQCTA />

          {/* To top button */}
          <IconButton
            name="arrow-up"
            size={16}
            onClick={scrollWindowToTop}
            className={newsStyles["c-news__top-button"]}
            aria-label="Go to top of the page"
          />
        </>
      )}
    </Layout>
  );
};

export default NewsSearchLayout;
