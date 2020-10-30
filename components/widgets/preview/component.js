import React from 'react';

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
      {isStaticText &&
        <StaticTextWidget
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
