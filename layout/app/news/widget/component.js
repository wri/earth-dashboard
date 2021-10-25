import WidgetPreview from "components/widgets/preview";
import useWidget from "hooks/useWidget";
import classnames from "classnames";
import styles from "./widget.module.scss";
import PropTypes from "prop-types";

// Matches {{...}}
const nameHighlightWrapperRegex = /\{\{([^\}]+)\}\}/g;

const findWrappedText = (string = "", wrapperRegex) => {
  const split = string.split(wrapperRegex);
  const matches = string.match(wrapperRegex);

  return split.map(el => ({
    string: el,
    wrapped: matches?.includes(el)
  }));
};

const Widget = ({ className, widget, bordered, ...rest }) => {
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
            {findWrappedText(name, nameHighlightWrapperRegex).map((el, index) => (
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
        <div className={styles["c-page-section-widget__source"]}>
          
        </div>
      )}
    </div>
  );
};

Widget.propTypes = {
  className: PropTypes.string,
  bordered: PropTypes.bool,
  widget: PropTypes.shape({
    attributes: PropTypes.shape({
      widget_id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

Widget.defaultProps = {
  className: "",
  bordered: false
};

export default Widget;
