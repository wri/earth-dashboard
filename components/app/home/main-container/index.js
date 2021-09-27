import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { NAME as mapControlsSliceName } from "slices/mapControls";
import { setTemplates } from "slices/templates";

export default connect(
  state => ({
    layersLabelArr: state.templates.layersLabelArr
  }),
  {
    setTemplates
  }
)(MainContainerComponent);
