import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import TOPICS from "constants/news";
import useDialogPanel from "hooks/useDialogPanel";
import { useState } from "react";
import NewsSearch from "../news-search";
import styles from "./search-dialog.module.scss";

type SearchDialogProps = {
  isOpen: boolean;
  isMobile: boolean;
  setIsNewsSearchOpen: ActionCreatorWithPayload<boolean, string>;
};

/** Shows the search bar and filter with its results. */
const SearchDialog = ({ isOpen, isMobile, setIsNewsSearchOpen }: SearchDialogProps) => {
  const [topic, setTopic] = useState<keyof typeof TOPICS>();

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
      </div>
    </DialogPanel>
  ) : null;
};

export default SearchDialog;
