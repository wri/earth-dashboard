import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { NAME as mapControlsSliceName } from "slices/mapControls";
import { setTemplates } from "slices/templates";

export default connect(
  state => ({
    isSettingsOpen: state[mapControlsSliceName].isSettingsOpen,
    layersLabelArr: state.templates.layersLabelArr
  }),
  {
    setTemplates
  }
)(MainContainerComponent);
