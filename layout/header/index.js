// component
import HeaderComponent from "./component";
import { connect } from "react-redux";
import { NAME as mapControlsSliceName } from "slices/mapControls";

export default connect(state => ({
  shouldBeFaded: state[mapControlsSliceName].isDatePickerOpen || state[mapControlsSliceName].isSettingsOpen
}))(HeaderComponent);
