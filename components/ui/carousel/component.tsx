import styles from "./carousel.module.scss";
import classnames from "classnames";
import React, { SetStateAction } from "react";

type CarouselProps = {
  items: React.ReactNode[];
  finalItem?: React.ReactNode;
  setScroll?: React.Dispatch<SetStateAction<number>>;
  className?: string;
  style?: Object;
};

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ items, finalItem, setScroll, className, style }, ref) => {
    return (
      <div
        className={classnames(styles["carousel-container"], className)}
        ref={ref}
        style={style}
        onScroll={e => {
          // @ts-expect-error
          if (setScroll) setScroll(e.target.scrollLeft);
        }}
      >
        {items}
        {finalItem}
      </div>
    );
  }
);

// Needed due to using forward ref
Carousel.displayName = "Carousel";

export default Carousel;
