import InfoModalComponent from "./component";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { setInfoMode } from "slices/modes";

export default connect(
  (state: RootState) => ({
    isMobile: state.common.isMobile,
    infoMode: state.modes.infoMode
  }),
  { setInfoMode }
)(InfoModalComponent);
