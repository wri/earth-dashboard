import { connect } from "react-redux";
import DatePickerMenuComponent from "./component";
import { setIsDatePickerOpen, NAME as mapControlsSliceName } from "slices/mapControls";
import { setDateOfDataShown } from "slices/templates";

export default connect(
  state => ({
    isOpen: state[mapControlsSliceName].isDatePickerOpen,
    currentDate: new Date(state.templates.dateOfDataShown)
  }),
  {
    onClose: () => setIsDatePickerOpen(false),
    setDate: setDateOfDataShown
  }
)(DatePickerMenuComponent);
