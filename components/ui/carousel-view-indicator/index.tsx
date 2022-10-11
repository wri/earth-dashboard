import classnames from "classnames";
import styles from "./carousel-view-indicator.module.scss";

type CarouselViewIndicatorProps = {
  ids: string[];
  activeId: string | undefined;
  className?: string;
};

/** View indicator for carousels with animations. */
const CarouselViewIndicator = ({ ids, activeId, className = "" }: CarouselViewIndicatorProps) => {
  return (
    <div className={classnames(styles["c-indicator"], className)}>
      {ids.map(id => (
        <div
          key={id}
          className={classnames(styles["c-indicator__dot"], {
            [styles["active"]]: id === activeId
          })}
        />
      ))}
    </div>
  );
};

export default CarouselViewIndicator;
