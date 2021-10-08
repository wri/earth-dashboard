import { connect } from "react-redux";
import SearchInputComponent from "./component";

export default connect(state => ({
  isMobile: state.common.isMobile
}))(SearchInputComponent);
