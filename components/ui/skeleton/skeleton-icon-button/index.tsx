import classnames from "classnames";
import styles from "./skeleton-icon-button.module.scss";

type SkeletonIconButtonProps = {
  className?: string;
  dark?: boolean;
  extraSmall?: boolean;
  small?: boolean;
  medium?: boolean;
};

/** Skeleton for pill external link. */
const SkeletonIconButton = ({ className = "", dark, extraSmall, small, medium }: SkeletonIconButtonProps) => {
  return (
    <div
      className={classnames(
        styles["c-skeleton-icon-button"],
        {
          [styles["dark"]]: dark,
          [styles["extra-small"]]: extraSmall,
          [styles["small"]]: small,
          [styles["medium"]]: medium
        },
        className
      )}
    />
  );
};

export default SkeletonIconButton;
