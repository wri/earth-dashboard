import React from 'react';
import PropTypes from 'prop-types';

// Widget Editor
import Renderer from '@widget-editor/renderer';
import RwAdapter from '@widget-editor/rw-adapter';

// components
import CombinedWidget from 'components/widgets/combined';
import ListWidget from 'components/widgets/list';
import DynamicTextWidget from 'components/widgets/dynamic-text';
import StaticTextWidget from 'components/widgets/static-text';
import NewsWidget from 'components/widgets/news';
import {
  LIST_WIDGET_TYPE,
  COMBINED_WIDGET_TYPE,
  NEWS_WIDGET_TYPE,
  DYNAMIC_TEXT_WIDGET_TYPE,
  STATIC_TEXT_WIDGET_TYPE
} from 'components/admin/data/widgets/form/constants';

// styles
import styles from './widget-preview.module.scss';

function WidgetPreview({ widget, showSource }) {
  const widgetConfig = widget && widget.widgetConfig;
  const widgetType = widgetConfig && (widgetConfig.type || 'chart');
  const useRenderer = ['map', 'chart'].includes(widgetType);
  const isEmbed = widgetType === 'embed';
  const isCombined = widgetType === COMBINED_WIDGET_TYPE;
  const isList = widgetType === LIST_WIDGET_TYPE;
  const isNews = widgetType === NEWS_WIDGET_TYPE;
  const isDynamicText = widgetType === DYNAMIC_TEXT_WIDGET_TYPE;
  const isStaticText = widgetType === STATIC_TEXT_WIDGET_TYPE;
  const widgetEmbedUrl = isEmbed && widgetConfig.url;

  return (
    <div className={styles['c-widget-preview']}>
      {useRenderer &&
        <Renderer
          widgetConfig={widgetConfig}
          adapter={RwAdapter}
        />
      }
      {isEmbed &&
        <iframe
          title={widget.name}
          src={widgetEmbedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      }
      {isCombined &&
        <CombinedWidget
          widget={widget}
          showSource={showSource}
        />
      }
      {isList &&
        <ListWidget
          widget={widget}
          showSource={showSource}
        />
      }
      {isDynamicText &&
        <DynamicTextWidget
          widget={widget}
          showSource={showSource}
        />
      }
      {isStaticText &&
        <StaticTextWidget
          widget={widget}
          showSource={showSource}
        />
      }
      {isNews &&
        <NewsWidget
          widget={widget}
          showSource={showSource}
        />
      }
    </div>
  );
}

WidgetPreview.propTypes = {
  widget: PropTypes.object.isRequired,
  showSource: PropTypes.bool
};

WidgetPreview.defaultProps = { showSource: false };

export default WidgetPreview;
