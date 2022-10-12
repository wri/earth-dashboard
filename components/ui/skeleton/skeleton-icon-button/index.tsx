import classnames from "classnames";
import styles from "./skeleton-icon-button.module.scss";

type SkeletonIconButtonVariant = "xs" | "sm" | "md";

type SkeletonIconButtonProps = {
  className?: string;
  dark?: boolean;
  variant?: SkeletonIconButtonVariant;
};

/** Skeleton for pill external link. */
const SkeletonIconButton = ({ className = "", dark, variant }: SkeletonIconButtonProps) => {
  return (
    <div
      className={classnames(
        styles["c-skeleton-icon-button"],
        {
          [styles["c-skeleton-icon-button--dark"]]: dark,
          [styles[`c-skeleton-icon-button--${variant}`]]: variant
        },
        className
      )}
    />
  );
};

export default SkeletonIconButton;
