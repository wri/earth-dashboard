import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import Link from 'next/link';
import classnames from 'classnames';
import { motion } from "framer-motion"

// components
import About from './about';

// utils
import { PARTICLES_DEFINITION } from 'utils/particles';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// constants
import {
  HEADER_TOPICS_DATA,
  SHARE_HEADER_TAB,
  SITE_NAVIGATION_HEADER_TAB,
  ABOUT_HEADER_TAB
} from './constants';

// styles
import styles from './header.module.scss';

function Header(props) {
  const { showLogo } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(SITE_NAVIGATION_HEADER_TAB);

  const getParticles = () =>
    <Particles
      className={styles.particles}
      params={PARTICLES_DEFINITION}
    />;

  const getTopicContainer = () =>
    <ul>
      {HEADER_TOPICS_DATA.map(topicData =>
        <li
          key={topicData.label}
          className={styles['topic-container']}
        >
          <div className={styles['topic-title']}
            onClick={() => setIsOpen(false)}
          >
            <Link href={topicData.link}>
              <a style={{ borderBottom: `solid 2px ${topicData.color}` }}>
                {topicData.label}
              </a>
            </Link>
          </div>
          <ul className={styles['topic-link-list']}>
            {topicData.links.map(linkData =>
              <li
                className={styles['topic-link']}
                onClick={() => setIsOpen(false)}
              >
                <Link href={linkData.link}>
                  <a
                    className={classnames({ [styles['-highlighted-link']]: linkData.highlight })}
                    style={linkData.highlight ? {
                      borderBottom: `solid 2px ${topicData.color}`
                    } : {}}
                  >
                    {linkData.label}
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </li>
      )}
    </ul>;

  const getRightContainer = () => {
    switch (tab) {
      case SITE_NAVIGATION_HEADER_TAB:
        return getTopicContainer();
      case ABOUT_HEADER_TAB:
        return (
          <About />
        );
      case SHARE_HEADER_TAB:
        return (
          <div>

          </div>
        );
    }
  };

  const getLogo = () =>
    <Link href="/">
      <a>
        <img src="/static/images/logo-light.svg" />
      </a>
    </Link>;

  const getLogoContainer = () =>
    <div className={styles['logo-container']}>
      {getLogo()}
    </div>;



  return (
    <header className={styles.header}>
      <MediaContextProvider>
        <Desktop>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-desktop']]: true
          })}>
            {showLogo && !isOpen && getLogoContainer()}
            <div
              className={styles['hamburguer-button']}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className={styles['hamburguer-button-image']}>
                <img src={`/static/images/${isOpen ? 'close' : 'hamburger'}.svg`} />
              </div>
            </div>
            <motion.div animate={{ opacity: isOpen ? 1 : 0 }}>
              {isOpen &&
                <div className={styles['menu-container']}>
                  {getParticles()}
                  <div className={classnames({
                    [styles['data-containers']]: true,
                    [styles['-desktop']]: true
                  })}
                  >
                    <div className={classnames({
                      [styles['left-container']]: true,
                      [styles['-desktop']]: true
                    })}>
                      {getLogo()}
                      <ul className={styles['left-links']}>
                        <li
                          className={classnames({
                            [styles['-active']]: tab === SITE_NAVIGATION_HEADER_TAB
                          })}
                          onClick={() => setTab(SITE_NAVIGATION_HEADER_TAB)}
                        >
                          <a>SITE NAVIGATION</a>
                        </li>
                        <li
                          className={classnames({
                            [styles['-active']]: tab === ABOUT_HEADER_TAB
                          })}
                          onClick={() => setTab(ABOUT_HEADER_TAB)}
                        >
                          <a>ABOUT</a>
                        </li>
                        <li className={classnames({
                          [styles['-active']]: tab === SHARE_HEADER_TAB
                        })}
                          onClick={() => setTab(SHARE_HEADER_TAB)}
                        >
                          <a>SHARE</a>
                        </li>
                      </ul>
                      {/* <div className={classnames({
                        [styles['powered-by']]: true,
                        [styles['-desktop']]: true
                      })}>
                        powered by <a href="https://resourcewatch.org/" target="_blank">RESOURCEWATCH</a>
                      </div> */}
                    </div>
                    <div className={classnames({
                      [styles['right-container']]: true,
                      [styles['-desktop']]: true
                    })}
                    >
                      {getRightContainer()}
                    </div>
                  </div>
                </div>
              }
            </motion.div>
          </div>
        </Desktop>
        <Mobile>
          <div className={classnames({
            [styles['main-container']]: true,
            [styles['-mobile']]: true
          })}>
            {showLogo && !isOpen && getLogoContainer()}
            <div
              className={styles['hamburguer-button']}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className={styles['hamburguer-button-image']}>
                <img src={`/static/images/${isOpen ? 'close' : 'hamburger'}.svg`} />
              </div>
            </div>
            <motion.div animate={{ opacity: isOpen ? 1 : 0 }}>
              {isOpen &&
                <div className={styles['menu-container']}>
                  {getParticles()}
                  <div className={classnames({
                    [styles['data-containers']]: true,
                    [styles['-mobile']]: true
                  })}
                  >
                    <div className={classnames({
                      [styles['left-container']]: true,
                      [styles['-mobile']]: true
                    })}>
                      {getLogo()}
                      <ul className={styles['left-links']}>
                        <li>About</li>
                        <li>
                          <div className={styles['share-icons-container']}>
                            <img src="/static/images/share/email_white.svg" />
                            <img src="/static/images/share/facebook_white.svg" />
                            <img src="/static/images/share/twitter_white.svg" />
                          </div>
                        </li>
                      </ul>
                      <div className={classnames({
                        [styles['powered-by']]: true,
                        [styles['-mobile']]: true
                      })}>
                        powered by <a href="https://resourcewatch.org/" target="_blank">RESOURCEWATCH</a>
                      </div>
                    </div>
                    <div className={classnames({
                      [styles['right-container']]: true,
                      [styles['-mobile']]: true
                    })}
                    >
                      {getTopicContainer()}
                    </div>
                  </div>
                </div>
              }
            </motion.div>
          </div>
        </Mobile>
      </MediaContextProvider>
    </header>
  );
}

Header.propTypes = { showLogo: PropTypes.bool.isRequired };
Header.defaultProps = { showLogo: true };

export default Header;
