import LogoLink from "components/ui/logo-link/index";
import FooterLink from "./footer-link";
import SocialIcon from "components/ui/social-icon";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "layout/footer/footer.module.scss";

import { SocialLinks } from "constants/social-links";

const FOOTER_LINKS = [
  {
    key: "earthHQ",
    label: "Earth HQ",
    link: "/"
  },
  {
    key: "climate",
    label: "Climate",
    link: "/climate"
  },
  {
    key: "forests",
    label: "Forests",
    link: "/forests"
  },
  {
    key: "fresh-water",
    label: "Fresh Water",
    link: "/freshwater"
  },
  {
    key: "ocean",
    label: "Ocean",
    link: "/ocean"
  }
];

const FOOTER_QUICK_LINKS = [
  {
    key: "about-us",
    label: "About Us",
    link: "/about"
  },
  {
    key: "terms-of-use",
    label: "Terms Of Use",
    link: "https://resourcewatch.org/terms-of-service",
    external: true
  },
  {
    key: "cookies",
    label: "Cookies",
    link: "https://resourcewatch.org/privacy-policy",
    external: true
  }
];

const Footer = ({ className }) => (
  <div className={classnames(className, styles["c-footer-section"])}>
    <div className={styles["c-footer-section__logo"]}>
      <LogoLink />
    </div>

    <ul className={classnames(styles["c-footer-section__links"], styles["c-footer-section__links--navigation"])}>
      {FOOTER_LINKS.map(({ key, ...footerLinkProps }) => (
        <FooterLink key={key} {...footerLinkProps} />
      ))}
    </ul>

    <ul className={styles["c-footer-section__links"]}>
      {FOOTER_QUICK_LINKS.map(({ key, ...footerLinkProps }) => (
        <FooterLink key={key} {...footerLinkProps} />
      ))}
    </ul>

    <div className={styles["c-footer-section__socials"]}>
      <div className={styles["c-footer-section-socials"]}>
        {SocialLinks.map(({ key, ...socialLinkProps }) => (
          <SocialIcon  className={styles["c-footer-section-socials__icon"]} key={key} {...socialLinkProps} />
        ))}
      </div>
      
      <span className={styles["c-footer-section__copyright"]}>
        &#169; {new Date().getFullYear()} Global Commons Alliance. All Rights Reserved
      </span>
    </div>
  </div>
);

Footer.propTypes = {
  className: PropTypes.string
};

Footer.defaultProps = {
  className: ""
};

export default Footer;
