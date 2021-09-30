import { connect } from "react-redux";
import HeaderComponent from "./component";

export default connect(state => ({ isMegaMenuOpen: state.common.isMegaMenuOpen }))(HeaderComponent);
