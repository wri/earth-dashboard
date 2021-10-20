import HeadlineComponent from "./component";
import { connect } from "react-redux";
import { setIsDatePickerDisabled, setCurrentLocation, setCurrentScale, setCurrentScaleBy } from "slices/mapControls";
import { NAME as modesSliceName, setDateOfDataShown } from "slices/modes";

export default connect(state => ({ currentMode: state[modesSliceName].currentMode }), {
  setIsDatePickerDisabled,
  setCurrentLocation,
  setCurrentScale,
  setCurrentScaleBy,
  setDateOfDataShown
})(HeadlineComponent);
