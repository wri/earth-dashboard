import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import classnames from 'classnames';

// utils
import { Desktop, MediaContextProvider } from 'utils/responsive';
import { getColorByTopic } from 'utils/topics';

// components
import Layout from 'layout/layout/layout-app';
import HeadlineSection from './headline-section';
import CreditsResourcesSection from './credits-resources-section';
import ChangeAgentsSection from './change-agents-section';
import Footer from './footer';
import DiveIntoTheDataSection from './dive-into-the-data-section';
import ChallengeToOurGlobalCommons from './challenge-to-our-global-commons-section';
import NavigationDots from 'components/ui/navigation-dots';
import FreshWaterScrollyTelling from './freshwater/scrolly-telling';
import ForestsScrollyTelling from './forests/scrolly-telling';
import ClimateScrollyTelling from './climate/scrolly-telling';
import OceansScrollyTelling from './ocean/scrolly-telling';

// styles
import styles from './topic-data.module.scss';

// constants
import { NAVIGATION_ITEMS } from './constants';
import {
  CLIMATE,
  FORESTS,
  FRESHWATER,
  OCEAN,
  getNavigationDotsColorByTopic
} from 'utils/topics';
import { getPageMetadataByTopic } from 'utils/share';

function LayoutTopicData(props) {
  const { topic, topicData, widgets, embed, embeddedSection } = props;
  const router = useRouter();
  const DEFAULT_IN_VIEW_THRESHOLD = 0.3;
  const { ref: headlineRef, inView: headlineInView } = useInView({ threshold: DEFAULT_IN_VIEW_THRESHOLD });
  const { ref: scrollyTellingRef, inView: scrollyTellingInView } = useInView({ threshold: 0.01 });
  const { ref: changeAgentsRef, inView: changeAgentsInView } = useInView({ threshold: 0.8 });
  const { ref: challengeRef, inView: challengeInView } = useInView({ threshold: DEFAULT_IN_VIEW_THRESHOLD });
  const { ref: diveIntoDataRef, inView: diveIntoDataInView } = useInView({ threshold: DEFAULT_IN_VIEW_THRESHOLD });
  const { ref: creditsRef, inView: creditsInView } = useInView({ threshold: DEFAULT_IN_VIEW_THRESHOLD });
  const pageMetadata = getPageMetadataByTopic(topic) || {};
  const isEmbed = embed === 'true';
  const navigationDotsColor = (headlineInView || changeAgentsInView) ?
    getNavigationDotsColorByTopic(topic) :
    getNavigationDotsColorByTopic('default');
  const showShareButton = (scrollyTellingInView || diveIntoDataInView);

  const getSectionInView = () => {
    if (scrollyTellingInView) {
      return 'scrolly-telling';
    } else if (changeAgentsInView) {
      return 'change-agents'
    } else if (challengeInView) {
      return 'challenge-to-our-global-commons';
    } else if (diveIntoDataInView) {
      return 'dive-into-the-data'
    } else if (creditsInView) {
      return 'credits-and-resources'
    }
  }

  const getScrollyTelling = () => {
    switch (topic) {
      case FRESHWATER:
        return <FreshWaterScrollyTelling />
      case FORESTS:
        return <ForestsScrollyTelling topic={topic} />
      case CLIMATE:
        return <ClimateScrollyTelling topic={topic} />
      case OCEAN:
        return <OceansScrollyTelling topic={topic} />
      default:
        return <div />;
    }
  }

  return (
    <Layout
      title={pageMetadata.title}
      description={pageMetadata.description}
      thumbnail={pageMetadata.thumbnail}
      className={styles.topic}
      showHeaderLogo={false}
      showHeader={!isEmbed}
      themeColor={getColorByTopic(topic)}
    >
      <div className={styles['topic-data']}>
        <div
          className={styles['logo-container']}
          onClick={() => router.push('/')}
        >
          <img src="/static/images/logo-light.svg" />
        </div>
        {showShareButton &&
          <button className={classnames({
            [styles['share-button']]: true,
            [styles[`-${topic}`]]: true
          })}>
            Share
          </button>
        }
        {!isEmbed &&
          <>
            <MediaContextProvider>
              <Desktop>
                <div className={styles['navigation-dots']}>
                  <NavigationDots
                    items={NAVIGATION_ITEMS}
                    route={`/${topic}/data`}
                    selectedItemID={getSectionInView()}
                    color={navigationDotsColor}
                  />
                </div>
              </Desktop>
            </MediaContextProvider>
            <div
              className={styles['headline-section']}
              ref={headlineRef}
            >
              <HeadlineSection topic={topic} />
            </div>
          </>
        }
        {(!isEmbed || (isEmbed && embeddedSection === 'scrolly-telling')) &&
          <div
            id="scrolly-telling"
            className={styles['scrolly-telling-container']}
            ref={scrollyTellingRef}
          >
            {getScrollyTelling()}
          </div>
        }
        {!isEmbed &&
          <div
            id="challenge-to-our-global-commons"
            ref={challengeRef}
            className={styles['challenge-to-our-global-commons-section']}
          >
            <ChallengeToOurGlobalCommons topic={topic} />
          </div>
        }
        {(!isEmbed || (isEmbed && embeddedSection === 'dive-into-the-data')) &&
          <div ref={diveIntoDataRef}>
            <DiveIntoTheDataSection
              topic={topic}
              topicData={topicData}
              widgets={widgets}
            />
          </div>
        }
        {!isEmbed &&
          <>
            <div ref={changeAgentsRef}>
              <ChangeAgentsSection topic={topic} />
            </div>
            <div
              className={styles['credits-resources-section']}
              ref={creditsRef}
            >
              <CreditsResourcesSection topic={topic} />
            </div>
            <Footer />
          </>
        }
      </div>
    </Layout >
  );
}

LayoutTopicData.propTypes = { topic: PropTypes.string.isRequired };

export default LayoutTopicData;
