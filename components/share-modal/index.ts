import { connect } from "react-redux";
import { RootState } from "store/types";
import ShareModalComponent from "./component";

export default connect((state: RootState) => ({
  currentHeadline: state.headlines.currentHeadline
}))(ShareModalComponent);
