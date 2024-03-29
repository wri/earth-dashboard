import { useState, useEffect } from "react";
import classnames from "classnames";
import { toastr } from "react-redux-toastr";
import PropTypes from "prop-types";

// components
import Spinner from "components/ui/spinner";
import WidgetPreview from "components/widgets/preview";
import SourceBox from "components/widgets/source-box";

// services
import { fetchWidget } from "services/widget";

// styles
import styles from "./combined-widget.module.scss";

function CombinedWidget({ widget, showSource }) {
  const combinedWidgetConfig = widget && widget.widgetConfig && widget.widgetConfig.combinedWidgetConfig;
  const direction = combinedWidgetConfig.direction;
  const directionIsRow = direction === "row";
  const widget1 = combinedWidgetConfig && combinedWidgetConfig.widget1;
  const widget2 = combinedWidgetConfig && combinedWidgetConfig.widget2;
  const source = combinedWidgetConfig?.source;

  const [loading, setLoading] = useState(true);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    const promises = [fetchWidget(widget1.id), fetchWidget(widget2.id)];

    Promise.all(promises)
      .then(responses => {
        const widgetObj1 = responses[0];
        const widgetObj2 = responses[1];

        setLoading(false);

        setWidgets({
          widget1: widgetObj1,
          widget2: widgetObj2
        });
      })
      .catch(() => {
        setLoading(false);
        toastr.error(`Error loading widgets with ids: ${widget1.id} and ${widget2.id}`);
      });
  }, [widget, widget1.id, widget2.id]);

  const mainClassname = classnames({
    [styles["c-combined-widget"]]: true,
    [styles["-row"]]: directionIsRow,
    [styles["-column"]]: !directionIsRow
  });

  const widget1Style = directionIsRow
    ? {
        "min-width": `${widget1.percentage}%`,
        "max-width": `${widget1.percentage}%`
      }
    : {
        "min-height": `${widget1.percentage}%`,
        "max-height": `${widget1.percentage}%`
      };

  const widget2Style = directionIsRow
    ? {
        "min-width": `${widget2.percentage}%`,
        "max-width": `${widget2.percentage}%`
      }
    : {
        "min-height": `${widget2.percentage}%`,
        "max-height": `${widget2.percentage}%`
      };

  return (
    <div className={mainClassname}>
      {loading && <Spinner isLoading={loading} className="-relative -light" />}
      <div className={styles["widgets-container"]}>
        {widgets && widgets.widget1 && (
          <div className={styles["widget1-container"]} {...(widget1.percentage && { style: widget1Style })}>
            <WidgetPreview widget={widgets.widget1} />
          </div>
        )}
        {widgets && widgets.widget2 && (
          <div className={styles["widget2-container"]} {...(widget2.percentage && { style: widget2Style })}>
            <WidgetPreview widget={widgets.widget2} />
          </div>
        )}
      </div>
      {showSource && source && <SourceBox source={source} />}
    </div>
  );
}

CombinedWidget.propTypes = {
  widget: PropTypes.object.isRequired,
  showSource: PropTypes.bool
};

CombinedWidget.defaultProps = { showSource: false };

export default CombinedWidget;
