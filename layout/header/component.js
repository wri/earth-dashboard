/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Particles from "react-particles-js";
import Link from "next/link";
import classnames from "classnames";
import { motion } from "framer-motion";
import LogoLink from "components/ui/logo-link/index";
import HeaderTitle from "layout/header/header-title";
import MegaMenuBtn from "layout/header/header-btn";
import MegaMenu from "components/mega-menu";

// components
import About from "./about";
import ShareBox from "components/share/share-box";

// utils
import { PARTICLES_DEFINITION } from "utils/particles";
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

// constants
import { HEADER_TOPICS_DATA, SHARE_HEADER_TAB, SITE_NAVIGATION_HEADER_TAB, ABOUT_HEADER_TAB } from "./constants";

// styles
import styles from "./header.module.scss";

function Header(props) {
  const { showLogo, openMenu, selectedTab, buttonPosition } = props;
  const [isOpen, setIsOpen] = useState(openMenu);
  const [tab, setTab] = useState(selectedTab);
  const isServer = typeof window === "undefined";

  useEffect(() => {
    if (openMenu != isOpen) {
      setIsOpen(openMenu);
    }
    if (selectedTab != tab) {
      setTab(selectedTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMenu, selectedTab]);

  const getTopicContainer = () => (
    <ul className={styles["topics-container"]}>
      {HEADER_TOPICS_DATA.map(topicData => (
        <li key={topicData.label} className={styles["topic-container"]}>
          <div className={styles["topic-title"]} onClick={() => setIsOpen(false)}>
            <Link href={topicData.link}>
              <a style={{ borderBottom: `solid 2px ${topicData.color}` }}>{topicData.label}</a>
            </Link>
          </div>
          <ul className={styles["topic-link-list"]}>
            {topicData.links.map(linkData => (
              <li key={linkData.link} className={styles["topic-link"]} onClick={() => setIsOpen(false)}>
                <Link href={linkData.link}>
                  <a
                    className={classnames({ [styles["-highlighted-link"]]: linkData.highlight })}
                    style={
                      linkData.highlight
                        ? {
                            borderBottom: `solid 2px ${topicData.color}`
                          }
                        : {}
                    }
                  >
                    {linkData.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );

  const getRightContainer = mobile => {
    switch (tab) {
      case SITE_NAVIGATION_HEADER_TAB:
        return getTopicContainer();
      case ABOUT_HEADER_TAB:
        return <About />;
      case SHARE_HEADER_TAB:
        return (
          <div
            className={classnames({
              [styles["share-container"]]: true,
              [styles["-desktop"]]: !mobile,
              [styles["-mobile"]]: mobile
            })}
          >
            <ShareBox
              url={isServer ? "" : window.location.href}
              style={{ borderColor: "#1A2129" }}
              showBorder={!mobile}
              showInput={!mobile}
            />
          </div>
        );
    }
  };

  const getLogoContainer = () => (
    <div className={styles["logo-container"]}>
      <LogoLink />
    </div>
  );

  const getNavigationTags = mobile => (
    <ul
      className={classnames({
        [styles["navigation-tabs"]]: true,
        [styles["-desktop"]]: !mobile,
        [styles["-mobile"]]: mobile
      })}
    >
      <li
        className={classnames({
          [styles["-active"]]: tab === SITE_NAVIGATION_HEADER_TAB
        })}
        onClick={() => setTab(SITE_NAVIGATION_HEADER_TAB)}
      >
        <a>SITE NAVIGATION</a>
      </li>
      <li
        className={classnames({
          [styles["-active"]]: tab === ABOUT_HEADER_TAB
        })}
        onClick={() => setTab(ABOUT_HEADER_TAB)}
      >
        <a>ABOUT</a>
      </li>
      <li
        className={classnames({
          [styles["-active"]]: tab === SHARE_HEADER_TAB
        })}
        onClick={() => setTab(SHARE_HEADER_TAB)}
      >
        <a>SHARE</a>
      </li>
    </ul>
  );

  return (
    <>
      <header className={styles.header}>
        <MediaContextProvider>
          <Desktop>
            <div
              className={classnames({
                [styles["main-container"]]: true,
                [styles["-desktop"]]: true
              })}
            >
              {showLogo && !isOpen && getLogoContainer()}
              {!isOpen && <HeaderTitle />}
              <MegaMenuBtn />
              {/* <button
                className={classnames({
                  [styles["hamburger-button"]]: true,
                  [styles["-center"]]: buttonPosition === "center",
                  [styles["-right"]]: buttonPosition === "right"
                })}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Menu" : "Open menu"}
              >
                <div className={styles["hamburger-button-image"]}>
                  <img src={`/static/images/${isOpen ? "close" : "hamburger"}.svg`} role="presentation" alt="" />
                </div>
              </button> */}
              <motion.div animate={{ opacity: isOpen ? 1 : 0 }}>
                {isOpen && (
                  <div className={styles["menu-container"]}>
                    <Particles className={styles.particles} params={PARTICLES_DEFINITION} />
                    <div
                      className={classnames({
                        [styles["data-containers"]]: true,
                        [styles["-desktop"]]: true
                      })}
                    >
                      <div
                        className={classnames({
                          [styles["left-container"]]: true,
                          [styles["-desktop"]]: true
                        })}
                      >
                        <LogoLink />
                        {getNavigationTags(false)}
                      </div>
                      <div
                        className={classnames({
                          [styles["right-container"]]: true,
                          [styles["-desktop"]]: true
                        })}
                      >
                        {getRightContainer(false)}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </Desktop>
          <Mobile>
            <div
              className={classnames({
                [styles["main-container"]]: true,
                [styles["-mobile"]]: true
              })}
            >
              {showLogo && !isOpen && getLogoContainer()}
              <button
                className={classnames({
                  [styles["hamburger-button"]]: true,
                  [styles["-mobile"]]: true
                })}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Menu" : "Open menu"}
              >
                <div className={styles["hamburger-button-image"]}>
                  <img src={`/static/images/${isOpen ? "close" : "hamburger"}.svg`} role="presentation" alt="" />
                </div>
              </button>
              <motion.div animate={{ opacity: isOpen ? 1 : 0 }}>
                {isOpen && (
                  <div className={styles["menu-container"]}>
                    <Particles className={styles.particles} params={PARTICLES_DEFINITION} />
                    <div
                      className={classnames({
                        [styles["data-containers"]]: true,
                        [styles["-mobile"]]: true
                      })}
                    >
                      <div
                        className={classnames({
                          [styles["left-container"]]: true,
                          [styles["-mobile"]]: true
                        })}
                      >
                        {getNavigationTags(true)}
                      </div>
                      <div
                        className={classnames({
                          [styles["right-container"]]: true,
                          [styles["-mobile"]]: true
                        })}
                      >
                        {getRightContainer(true)}
                        <div className={styles["logo-footer"]}>
                          <LogoLink />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
            <HeaderTitle />
          </Mobile>
        </MediaContextProvider>
      </header>

      <MegaMenu />
    </>
  );
}

Header.propTypes = {
  showLogo: PropTypes.bool.isRequired,
  openMenu: PropTypes.bool,
  selectedTab: PropTypes.string,
  buttonPosition: PropTypes.string
};
Header.defaultProps = {
  showLogo: true,
  selectedTab: SITE_NAVIGATION_HEADER_TAB,
  openMenu: false,
  buttonPosition: "center"
};

export default Header;
