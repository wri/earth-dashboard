import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { NAME as modesSliceName, setModes } from "slices/modes";
import { NAME as mapControlsSliceName } from "slices/mapControls";

export default connect(
  state => ({
    dateOfDataShown: new Date(state[modesSliceName].dateOfDataShown),
    layersLabelArr: state[modesSliceName].layersLabelArr,
    shouldFadeControls: state[mapControlsSliceName].isDatePickerOpen || state[mapControlsSliceName].isSettingsOpen,
    currentHeadline: state.headlines.currentHeadline
  }),
  {
    setModes,
    setIsMobile
  }
)(MainContainerComponent);
