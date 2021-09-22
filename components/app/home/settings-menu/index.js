import { connect } from "react-redux";
import SettingsMenuComponent from "./component";
import { setSettingsClose, NAME as controlBarSliceName } from "slices/controlBar";

export default connect(
  state => ({
    isSettingsOpen: state[controlBarSliceName].isSettingsOpen
  }),
  {
    setSettingsClose
  }
)(SettingsMenuComponent);
