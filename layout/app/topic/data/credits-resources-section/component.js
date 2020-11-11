import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// utils
import { getColorByTopic } from 'utils/topics';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './credits-resources-section.module.scss';

function CreditsResourcesSection(props) {
  const { topic } = props;
  const topicColor = getColorByTopic(topic);

  const getCreditsAndResourcesContent = () =>
    <>
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
    </>;

  return (
    <div
      id="credits-and-resources"
      className={styles['c-credits-resources-section']}
    >
      <MediaContextProvider>
        <Desktop>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-desktop']]: true
          })}>
            <div className={classnames({
              [styles['credits-resources-container']]: true,
              [styles['-desktop']]: true
            })}
            >
              {getCreditsAndResourcesContent()}
            </div>
            <div className={classnames({
              [styles['share-container']]: true,
              [styles['-desktop']]: true
            })}
            >
              <div className={styles['share-title']}>
                SHARE THIS PAGE
              </div>
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-mobile']]: true
          })}>
            <div className={classnames({
              [styles['credits-resources-container']]: true,
              [styles['-mobile']]: true
            })}
            >
              {getCreditsAndResourcesContent()}
            </div>
            <div className={classnames({
              [styles['share-container']]: true,
              [styles['-mobile']]: true
            })}
            >
              <div className={styles['share-title']}>
                SHARE THIS PAGE
              </div>
            </div>
          </div>
        </Mobile>
      </MediaContextProvider>
    </div>
  );
}

CreditsResourcesSection.propTypes = { topic: PropTypes.string.isRequired };

export default CreditsResourcesSection;
