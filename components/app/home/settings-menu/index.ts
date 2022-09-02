import { connect } from "react-redux";
import SettingsMenuComponent from "./component";
import { setIsDatePickerOpen, setSettingsClose } from "slices/mapControls";
import { RootState } from "store/types";
import { setDateOfDataShown } from "slices/modes";

export default connect(
  (state: RootState) => ({
    isOpen: state.mapControls.isSettingsOpen,
    isDatePickerOpen: state.mapControls.isDatePickerOpen,
    isMobile: state.common.isMobile,
    currentDate: new Date(state.modes.dateOfDataShown)
  }),
  {
    setSettingsClose,
    setDateOfDataShown,
    setIsDatePickerOpen
  }
)(SettingsMenuComponent);
