import { connect } from "react-redux";
import DatePickerBtnComponent from "./component";
import { setIsDatePickerOpen } from "slices/mapControls";
import { NAME as modesSliceName } from "slices/modes";

export default connect(
  state => ({
    isMobile: state.common.isMobile,
    dateOfDataShown: new Date(state[modesSliceName].dateOfDataShown),
    disabled: state.mapControls.isDatePickerDisabled
  }),
  {
    setIsDatePickerOpen
  }
)(DatePickerBtnComponent);
