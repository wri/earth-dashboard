import styles from "./widget-skeleton.module.scss";
import Skeleton from "components/ui/skeleton";

const WidgetSkeleton = () => {
  return (
    <Skeleton className={styles["c-widget-skeleton"]}>
      <Skeleton.Text widths={["100%", "100%", "50%"]} dark />

      <div className={styles["c-widget-skeleton__bottom"]}>
        <Skeleton.ExternalLink dark />
      </div>
    </Skeleton>
  );
};

export default WidgetSkeleton;
