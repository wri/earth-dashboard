import React, { useState } from 'react';
import Particles from 'react-particles-js';
import Link from 'next/link';
import classnames from 'classnames';
import { motion } from "framer-motion"

// utils
import { PARTICLES_DEFINITION } from 'utils/particles';

// constants
import { HEADER_TOPICS_DATA } from './constants';

// styles
import styles from './header.module.scss';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  console.log('isOpen', isOpen);

  return (
    <header className={styles.header}>
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
            <div className={styles['data-containers']}>
              <div className={styles['left-container']}>
                <ul>
                  <li>About</li>
                  <li>Share</li>
                </ul>
              </div>
              <div className={styles['right-container']}>
                <ul>
                  {HEADER_TOPICS_DATA.map(topicData =>
                    <li className={styles['topic-container']}>
                      <div className={styles['topic-title']}>
                        <span style={{ borderBottom: `solid 2px ${topicData.color}` }}>
                          {topicData.label}
                        </span>
                      </div>
                      <ul className={styles['topic-link-list']}>
                        {topicData.links.map(linkData =>
                          <li className={styles['topic-link']}>
                            <Link href={`${topicData.mainLink}${linkData.link}`}>
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

export default Header;
