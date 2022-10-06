import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import DialogPanel from "components/app/home/dialog-panel";
import NewsArticle from "components/news-article";
import AnchorCTA from "components/ui/anchor-cta/component";
import IconButton from "components/ui/icon-button";
import TOPICS from "constants/news";
import useDialogPanel from "hooks/useDialogPanel";
import useMongabayPosts from "hooks/useMongabayPosts";
import { useState } from "react";
import EarthHQCTA from "../../earth-hq-cta/component";
import Section from "../../section";
import NewsSearch from "../news-search";
import styles from "./search-dialog.module.scss";

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

  // Data
  const { isLoading, posts, canFetchMore, isFetchingMore, fetchMore } = useMongabayPosts(LIMIT, topic);

  // Dialog controls
  const { shouldAnimate, handleClose } = useDialogPanel(isOpen, () => {
    setIsNewsSearchOpen(false);
  });

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
              inputClassName={styles["input"]}
              filtersClassName={styles["filters"]}
              darkColors
            />
          </div>
        </div>

        {/* Results */}
        <Section title="All Results" subtext="Showing..." className={styles["content"]} gridClassName={styles["grid"]}>
          {/* Posts */}
          {posts || isLoading ? (
            posts.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)
          ) : (
            <div>Loading...</div>
          )}

          {/* Load more */}
          {canFetchMore && (
            <AnchorCTA className={styles["load-more"]} onClick={() => fetchMore(LOAD_MORE_LIMIT)}>
              {isFetchingMore ? "Loading..." : "Load More "}
            </AnchorCTA>
          )}
        </Section>
      </div>
    </DialogPanel>
  ) : null;
};

export default SearchDialog;
