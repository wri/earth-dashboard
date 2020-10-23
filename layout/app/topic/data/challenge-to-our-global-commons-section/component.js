import React from 'react';
import PropTypes from 'prop-types';

// utils
import {
  getColorByTopic,
  getChallengeSectionDataByTopic
} from 'utils/topics';

// styles
import styles from './challenge-to-our-global-commons-section.module.scss';

function ChallengeToOurGlobalCommons(props) {
  const { topic } = props;
  const topicColor = getColorByTopic(topic);

  return (
    <div
      className={styles['c-challenge-to-our-global-commons-section']}
      id="challenge-to-our-global-commons"
    >
      <div className={styles['main-container']}>
        <h1>The <span style={{ color: topicColor }}>Challenge</span> to our Global Commons</h1>
        <div className={styles.subtitle}>
          {getChallengeSectionDataByTopic(topic)?.description}
        </div>
      </div>
    </div>
  );
}

ChallengeToOurGlobalCommons.propTypes = { topic: PropTypes.string.isRequired };

export default ChallengeToOurGlobalCommons;
