import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import LogoLink from "components/ui/logo-link";
import HeaderTitle from "layout/header/header-title";
import { CSSTransition } from "react-transition-group";
import MegaMenuBtn from "layout/header/mega-menu/btn";
import MegaMenu from "layout/header/mega-menu";
import FocusTrap from "focus-trap-react";
import PropTypes from "prop-types";

// styles
import styles from "./header.module.scss";

const Header = ({ isMegaMenuOpen, setIsMegaMenuOpen, showHeaderTitle }) => {
  const headerRef = useRef(null);
  const router = useRouter();

  const focusTrapOptions = {
    onDeactivate: () => setIsMegaMenuOpen(false),
    clickOutsideDeactivates: true
  };

  useEffect(() => {
    const handleRouteChange = () => setIsMegaMenuOpen(false);

    router?.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router?.events.off("routeChangeStart", handleRouteChange);
    };
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
            <header className={styles["c-site-header"]} ref={headerRef}>
              <div className={styles["c-site-header__logo"]}>
                <LogoLink />
              </div>
              {showHeaderTitle && !isMegaMenuOpen && <HeaderTitle />}
              <MegaMenuBtn className={styles["c-site-header__btn"]} />
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
  setIsMegaMenuOpen: PropTypes.func.isRequired,
  showHeaderTitle: PropTypes.bool.isRequired
};

Header.defaultProps = {
  showHeaderTitle: false
};

export default Header;
