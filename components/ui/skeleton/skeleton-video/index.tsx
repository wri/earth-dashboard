import classnames from "classnames";
import Icon from "components/ui/Icon";
import Skeleton from "..";
import SkeletonText from "../skeleton-text";
import styles from "./skeleton-video.module.scss";

type SkeletonVideoProps = {
  className?: string;
  large?: boolean;
};

/** Skeleton loading for video element. */
const SkeletonVideo = ({ className = "", large }: SkeletonVideoProps) => {
  return (
    <div className={classnames(styles["c-skeleton-video"], className)}>
      {/* Top */}
      <div className={styles["c-skeleton-video__top"]}>
        <div />
        <div>
          <Icon name="youtube-play" type="decorative" className={styles["icon"]} />
        </div>
        <div />
      </div>

      {/* Bottom */}
      <Skeleton className={styles["c-skeleton-video__bottom"]}>
        <SkeletonText widths={["100%", "40%"]} dark />
      </Skeleton>
    </div>
  );
};

export default SkeletonVideo;
