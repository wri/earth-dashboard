import React from 'react';
import PropTypes from 'prop-types';

// utils
import { getColorByTopic } from 'utils/topics';

// styles
import styles from './credits-resources-section.module.scss';

function CreditsResourcesSection(props) {
  const { topic } = props;
  const topicColor = getColorByTopic(topic);

  return (
    <div
      id="credits-and-resources"
      className={styles['c-credits-resources-section']}
    >
      <div className={styles['credits-resources-container']}>
        <h2>Credits and <span style={{ color: topicColor }}>Resources</span></h2>
        <div className={styles['credits-field']}>
          <div className={styles['field-title']}>
            AUTHORS
          </div>
          <div className={styles['field-content']}>
            Polly Ghazy, Emily Nilson, Liz Sacoccia and Jessica Ertel.
          </div>
        </div>
        <div className={styles['credits-field']}>
          <div className={styles['field-title']}>
            METHODOLOGY
          </div>
          <div className={styles['field-content']}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
          </div>
        </div>
      </div>
      <div className={styles['share-container']}>
        <div className={styles['share-title']}>
          SHARE THIS PAGE
        </div>
      </div>
    </div>
  );
}

CreditsResourcesSection.propTypes = { topic: PropTypes.string.isRequired };

export default CreditsResourcesSection;
