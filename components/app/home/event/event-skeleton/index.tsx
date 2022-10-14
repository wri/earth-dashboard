import styles from "./event-skeleton.module.scss";
import Skeleton from "components/ui/skeleton";

/** Skeleton for the detailed extreme events view. */
const EventSkeleton = () => {
  return (
    <Skeleton className={styles["c-event-skeleton"]}>
      <Skeleton.Text widths={["100%", "50%", "20%"]} dark />
      <Skeleton className={styles["c-event-skeleton__image"]} dark />
      <Skeleton.Text widths={["100%", "90%", "100%", "50%"]} dark />
      <Skeleton className={styles["c-event-skeleton__image"]} dark />
    </Skeleton>
  );
};

export default EventSkeleton;
