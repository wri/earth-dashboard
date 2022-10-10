import classnames from "classnames";
import styles from "./news-article-skeleton.module.scss";
import Skeleton from "components/ui/skeleton";

type NewsArticleSkeletonProps = {
  featured?: boolean;
};

/** Skeleton for the news articles. */
const NewsArticleSkeleton = ({ featured }: NewsArticleSkeletonProps) => {
  return (
    <Skeleton className={styles["c-news-article-skeleton"]}>
      {/* Top */}
      <div
        className={classnames(styles["c-news-article-skeleton__top"], {
          [styles["featured"]]: featured
        })}
      >
        <Skeleton className={styles["image"]} dark pulse />
        <Skeleton.Text widths={["100%", "100%", "40%"]} dark />
      </div>

      {/* Bottom */}
      <div
        className={classnames(styles["c-news-article-skeleton__bottom"], {
          [styles["featured"]]: featured
        })}
      >
        <Skeleton.Text widths={["100%"]} className={styles["text"]} dark />
        <Skeleton.ExternalLink dark />
      </div>
    </Skeleton>
  );
};

export default NewsArticleSkeleton;
