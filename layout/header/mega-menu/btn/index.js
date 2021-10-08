import { connect } from "react-redux";
import { setIsMegaMenuOpen } from "slices/common";
import MegaMenuBtnComponent from "./component";

export default connect(
  state => ({
    isMegaMenuOpen: state.common.isMegaMenuOpen
  }),
  {
    setIsMegaMenuOpen
  }
)(MegaMenuBtnComponent);
