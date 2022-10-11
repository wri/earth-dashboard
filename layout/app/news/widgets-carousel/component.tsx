import CarouselViewIndicator from "components/ui/carousel-view-indicator";
import { GCAWidget } from "hooks/useGCAWidgets/types";
import { useEffect, useRef, useState } from "react";
import Widget from "../widget/component";
import styles from "./widgets-carousel.module.scss";

type WidgetsCarouselProps = {
  widgets: GCAWidget[];
};

/** Shows a carousel of featured widgets. */
const WidgetsCarousel = ({ widgets }: WidgetsCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>();

  const [viewedWidget, setViewedWidget] = useState<string>();

  // Observes each item and checks if in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          setViewedWidget(entry.target.id);
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
        {widgets.map(widget => (
          <div key={widget.id} id={widget.id.toString()} className={styles["widget"]}>
            <Widget widget={widget} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <CarouselViewIndicator
        ids={widgets.map(widget => widget.id.toString())}
        activeId={viewedWidget}
        className={styles["c-widgets-carousel__controls"]}
      />
    </div>
  );
};

export default WidgetsCarousel;
