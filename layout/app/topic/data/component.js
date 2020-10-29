import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
import OceansScrollyTelling from './oceans/scrolly-telling';

// styles
import styles from './topic-data.module.scss';

// constants
import { NAVIGATION_ITEMS } from './constants';
import {
  CLIMATE,
  FORESTS,
  FRESHWATER,
  OCEANS
} from 'utils/topics';

function LayoutTopicData(props) {
  const { topic, topicData, widgets } = props;
  const router = useRouter();
  const DEFAULT_IN_VIEW_THRESHOLD = 0.3;
  const { ref: scrollyTellingRef, inView: scrollyTellingInView } = useInView({ threshold: 0.1 });
  const { ref: changeAgentsRef, inView: changeAgentsInView } = useInView({ threshold: DEFAULT_IN_VIEW_THRESHOLD });
  const { ref: challengeRef, inView: challengeInView } = useInView({ threshold: DEFAULT_IN_VIEW_THRESHOLD });
  const { ref: diveIntoDataRef, inView: diveIntoDataInView } = useInView({ threshold: DEFAULT_IN_VIEW_THRESHOLD });
  const { ref: creditsRef, inView: creditsInView } = useInView({ threshold: DEFAULT_IN_VIEW_THRESHOLD });

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
      case OCEANS:
        return <OceansScrollyTelling topic={topic} />
      default:
        return <div />;
    }
  }

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth Dashboard"
      className={styles.topic}
      showHeaderLogo={false}
    >
      <div className={styles['topic-data']}>
        <div
          className={styles['logo-container']}
          onClick={() => router.push('/')}
        >
          <img src="/static/images/logo-light.svg" />
        </div>
        <div className={styles['navigation-dots']}>
          <NavigationDots
            items={NAVIGATION_ITEMS}
            route={`/${topic}/data`}
            selectedItemID={getSectionInView()}
          />
        </div>
        <div
          className={styles['headline-section']}>
          <HeadlineSection topic={topic} />
        </div>
        <div
          id="scrolly-telling"
          ref={scrollyTellingRef}
        >
          {getScrollyTelling()}
        </div>
        <div
          id="challenge-to-our-global-commons"
          ref={challengeRef}
          className={styles['challenge-to-our-global-commons-section']}
        >
          <ChallengeToOurGlobalCommons topic={topic} />
        </div>
        <div ref={diveIntoDataRef}>
          <DiveIntoTheDataSection 
            topic={topic} 
            topicData={topicData}
            widgets={widgets}
          />
        </div>
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
      </div>
    </Layout>
  );
}

LayoutTopicData.propTypes = { topic: PropTypes.string.isRequired };

export default LayoutTopicData;
