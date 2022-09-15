import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { RootState } from "store/types";
import { setModes } from "slices/modes";
import { setHeadlines } from "slices/headlines";

export default connect(
  (state: RootState) => ({
    layersLabelArr: state.modes.layersLabelArr,
    shouldFadeControls: state.mapControls.isDatePickerOpen || state.mapControls.isSettingsOpen,
    currentHeadline: state.headlines.currentHeadline,
    headlines: state.headlines.headlines,
    currentMode: state.modes.currentMode,
    defaultMode: state.modes.defaultMode
  }),
  {
    setModes,
    setIsMobile,
    setHeadlines
  }
)(MainContainerComponent);
