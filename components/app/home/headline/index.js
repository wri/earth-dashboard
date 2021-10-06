import HeadlineComponent from "./component";
import { connect } from "react-redux";
import { setIsDatePickerDisabled } from "slices/mapControls";

export default connect(state => ({ currentTemplate: state.templates.currentTemplate }), {
  setIsDatePickerDisabled
})(HeadlineComponent);
