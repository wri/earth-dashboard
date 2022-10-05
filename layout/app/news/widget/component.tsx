import WidgetPreview from "components/widgets/preview";
import useWidget from "hooks/useWidget";
import classnames from "classnames";
import ExternalLink from "components/ui/external-link";
import { RESOURCE_WATCH_WIDGET_LINK } from "constants/widgets";
import styles from "./widget.module.scss";
import { fireEvent } from "utils/gtag";
import { NEWS_OPENED_SOURCE } from "constants/tag-manager";
import { GCAWidget } from "hooks/useGCAWidgets/types";

// Matches {{...}}
const nameHighlightWrapperRegex = /\{\{([^\}]+)\}\}/g;

const findWrappedText = (string = "") => {
  const split = string.split(nameHighlightWrapperRegex);
  const matches = string.match(nameHighlightWrapperRegex);

  return split.map(el => ({
    string: el,
    wrapped: matches?.includes(el)
  }));
};

type WidgetProps = {
  className?: string;
  bordered?: boolean;
  widget: GCAWidget;
};

/** Widget for the news page. */
const Widget = ({ className = "", widget, bordered, ...rest }: WidgetProps) => {
  const {
    attributes: { widget_id: widgetId }
  } = widget;
  const { loading: widgetLoading, data: widgetData } = useWidget({ id: widgetId }, true);

  if (widgetLoading) return null;

  const { name, description, widgetConfig: { type = "chart" } = {} } = widgetData;

  const includeInfo = ["map", "chart"].includes(type);

  return (
    <div
      className={classnames(
        className,
        styles["c-page-section-widget"],
        type && styles[`c-page-section-widget--${type}`],
        bordered && styles["c-page-section-widget--bordered"]
      )}
      {...rest}
    >
      {includeInfo && (
        <div className={styles["c-page-section-widget__info"]}>
          <div className={styles["c-page-section-widget__name"]}>
            {findWrappedText(name).map((el, index) => (
              <span key={index} className={classnames(el.wrapped && styles["c-page-section-widget__name--highlight"])}>
                {el.string}
              </span>
            ))}
          </div>
          <div className={styles["c-page-section-widget__desc"]}>{description}</div>
        </div>
      )}
      <div className={styles["c-page-section-widget__widget"]}>
        <WidgetPreview widget={{ id: widgetId }} showSource widgetShouldBeLoaded />
      </div>
      {includeInfo && (
        <div>
          <ExternalLink
            className={styles["c-page-section-widget__source"]}
            onClick={() =>
              fireEvent(NEWS_OPENED_SOURCE, null, {
                source_link: RESOURCE_WATCH_WIDGET_LINK + widgetId,
                category_name: widget.attributes.category
              })
            }
            link={RESOURCE_WATCH_WIDGET_LINK + widgetId}
            label="Source"
          />
        </div>
      )}
    </div>
  );
};

Widget.defaultProps = {
  className: "",
  bordered: false
};

export default Widget;
