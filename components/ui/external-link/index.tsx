import classnames from "classnames";
import styles from "components/ui/external-link/external-link.module.scss";
import Icon from "../Icon";

type ExternalLinkProps = {
  link: string;
  label: string;
  className?: string;
  onClick?: () => void;
};

/** Link to an extenal site with icon and underline. */
const ExternalLink = ({ link, label, className = "", onClick, ...rest }: ExternalLinkProps) => (
  <a
    className={classnames(className, styles["c-external-link"])}
    href={link}
    target="_blank"
    rel="nofollow noreferrer"
    onClick={onClick}
    {...rest}
  >
    <Icon name="external-link" size={18} type="decorative" />
    <span>{label}</span>
  </a>
);

export default ExternalLink;
