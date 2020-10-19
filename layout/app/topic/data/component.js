import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';

// components
import Layout from 'layout/layout/layout-app';
import HeadlineSection from './headline-section';
import CreditsResourcesSection from './credits-resources-section';
import ChangeAgentsSection from './change-agents-section';
import Footer from './footer';
import DiveIntoTheDataSection from './dive-into-the-data-section';
import ChallengeToOurGlobalCommons from './challenge-to-our-global-commons-section';
import NavigationDots from 'components/ui/navigation-dots';

// styles
import styles from './topic-data.module.scss';

// constants
import { NAVIGATION_ITEMS } from './constants';

function LayoutTopicData(props) {
  const { topic } = props;
  const router = useRouter();
  const IN_VIEW_THRESHOLD = 0.5;
  const { ref: scrollyTellingRef, inView: scrollyTellingInView } = useInView({ threshold: IN_VIEW_THRESHOLD });
  const { ref: changeAgentsRef, inView: changeAgentsInView } = useInView({ threshold: IN_VIEW_THRESHOLD });
  const { ref: challengeRef, inView: challengeInView } = useInView({ threshold: IN_VIEW_THRESHOLD });
  const { ref: diveIntoDataRef, inView: diveIntoDataInView } = useInView({ threshold: IN_VIEW_THRESHOLD });
  const { ref: creditsRef, inView: creditsInView } = useInView({ threshold: IN_VIEW_THRESHOLD });

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

  console.log('heyyyy getSectionInView', getSectionInView());

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth Dashboard"
      className={styles.topic}
    >
      <div className={styles['topic-data']}>
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
          ref={scrollyTellingRef}
          id="scrolly-telling"
          className={styles['scrolly-telling-section']}
        >
          Scrolly telling...
        </div>
        <div ref={challengeRef}>
          <ChallengeToOurGlobalCommons topic={topic} />
        </div>
        <div ref={diveIntoDataRef}>
          <DiveIntoTheDataSection topic={topic} />
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