import { IconNames } from "components/ui/Icon";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import SocialIcon from "components/ui/social-icon";
import { QuickLinks, SocialLinks } from "constants/menu-items";
import styles from "./footer.module.scss";
import Link from "next/link";

/** Footer component for the settings modal. */

type FooterProps = {
  isCookieOpen: boolean;
  setIsCookieOpen: ActionCreatorWithPayload<boolean, string>;
  setSettingsClose: ActionCreatorWithoutPayload<string>;
};

const Footer = ({ setIsCookieOpen, setSettingsClose }: FooterProps) => {
  return (
    <div className={styles["c-footer"]}>
      <h2 className={styles["c-footer__title"]}>Other</h2>

      <div className={styles["c-footer__links"]}>
        {QuickLinks.map(({ key, link, label, onClick }) =>
          !link ? (
            <p onClick={() => setIsCookieOpen(true)}>Cookies</p>
          ) : key === "about-us" ? (
            <Link href="/about">
              <a onClick={setSettingsClose}>{label}</a>
            </Link>
          ) : (
            <a key={key} href={link} onClick={onClick && onClick} target="_blank" rel="nofollow noreferrer">
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
