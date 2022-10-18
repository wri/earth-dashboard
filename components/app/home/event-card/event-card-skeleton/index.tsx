import classnames from "classnames";
import styles from "./event-card-skeleton.module.scss";
import Skeleton from "components/ui/skeleton";

type EventCardSkeletonProps = {
  className?: string;
};

/** Skeleton for event cards on the menu dialog/modal. */
const EventCardSkeleton = ({ className = "" }: EventCardSkeletonProps) => {
  return (
    <Skeleton className={classnames(styles["c-event-card-skeleton"], className)}>
      {/* Top */}
      <div className={styles["c-event-card-skeleton__top"]}>
        <Skeleton className={styles["image"]} dark pulse />

        <Skeleton.Text widths={["100%", "40%"]} className={styles["text"]} dark />
      </div>

      {/* Bottom */}
      <div className={styles["c-event-card-skeleton__bottom"]}>
        <Skeleton.Text widths={["100%"]} className={styles["text"]} />

        <Skeleton.ExternalLink className={styles["link"]} />
      </div>
    </Skeleton>
  );
};

export default EventCardSkeleton;
