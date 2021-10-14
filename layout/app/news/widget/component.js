import WidgetPreview from "components/widgets/preview";
import classnames from "classnames";
import styles from "./widget.module.scss";
import PropTypes from "prop-types";

const Widget = ({ className, widget }) => (
  <div className={classnames(className, styles["c-page-section-widget"])}>
    <div className={styles["c-page-section-widget__wrap"]}>
      <WidgetPreview widget={{ id: widget.attributes["widget_id"] }} widgetShouldBeLoaded />
    </div>
  </div>
);

Widget.propTypes = {
  className: PropTypes.string,
  widget: PropTypes.shape({
    widget_id: PropTypes.string.isRequired,
  }).isRequired,
};

Widget.defaultProps = {
  className: ""
};

export default Widget;
