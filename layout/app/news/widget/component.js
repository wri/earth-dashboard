import WidgetPreview from "components/widgets/preview";
import classnames from "classnames";
import styles from "./widget.module.scss";
import PropTypes from "prop-types";

const Widget = ({ className, widget, ...rest }) => (
  <div className={classnames(className, styles["c-page-section-widget"])} {...rest}>
    <WidgetPreview widget={{ id: widget.attributes["widget_id"] }} showSource widgetShouldBeLoaded />
  </div>
);

Widget.propTypes = {
  className: PropTypes.string,
  widget: PropTypes.shape({
    attributes: PropTypes.shape({
      widget_id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

Widget.defaultProps = {
  className: ""
};

export default Widget;
