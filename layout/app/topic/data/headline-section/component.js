import React from 'react';
import PropTypes from 'prop-types';

// utils
import {
  getColorByTopic,
  getSecondaryColorByTopic,
  getHeadlineSectionDataBytopic
} from 'utils/topics';

// styles
import styles from './headline-section.module.scss';

function HeadlineSection(props) {
  const { topic } = props;

  const topicColor = getColorByTopic(topic);
  const topicSecondaryColor = getSecondaryColorByTopic(topic);
  const sectionData = getHeadlineSectionDataBytopic(topic);

  return (
    <div
      className={styles['c-headline-section']}
      style={{ backgroundColor: topicColor }}
    >
      <div className={styles['main-container']}>
        <div className={styles['topic-name-title']}>
          {topic.toUpperCase()}
        </div>
        {sectionData.mainTitle}
        <div className={styles.subtitle}>
          {sectionData.subtitle}
        </div>
        <div
          className={styles['scroll-to-explore']}
          style={{ color: topicSecondaryColor }}
        >
          <span>SCROLL TO EXPLORE</span>
          <img src={`/static/images/arrow-down-${topic}.svg`} />
        </div>
      </div>
    </div>
  );
}

HeadlineSection.propTypes = { topic: PropTypes.string.isRequired };

export default HeadlineSection;
