import CTA from "layout/header/mega-menu/cta";
import SocialIcon from "components/ui/social-icon";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import styles from "./mega-menu.module.scss";
import PropTypes from "prop-types";

import { MegaMenuCTAs, MegaMenuQuickLinks, MegaMenuSocialLinks } from "constants/mega-menu-items";

const MegaMenu = ({ isMegaMenuOpen }) => (
  <CSSTransition
    in={isMegaMenuOpen}
    classNames={{
      enterActive: styles["c-mega-menu--in"],
      enterDone: styles["c-mega-menu--in"]
    }}
    timeout={parseInt(styles["transition-duration"])}
    unmountOnExit
  >
    <div className={styles["c-mega-menu"]}>
      <div className={styles["c-mega-menu__ctas"]}>
        {MegaMenuCTAs.map(({ key, ...ctaProps }) => (
          <CTA key={key} {...ctaProps} />
        ))}
      </div>

      <div className={styles["c-mega-menu__links"]}>
        <div>
          <ul className={styles["c-mega-menu-quick-links"]}>
            {MegaMenuQuickLinks.map(({ key, label, link }) => (
              <li key={key}>
                <Link href={link}>
                  <a>{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={styles["c-mega-menu-socials"]}>
            {MegaMenuSocialLinks.map(({ key, ...socialLinkProps }) => (
              <SocialIcon key={key} className={styles["c-mega-menu-socials__icon"]} {...socialLinkProps} />
            ))}
          </div>
          <span className={styles["c-mega-menu__links__copy-right"]}>
            &#169; {new Date().getFullYear()} Global Commons Alliance. All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  </CSSTransition>
);

MegaMenu.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired
};

export default MegaMenu;
