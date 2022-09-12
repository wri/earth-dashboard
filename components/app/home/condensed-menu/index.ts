import { connect } from "react-redux";
import { RootState } from "store/types";
import CondensedMenuComponent from "./component";

export default connect((state: RootState) => ({
  currentHeadline: state.headlines.currentHeadline,
  currentMode: state.modes.currentMode
}))(CondensedMenuComponent);
