import classnames from "classnames";
import CarouselViewIndicator from "components/ui/carousel-view-indicator";
import IconButton from "components/ui/icon-button";
import { GCAWidget } from "hooks/useGCAWidgets/types";
import { useEffect, useRef, useState } from "react";
import Widget from "../widget/component";
import styles from "./widgets-carousel.module.scss";

type WidgetsCarouselProps = {
  widgets: GCAWidget[];
  max?: number;
};

/** Shows a carousel of featured widgets. */
const WidgetsCarousel = ({ widgets, max = 6 }: WidgetsCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>();

  const [viewedWidget, setViewedWidget] = useState<string>();
  const [prevWidget, setPrevWidget] = useState<Element | null>();
  const [nextWidget, setNextWidget] = useState<Element | null>();

  /** Scrolls to the previous widget. */
  const handlePrevious = () => {
    if (!prevWidget) return;

    prevWidget.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  };

  /** Scrolls to the next widget. */
  const handleNext = () => {
    if (!nextWidget) return;

    nextWidget.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  };

  // Observes each item and checks if in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          setViewedWidget(entry.target.id);
          setPrevWidget(entry.target.previousElementSibling ?? entry.target.parentElement?.lastElementChild);
          setNextWidget(entry.target.nextElementSibling ?? entry.target.parentElement?.firstElementChild);
        });
      },
      {
        root: carouselRef.current,
        rootMargin: "0px",
        threshold: 0.5
      }
    );

    carouselRef.current?.childNodes.forEach(node => {
      observer.observe(node as Element);
    });

    return () => {
      carouselRef.current?.childNodes.forEach(node => {
        observer.unobserve(node as Element);
      });
    };
  }, [widgets]);

  if (widgets.length === 0) return null;

  return (
    <div className={styles["c-widgets-carousel"]}>
      {/* Widgets */}
      <div
        ref={ref => {
          if (ref) carouselRef.current = ref;
        }}
        className={styles["c-widgets-carousel__wrapper"]}
      >
        {widgets.slice(0, max).map(widget => (
          <div
            key={widget.id}
            id={widget.id.toString()}
            className={classnames(styles["widget"], {
              [styles["active"]]: widget.id.toString() === viewedWidget
            })}
          >
            <Widget widget={widget} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className={styles["c-widgets-carousel__controls"]}>
        {/* Previous button */}
        <IconButton name="arrow-left" size={16} onClick={handlePrevious} small />

        {/* Indicator */}
        <CarouselViewIndicator
          ids={widgets.slice(0, max).map(widget => widget.id.toString())}
          activeId={viewedWidget}
        />

        {/* Next button */}
        <IconButton name="arrow-right" size={16} onClick={handleNext} small />
      </div>
    </div>
  );
};

export default WidgetsCarousel;
