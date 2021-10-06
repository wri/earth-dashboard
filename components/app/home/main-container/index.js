import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { setTemplates } from "slices/templates";
import { NAME as mapControlsSliceName } from "slices/mapControls";

export default connect(
  state => ({
    dateOfDataShown: new Date(state.templates.dateOfDataShown),
    layersLabelArr: state.templates.layersLabelArr,
    shouldFadeControls: state[mapControlsSliceName].isDatePickerOpen || state[mapControlsSliceName].isSettingsOpen
  }),
  {
    setTemplates,
    setIsMobile
  }
)(MainContainerComponent);
