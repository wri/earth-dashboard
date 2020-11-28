import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import ShareBox from 'components/share/share-box';

// utils
import { getColorByTopic, getMethodologyDataByTopic } from 'utils/topics';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './credits-resources-section.module.scss';

function CreditsResourcesSection(props) {
  const { topic } = props;
  const topicColor = getColorByTopic(topic);
  const isServer = typeof window === 'undefined';

  const getCreditsAndResourcesContent = () =>
    <>
      <div className={styles['credits-field']}>
        <h6 className={styles['field-title']}>
          AUTHORS
        </h6>
        <div className={styles['field-content']}>
          Polly Ghazy, Emily Nilson, Liz Sacoccia and Jessica Ertel.
        </div>
      </div>
      <div className={styles['credits-field']}>
        <h6 className={styles['field-title']}>
          METHODOLOGY
        </h6>
        <div className={styles['field-content']}>
          {getMethodologyDataByTopic(topic)}
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
            <h2>Credits and <span style={{ color: topicColor }}>Resources</span></h2>
            <div className={classnames({
              [styles['main-container-content']]: true,
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
                <h6 className={styles['field-title']}>
                  SHARE THIS PAGE
                </h6>
                <ShareBox topic={topic} url={isServer ? '' : window.location.href} />
              </div>
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-mobile']]: true
          })}>
            <h3>Credits and <span style={{ color: topicColor }}>Resources</span></h3>
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
              <h6 className={styles['field-title']}>
                SHARE THIS PAGE
              </h6>
            </div>
          </div>
        </Mobile>
      </MediaContextProvider>
    </div>
  );
}

CreditsResourcesSection.propTypes = { topic: PropTypes.string.isRequired };

export default CreditsResourcesSection;
