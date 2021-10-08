import { connect } from "react-redux";
import DatePickerMenuComponent from "./component";
import { setIsDatePickerOpen, NAME as mapControlsSliceName } from "slices/mapControls";
import { setDateOfDataShown, NAME as modesSliceName } from "slices/modes";

export default connect(
  state => ({
    isOpen: state[mapControlsSliceName].isDatePickerOpen,
    currentDate: new Date(state[modesSliceName].dateOfDataShown)
  }),
  {
    onClose: () => setIsDatePickerOpen(false),
    setDate: setDateOfDataShown
  }
)(DatePickerMenuComponent);
