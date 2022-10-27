import classnames from "classnames";
import CarouselViewIndicator from "components/ui/carousel-view-indicator";
import IconButton from "components/ui/icon-button";
import Skeleton from "components/ui/skeleton";
import { NEWS_CAROUSEL_COMPLETED, NEWS_CAROUSEL_STARTED, NEWS_CAROUSEL_VIEWED } from "constants/tag-manager";
import { GCAWidget } from "hooks/useGCAWidgets/types";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import { fireEvent } from "utils/gtag";
import Widget from "../widget/component";
import WidgetSkeleton from "../widget/widget-skeleton";
import styles from "./widgets-carousel.module.scss";

type WidgetsCarouselProps = {
  widgets: GCAWidget[];
  isLoading: boolean;
  max?: number;
  page?: string;
};

/** Shows a carousel of featured widgets. */
const WidgetsCarousel = ({ widgets, isLoading, max = 6, page }: WidgetsCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>();

  const [viewedWidget, setViewedWidget] = useState<string>();
  const [scrollPos, setScrollPos] = useState<number>(0);

  const getCarouselCurrentIndex = () => {
    const nodes = carouselRef?.current?.childNodes;
    const items = nodes && (Array.from(nodes) as Element[]);
    const index = items?.findIndex(item => item.id === viewedWidget) ?? -1;

    return index === -1 ? 0 : index;
  };

  /** Moves headlines. */
  const navigateWidget = (action: "back" | "next") => {
    if (!carouselRef.current) return;

    const widgetWidth = carouselRef.current.firstElementChild?.clientWidth;

    if (!widgetWidth) return;

    const targetWidgetIndex =
      widgets.findIndex(headline => headline.id.toString() === viewedWidget) + (action === "back" ? -1 : 1);

    carouselRef.current.scrollTo({
      left: widgetWidth * (targetWidgetIndex + 1),
      behavior: "smooth"
    });
  };

  useEffect(() => {
    if (!viewedWidget && widgets && widgets.length > 0) {
      setViewedWidget(widgets[0].id.toString());

      if (!carouselRef.current) return;

      const widgetWidth = carouselRef.current.firstElementChild?.clientWidth;

      if (!widgetWidth) return;

      carouselRef.current.scrollTo({
        left: widgetWidth
      });
    }
    // eslint-disable-next-line
  }, [widgets]);

  useEffect(() => {
    const carouselIndex = getCarouselCurrentIndex();
    if (page === "news" && !isLoading) {
      const carouselItems = carouselRef.current?.childNodes.length;
      if (carouselItems && carouselIndex === 0) fireEvent(NEWS_CAROUSEL_STARTED, null);
      if (carouselRef.current && carouselItems && carouselIndex === carouselItems - 1) {
        fireEvent(NEWS_CAROUSEL_COMPLETED, null);
      }

      fireEvent(NEWS_CAROUSEL_VIEWED, `${carouselIndex + 1}`);
    }
    // eslint-disable-next-line
  }, [viewedWidget]);

  /** Updates the currently viewed widget. */
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;

    const widgetWidth = carouselRef.current.firstElementChild?.clientWidth;

    if (!widgetWidth) return;

    const maxScrollPos = widgets.length * widgetWidth;

    if (scrollPos <= 5) {
      return carouselRef.current.scrollTo({
        left: maxScrollPos
      });
    }
    if (scrollPos >= maxScrollPos + widgetWidth) {
      return carouselRef.current.scrollTo({
        left: widgetWidth
      });
    }

    const newWidgetIndex = Math.round(scrollPos / widgetWidth) - 1;

    const newWidget = widgets.find((_, index) => newWidgetIndex === index);

    if (!newWidget) return;

    setViewedWidget(newWidget.id.toString());
  };

  useDebounce(handleCarouselScroll, 50, [scrollPos]);

  return (
    <div className={styles["c-widgets-carousel"]}>
      {/* Widgets */}
      <div
        ref={ref => {
          if (ref) carouselRef.current = ref;
        }}
        className={styles["c-widgets-carousel__wrapper"]}
        onScroll={() => setScrollPos(carouselRef.current?.scrollLeft ?? 0)}
      >
        {isLoading ? (
          <div className={styles["widget-skeleton"]}>
            <WidgetSkeleton dark />
          </div>
        ) : (
          <>
            {widgets.length > 1 && (
              <div id={`first-${widgets[widgets.length - 1].id}`} className={styles["widget"]}>
                <Widget widget={widgets[widgets.length - 1]} />
              </div>
            )}

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

            {widgets.length > 1 && (
              <div id={`last-${widgets[0].id}`} className={styles["widget"]}>
                <Widget widget={widgets[0]} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className={styles["c-widgets-carousel__controls"]}>
        {/* Previous button */}
        {isLoading ? (
          <Skeleton.IconButton variant="sm" />
        ) : (
          <IconButton name="arrow-left" size={16} onClick={() => navigateWidget("back")} small />
        )}

        {/* Indicator */}
        {isLoading ? (
          <Skeleton.Text widths={["100%"]} className={styles["indicator-skeleton"]} />
        ) : (
          <CarouselViewIndicator
            ids={widgets.slice(0, max).map(widget => widget.id.toString())}
            activeId={viewedWidget}
          />
        )}

        {/* Next button */}
        {isLoading ? (
          <Skeleton.IconButton variant="sm" />
        ) : (
          <IconButton name="arrow-right" size={16} onClick={() => navigateWidget("next")} small />
        )}
      </div>
    </div>
  );
};

export default WidgetsCarousel;
