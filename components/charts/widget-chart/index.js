import React from 'react';
import PropTypes from 'prop-types';

// Widget editor
import Renderer from '@widget-editor/renderer';
import RwAdapter from '@widget-editor/rw-adapter';

function WidgetChart(props) {

  const { thumbnail, widget } = props;

  return (
    <div className="c-widget-chart">
      <Renderer
        widgetConfig={widget.widgetConfig}
        thumbnail={thumbnail}
        adapter={RwAdapter}
      />
    </div>
  );
}

WidgetChart.propTypes = {
  widget: PropTypes.object.isRequired,
  thumbnail: PropTypes.bool
};

WidgetChart.defaultProps = { thumbnail: false };

export default WidgetChart;
