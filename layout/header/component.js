import classnames from "classnames";
import LogoLink from "components/ui/logo-link";
import HeaderTitle from "layout/header/header-title";
import MegaMenuBtn from "layout/header/mega-menu/btn";
import MegaMenu from "layout/header/mega-menu";
import FocusTrap from "focus-trap-react";
import PropTypes from "prop-types";

// styles
import styles from "./header.module.scss";

const Header = ({ isMegaMenuOpen, setIsMegaMenuOpen }) => {
  const focusTrapOptions = {
    onDeactivate: () => setIsMegaMenuOpen(false),
    clickOutsideDeactivates: true
  };

  return (
    <div
      className={classnames(styles["c-mega-menu-wrapper"], isMegaMenuOpen && styles["c-mega-menu-wrapper--open"])}
      data-testid="header"
    >
      <FocusTrap active={isMegaMenuOpen} focusTrapOptions={focusTrapOptions}>
        <div className={styles["c-mega-menu-wrapper__bg"]}>
          <header className={styles["c-site-header"]}>
            <div className={styles["logo-container"]}>
              <LogoLink />
            </div>
            {!isMegaMenuOpen && <HeaderTitle />}
            <MegaMenuBtn />
          </header>

          <MegaMenu />
        </div>
      </FocusTrap>
    </div>
  );
};

Header.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired,
  setIsMegaMenuOpen: PropTypes.func.isRequired
};

export default Header;
