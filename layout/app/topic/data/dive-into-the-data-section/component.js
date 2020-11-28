import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import WidgetPanel from 'components/widgets/panel';
import ErrorBoundary from 'components/ui/error-boundary';

// utils
import {
  getColorByTopic,
  getDiveIntoTheDataDataByTopic
} from 'utils/topics';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './dive-into-the-data-section.module.scss';

function DiveIntoTheDataSection({
  topic,
  topicData,
  widgets
}) {
  const topicColor = getColorByTopic(topic);
  const dataArray = topicData[topic]?.diveIntoTheData?.data;
  const isBrowser = typeof window !== 'undefined';

  const getMainContainerContent = (mobile) =>
    <>
      {!mobile && <h2>Dive into the <span style={{ color: topicColor }}>Data</span></h2>}
      {mobile && <h3>Dive into the <span style={{ color: topicColor }}>Data</span></h3>}
      <p className={styles.subtitle}>{getDiveIntoTheDataDataByTopic(topic)?.description}</p>
      <div
        className={classnames({
          [styles['widgets-container']]: true,
          [styles['-desktop']]: !mobile,
          [styles['-mobile']]: mobile
        })}>
        {isBrowser &&
          <ErrorBoundary>
            <div className="row">
              {dataArray.map(widget =>
                (<div
                  key={`widget-preview-${widget.id}`}
                  className={classnames({
                    column: true,
                    'small-12': true,
                    'medium-6': widget.widgetsPerColumn >= 2,
                    'large-4': widget.widgetsPerColumn === 3,
                    [styles['preview-container']]: true,
                    [styles['-desktop']]: !mobile,
                    [styles['-mobile']]: mobile
                  })}
                >
                  <WidgetPanel
                    widget={widgets.find(w => w.id === widget.id)}
                    topic={topic}
                  />
                </div>))}
            </div>
          </ErrorBoundary>
        }
      </div>
    </>;

  return (
    <div
      id="dive-into-the-data"
      className={styles['c-dive-into-the-data-section']}
    >
      <MediaContextProvider>
        <Desktop>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-desktop']]: true
          })}>
            {getMainContainerContent(false)}
          </div>
        </Desktop>
        <Mobile>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-mobile']]: true
          })}>
            {getMainContainerContent(true)}
          </div>
        </Mobile>
      </MediaContextProvider>

    </div>
  );
}

DiveIntoTheDataSection.propTypes = { topic: PropTypes.string.isRequired };

export default DiveIntoTheDataSection;
