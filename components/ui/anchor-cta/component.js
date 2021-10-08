import classnames from "classnames";
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "components/ui/anchor-cta/anchor-cta.module.scss";

const AnchorCTA = ({ className, href, children, onClick, external, ...rest }) => {
  const anchorCTAProps = Object.assign(
    { ...rest },
    {
      className: classnames(className, styles["c-anchor-cta"]),
      onClick
    },
    external && { href, target: "_blank", rel: "nofollow noreferrer" }
  );

  return href && external ? (
    <a {...anchorCTAProps}>{children}</a>
  ) : href && !external ? (
    <Link href={href}>
      <a {...anchorCTAProps}>{children}</a>
    </Link>
  ) : (
    <button className={classnames(className, styles["c-anchor-cta"])} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

AnchorCTA.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  external: PropTypes.bool
};

AnchorCTA.defaultProps = {
  className: "",
  external: false
};

export default AnchorCTA;
