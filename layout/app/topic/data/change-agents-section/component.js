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
  const getMainContainerContents = () =>
    <>
      <h2>Change Agents <span>(coming soon)</span></h2>
      <div className={styles.subtitle}>
        Explore the companies, cities, governments and consumers that are having a positive impact towards solutions to our Global Commons problems.
        </div>
    </>;

  return (
    <div
      className={styles['c-change-agents-section']}
      style={{ backgroundColor: topicColor }}
      id="change-agents"
    >
      <MediaContextProvider>
        <Desktop>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-desktop']]: true
          })}>
            {getMainContainerContents()}
          </div>
        </Desktop>
        <Mobile>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-mobile']]: true
          })}>
            {getMainContainerContents()}
          </div>
        </Mobile>
      </MediaContextProvider>
    </div>
  );
}

ChangeAgentsSection.propTypes = { topic: PropTypes.string.isRequired };

export default ChangeAgentsSection;
