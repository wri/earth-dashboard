import { connect } from "react-redux";
// component
import Scale from "./component";
import { NAME as modesSliceName } from "slices/modes";

export default connect(state => ({
  currentMode: state[modesSliceName].currentMode,
  datasetValue: state[modesSliceName].datasetValue
}))(Scale);
