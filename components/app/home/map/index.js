import { connect } from "react-redux";
import MapComponent from "./component";
import { NAME as mapControlsSliceName, setShouldFetchLocation } from "slices/mapControls";
import {
  setAnimation,
  setDataset,
  setMonitor,
  resetValues,
  setLayersLabelArr,
  setDateOfDataShown
} from "slices/templates";

export default connect(
  state => ({
    currentTemplate: state.templates.currentTemplate,
    animationValue: state.templates.animationValue,
    monitorValue: state.templates.monitorValue,
    datasetValue: state.templates.datasetValue,
    isSettingsOpen: state[mapControlsSliceName].isSettingsOpen,
    shouldFetchLocation: state[mapControlsSliceName].shouldFetchLocation,
    projectionType: state[mapControlsSliceName].projectionType,
    dateOfDataShown: state.templates.dateOfDataShown
  }),
  {
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    resetValues: resetValues,
    setShouldFetchLocation,
    setLayersLabelArr,
    setDateOfDataShown
  },
  null,
  { forwardRef: true }
)(MapComponent);
