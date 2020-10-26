import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import WidgetPreview from 'components/admin/data/widgets/form/preview';

// utils
import {
  getColorByTopic,
  getDiveIntoTheDataDataByTopic
} from 'utils/topics';

// styles
import styles from './dive-into-the-data-section.module.scss';

function DiveIntoTheDataSection({
  topic,
  topicData,
  widgets
}) {
  const topicColor = getColorByTopic(topic);
  const dataArray = topicData[topic].diveIntoTheData.data;
  const isBrowser = typeof window !== 'undefined';

  return (
    <div
      id="dive-into-the-data"
      className={styles['c-dive-into-the-data-section']}
    >
      <h2>Dive into the <span style={{ color: topicColor }}>Data</span></h2>
      <p className={styles.subtitle}>{getDiveIntoTheDataDataByTopic(topic)?.description}</p>
      {isBrowser &&
        <div className="row">
          {dataArray.map(widget =>
            <div className={classnames({
              "column": true,
              "small-12": widget.widgetsPerColumn === 1,
              "medium-6": widget.widgetsPerColumn >= 2,
              "large-4": widget.widgetsPerColumn === 3,
            })}>
              <WidgetPreview widget={widgets.find(w => w.id === widget.id)} />
            </div>
          )}
        </div>
      }
    </div>
  );
}

DiveIntoTheDataSection.propTypes = { topic: PropTypes.string.isRequired };

export default DiveIntoTheDataSection;
