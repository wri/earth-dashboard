import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Widget Editor
import Renderer from '@widget-editor/renderer';
import RwAdapter from '@widget-editor/rw-adapter';

// services
import { fetchWidget } from 'services/widget';
// utils
import { makeMapWidgetConfigCompatibleWithLeaflet } from 'utils/widget';

// components
import ErrorBoundary from 'components/ui/error-boundary';
import CombinedWidget from 'components/widgets/combined';
import ListWidget from 'components/widgets/list';
import StaticListWidget from 'components/widgets/static-list';
import DynamicTextWidget from 'components/widgets/dynamic-text';
import StaticTextWidget from 'components/widgets/static-text';
import NewsWidget from 'components/widgets/news';
import {
  LIST_WIDGET_TYPE,
  STATIC_LIST_WIDGET_TYPE,
  COMBINED_WIDGET_TYPE,
  NEWS_WIDGET_TYPE,
  DYNAMIC_TEXT_WIDGET_TYPE,
  STATIC_TEXT_WIDGET_TYPE
} from 'components/admin/data/widgets/form/constants';

// styles
import styles from './widget-preview.module.scss';

function WidgetPreview({ widget, showSource, widgetShouldBeLoaded }) {
  const [widgetData, setWidgetData] = useState({
    loading: widgetShouldBeLoaded,
    id: widget.id,
    data: widgetShouldBeLoaded ? null : widget
  });
  const isServer = typeof window === 'undefined';
  const { loading, data } = widgetData;
  const widgetConfig = data?.widgetConfig;
  const widgetType = widgetConfig?.type || 'chart';
  const useRenderer = widgetType && ['map', 'chart'].includes(widgetType);
  const isEmbed = widgetType === 'embed';
  const isCombined = widgetType === COMBINED_WIDGET_TYPE;
  const isList = widgetType === LIST_WIDGET_TYPE;
  const isStaticList = widgetType === STATIC_LIST_WIDGET_TYPE;
  const isNews = widgetType === NEWS_WIDGET_TYPE;
  const isDynamicText = widgetType === DYNAMIC_TEXT_WIDGET_TYPE;
  const isStaticText = widgetType === STATIC_TEXT_WIDGET_TYPE;
  const widgetEmbedUrl = isEmbed && widgetConfig.url;

  const loadWidget = async () => {
    try {
      const res = await fetchWidget(widget.id, { includes: 'metadata' });
      setWidgetData({
        id: res.id,
        loading: false,
        data: res
      });
    } catch (err) {
      console.error(`Error loading widget: ${widget.id} - ${err}`);
    }
  };

  useEffect(() => {
    if (widgetShouldBeLoaded) {
      loadWidget();
    }
  }, []);

  return (
    <ErrorBoundary className={styles['c-widget-preview']}>

      {!loading && !isServer &&
        <>
          { useRenderer &&
            <Renderer
              widgetConfig={widgetType === 'map' ?
                makeMapWidgetConfigCompatibleWithLeaflet(widgetConfig) :
                widgetConfig}
              adapter={RwAdapter}
            />
          }
          {isEmbed &&
            <iframe
              title={data.name}
              src={widgetEmbedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
            />
          }
          {isCombined &&
            <CombinedWidget
              widget={data}
              showSource={showSource}
            />
          }
          {isList &&
            <ListWidget
              widget={data}
              showSource={showSource}
            />
          }
          {isStaticList &&
            <StaticListWidget
              widget={data}
              showSource={showSource}
            />
          }
          {isDynamicText &&
            <DynamicTextWidget
              widget={data}
              showSource={showSource}
            />
          }
          {isStaticText &&
            <StaticTextWidget
              widget={data}
              showSource={showSource}
            />
          }
          {isNews &&
            <NewsWidget
              widget={data}
              showSource={showSource}
            />
          }
        </>
      }
    </ErrorBoundary>);
}

WidgetPreview.propTypes = {
  widget: PropTypes.object.isRequired,
  showSource: PropTypes.bool,
  widgetShouldBeLoaded: PropTypes.bool
};

WidgetPreview.defaultProps = {
  showSource: false,
  widgetShouldBeLoaded: false
};

export default WidgetPreview;
