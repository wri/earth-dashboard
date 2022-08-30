import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { RootState } from "store/types";
import { setModes } from "slices/modes";

export default connect(
  (state: RootState) => ({
    dateOfDataShown: new Date(state.modes.dateOfDataShown),
    layersLabelArr: state.modes.layersLabelArr,
    shouldFadeControls: state.mapControls.isDatePickerOpen || state.mapControls.isSettingsOpen,
    currentHeadline: state.headlines.currentHeadline,
    isMobile: state.common.isMobile
  }),
  {
    setModes,
    setIsMobile
  }
)(MainContainerComponent);
