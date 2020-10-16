import React from 'react';
import PropTypes from 'prop-types';

// components
import Layout from 'layout/layout/layout-app';
import HeadlineSection from './headline-section';
import CreditsResourcesSection from './credits-resources-section';
import ChangeAgentsSection from './change-agents-section';
import Footer from './footer';
import DiveIntoTheDataSection from './dive-into-the-data/component';

// styles
import styles from './topic-data.module.scss';
import { useRouter } from 'next/router';

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
        <div className={styles['headline-section']}>
          <HeadlineSection topic={topic} />
        </div>
        <div
          className={styles['scrollytelling-section']}
        >
          Scrolly telling...
        </div>
        <div
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
