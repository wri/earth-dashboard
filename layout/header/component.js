import classnames from "classnames";
import LogoLink from "components/ui/logo-link/index";
import HeaderTitle from "layout/header/header-title";
import MegaMenuBtn from "layout/header/header-btn";
import MegaMenu from "layout/header/mega-menu";
import PropTypes from "prop-types";

// styles
import styles from "./header.module.scss";

const Header = ({ isMegaMenuOpen }) => {
  return (
    <div className={classnames(styles["c-mega-menu-wrapper"], isMegaMenuOpen && styles["c-mega-menu-wrapper--open"])}>
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
    </div>
  );
};

Header.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired
};

export default Header;
