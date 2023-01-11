import styles from "./widget-skeleton.module.scss";
import Skeleton from "components/ui/skeleton";

type WidgetSkeletonProps = {
  dark?: boolean;
};

/** A skeleton model for the GCA widgets. */
const WidgetSkeleton = ({ dark }: WidgetSkeletonProps) => {
  return (
    <Skeleton className={styles["c-widget-skeleton"]} dark={dark}>
      <Skeleton.Text widths={["100%", "100%", "50%"]} dark={!dark} />

      <div className={styles["c-widget-skeleton__bottom"]}>
        <Skeleton.ExternalLink dark={!dark} />
      </div>
    </Skeleton>
  );
};

export default WidgetSkeleton;
