import PropTypes from 'prop-types';
import classnames from 'classnames';

// utils
import {
  getColorByTopic,
  getSecondaryColorByTopic,
  getHeadlineSectionDataBytopic
} from 'utils/topics';
import { MediaContextProvider, Mobile, Desktop } from 'utils/responsive';

// styles
import styles from './headline-section.module.scss';

function HeadlineSection(props) {
  const { topic } = props;

  const topicColor = getColorByTopic(topic);
  const topicSecondaryColor = getSecondaryColorByTopic(topic);
  const sectionData = getHeadlineSectionDataBytopic(topic);

  const getMainContainer = (mobile) =>
    <>
      <div className={styles['topic-name-title']}>
        {topic?.toUpperCase()}
      </div>
      {mobile && <h2>{sectionData?.mainTitle}</h2>}
      {!mobile && <h1>{sectionData?.mainTitle}</h1>}
      <div className={styles.subtitle}>
        {sectionData?.subtitle}
      </div>
      <div
        className={styles['scroll-to-explore']}
        style={{ color: topicSecondaryColor }}
      >
        <span className={classnames({
          [styles['scroll-text']]: true,
          [styles[`-${topic}`]]: true
        })}
        >
          SCROLL TO EXPLORE
          </span>
        <div className={styles.arrow}>
          <img src={`/static/images/arrow-down-${topic}.svg`} />
        </div>
      </div>
    </>;

  return (
    <div
      className={styles['c-headline-section']}
      style={{ backgroundColor: topicColor }}
    >
      <MediaContextProvider>
        <Desktop className={classnames({
          [styles['main-container']]: true,
          [styles['-desktop']]: true
        })}>
          {getMainContainer(false)}
        </Desktop>
        <Mobile className={classnames({
          [styles['main-container']]: true,
          [styles['-mobile']]: true
        })}>
          {getMainContainer(true)}
        </Mobile>
      </MediaContextProvider>
    </div>
  );
}

HeadlineSection.propTypes = { topic: PropTypes.string.isRequired };

export default HeadlineSection;
