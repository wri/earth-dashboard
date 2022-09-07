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

  return (
    <header
      className={classnames(styles["c-site-header"], router.pathname === "/" ? styles["fixed"] : styles["sticky"])}
    >
      <div className={styles["section"]}>
        {/* Logo */}
        <div className={styles["section__logo"]}>
          <LogoLink />
        </div>

        {/* Navigation links */}
        <Desktop>
          <div className={styles["section__links"]}>
            <HeaderLink href="/" text="Earth HQ" />
            <HeaderLink href="/news" text="News" />
            <HeaderLink href="/about" text="About" />
          </div>
        </Desktop>
        <Mobile>
          <Navbar />
        </Mobile>

        {/* Options */}
        <HeaderOptions />
      </div>
    </header>
  );
};

export default Header;
