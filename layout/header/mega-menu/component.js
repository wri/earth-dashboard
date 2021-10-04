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
    body: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu.",
    link: "/"
  },
  {
    key: "climate",
    title: "Climate",
    body: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu.",
    link: "/climate"
  },
  {
    key: "freshwater",
    title: "Freshwater",
    body: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu.",
    link: "/freshwater"
  },
  {
    key: "forest",
    title: "Forest",
    body: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu.",
    link: "/forests"
  },
  {
    key: "qcean",
    title: "Ocean",
    body: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu.",
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
          <span>&#169; 2021 Global Commons Alliance. All Rights Reserved</span>
        </div>
      </div>
    </div>
  );

MegaMenu.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired
};

export default MegaMenu;
