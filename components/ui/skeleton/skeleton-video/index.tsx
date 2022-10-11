import classnames from "classnames";
import Icon from "components/ui/Icon";
import Skeleton from "..";
import SkeletonText from "../skeleton-text";
import styles from "./skeleton-video.module.scss";

type SkeletonVideoProps = {
  className?: string;
};

/** Skeleton loading for video element. */
const SkeletonVideo = ({ className = "" }: SkeletonVideoProps) => {
  return (
    <div className={classnames(styles["c-skeleton-video"], className)}>
      {/* Top */}
      <div className={styles["c-skeleton-video__top"]}>
        <Icon name="youtube-play" size={50} type="decorative" className={styles["icon"]} />
      </div>

      {/* Bottom */}
      <Skeleton className={styles["c-skeleton-video__bottom"]}>
        <SkeletonText widths={["100%", "40%"]} dark />
      </Skeleton>
    </div>
  );
};

export default SkeletonVideo;
