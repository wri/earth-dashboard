import Link from "next/link";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "layout/footer/footer.module.scss";

const FooterLink = ({ className, link, label, external }) => (
  <li className={classnames(className, styles["c-footer-section__link"])}>
    <Link href={link}>
      <a target={external && "_blank"} rel={external && "nofollow noreferrer"}>
        {label}
      </a>
    </Link>
  </li>
);

FooterLink.propTypes = {
  className: PropTypes.string,
  external: PropTypes.bool
};

FooterLink.defaultProps = {
  className: "",
  external: false
};

export default FooterLink;
