import { IconNames } from "components/ui/Icon";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import SocialIcon from "components/ui/social-icon";
import { QuickLinks, SocialLinks } from "constants/menu-items";
import styles from "./footer.module.scss";

/** Footer component for the settings modal. */

type FooterProps = {
  isCookieOpen: boolean;
  setIsCookieOpen: ActionCreatorWithPayload<boolean, string>;
};
const Footer = ({ setIsCookieOpen }: FooterProps) => {
  return (
    <div className={styles["c-footer"]}>
      <h2 className={styles["c-footer__title"]}>Other</h2>

      <div className={styles["c-footer__links"]}>
        {QuickLinks.filter(link => link.external).map(({ key, link, label }) =>
          !link ? (
            <p onClick={() => setIsCookieOpen(true)}>Cookies</p>
          ) : (
            <a key={key} href={link} target="_blank" rel="nofollow noreferrer">
              {label}
            </a>
          )
        )}
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
