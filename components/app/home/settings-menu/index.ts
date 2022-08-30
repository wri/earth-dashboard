import { connect } from "react-redux";
import SettingsMenuComponent from "./component";
import { setSettingsClose, NAME as mapControlsSliceName } from "slices/mapControls";
import { RootState } from "store/types";

export default connect(
  (state: RootState) => ({
    isOpen: state[mapControlsSliceName].isSettingsOpen
  }),
  {
    onClose: setSettingsClose
  }
)(SettingsMenuComponent);
