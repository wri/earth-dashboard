import classnames from "classnames";
import styles from "./content-panel-skeleton.module.scss";
import Skeleton from "components/ui/skeleton";

type ContentPanelSkeletonProps = {
  className?: string;
};

/** Skeleton for content panel on the menu */
const ContentPanelSkeleton = ({ className = "" }: ContentPanelSkeletonProps) => {
  return (
    <Skeleton className={classnames(styles["c-content-panel-skeleton"], className)}>
      {/* Top */}
      <div className={styles["c-content-panel-skeleton__top"]}>
        <Skeleton className={styles["image"]} dark pulse />

        <Skeleton.Text widths={["60%"]} className={styles["text"]} dark />
      </div>

      {/* Bottom */}
      <Skeleton.Text widths={["100%", "50%"]} className={styles["text-description"]} dark />

      <Skeleton.ExternalLink className={styles["link"]} dark />
    </Skeleton>
  );
};

export default ContentPanelSkeleton;
