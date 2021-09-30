import { connect } from "react-redux";
import MegaMenuComponent from "./component";

export default connect(
  state => ({
    isMegaMenuOpen: state.common.isMegaMenuOpen
  })
)(MegaMenuComponent);
