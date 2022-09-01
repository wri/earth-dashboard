import { connect } from "react-redux";
import DatePickerMenuComponent from "./component";
import { setIsDatePickerOpen } from "slices/mapControls";
import { setDateOfDataShown } from "slices/modes";
import { RootState } from "store/types";

export default connect(
  (state: RootState) => ({
    isOpen: state.mapControls.isDatePickerOpen,
    currentDate: new Date(state.modes.dateOfDataShown),
    isMobile: state.common.isMobile
  }),
  {
    setIsDatePickerOpen,
    setDateOfDataShown
  }
)(DatePickerMenuComponent);
