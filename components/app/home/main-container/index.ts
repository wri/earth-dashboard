import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { RootState } from "store/types";
import { setModes } from "slices/modes";
import { setHeadlines } from "slices/headlines";

export default connect(
  (state: RootState) => ({
    dateOfDataShown: new Date(state.modes.dateOfDataShown),
    layersLabelArr: state.modes.layersLabelArr,
    shouldFadeControls: state.mapControls.isDatePickerOpen || state.mapControls.isSettingsOpen,
    currentHeadline: state.headlines.currentHeadline,
    headlines: state.headlines.headlines,
    currentMode: state.modes.currentMode
  }),
  {
    setModes,
    setIsMobile,
    setHeadlines
  }
)(MainContainerComponent);
