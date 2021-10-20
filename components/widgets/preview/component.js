import { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import useWidget from "hooks/useWidget";

// Widget Editor
import Renderer from "@widget-editor/renderer";
import RwAdapter from "@widget-editor/rw-adapter";

// components
import ErrorBoundary from "components/ui/error-boundary";
import CombinedWidget from "components/widgets/combined";
import ListWidget from "components/widgets/list";
import StaticListWidget from "components/widgets/static-list";
import DynamicTextWidget from "components/widgets/dynamic-text";
import StaticTextWidget from "components/widgets/static-text";
import NewsWidget from "components/widgets/news";
import {
  LIST_WIDGET_TYPE,
  STATIC_LIST_WIDGET_TYPE,
  COMBINED_WIDGET_TYPE,
  NEWS_WIDGET_TYPE,
  DYNAMIC_TEXT_WIDGET_TYPE,
  STATIC_TEXT_WIDGET_TYPE
} from "components/admin/data/widgets/form/constants";

// styles
import styles from "./widget-preview.module.scss";
import RandomPlaceholder from "components/widgets/random-placeholder";

function WidgetPreview({ widget, showSource, widgetShouldBeLoaded, showLoadingPlaceholder, isMobile }) {
  const widgetData = useWidget(widget, widgetShouldBeLoaded);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const isServer = typeof window === "undefined";
  const { loading, data } = widgetData;
  const widgetConfig = data?.widgetConfig;
  const widgetType = widgetConfig?.type || "chart";
  const useRenderer = widgetType && ["map", "chart"].includes(widgetType);
  const isEmbed = widgetType === "embed";
  const isCombined = widgetType === COMBINED_WIDGET_TYPE;
  const isList = widgetType === LIST_WIDGET_TYPE;
  const isStaticList = widgetType === STATIC_LIST_WIDGET_TYPE;
  const isNews = widgetType === NEWS_WIDGET_TYPE;
  const isDynamicText = widgetType === DYNAMIC_TEXT_WIDGET_TYPE;
  const isStaticText = widgetType === STATIC_TEXT_WIDGET_TYPE;
  const widgetEmbedUrl = isEmbed && widgetConfig.url;

  const isMap = widgetType === "map";

  return (
    <ErrorBoundary
      className={classnames(styles["c-widget-preview"], isFullScreen && styles["c-widget-preview--full-screen"])}
    >
      {isMobile && isMap && !isFullScreen && (
        <button className={styles["c-widget-preview__open-button"]} onClick={() => setIsFullScreen(true)}>
          Open map
        </button>
      )}
      {isFullScreen && (
        <button
          className={classnames(
            styles["c-widget-preview__close-button"],
            "c-button c-button--new-style c-button--flame"
          )}
          onClick={() => setIsFullScreen(false)}
        >
          Close map
        </button>
      )}
      {loading && showLoadingPlaceholder && <RandomPlaceholder />}
      {!loading && !isServer && (
        <div
          className={classnames({
            [styles["preview-container"]]: true,
            [styles["-animate"]]: showLoadingPlaceholder
          })}
        >
          {useRenderer && <Renderer widgetConfig={widgetConfig} adapter={RwAdapter} />}
          {isEmbed && <iframe title={data.name} src={widgetEmbedUrl} width="100%" height="100%" frameBorder="0" />}
          {isCombined && <CombinedWidget widget={data} showSource={showSource} />}
          {isList && <ListWidget widget={data} showSource={showSource} />}
          {isStaticList && <StaticListWidget widget={data} showSource={showSource} />}
          {isDynamicText && <DynamicTextWidget widget={data} showSource={showSource} />}
          {isStaticText && <StaticTextWidget widget={data} showSource={showSource} />}
          {isNews && <NewsWidget widget={data} showSource={showSource} />}
        </div>
      )}
    </ErrorBoundary>
  );
}

WidgetPreview.propTypes = {
  widget: PropTypes.object.isRequired,
  showSource: PropTypes.bool,
  widgetShouldBeLoaded: PropTypes.bool,
  showLoadingPlaceholder: PropTypes.bool,
  isMobile: PropTypes.bool
};

WidgetPreview.defaultProps = {
  showSource: false,
  widgetShouldBeLoaded: false,
  showLoadingPlaceholder: false,
  isMobile: false
};

export default WidgetPreview;
