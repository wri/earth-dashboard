import { useRef } from "react";
import CTA from "layout/header/mega-menu/cta";
import classnames from "classnames";
import SocialIcon from "components/ui/social-icon";
import ListLink from "components/ui/list-link";
import { CSSTransition } from "react-transition-group";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import styles from "./mega-menu.module.scss";
import PropTypes from "prop-types";

import { MenuItems as MegaMenuCTAs, QuickLinks, SocialLinks } from "constants/menu-items";

const MegaMenu = ({ isMegaMenuOpen }) => {
  const scrollEl = useRef(null);

  return (
    <CSSTransition
      in={isMegaMenuOpen}
      classNames={{
        enterActive: classnames(styles["c-mega-menu--opening"], styles["c-mega-menu--in"]),
        enterDone: styles["c-mega-menu--in"],
        exitActive: styles["c-mega-menu--closing"]
      }}
      timeout={parseInt(styles["transition-duration"], 10)}
      unmountOnExit
      onEnter={() => disableBodyScroll(scrollEl.current)}
      onExit={() => enableBodyScroll(scrollEl.current)}
    >
      <div className={styles["c-mega-menu"]}>
        <div className={styles["c-mega-menu__scroll"]} ref={scrollEl}>
          <nav aria-label="Main Menu">
            <ul className={styles["c-mega-menu__ctas"]}>
              {MegaMenuCTAs.map(({ key, ...ctaProps }) => (
                <CTA key={key} {...ctaProps} />
              ))}
            </ul>
          </nav>

          <div className={styles["c-mega-menu__links"]}>
            <nav aria-label="Useful Links Menu">
              <ul className={styles["c-mega-menu-quick-links"]}>
                {QuickLinks.map(({ key, ...quickLinkProps }) => (
                  <ListLink key={key} {...quickLinkProps} />
                ))}
              </ul>
            </nav>

            <div>
              <div className={styles["c-mega-menu-socials"]}>
                {SocialLinks.map(({ key, ...socialLinkProps }) => (
                  <SocialIcon key={key} className={styles["c-mega-menu-socials__icon"]} {...socialLinkProps} />
                ))}
              </div>
              <span className={styles["c-mega-menu__links__copy-right"]}>
                &#169; {new Date().getFullYear()} Global Commons Alliance. All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

MegaMenu.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired
};

export default MegaMenu;
