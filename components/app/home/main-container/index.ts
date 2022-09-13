import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { RootState } from "store/types";
import { setModes } from "slices/modes";
import { setPointerHeadlines } from "slices/headlines";

export default connect(
  (state: RootState) => ({
    dateOfDataShown: new Date(state.modes.dateOfDataShown),
    layersLabelArr: state.modes.layersLabelArr,
    shouldFadeControls: state.mapControls.isDatePickerOpen || state.mapControls.isSettingsOpen,
    currentHeadline: state.headlines.currentHeadline,
    pointerHeadlines: state.headlines.pointerHeadlines,
    currentMode: state.modes.currentMode
  }),
  {
    setModes,
    setIsMobile,
    setPointerHeadlines
  }
)(MainContainerComponent);
