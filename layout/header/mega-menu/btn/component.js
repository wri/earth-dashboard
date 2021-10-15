import AnchorCTA from "components/ui/anchor-cta";
import IconButton from "components/ui/icon-button";
import CloseIcon from "public/static/images/close.svg";
import PropTypes from "prop-types";

const MegaMenuBtn = ({ isMegaMenuOpen, setIsMegaMenuOpen, ...rest }) =>
  isMegaMenuOpen ? (
    <IconButton
      aria-label="Close Main Menu"
      icon={CloseIcon}
      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
      {...rest}
    />
  ) : (
    <AnchorCTA aria-label="Open Main Menu" onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)} {...rest}>
      Breaking News
    </AnchorCTA>
  );

MegaMenuBtn.propTypes = {
  isMegaMenuOpen: PropTypes.bool.isRequired,
  setIsMegaMenuOpen: PropTypes.func.isRequired
};

export default MegaMenuBtn;
