import { connect } from "react-redux";
import DatePickerMenuComponent from "./component";
import { setIsDatePickerOpen, NAME as mapControlsSliceName } from "slices/mapControls";

export default connect(
  state => ({
    isOpen: state[mapControlsSliceName].isDatePickerOpen
  }),
  {
    onClose: () => setIsDatePickerOpen(false)
  }
)(DatePickerMenuComponent);
