import React, { useState } from 'react';
import classnames from 'classnames';
import Particles from 'react-particles-js';
import Link from 'next/link';
import WidgetPreview from 'components/widgets/preview';

// utils
import {
  getColorByTopic,
  CLIMATE,
  OCEAN,
  FORESTS,
  FRESHWATER
} from 'utils/topics';
import {
  Mobile,
  Desktop,
  MediaContextProvider
} from 'utils/responsive';
import { PARTICLES_DEFINITION } from 'utils/particles';
import { getPageMetadataByTopic } from 'utils/share';
import { logEvent } from 'utils/gtag';

// components
import Layout from 'layout/layout/layout-app';
import TopicNews from './news';
import Globe from '../home/globe';
import ErrorBoundary from 'components/ui/error-boundary';
import ShareModal from 'components/share/share-modal';

// styles
import styles from './topic.module.scss';
import { useRouter } from 'next/router';
import { MONGABAY_NEWS_TYPE, NOW_THIS_EARTH_NEWS_TYPE } from './news/constants';

function LayoutTopic(props) {
  const { topic, topicData, widgets, embed } = props;
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [shareData, setSharedata] = useState({
    url: '',
    embedTag: '',
    showEmbed: false
  });
  const isEmbed = embed === 'true';
  const router = useRouter();
  const dataArray = topicData[topic]?.topicPage?.data;
  const isServer = typeof window === 'undefined';
  const pageMetadata = getPageMetadataByTopic(topic) || {};

  return (
    <Layout
      title={pageMetadata.title}
      description={pageMetadata.description}
      thumbnail={pageMetadata.thumbnail}
      className={styles.topic}
      showHeader={!isEmbed}
      themeColor={getColorByTopic(topic)}
    >
      <MediaContextProvider>
        {/* ----- LEFT GLOBE ON DESKTOP VERSION -------- */}
        {!isEmbed &&
          <Desktop>
            {!isServer &&
              <div className={classnames({
                [styles.globe]: true,
                [styles['-loaded']]: globeLoaded
              })}
              >
                <Globe
                  width="100vh"
                  height="70vh"
                  options={{
                    ambientLightColor: '#ffffff',
                    ambientLightIntensity: 0.7
                  }}
                  topic={topic}
                  onLoad={() => setGlobeLoaded(true)}
                  hideUntilLoaded
                />
              </div>
            }
          </Desktop>
        }
        {/* -------------------------------------------- */}

        <div className={classnames({
          row: true,
          [styles['indicators-row']]: true
        })}
        >
          <div className={classnames({
            [styles['indicators-container']]: true,
            'small-8': true,
            'medium-6': true,
            column: true
          })}
          >
            <ErrorBoundary>
              {/* INDICATORS HEADER */}
              <div className={styles['indicators-header']}>
                <span className={styles['header-title']}>THE GLOBAL COMMONS REPORT</span>
                <span className={styles['header-subtitle']}>
                  powered by <a
                    href="https://resourcewatch.org/"
                    target="_blank"
                    onClick={() => logEvent({
                      action: 'Click on ResourceWatch',
                      category: 'Outbound traffic',
                      label: window.location.href
                    })}
                  >RESOURCEWATCH
                  </a>
                </span>
              </div>
              {dataArray && dataArray.map((block) => {
                const { type } = block;

                if (type === 'widget') {
                  return (
                    <div
                      className={classnames({
                        [styles['indicator-block']]: true,
                        [styles['-widget-indicator']]: true
                      })}
                      key={block.id}
                      id={block.id}
                    >
                      <WidgetPreview
                        widget={{ id: block.id }}
                        showSource
                        widgetShouldBeLoaded
                        topic={topic}
                        showLoadingPlaceholder
                      />
                      <div
                        className={styles['share-button']}
                        onClick={() => {
                          setSharedata({
                            url: `${window.location.href.split('#')[0]}#${block.id}`,
                            embedTag: null,
                            showEmbed: false
                          });
                          setShareModalIsOpen(true);
                          logEvent({
                            action: 'Share widget',
                            category: 'Shares',
                            label: `Widget ${block.id}`
                          });
                        }}
                      >
                        Share
                      </div>
                    </div>
                  );
                } else if (type === 'topic-news') {
                  const { numberOfElements, keywords } = block;
                  return (
                    <div
                      key={`topic-news-${keywords}`}
                      className={styles['indicator-block']}
                    >
                      <span className={styles['block-header']}>RECENT NEWS (MONGABAY)</span>
                      <TopicNews topic={keywords} limit={numberOfElements} type={MONGABAY_NEWS_TYPE} />
                      {/* <span className={styles['block-header']}>RECENT NEWS (NOW THIS EARTH)</span>
                      <TopicNews topic={keywords} limit={numberOfElements} type={NOW_THIS_EARTH_NEWS_TYPE} /> */}
                    </div>
                  );
                }
              })}
            </ErrorBoundary>
          </div>
        </div>
        {/* RIGHT SIDE LINK TO STORY TELLING PAGE */}
        {!isEmbed &&
          <>
          <Desktop>
            <div
              className={classnames({
                  [styles['right-link']]: true,
                  [styles['-desktop']]: true,
                  [styles[`-${topic}`]]: true
                })}
              onClick={() => router.push(`/${topic}/data`)}
            >
              <a>EXPLORE<br />{topic && topic.toUpperCase()}</a>
              <div className={styles['arrow-container']}>
                <img className={styles.arrow} src="/static/images/arrow-right.svg" />
              </div>
            </div>
          </Desktop>
          <Mobile>
            <div
              className={classnames({
                [styles['right-link']]: true,
                [styles['-mobile']]: true,
                [styles[`-${topic}`]]: true
              })}
              onClick={() => router.push(`/${topic}/data`)}
            >
              <a>EXPLORE {topic && topic.toUpperCase()}</a>
              <img src="/static/images/arrow-right.svg" />
            </div>
          </Mobile>
          {/* LEFT MENU */}
          <Desktop>
            <div
              className={styles['left-menu']}
            >
              <Link href="/climate">
                <a className={classnames({
                  [styles['climate-link']]: topic === CLIMATE,
                  [styles['selected-link']]: topic === CLIMATE
                })}
                >
                  CLIMATE
                </a>
              </Link>
              <Link href="/forests">
                <a className={classnames({
                  [styles['forests-link']]: topic === FORESTS,
                  [styles['selected-link']]: topic === FORESTS
                })}
                >
                  FORESTS
                </a>
              </Link>
              <Link href="/freshwater">
                <a className={classnames({
                  [styles['freshwater-link']]: topic === FRESHWATER,
                  [styles['selected-link']]: topic === FRESHWATER
                })}
                >
                  FRESHWATER
                </a>
              </Link>
              <Link href="/ocean">
                <a className={classnames({
                  [styles['ocean-link']]: topic === OCEAN,
                  [styles['selected-link']]: topic === OCEAN
                })}
                >
                  OCEAN
                </a>
              </Link>
            </div>
          </Desktop>
        </>
        }
        <ShareModal
          topic={topic}
          url={shareData.url}
          embedTag={shareData.embedTag}
          onClose={() => setShareModalIsOpen(false)}
          isOpen={shareModalIsOpen}
          showEmbed={shareData.showEmbed}
        />
      </MediaContextProvider>
      <Particles
        className={styles.particles}
        params={PARTICLES_DEFINITION}
      />
    </Layout >
  );
}

export default LayoutTopic;
