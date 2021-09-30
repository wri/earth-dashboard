import CTA from "./CTA";
import SocialIcon from "components/ui/social-icon";
import Link from "next/link";
import styles from "./mega-menu.module.scss";
import PropTypes from "prop-types";

import TestImage from "public/static/images/forests/challenge.png";
import TwitterIcon from "public/static/icons/twitter.svg";
import LinkedInIcon from "public/static/icons/linkedin.svg";

const MegaMenuCTAs = [
  {
    key: "earth-hq",
    image: TestImage,
    title: "Earth HQ",
    body: "A “Situation Room” for the planet. Earth HQ is an interactive and dynamic platform that tracks the forces imperiling the natural systems that support life on earth. ",
    link: "/"
  },
  {
    key: "climate",
    title: "Climate",
    body: "Rising global temperatures pose a threat to every corner of the globe and most aspects of human life.",
    link: "/climate"
  },
  {
    key: "freshwater",
    title: "Freshwater",
    body: "Rising consumption, climate change and pollution are increasing pressure on water supply. ",
    link: "/freshwater"
  },
  {
    key: "forest",
    title: "Forest",
    body: "Extreme events and climate change make forest ecosystems even more prone to damage.",
    link: "/forests"
  },
  {
    key: "qcean",
    title: "Ocean",
    body: "Current pressures on the ocean’s health pose risks to our economies, societies and the environment.",
    link: "/ocean"
  }
];

const MegaMenuQuickLinks = [
  {
    key: "about-us",
    label: "About Us",
    link: "/"
  },
  {
    key: "terms-of-use",
    label: "Terms Of Use",
    link: "/"
  },
  {
    key: "cookies",
    label: "Cookies",
    link: "/"
  }
];

const MegaMenuSocialLinks = [
  {
    key: "twitter",
    icon: TwitterIcon,
    label: "Twitter",
    link: "https://twitter.com/"
  },
  {
    key: "linkedin",
    icon: LinkedInIcon,
    label: "LinkedIn",
    link: "https://linkedin.com/"
  }
];

const MegaMenu = ({ isMegaMenuOpen }) =>
  isMegaMenuOpen && (
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
          <span className={styles["c-mega-menu__links__copy-right"]}>&#169; 2021 Global Commons Alliance. All Rights Reserved</span>
        </div>
      </div>
    </div>
  );

MegaMenu.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired
};

export default MegaMenu;
