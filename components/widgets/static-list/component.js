import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './static-list-widget.module.scss';

function StaticListWidget(props) {
  const { widget } = props;
  const widgetConfig = widget && widget.widgetConfig;
  const staticListWidgetConfig = widgetConfig && widgetConfig.staticListWidgetConfig;
  const { numbers, bullets, values } = staticListWidgetConfig || {};
  const ListTag = numbers ? 'ol' : (bullets ? 'ul' : 'ol');

  return (
    <div className={styles['c-static-list-widget']}>
      <ListTag>
        {values.map(elem =>
          <li>
            {elem.link && 
              <a 
                href={elem.link} 
                target="_blank" 
                style={elem.style}
              >
                {elem.label}
              </a>}
            {!elem.link && <span style={elem.style}>{elem.label}</span>}
          </li>
        )}
      </ListTag>
    </div>
  );
}

StaticListWidget.propTypes = { widget: PropTypes.object.isRequired };

export default StaticListWidget;
