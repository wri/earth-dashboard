import React from 'react';
import PropTypes from 'prop-types';

// components
import Layout from 'layout/layout/layout-app';
import HeadlineSection from './headline-section';
import CreditsResourcesSection from './credits-resources-section';
import ChangeAgentsSection from './change-agents-section';
import Footer from './footer';
import DiveIntoTheDataSection from './dive-into-the-data/component';
import NavigationDots from 'components/ui/navigation-dots';

// styles
import styles from './topic-data.module.scss';
import { useRouter } from 'next/router';

// constants
import { NAVIGATION_ITEMS } from './constants';

function LayoutTopicData(props) {
  const { topic } = props;
  const router = useRouter();

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth Dashboard"
      className={styles.topic}
    >
      <div className={styles['topic-data']}>
        <div className={styles['navigation-dots']}>
          <NavigationDots items={NAVIGATION_ITEMS} route={`/${topic}/data`} />
        </div>
        <div className={styles['headline-section']}>
          <HeadlineSection topic={topic} />
        </div>
        <div
          id="scrolly-telling"
          className={styles['scrollytelling-section']}
        >
          Scrolly telling...
        </div>
        <div
          id="challenge-to-our-global-commons"
          className={styles['challenge-section']}
        >
          {/* <h2>The <span style={{ color: topicColor, fontStyle: 'italic'}}>Challenge</span> to our Global Commons</h2> */}
        </div>
        <DiveIntoTheDataSection topic={topic} />
        <ChangeAgentsSection topic={topic} />
        <div className={styles['credits-resources-section']}>
          <CreditsResourcesSection topic={topic} />
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

LayoutTopicData.propTypes = { topic: PropTypes.string.isRequired };

export default LayoutTopicData;
