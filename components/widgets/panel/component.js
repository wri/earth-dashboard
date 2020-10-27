import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import WidgetPreview from 'components/widgets/preview';

// styles
import styles from './widget-panel.module.scss';

function WidgetPanel({ widget }) {
    console.log('widget', widget);
    const isMap = widget?.widgetConfig?.paramsConfig?.visualizationType === 'map';
    return (
        <div className={styles['c-widget-panel']}>
            <div className={styles['panel-title']}>
                <span className={styles.title}>
                    {widget.name}
                </span>
                <div className={styles['panel-actions']}>

                </div>
            </div>
            <div
                className={classnames({
                    [styles['widget-preview-container']]: true,
                    [styles['-chart']]: !isMap
                })}
            >
                <WidgetPreview widget={widget} />
                <div className={styles['powered-by']}>
                    powered by <a href="https://resourcewatch.org/" target="_blank">RESOURCEWATCH</a>
                </div>
            </div>
        </div>
    );
}

WidgetPanel.propTypes = { widget: PropTypes.object.isRequired };

export default WidgetPanel;

