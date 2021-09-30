import IconButton from "components/ui/icon-button";
import HamBurgerIcon from "public/static/images/hamburger.svg";
import CloseIcon from "public/static/images/close.svg";
import PropTypes from "prop-types";

const MegaMenuBtn = ({ isMegaMenuOpen, setIsMegaMenuOpen }) => (
  <IconButton
    aria-label={isMegaMenuOpen ? "Close Menu" : "Open Menu"}
    icon={isMegaMenuOpen ? CloseIcon : HamBurgerIcon}
    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
  />
);

MegaMenuBtn.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired,
  setIsMegaMenuOpen: PropTypes.func.isRequired
};

export default MegaMenuBtn;
