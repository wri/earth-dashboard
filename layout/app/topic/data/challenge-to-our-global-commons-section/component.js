import React from 'react';
import PropTypes from 'prop-types';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

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

    >
      <div
        className={styles['background-container']}
      >
        <div 
          className={styles['title-container']}
          style={{ backgroundImage: `url('/static/images/${topic}/challenge.png')` }}
        >
          <h1>The <span style={{ color: topicColor }}>Challenge</span> to our Global Commons</h1>
        </div>
        <div className={styles['paragraphs-container']}>
          <div className={styles.paragraphs}>
            {isBrowser &&
              <Scrollama
                offset={0.6}
                onStepExit={({data}) => console.log('onStepExit', data)}
              >
                {getChallengeSectionDataByTopic(topic)?.paragraphs.map((paragraph, index) =>
                  <Step 
                    data={index}
                    key={`challenge-step-${index}`}
                  >
                    <div
                      className={classnames({
                        [styles['challenge-paragraph']]: true,
                        [styles[`-${topic}`]]: true
                      })}
                    >
                      {paragraph}
                    </div>
                  </Step>
                )}
              </Scrollama>
            }
          </div>
        </div>
        <div className={styles['photo-attribution-container']}>
          Photo by Etienne Delorieux on Unsplash
        </div>
      </div>
    </div>
  );
}

ChallengeToOurGlobalCommons.propTypes = { topic: PropTypes.string.isRequired };

export default ChallengeToOurGlobalCommons;
