import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "components/ui/anchor-cta/anchor-cta.module.scss";

const AnchorLink = ({ className, href, children }) => (
  <a className={classnames(className, styles["c-anchor-cta"])} href={href}>{children}</a>
);

AnchorLink.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired
};

AnchorLink.defaultProps = {};

export default AnchorLink;
