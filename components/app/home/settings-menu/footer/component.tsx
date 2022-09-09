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
const Footer = ({ isCookieOpen, setIsCookieOpen }: FooterProps) => {
  return (
    <div className={styles["c-footer"]}>
      <p className={styles["c-footer__title"]}>Other {true ? "cookie" : "nope"}</p>

      <div className={styles["c-footer__links"]}>
        {QuickLinks.filter(link => link.external).map(({ key, link, label }) => (
          <a key={key} href={link} target="_blank" rel="nofollow noreferrer">
            {label}
          </a>
        ))}
        <p onClick={() => setIsCookieOpen(true)}>Cookies</p>
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
