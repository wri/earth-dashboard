import HeadlineComponent from "./component";
import { connect } from "react-redux";
import { setIsDatePickerDisabled, setCurrentLocation, setCurrentScale, setCurrentScaleBy } from "slices/mapControls";
import { NAME as modesSliceName } from "slices/modes";

export default connect(state => ({ currentMode: state[modesSliceName].currentMode }), {
  setIsDatePickerDisabled,
  setCurrentLocation,
  setCurrentScale,
  setCurrentScaleBy
})(HeadlineComponent);
