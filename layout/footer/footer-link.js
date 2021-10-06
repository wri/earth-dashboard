import Link from "next/link";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "layout/footer/footer.module.scss";

const FooterLink = ({ className, link, label }) => (
  <li className={classnames(className, styles["c-footer-section__link"])}>
    <Link href={link}>
      <a>{label}</a>
    </Link>
  </li>
);

FooterLink.propTypes = {
  className: PropTypes.string
};

FooterLink.defaultProps = {
  className: ""
};

export default FooterLink;
