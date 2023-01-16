import styles from "./search-empty-state.module.scss";

/** Shows the empty information for search results. */
const SearchEmptyState = () => {
  return (
    <div className={styles["c-search-empty-state"]}>
      <h3>No Results</h3>
      <p>We don’t have any results for this search. Try another keyword.</p>
    </div>
  );
};

export default SearchEmptyState;
