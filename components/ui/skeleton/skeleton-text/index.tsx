import styles from "./skeleton-text.module.scss";
import classnames from "classnames";

type SkeletonTextWidth = "10%" | "20%" | "30%" | "40%" | "50%" | "60%" | "70%" | "80%" | "90%" | "100%";

type SkeletonTextProps = {
  widths: SkeletonTextWidth[];
  className?: string;
  dark?: boolean;
};

/** Skeleton text with lines. */
const SkeletonText = ({ widths, className = "", dark }: SkeletonTextProps) => {
  return (
    <div
      className={classnames(
        styles["c-skeleton-text"],
        {
          [styles["dark"]]: dark
        },
        className
      )}
    >
      {widths.map((width, index) => (
        <div
          key={`width-${index}`}
          style={{
            width
          }}
        />
      ))}
    </div>
  );
};

export default SkeletonText;
