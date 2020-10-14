import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';

// components
import Layout from 'layout/layout/layout-app';

// utils
import {
  getColorByTopic,
  CLIMATE,
  OCEANS,
  FORESTS,
  FRESHWATER
} from 'utils/topics';

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
      <div
        className={styles['left-menu']}
      >
        <Link href="/climate">
          <a className={classnames({
            [styles['climate-link']]: topic === CLIMATE,
            [styles['selected-link']]: topic === CLIMATE
          })}>
            CLIMATE
          </a>
        </Link>
        <Link href="/forests">
          <a className={classnames({
            [styles['forests-link']]: topic === FORESTS
          })}>
            FORESTS
          </a>
        </Link>
        <Link href="/freshwater">
          <a className={classnames({
            [styles['freshwater-link']]: topic === FRESHWATER
          })}>
            FRESHWATER
          </a>
        </Link>
        <Link href="/oceans">
          <a className={classnames({
            [styles['oceans-link']]: topic === OCEANS
          })}>
            OCEANS
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export default LayoutTopic;
