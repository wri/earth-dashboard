import React from 'react';

// Widget Editor
import Renderer from '@widget-editor/renderer';

// components
import CombinedWidget from 'components/widgets/combined';
import ListWidget from 'components/widgets/list';

// styles
import './styles.scss';

function WidgetPreview(props) {
  const { widget } = props;
  const widgetConfig = widget && widget.widgetConfig;
  const widgetType = widgetConfig && (widgetConfig.type || 'chart');
  const useRenderer = ['map', 'chart'].includes(widgetType);
  const isEmbed = widgetType === 'embed';
  const isCombined = widgetType === 'combined';
  const isList = widgetType === 'list';
  const widgetEmbedUrl = isEmbed && widgetConfig.url;

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
    </div>
  );
}

export default WidgetPreview;
