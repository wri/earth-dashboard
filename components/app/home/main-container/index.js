import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { setTemplates } from "slices/templates";

export default connect(
  state => ({
    dateOfDataShown: new Date(state.templates.dateOfDataShown),
    layersLabelArr: state.templates.layersLabelArr
  }),
  {
    setTemplates,
    setIsMobile
  }
)(MainContainerComponent);
