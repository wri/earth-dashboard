import styles from "./mega-menu.module.scss";
import PropTypes from "prop-types";

const MegaMenu = ({ isMegaMenuOpen, setIsMegaMenuOpen }) => isMegaMenuOpen && (
  <div className={styles["c-mega-menu"]}>Mega Menu Open!</div>
);

MegaMenu.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired,
  setIsMegaMenuOpen: PropTypes.func.isRequired
};

export default MegaMenu;
