import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';

// components
import Layout from 'layout/layout/layout-app';
import HeadlineSection from 'layout/app/topic/data/headline-section';

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
        <div
            className={styles['headline-section']}
        >
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
        <div
            className={styles['change-agents-section']}
            // style={{ backgroundColor: topicColor }}
        >
            <h2>Change agents<span className={styles['coming-soon']}>(coming soon)</span></h2>
        </div>
      </div>
    </Layout>
  );
}

export default LayoutTopicData;
