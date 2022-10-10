import classnames from "classnames";
import styles from "./skeleton.module.scss";
import { ReactNode } from "react";
import SkeletonText from "./skeleton-text";
import SkeletonExternalLink from "./skeleton-external-link";

type SkeletonProps = {
  children?: ReactNode;
  className?: string;
  dark?: boolean;
};

/** Main entry point for skeleton. */
const Skeleton = ({ children, className = "", dark }: SkeletonProps) => {
  return (
    <div
      className={classnames(
        styles["c-skeleton"],
        {
          [styles["dark"]]: dark
        },
        className
      )}
    >
      {children}
    </div>
  );
};

Skeleton.Text = SkeletonText;
Skeleton.ExternalLink = SkeletonExternalLink;

export default Skeleton;
