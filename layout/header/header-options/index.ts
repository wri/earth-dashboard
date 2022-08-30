import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as mapControlsSliceName, setSettingsOpen, setSettingsClose } from "slices/mapControls";
import HeaderOptionsComponent from "./component";

export default connect(
  (state: RootState) => ({
    isSettingsOpen: state[mapControlsSliceName].isSettingsOpen
  }),
  {
    setSettingsOpen,
    setSettingsClose
  }
)(HeaderOptionsComponent);
