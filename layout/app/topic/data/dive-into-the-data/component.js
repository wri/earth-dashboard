import React from 'react';
import PropTypes from 'prop-types';

// utils
import { getColorByTopic } from 'utils/topics';

// styles
import styles from './dive-into-the-data-section.module.scss';

function DiveIntoTheDataSection(props) {
  const { topic } = props;
  const topicColor = getColorByTopic(topic);

  return (
    <div className={styles['c-dive-into-the-data-section']} >
      <h2>Dive into the <span style={{ color: topicColor }}>Data</span></h2>
    </div>
  );
}

DiveIntoTheDataSection.propTypes = { topic: PropTypes.string.isRequired };

export default DiveIntoTheDataSection;
