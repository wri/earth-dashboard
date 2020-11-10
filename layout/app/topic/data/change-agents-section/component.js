import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// utils
import { getColorByTopic } from 'utils/topics';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './change-agents-section.module.scss';

function ChangeAgentsSection(props) {
  const { topic } = props;
  const topicColor = getColorByTopic(topic);
  

  return (
    <div
      className={classnames({
        [styles['c-change-agents-section']]: true,
        [styles['-mobile']]: showMobileVersion
      })}
      style={{ backgroundColor: topicColor }}
      id="change-agents"
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
