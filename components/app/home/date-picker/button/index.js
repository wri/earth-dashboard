import { connect } from "react-redux";
import DatePickerBtnComponent from "./component";

export default connect(state => ({
  isMobile: state.common.isMobile,
  dateOfDataShown: new Date(state.templates.dateOfDataShown)
}))(DatePickerBtnComponent);
