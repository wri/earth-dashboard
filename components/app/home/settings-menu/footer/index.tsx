import { IconNames } from "components/ui/Icon";
import SocialIcon from "components/ui/social-icon";
import { QuickLinks, SocialLinks } from "constants/menu-items";
import styles from "./footer.module.scss";

/** Footer component for the settings modal. */
const Footer = () => {
  return (
    <div className={styles["c-footer"]}>
      <p className={styles["c-footer__title"]}>Other</p>

      <div className={styles["c-footer__links"]}>
        {QuickLinks.filter(link => link.external).map(({ key, link, label }) => (
          <a key={key} href={link} target="_blank" rel="nofollow noreferrer">
            {label}
          </a>
        ))}
      </div>

      <div className={styles["c-footer__socials"]}>
        {SocialLinks.map(({ key, name, ...socialLinkProps }) => (
          <SocialIcon key={key} name={name as IconNames} {...socialLinkProps} />
        ))}
      </div>

      <span className={styles["c-footer__copyright"]}>
        &#169; {new Date().getFullYear()} Global Commons Alliance. All Rights Reserved
      </span>
    </div>
  );
};

export default Footer;
