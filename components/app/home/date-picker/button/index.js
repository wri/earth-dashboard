import { connect } from "react-redux";
import DatePickerBtnComponent from "./component";

export default connect(
  state => ({
    dateOfDataShown: new Date(state.templates.dateOfDataShown)
  })
)(DatePickerBtnComponent);
