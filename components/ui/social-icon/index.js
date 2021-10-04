import Image from "next/image";
import classnames from "classnames";
import styles from "./social-icon.module.scss";
import PropTypes from "prop-types";

const SocialIcon = ({ className, icon, label, link }) => (
  <div className={classnames(styles["c-social-icon"], className)}>
    <a className={styles["c-social-icon__link"]} href={link} aria-label={label}>
      <Image src={icon} role="presentation" alt="" />
    </a>
  </div>
);

SocialIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default SocialIcon;
