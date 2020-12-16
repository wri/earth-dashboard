import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

function WidgetPreview({
  widget,
  showSource,
  widgetShouldBeLoaded,
  topic,
  showLoadingPlaceholder
}) {
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

  const getRandomPlaceHolder = () => {
    const number = Math.round(Math.random() * 2);
    if (number === 1) {
      return (<div className={styles['loading-placeholder']}>
        In parts of the Amazon, <span className={classnames({
        [topic]: true,
        [styles['highlighted-text']]: true
      })}>dry spells are expected to double</span> in 2080 compared to 2006, leading to a potential increase in fires and decrease in species habitats and carbon storage.
      </div>);
    } else if (number === 2) {
      return (<div className={styles['loading-placeholder']}>
        In Amazon, <span className={classnames({
        [topic]: true,
        [styles['highlighted-text']]: true
      })}>dry spells are expectaaed to double in 2080</span> in 2080 compared to 2006.
      </div>);
    }
  };

  return (
    <ErrorBoundary className={styles['c-widget-preview']}>
      {loading && showLoadingPlaceholder &&
        getRandomPlaceHolder()
      }
      {!loading && !isServer &&
        <div className={classnames({
          [styles['preview-container']]: true,
          [styles['-animate']]: showLoadingPlaceholder
        })}>
          {useRenderer &&
            <Renderer
              widgetConfig={widgetConfig}
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
        </div>
      }
    </ErrorBoundary>);
}

WidgetPreview.propTypes = {
  widget: PropTypes.object.isRequired,
  showSource: PropTypes.bool,
  widgetShouldBeLoaded: PropTypes.bool,
  showLoadingPlaceholder: PropTypes.bool
};

WidgetPreview.defaultProps = {
  showSource: false,
  widgetShouldBeLoaded: false,
  topic: 'ocean',
  showLoadingPlaceholder: false
};

export default WidgetPreview;
