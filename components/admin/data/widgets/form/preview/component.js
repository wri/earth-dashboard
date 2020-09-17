import React from 'react';

// Widget Editor
import Renderer from '@widget-editor/renderer';

// components
import CombinedWidget from 'components/widgets/combined';
import ListWidget from 'components/widgets/list';
import DynamicTextWidget from 'components/widgets/dynamic-text';
import NewsWidget from 'components/widgets/news';
import { 
  LIST_WIDGET_TYPE,
  COMBINED_WIDGET_TYPE,
  NEWS_WIDGET_TYPE,
  DYNAMIC_TEXT_WIDGET_TYPE
} from '../constants';

// styles
import './styles.scss';

function WidgetPreview(props) {
  const { widget } = props;
  const widgetConfig = widget && widget.widgetConfig;
  const widgetType = widgetConfig && (widgetConfig.type || 'chart');
  const useRenderer = ['map', 'chart'].includes(widgetType);
  const isEmbed = widgetType === 'embed';
  const isCombined = widgetType ===   COMBINED_WIDGET_TYPE;
  const isList = widgetType === LIST_WIDGET_TYPE;
  const isNews = widgetType === NEWS_WIDGET_TYPE;
  const isDynamicText = widgetType === DYNAMIC_TEXT_WIDGET_TYPE;
  const widgetEmbedUrl = isEmbed && widgetConfig.url;

  console.log('WP widget', widget);
  console.log('WP widgettype', widgetType);
  return (
    <div
      className="c-widget-preview"
    >
      {useRenderer &&
        <Renderer widgetConfig={widgetConfig} />
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
        />
      }
      {isList &&
        <ListWidget
          widget={widget}
        />
      }
      {isDynamicText &&
        <DynamicTextWidget
          widget={widget}
        />
      }
      {isNews && 
        <NewsWidget
          widget={widget}
        />
      }
    </div>
  );
}

export default WidgetPreview;
