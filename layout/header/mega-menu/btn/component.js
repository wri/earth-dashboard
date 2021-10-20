import AnchorCTA from "components/ui/anchor-cta";
import classnames from "classnames";
import IconButton from "components/ui/icon-button";
import CloseIcon from "public/static/images/close.svg";
import styles from "layout/header/mega-menu/btn/btn.module.scss";
import PropTypes from "prop-types";

const MegaMenuBtn = ({ className, isMegaMenuOpen, setIsMegaMenuOpen, ...rest }) =>
  isMegaMenuOpen ? (
    <IconButton
      className={classnames(className, styles["c-site-header-btn-close-menu"])}
      aria-label="Close Main Menu"
      icon={CloseIcon}
      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
      {...rest}
    />
  ) : (
    <AnchorCTA
      className={classnames(className, styles["c-site-header-btn-open-menu"])}
      aria-label="Open Main Menu"
      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
      {...rest}
    >
      Breaking News
    </AnchorCTA>
  );

MegaMenuBtn.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired,
  setIsMegaMenuOpen: PropTypes.func.isRequired
};

export default MegaMenuBtn;
