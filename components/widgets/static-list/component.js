import React from 'react';
import PropTypes from 'prop-types';

// components
import SourceBox from 'components/widgets/source-box';

// styles
import styles from './static-list-widget.module.scss';

function StaticListWidget(props) {
  const { widget, showSource } = props;
  const widgetConfig = widget && widget.widgetConfig;
  const staticListWidgetConfig = widgetConfig && widgetConfig.staticListWidgetConfig;
  const { numbers, bullets, values, source } = staticListWidgetConfig || {};
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
      { showSource && source && <SourceBox source={source} /> }
    </div>
  );
}

StaticListWidget.propTypes = { 
  widget: PropTypes.object.isRequired,
  showSource: PropTypes.bool
};

StaticListWidget.defaultProps = { 
  showSource: true
};

export default StaticListWidget;
