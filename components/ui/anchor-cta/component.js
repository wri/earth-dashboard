import classnames from "classnames";
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "components/ui/anchor-cta/anchor-cta.module.scss";

const AnchorCTA = ({ className, href, children, onClick }) =>  href ? (
  <Link href={href}>
    <a className={classnames(className, styles["c-anchor-cta"])} onClick={onClick}>
      {children}
    </a>
  </Link>
) : (
  <button className={classnames(className, styles["c-anchor-cta"])} onClick={onClick}>
    {children}
  </button>
);

AnchorCTA.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
};

AnchorCTA.defaultProps = {
  className: ""
};

export default AnchorCTA;
