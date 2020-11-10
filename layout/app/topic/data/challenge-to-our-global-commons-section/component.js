import React from 'react';
import PropTypes from 'prop-types';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

// utils
import {
  getColorByTopic,
  getChallengeSectionDataByTopic
} from 'utils/topics';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './challenge-to-our-global-commons-section.module.scss';

function ChallengeToOurGlobalCommons(props) {
  const { topic } = props;
  const topicColor = getColorByTopic(topic);
  const isBrowser = typeof window !== 'undefined';
  const data = getChallengeSectionDataByTopic(topic);

  const getTitle = () =>
    <h1>The <span style={{ color: topicColor }}>Challenge</span> to our Global Commons</h1>;

  return (
    <div
      className={styles['c-challenge-to-our-global-commons-section']}
      id="challenge-to-our-global-commons"
    >
      <div
        className={styles['background-container']}
      >
        <MediaContextProvider>
          <Desktop>
            <div
              className={classnames({
                [styles['title-container']]: true,
                [styles['-desktop']]: true
              })}
              style={{ backgroundImage: `url('/static/images/${topic}/challenge.png')` }}
            >
              {getTitle()}
            </div>
          </Desktop>
          <Mobile>
            <div
              className={classnames({
                [styles['title-container']]: true,
                [styles['-mobile']]: true
              })}
              style={{ backgroundImage: `url('/static/images/${topic}/challenge.png')` }}
            >
              {getTitle()}
            </div>
          </Mobile>

          <div className={styles['paragraphs-container']}>
            <div className={styles.paragraphs}>
              {isBrowser &&
                <Scrollama
                  offset={0.6}
                  onStepExit={({ data }) => console.log('onStepExit', data)}
                >
                  {data?.paragraphs?.map((paragraph, index) =>
                    <Step
                      data={index}
                      key={`challenge-step-${index}`}
                    >
                      <div>
                        <Desktop>
                          <div
                            className={classnames({
                              [styles['challenge-paragraph']]: true,
                              [styles[`-${topic}`]]: true,
                              [styles['-desktop']]: true
                            })}
                          >
                            {paragraph}
                          </div>
                        </Desktop>
                        <Mobile>
                          <div
                            className={classnames({
                              [styles['challenge-paragraph']]: true,
                              [styles[`-${topic}`]]: true,
                              [styles['-mobile']]: true
                            })}
                          >
                            {paragraph}
                          </div>
                        </Mobile>
                      </div>
                    </Step>
                  )}
                </Scrollama>
              }
            </div>
          </div>
        </MediaContextProvider>
        <div className={styles['photo-attribution-container']}>
          {data?.photoAttribution}
        </div>
      </div>
    </div>
  );
}

ChallengeToOurGlobalCommons.propTypes = { topic: PropTypes.string.isRequired };

export default ChallengeToOurGlobalCommons;
