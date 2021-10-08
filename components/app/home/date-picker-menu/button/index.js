import { connect } from "react-redux";
import DatePickerBtnComponent from "./component";
import { setIsDatePickerOpen } from "slices/mapControls";

export default connect(
  state => ({
    isMobile: state.common.isMobile,
    dateOfDataShown: new Date(state.templates.dateOfDataShown),
    disabled: state.mapControls.isDatePickerDisabled
  }),
  {
    setIsDatePickerOpen
  }
)(DatePickerBtnComponent);
