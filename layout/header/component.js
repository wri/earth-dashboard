import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import LogoLink from "components/ui/logo-link";
import HeaderLink from "layout/header/header-link";
import { CSSTransition } from "react-transition-group";
import MegaMenu from "layout/header/mega-menu";
import FocusTrap from "focus-trap-react";
import PropTypes from "prop-types";
import HeaderOptions from "layout/header/header-options";
import styles from "./header.module.scss";

/** Header component for the site with the logo, links, and controls. */
const Header = ({ isMegaMenuOpen, setIsMegaMenuOpen }) => {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Navigation
  const router = useRouter();

  // Reference
  const headerRef = useRef(null);

  const focusTrapOptions = {
    onDeactivate: () => setIsMegaMenuOpen(false),
    clickOutsideDeactivates: true
  };

  useEffect(() => {
    const handleRouteChange = () => setIsMegaMenuOpen(false);

    const handleScroll = () => {
      if (window.scrollY > headerRef.current?.scrollHeight) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };

    router?.events.on("routeChangeStart", handleRouteChange);
    window?.addEventListener("scroll", handleScroll);

    return () => {
      router?.events.off("routeChangeStart", handleRouteChange);
      window?.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CSSTransition
      in={isMegaMenuOpen}
      classNames={{
        enterActive: classnames(
          styles["c-mega-menu-wrapper--open"],
          styles["c-mega-menu-wrapper--max-height-override"]
        ),
        enterDone: classnames(styles["c-mega-menu-wrapper--open"], styles["c-mega-menu-wrapper--max-height-override"]),
        exitActive: classnames(styles["c-mega-menu-wrapper--closing"], styles["c-mega-menu-wrapper--open"])
      }}
      timeout={parseInt(styles["transition-duration"], 10)}
    >
      <div className={styles["c-mega-menu-wrapper"]} data-testid="header">
        <FocusTrap active={isMegaMenuOpen} focusTrapOptions={focusTrapOptions}>
          <div
            className={styles["c-mega-menu-wrapper__bg"]}
            style={{ maxHeight: headerRef.current && headerRef.current.scrollHeight + "px" }}
          >
            <header
              className={classnames(styles["c-site-header"], isHeaderSticky && styles["c-site-header--sticky"])}
              ref={headerRef}
            >
              {/* Logo */}
              <div className={styles["c-site-header__logo"]}>
                <LogoLink />
              </div>

              {/* Navigation links */}
              <div className={styles["c-site-header__links"]}>
                <HeaderLink href="/" text="Earth HQ" active={router.pathname === "/" && !isMegaMenuOpen} />
                <HeaderLink text="News" onClick={() => setIsMegaMenuOpen(true)} active={isMegaMenuOpen} />
                <HeaderLink href="/about" text="About" active={router.pathname === "/about" && !isMegaMenuOpen} />
              </div>

              {/* Options */}
              <HeaderOptions />

              {/* TODO: Need to remove after refactor of news page.
                <MegaMenuBtn className={styles["c-site-header__btn"]} />
              */}
            </header>

            <MegaMenu />
          </div>
        </FocusTrap>
      </div>
    </CSSTransition>
  );
};

Header.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired,
  setIsMegaMenuOpen: PropTypes.func.isRequired
};

export default Header;
