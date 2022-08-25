import classnames from "classnames";
import styles from "./social-icon.module.scss";
import Icon from "../Icon";

type SocialIconProps = {
  name: string;
  label: string;
  link: string;
  className?: string;
};

/** Social icon button that links to an external site. */
const SocialIcon = ({ name, label, link, className = "" }: SocialIconProps) => (
  <a
    className={classnames(styles["c-social-icon"], className)}
    href={link}
    aria-label={label}
    target="_blank"
    rel="nofollow noreferrer"
  >
    <Icon name={name} size={21} type="decorative" />
  </a>
);

export default SocialIcon;
