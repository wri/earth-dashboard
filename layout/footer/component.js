import LogoLink from "components/ui/logo-link/index";
import Link from "next/link";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "layout/footer/footer.module.scss";

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

const Footer = () => (
  <div className={styles["c-footer-section"]}>
    <div className={styles["c-footer-section__logo"]}><LogoLink /></div>

    <ul className={classnames(styles["c-footer-section__links"], styles["c-footer-section__links--navigation"])}>
      {FOOTER_LINKS.map(footerLink => (
        <li className={styles["c-footer-section__link"]}>
          <Link href={footerLink.link}>
            <a>{footerLink.label}</a>
          </Link>
        </li>
      ))}
    </ul>

    <ul className={styles["c-footer-section__links"]}>
      {FOOTER_QUICK_LINKS.map(footerLink => (
        <li className={styles["c-footer-section__link"]}>
          <Link href={footerLink.link}>
            <a>{footerLink.label}</a>
          </Link>
        </li>
      ))}
    </ul>

    <div className={styles["c-footer-section__socials"]}>
      <span className={styles["c-footer-section__copyright"]}>&#169; {new Date().getFullYear()} Global Commons Alliance. All Rights Reserved</span>
    </div>
  </div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;