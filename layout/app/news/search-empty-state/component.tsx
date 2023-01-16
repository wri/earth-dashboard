import { useEffect } from "react";
import styles from "./search-empty-state.module.scss";

/** Shows the empty information for search results. */
const SearchEmptyState = () => {
  useEffect(() => {
    document.querySelector("body")?.style.setProperty("--body-bg-colour", styles.bgColour);

    return () => {
      document.querySelector("body")?.style.removeProperty("--body-bg-colour");
    };
  });

  return (
    <div className={styles["c-search-empty-state"]}>
      <h3>No Results</h3>
      <p>We don’t have any results for this search. Try another keyword.</p>
    </div>
  );
};

export default SearchEmptyState;
