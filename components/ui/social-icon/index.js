import Image from "next/image";
import classnames from "classnames";
import styles from "./social-icon.module.scss";
import PropTypes from "prop-types";

const SocialIcon = ({ className, icon, label, link }) => (
  <a
    className={classnames(styles["c-social-icon"], className)}
    href={link}
    aria-label={label}
    target="_blank"
    rel="nofollow noreferrer"
  >
    <Image className={styles["c-social-icon__icon"]} src={icon} role="presentation" alt="" />
  </a>
);

SocialIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default SocialIcon;
