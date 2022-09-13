import classnames from "classnames";
import LogoLink from "components/ui/logo-link";
import HeaderLink from "layout/header/header-link";
import HeaderOptions from "layout/header/header-options";
import styles from "./header.module.scss";
import { useRouter } from "next/router";
import { Desktop, Mobile } from "utils/responsive";
import Navbar from "layout/navbar";

/** Header component for the site with the logo, links, and controls. */
const Header = () => {
  // Navigation
  const router = useRouter();

  const title = (() => {
    switch (router.route) {
      case "/news":
        return "News";
      default:
        return undefined;
    }
  })();

  const description = (() => {
    switch (router.route) {
      case "/news":
        return "Our partners tell the epic story of what is happening to our planet.";
      default:
        return undefined;
    }
  })();

  return (
    <>
      <header
        className={classnames(styles["c-site-header"], router.pathname === "/" ? styles["fixed"] : styles["sticky"])}
      >
        <div className={styles["top-section"]}>
          {/* Logo */}
          <div className={styles["top-section__logo"]}>
            <LogoLink />
          </div>

          {/* Navigation links */}
          <Desktop>
            <div className={styles["top-section__links"]}>
              <HeaderLink href="/" text="Earth HQ" />
              <HeaderLink href="/news" text="News" />
              <HeaderLink href="/about" text="About" />
            </div>
          </Desktop>

          {/* Options */}
          <HeaderOptions />
        </div>

        {/* Text section */}
        {(title || description) && (
          <div className={styles["bottom-section"]}>
            <Mobile>{title && <h2 className={styles["title"]}>{title}</h2>}</Mobile>
            {description && <p className={styles["description"]}>{description}</p>}
          </div>
        )}
      </header>
      <Mobile>
        <Navbar />
      </Mobile>
    </>
  );
};

export default Header;
