import styles from "./news-article-skeleton.module.scss";
import Skeleton from "components/ui/skeleton";

/** Skeleton for the news articles. */
const NewsArticleSkeleton = () => {
  return (
    <Skeleton className={styles["c-news-article-skeleton"]}>
      <div className={styles["c-news-article-skeleton__top"]}>
        <Skeleton className={styles["image"]} dark pulse />
        <Skeleton.Text widths={["100%", "100%", "40%"]} dark />
      </div>

      <div className={styles["c-news-article-skeleton__bottom"]}>
        <Skeleton.Text widths={["100%"]} className={styles["text"]} dark />
        <Skeleton.ExternalLink dark />
      </div>
    </Skeleton>
  );
};

export default NewsArticleSkeleton;
