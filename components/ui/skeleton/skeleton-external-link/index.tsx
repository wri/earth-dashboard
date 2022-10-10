import classnames from "classnames";
import styles from "./skeleton-external-link.module.scss";

type SkeletonExternalLinkProps = {
  className?: string;
  dark?: boolean;
};

/** Skeleton for pill external link. */
const SkeletonExternalLink = ({ className = "", dark }: SkeletonExternalLinkProps) => {
  return (
    <div
      className={classnames(
        styles["c-skeleton-external-link"],
        {
          [styles["dark"]]: dark
        },
        className
      )}
    >
      <div className={styles["icon"]} />
      <div className={styles["text"]} />
    </div>
  );
};

export default SkeletonExternalLink;
