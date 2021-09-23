import { connect } from "react-redux";
import SettingsMenuComponent from "./component";
import { setSettingsClose, NAME as mapControlsSliceName } from "slices/mapControls";

export default connect(
  state => ({
    isSettingsOpen: state[mapControlsSliceName].isSettingsOpen
  }),
  {
    setSettingsClose
  }
)(SettingsMenuComponent);
