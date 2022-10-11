import { GCAWidget } from "hooks/useGCAWidgets/types";
import Widget from "../widget/component";
import styles from "./widgets-carousel.module.scss";

type WidgetsCarouselProps = {
  widgets: GCAWidget[];
};

/** Shows a carousel of featured widgets. */
const WidgetsCarousel = ({ widgets }: WidgetsCarouselProps) => {
  if (widgets.length === 0) return null;

  return (
    <div className={styles["c-widgets-carousel"]}>
      {widgets.map(widget => (
        <div key={widget.id} className={styles["c-widgets-carousel__widget-wrapper"]}>
          <Widget widget={widget} />
        </div>
      ))}
    </div>
  );
};

export default WidgetsCarousel;
