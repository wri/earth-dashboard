import React from 'react';
import PropTypes from 'prop-types';
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
  const data = getChallengeSectionDataByTopic(topic);
  const getParagraphs = (mobile) =>
    <div className={styles['paragraphs-container']}>
      <div className={styles.paragraphs}>
        {data?.paragraphs?.map((paragraph, index) =>
          <div key={`paragraph-${index}`}>
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
        )}
      </div>
    </div>;

  const getPhotoAttribution = () =>
    <div className={styles['photo-attribution-container']}>
      {data?.photoAttribution}
    </div>;

  return (
    <div
      className={styles['c-challenge-to-our-global-commons-section']}
      id="challenge-to-our-global-commons"
      style={{ backgroundImage: `url('/static/images/${topic}/challenge.png')` }}
    >
      <MediaContextProvider>
        <Desktop className={classnames({
          [styles['main-container']]: true,
          [styles['-desktop']]: true
        })}>
          <h1>The <span style={{ color: topicColor }}>Challenge</span> to our Global Commons</h1>
          {getParagraphs()}
          {getPhotoAttribution()}
        </Desktop>
        <Mobile className={classnames({
          [styles['main-container']]: true,
          [styles['-mobile']]: true
        })}>
          <h3>The <span style={{ color: topicColor }}>Challenge</span> to our Global Commons</h3>
          {getParagraphs()}
          {getPhotoAttribution()}
        </Mobile>
      </MediaContextProvider>
    </div>
  );
}

ChallengeToOurGlobalCommons.propTypes = { topic: PropTypes.string.isRequired };

export default ChallengeToOurGlobalCommons;
