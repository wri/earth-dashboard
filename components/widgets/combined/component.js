import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';

// components
import Spinner from 'components/ui/spinner';
import WidgetPreview from 'components/admin/data/widgets/form/preview';

// services
import { fetchWidget } from 'services/widget';

// styles
import './styles.scss';

function CombinedWidget(props) {
  const { widget } = props;
  const combinedWidgetConfig = widget && widget.widgetConfig &&
        widget.widgetConfig.combinedWidgetConfig;
  const direction = combinedWidgetConfig.direction;
  const directionIsRow = direction === 'row';
  const widget1 = combinedWidgetConfig && combinedWidgetConfig.widget1;
  const widget2 = combinedWidgetConfig && combinedWidgetConfig.widget2;


  const [loading, setLoading] = useState(true);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    const promises = [
      fetchWidget(widget1.id),
      fetchWidget(widget2.id)
    ];

    Promise.all(promises)
      .then((responses) => {
        const widgetObj1 = responses[0];
        const widgetObj2 = responses[1];

        setLoading(false);

        console.log('widgetObj1', widgetObj1);
        console.log('widgetObj2', widgetObj2);

        setWidgets({
          widget1: widgetObj1,
          widget2: widgetObj2
        });
      })
      .catch(() => {
        setLoading(false);
        toastr.error(`Error loading widgets with ids: ${widget1.id} and ${widget2.id}`);
      });
  }, [widget, widget1.id, widget2.id]);

  const mainClassname = classnames({
    'c-combined-widget': true,
    '-row': directionIsRow,
    '-column': !directionIsRow
  });

  console.log('widgets', widgets);
  return (
    <div className={mainClassname}>
      {loading && <Spinner isLoading={loading} className="-relative -light" />}
      {widgets && widgets.widget1 &&
        <div
          className="widget1-container"
          style={directionIsRow ? {
                        'min-width': `${widget1.percentage}%`,
                        'max-width': `${widget1.percentage}%`
                    } :
                    {
                        'min-height': `${widget1.percentage}%`,
                        'max-height': `${widget1.percentage}%`
                    }}
        >
          <WidgetPreview widget={widgets.widget1} />
        </div>
            }
      {widgets && widgets.widget2 &&
        <div
          className="widget2-container"
          style={directionIsRow ? {
                        'min-width': `${widget2.percentage}%`,
                        'max-width': `${widget2.percentage}%`
                    } :
                    {
                        'min-height': `${widget2.percentage}%`,
                        'max-height': `${widget2.percentage}%`
                    }}
        >
          <WidgetPreview widget={widgets.widget2} />
        </div>
            }
    </div>
  );
}

CombinedWidget.propTypes = { widget: PropTypes.object.isRequired };

export default CombinedWidget;
