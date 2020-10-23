import React from 'react';
import PropTypes from 'prop-types';
import { Scrollama, Step } from 'react-scrollama';

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
  const isBrowser = typeof window !== 'undefined';

  return (
    <div
      className={styles['c-challenge-to-our-global-commons-section']}
      id="challenge-to-our-global-commons"
      style={{ backgroundImage: `url('/static/images/${topic}/challenge.png')` }}
    >
      <div className={styles['main-container']}>
        <h1>The <span style={{ color: topicColor }}>Challenge</span> to our Global Commons</h1>
        {isBrowser &&
          <div className={styles.paragraphs}>
            <Scrollama>
              {getChallengeSectionDataByTopic(topic)?.paragraphs
                .map((paragraph, stepIndex) =>
                  <Step key={`step-${stepIndex}`}>
                    <div>
                      {paragraph}
                    </div>
                  </Step>
                )
              }
            </Scrollama>
          </div>
        }
      </div>
      <div className={styles['photo-attribution-container']}>
        Photo by Etienne Delorieux on Unsplash
      </div>
    </div>
  );
}

ChallengeToOurGlobalCommons.propTypes = { topic: PropTypes.string.isRequired };

export default ChallengeToOurGlobalCommons;
