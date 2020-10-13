import React from 'react';
import classnames from 'classnames';

// components
import Layout from 'layout/layout/layout-app';

// utils
import { getColorByTopic } from 'utils/topics';

// styles
import styles from './topic.module.scss';
import { useRouter } from 'next/router';

// constants

function LayoutTopic(props) {
  const { topic } = props;
  const router = useRouter();

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth Dashboard"
      className={styles.topic}
    >
      <div className={classnames({
          'row': true,
          [styles['indicators-row']]: true
        })}>
        <div className={classnames({
          [styles['indicators-container']]: true,
          'small-8': true,
          'medium-6': true,
          'column': true
        })}>
          <div className={styles['indicators-header']}>
            <span className={styles['header-title']}>THE GLOBAL COMMONS REPORT</span>
            <span className={styles['header-subtitle']}>
              powered by <a href="https://resourcewatch.org/" target="_blank">RESOURCEWATCH</a>
            </span>
          </div>
        </div>
      </div>
      <div
        className={styles['right-link']}
        onClick={() => router.push(`/${topic}/story`)}
        style={{ backgroundColor: getColorByTopic(topic) }}
      >
        <a>EXPLORE {topic && topic.toUpperCase()}</a>
      </div>
    </Layout>
  );
}

export default LayoutTopic;
