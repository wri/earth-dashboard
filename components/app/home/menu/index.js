import { connect } from "react-redux";
import Menu from "./component";
import { ID as animationsId } from "schemas/global-settings/animations";
import { NAME as globalSettingsSliceName } from "slices/globalSettings";
import {
  setCurrentMode,
  setAnimation,
  setDataset,
  setMonitor,
  resetValues,
  NAME as modesSliceName
} from "slices/modes";

export default connect(
  state => ({
    modes: state[modesSliceName].allModes,
    currentMode: state[modesSliceName].currentMode,
    animationValue: state[modesSliceName].animationValue,
    monitorValue: state[modesSliceName].monitorValue,
    datasetValue: state[modesSliceName].datasetValue,
    animationEnabled: state[globalSettingsSliceName][animationsId]
  }),
  {
    setCurrentMode,
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    resetValues: resetValues
  },
  null,
  { forwardRef: true }
)(Menu);
