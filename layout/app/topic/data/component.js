import React from 'react';

// components
import Layout from 'layout/layout/layout-app';
import HeadlineSection from 'layout/app/topic/data/headline-section';
import CreditsResourcesSection from 'layout/app/topic/data/credits-resources-section';
import ChangeAgentsSection from 'layout/app/topic/data/change-agents-section';
import Footer from 'layout/app/topic/data/footer';

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
        <div
            className={styles['dive-into-the-data-section']}
        >
            {/* <h2>Dive into the <span style={{ color: topicColor, fontStyle: 'italic'}}>Data</span></h2> */}
        </div>
        <ChangeAgentsSection topic={topic} />
        <div className={styles['credits-resources-section']}>
          <CreditsResourcesSection topic={topic} />
        </div>
        <Footer/>
      </div>
    </Layout>
  );
}

export default LayoutTopicData;
