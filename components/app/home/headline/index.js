import HeadlineComponent from "./component";
import { connect } from "react-redux";

export default connect(state => ({ currentTemplate: state.templates.currentTemplate }))(HeadlineComponent);
