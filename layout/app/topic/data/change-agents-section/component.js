import React from 'react';
import PropTypes from 'prop-types';

// utils
import { getColorByTopic } from 'utils/topics';

// styles
import styles from './change-agents-section.module.scss';

function ChangeAgentsSection(props) {
  const { topic } = props;
  const topicColor = getColorByTopic(topic);

  return (
    <div
      className={styles['c-change-agents-section']}
      style={{ backgroundColor: topicColor }}
    >
      <h2>Change Agents <span>(coming soon)</span></h2>
      <div className={styles.subtitle}>
        Explore the companies, cities, governments and consumers that are having a positive impact towards solutions to our Global Commons problems.
      </div>
    </div>
  );
}

ChangeAgentsSection.propTypes = { topic: PropTypes.string.isRequired };

export default ChangeAgentsSection;
