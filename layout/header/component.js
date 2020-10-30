import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import Link from 'next/link';
import classnames from 'classnames';
import { motion } from "framer-motion"
import { useMediaQuery } from 'react-responsive';

// utils
import { PARTICLES_DEFINITION } from 'utils/particles';

// constants
import { HEADER_TOPICS_DATA } from './constants';

// styles
import styles from './header.module.scss';

function Header(props) {
  const { showLogo } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 720 });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });
  const showMobileVersion = isTabletOrMobile || isTabletOrMobileDevice;

  return (
    <header className={classnames({
      [styles.header]: true,
      [styles['-mobile']]: showMobileVersion
    })}>
      {showLogo && !isOpen &&
        <div className={styles['logo-container']}>
          <Link href="/">
            <a>
              <img src="/static/images/logo-light.svg" />
            </a>
          </Link>
        </div>
      }
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
            <Particles
              className={styles.particles}
              params={PARTICLES_DEFINITION}
            />
            <div className={classnames({
              [styles['data-containers']]: true,
              [styles['-mobile']]: showMobileVersion
              })}
            >
              <div  className={classnames({
                [styles['left-container']]: true,
                [styles['-mobile']]: showMobileVersion
              })}>
                <Link href="/">
                  <a>
                    <img src="/static/images/logo-light.svg" />
                  </a>
                </Link>
                <ul className={styles['left-links']}>
                  <li>About</li>
                  {!showMobileVersion && <li>Share</li>}
                  {showMobileVersion && 
                    <li>
                      <div className={styles['share-icons-container']}>
                        <img src="/static/images/share/email_white.svg" />
                        <img src="/static/images/share/facebook_white.svg" />
                        <img src="/static/images/share/twitter_white.svg" />
                      </div>
                    </li>
                  }
                </ul>
                <div className={classnames({
                    [styles['powered-by']]: true,
                    [styles['-mobile']]: showMobileVersion
                  })}>
                  powered by <a href="https://resourcewatch.org/" target="_blank">RESOURCEWATCH</a>
                </div>
              </div>
              <div className={classnames({
                  [styles['right-container']]: true,
                  [styles['-mobile']]: showMobileVersion
                })}
              >
                <ul>
                  {HEADER_TOPICS_DATA.map(topicData =>
                    <li className={styles['topic-container']}>
                      <
                        div className={styles['topic-title']}
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
                </ul>
              </div>
            </div>
          </div>
        }
      </motion.div>
    </header>
  );
}

Header.propTypes = { showLogo: PropTypes.bool.isRequired };
Header.defaultProps = { showLogo: true };

export default Header;
