import PropTypes from "prop-types";
import classnames from "classnames";

// components
import SourceBox from "components/widgets/source-box";

// styles
import styles from "./static-list-widget.module.scss";

function StaticListWidget(props) {
  const { widget, showSource } = props;
  const widgetConfig = widget && widget.widgetConfig;
  const staticListWidgetConfig = widgetConfig && widgetConfig.staticListWidgetConfig;
  const { numbers, bullets, values, source, topic } = staticListWidgetConfig || {};
  const ListTag = numbers ? "ol" : bullets ? "ul" : "ol";

  return (
    <div className={styles["c-static-list-widget"]}>
      <ListTag>
        {values.map(elem => (
          <li key={`list-elem-${elem.label}`}>
            {elem.link && (
              <a href={elem.link} target="_blank" style={elem.style} rel="noreferrer">
                {elem.label}
              </a>
            )}
            {!elem.link && (
              <span
                className={classnames({
                  [styles["list-element-label"]]: true,
                  [topic]: true
                })}
                style={elem.style}
              >
                {elem.label}
              </span>
            )}
          </li>
        ))}
      </ListTag>
      {showSource && source && <SourceBox source={source} />}
    </div>
  );
}

StaticListWidget.propTypes = {
  widget: PropTypes.object.isRequired,
  showSource: PropTypes.bool
};

StaticListWidget.defaultProps = {
  showSource: true
};

export default StaticListWidget;
