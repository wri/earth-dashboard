import LogoLink from "components/ui/logo-link/index";
import ListLink from "components/ui/list-link";
import SocialIcon from "components/ui/social-icon";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "layout/footer/footer.module.scss";

import { MenuItems as FooterLinks, QuickLinks, SocialLinks } from "constants/menu-items";

const Footer = ({ className }) => (
  <div className={classnames(className, styles["c-footer-section"])}>
    <div className={styles["c-footer-section__logo"]}>
      <LogoLink />
    </div>

    <ul className={classnames(styles["c-footer-section__links"], styles["c-footer-section__links--navigation"])}>
      {FooterLinks.map(({ key, ...footerLinkProps }) => (
        <ListLink key={key} className={styles["c-footer-section__link"]} {...footerLinkProps} />
      ))}
    </ul>

    <ul className={styles["c-footer-section__links"]}>
      {QuickLinks.filter(qLink => qLink.link !== null).map(({ key, ...quickLinkProps }) => (
        <ListLink key={key} className={styles["c-footer-section__link"]} {...quickLinkProps} />
      ))}
    </ul>

    <div className={styles["c-footer-section__socials"]}>
      <div className={styles["c-footer-section-socials"]}>
        {SocialLinks.map(({ key, ...socialLinkProps }) => (
          <SocialIcon className={styles["c-footer-section-socials__icon"]} key={key} {...socialLinkProps} />
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
