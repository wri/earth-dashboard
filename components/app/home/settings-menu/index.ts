import { connect } from "react-redux";
import SettingsMenuComponent from "./component";
import { setSettingsClose } from "slices/mapControls";
import { RootState } from "store/types";

export default connect(
  (state: RootState) => ({
    isOpen: state.mapControls.isSettingsOpen,
    isMobile: state.common.isMobile
  }),
  {
    onClose: setSettingsClose
  }
)(SettingsMenuComponent);
