import classnames from "classnames";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import DialogPanel from "components/app/home/dialog-panel";
import NewsArticle from "components/news-article";
import AnchorCTA from "components/ui/anchor-cta/component";
import IconButton from "components/ui/icon-button";
import TOPICS from "constants/news";
import useDialogPanel from "hooks/useDialogPanel";
import useMongabayPosts from "hooks/useMongabayPosts";
import { useState } from "react";
import Section from "../../section";
import NewsSearch from "../news-search";
import SearchEmptyState from "../search-empty-state";
import styles from "./search-dialog.module.scss";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import EarthHQCTA from "../../earth-hq-cta";
import NewsArticleSkeleton from "components/news-article/news-article-skeleton";

const LIMIT = 12;
const LOAD_MORE_LIMIT = 12;

type SearchDialogProps = {
  isOpen: boolean;
  isMobile: boolean;
  setIsNewsSearchOpen: ActionCreatorWithPayload<boolean, string>;
};

/** Shows the search bar and filter with its results. */
const SearchDialog = ({ isOpen, isMobile, setIsNewsSearchOpen }: SearchDialogProps) => {
  const [topic, setTopic] = useState<keyof typeof TOPICS>();
  const [search, setSearch] = useState<string>();

  // Data
  const { isLoading, posts, canFetchMore, isFetchingMore, fetchMore } = useMongabayPosts({
    limit: LIMIT,
    topic,
    search
  });

  // Dialog controls
  const { shouldAnimate, handleClose } = useDialogPanel(isOpen, () => {
    setIsNewsSearchOpen(false);
  });

  /** Scrolls to top. */
  const handleScrollToTop = () => {
    const dialogEl = document.getElementById("search-dialog-content");

    if (!dialogEl) return;

    dialogEl.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const hasSearchResults = !isLoading && posts && posts.length > 0;

  return isOpen ? (
    <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
      <div className={styles["c-search-dialog"]}>
        {/* Header */}
        <div className={styles["header"]}>
          {/* Title */}
          <div className={styles["top"]}>
            <h2 className={styles["title"]}>Search News</h2>
            <IconButton name="close" size={12} onClick={handleClose} small />
          </div>

          {/* Search */}
          <div className={styles["bottom"]}>
            <NewsSearch
              topic={topic}
              setTopic={setTopic}
              setSearch={setSearch}
              inputClassName={styles["input"]}
              filtersClassName={styles["filters"]}
              darkColors
            />
          </div>
        </div>

        {/* Results */}
        <Section
          id="search-dialog-content"
          className={styles["content"]}
          gridClassName={classnames(newsArticleStyles["c-page-section-grid-news-articles"], {
            [newsArticleStyles["no-top-margin"]]: !hasSearchResults
          })}
          {...(hasSearchResults
            ? {
                title: "All Results",
                subtext: "Showing..."
              }
            : {})}
        >
          {/* To top button */}
          <IconButton name="arrow-up" size={16} onClick={handleScrollToTop} className={styles["top-button"]} />

          {/* Posts */}
          {isLoading ? (
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(key => <NewsArticleSkeleton key={`skeleton-${key}`} />)
          ) : !posts || !posts.length ? (
            <SearchEmptyState />
          ) : (
            posts.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)
          )}

          {/* Load more */}
          {canFetchMore && (
            <div className={newsArticleStyles["c-page-section-grid-news-articles__load-more"]}>
              <AnchorCTA
                className={newsArticleStyles["c-page-section-grid-news-articles__load-more"]}
                onClick={() => fetchMore(LOAD_MORE_LIMIT)}
              >
                {isFetchingMore ? "Loading..." : "Load More "}
              </AnchorCTA>
            </div>
          )}

          <EarthHQCTA className={styles["cta"]} />
        </Section>
      </div>
    </DialogPanel>
  ) : null;
};

export default SearchDialog;
