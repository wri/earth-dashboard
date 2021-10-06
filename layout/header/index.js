// component
import HeaderComponent from "./component";
import { connect } from "react-redux";
import { NAME as mapControlsSliceName } from "slices/mapControls";

export default connect(state => ({
  isFaded: state[mapControlsSliceName].isDatePickerOpen || state[mapControlsSliceName].isSettingsOpen
}))(HeaderComponent);
