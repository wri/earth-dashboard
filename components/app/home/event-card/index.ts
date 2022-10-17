import EventCardComponent from "./component";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { pagePush, setCurrentMode } from "slices/modes";

export default connect(
  (state: RootState) => ({
    isMobile: state.common.isMobile
  }),
  { pagePush, setCurrentMode }
)(EventCardComponent);
