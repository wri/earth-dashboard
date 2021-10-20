import { connect } from "react-redux";
import SettingsMenuComponent from "./component";
import { setSettingsClose, NAME as mapControlsSliceName } from "slices/mapControls";

export default connect(
  state => ({
    isOpen: state[mapControlsSliceName].isSettingsOpen
  }),
  {
    onClose: setSettingsClose
  }
)(SettingsMenuComponent);
