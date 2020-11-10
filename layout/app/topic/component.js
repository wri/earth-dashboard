import React from 'react';
import classnames from 'classnames';
import Particles from 'react-particles-js';
import Link from 'next/link';
import WidgetPreview from 'components/widgets/preview';

// utils
import {
  getColorByTopic,
  CLIMATE,
  OCEANS,
  FORESTS,
  FRESHWATER
} from 'utils/topics';
import {
  Mobile,
  Desktop,
  MediaContextProvider
} from 'utils/responsive';

// components
import Layout from 'layout/layout/layout-app';
import TopicNews from './news';

// styles
import styles from './topic.module.scss';
import { useRouter } from 'next/router';

// utils
import { PARTICLES_DEFINITION } from 'utils/particles';

function LayoutTopic(props) {
  const { topic, topicData, widgets } = props;
  const router = useRouter();
  const dataArray = topicData[topic]?.topicPage?.data;

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
          {/* INDICATORS HEADER */}
          <div className={styles['indicators-header']}>
            <span className={styles['header-title']}>THE GLOBAL COMMONS REPORT</span>
            <span className={styles['header-subtitle']}>
              powered by <a href="https://resourcewatch.org/" target="_blank">RESOURCEWATCH</a>
            </span>
          </div>
          {dataArray && dataArray.map(block => {
            const { type } = block;

            if (type === 'widget') {
              const widgetObj = widgets.find(w => w.id === block.id);
              return (
                <div
                  className={styles['indicator-block']}
                  key={widgetObj?.id}
                >
                  <WidgetPreview widget={widgetObj} />
                </div>
              );
            } else if (type === 'topic-news') {
              const { numberOfElements, keywords } = block;
              return (
                <div
                  key={`topic-news-${keywords}`}
                  className={styles['indicator-block']}
                >
                  <span className={styles['block-header']}>RECENT NEWS</span>
                  <TopicNews topic={keywords} limit={numberOfElements} />
                </div>
              );
            }
          })}
        </div>
      </div>
      {/* RIGHT SIDE LINK TO STORY TELLING PAGE */}
      <div
        className={classnames({
          [styles['right-link']]: true,
          [styles['-mobile']]: showMobileVersion
        })}
        onClick={() => router.push(`/${topic}/data`)}
        style={{ backgroundColor: getColorByTopic(topic) }}
      >
        <a>EXPLORE{!showMobileVersion && <br />} {topic && topic.toUpperCase()}</a>
        <img src="/static/images/arrow-right.svg" />
      </div>
      {/* LEFT MENU */}
      <MediaContextProvider>
        <Desktop>
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
                [styles['forests-link']]: topic === FORESTS,
                [styles['selected-link']]: topic === FORESTS
              })}>
                FORESTS
          </a>
            </Link>
            <Link href="/freshwater">
              <a className={classnames({
                [styles['freshwater-link']]: topic === FRESHWATER,
                [styles['selected-link']]: topic === FRESHWATER
              })}>
                FRESHWATER
          </a>
            </Link>
            <Link href="/oceans">
              <a className={classnames({
                [styles['oceans-link']]: topic === OCEANS,
                [styles['selected-link']]: topic === OCEANS
              })}>
                OCEANS
          </a>
            </Link>
          </div>
        </Desktop>
      </MediaContextProvider>
      <Particles
        className={styles.particles}
        params={PARTICLES_DEFINITION}
      />
    </Layout>
  );
}

export default LayoutTopic;
