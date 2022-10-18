import classnames from "classnames";
import styles from "./content-panel-skeleton.module.scss";
import Skeleton from "components/ui/skeleton";

type ContentPanelSkeletonProps = {
  className?: string;
};

/** Skeletong for event cards on the menu dialog/modal. */
const ContentPanelSkeleton = ({ className = "" }: ContentPanelSkeletonProps) => {
  return (
    <Skeleton className={classnames(styles["c-content-panel-skeleton"], className)}>
      {/* Top */}
      <div className={styles["c-content-panel-skeleton__top"]}>
        <Skeleton className={styles["image"]} dark pulse />

        <Skeleton.Text widths={["100%", "40%"]} className={styles["text"]} dark />
      </div>

      {/* Bottom */}
      <div className={styles["c-content-panel-skeleton__bottom"]}>
        <Skeleton.Text widths={["100%"]} className={styles["text"]} />

        <Skeleton.ExternalLink className={styles["link"]} />
      </div>
    </Skeleton>
  );
};

export default ContentPanelSkeleton;
