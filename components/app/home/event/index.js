import HeadlineComponent from "./component";
import { connect } from "react-redux";
import { NAME as modesSliceName } from "slices/modes";
import { setIsShareOpen } from "slices/common";

export default connect(
  state => ({
    currentMode: state[modesSliceName].currentMode,
    eventScaleData: state.mapControls.eventScaleData
  }),
  {
    setIsShareOpen
  }
)(HeadlineComponent);
