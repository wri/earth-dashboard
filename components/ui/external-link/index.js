import classnames from "classnames";
import Image from "next/image";
import ExternalLinkIcon from "public/static/icons/external-link.svg";
import styles from "components/ui/external-link/external-link.module.scss";
import PropTypes from "prop-types";

const ExternalLink = ({ className, link, label, ...rest }) => (
  <a
    className={classnames(className, styles["c-external-link"])}
    href={link}
    target="_blank"
    rel="nofollow noreferrer"
    {...rest}
  >
    <Image src={ExternalLinkIcon} role="presentation" alt="" />
    <span>{label}</span>
  </a>
);

ExternalLink.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

ExternalLink.defaultProps = {
  className: ""
};

export default ExternalLink;
