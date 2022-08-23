import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./header-link.module.scss";
import Link from "next/link";

const HeaderLink = ({ href, text, className, ...rest }) => {
  return (
    <Link href={href} {...rest}>
      <a className={classnames(styles["c-header-link"], className)}>{text}</a>
    </Link>
  );
};

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

HeaderLink.defaultProps = {
  className: ""
};

export default HeaderLink;
